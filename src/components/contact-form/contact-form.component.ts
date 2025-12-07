
import { Component, ChangeDetectionStrategy, signal, computed, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ContactFormComponent {
  private http = inject(HttpClient);

  // Web3Forms Access Key - E-Mails gehen an info@hoffmannblitz-blank.de
  private readonly WEB3FORMS_KEY = '577a1b5c-1072-4438-8eb7-743c34b596f5';

  // Theme variant - 'dark' for hero section, 'light' for standalone pages
  @Input() variant: 'dark' | 'light' = 'light';

  // Multi-step wizard state
  currentStep = signal(1);
  totalSteps = 3;

  // Form submission state
  formSubmitted = signal(false);
  isSubmitting = signal(false);

  // Slide direction for animation
  slideDirection = signal<'next' | 'prev'>('next');

  // Service options
  serviceOptions = [
    { value: 'entruempelung', label: 'Entrümpelung', icon: '🏠' },
    { value: 'hausreinigung', label: 'Hausreinigung', icon: '✨' },
    { value: 'transporte', label: 'Transporte & Umzüge', icon: '🚚' },
    { value: 'seniorenumzuege', label: 'Seniorenumzüge', icon: '👴' },
    { value: 'messi-entruempelung', label: 'Messie-Entrümpelung', icon: '📦' },
    { value: 'polsterreinigung', label: 'Polsterreinigung', icon: '🛋️' },
    { value: 'hausmeisterservice', label: 'Hausmeisterservice', icon: '🔧' },
    { value: 'tatortreinigung', label: 'Spezialreinigung', icon: '🧹' },
  ];

  contactForm = this.fb.group({
    // Step 1: Service selection
    service: ['', Validators.required],

    // Step 2: Contact info
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],

    // Step 3: Address & details
    street: [''],
    zip: [''],
    city: [''],
    message: ['']
  });

  // Computed progress percentage
  progress = computed(() => (this.currentStep() / this.totalSteps) * 100);

  // Step validation
  isStep1Valid = computed(() => this.contactForm.get('service')?.valid ?? false);
  isStep2Valid = computed(() => {
    const name = this.contactForm.get('name')?.valid ?? false;
    const phone = this.contactForm.get('phone')?.valid ?? false;
    const email = this.contactForm.get('email')?.valid ?? false;
    return name && phone && email;
  });

  constructor(private fb: FormBuilder) {}

  nextStep(): void {
    if (this.currentStep() < this.totalSteps) {
      // Validate current step before proceeding
      if (this.currentStep() === 1 && !this.isStep1Valid()) {
        this.contactForm.get('service')?.markAsTouched();
        return;
      }
      if (this.currentStep() === 2 && !this.isStep2Valid()) {
        this.contactForm.get('name')?.markAsTouched();
        this.contactForm.get('phone')?.markAsTouched();
        this.contactForm.get('email')?.markAsTouched();
        return;
      }

      this.slideDirection.set('next');
      this.currentStep.update(step => step + 1);
    }
  }

  prevStep(): void {
    if (this.currentStep() > 1) {
      this.slideDirection.set('prev');
      this.currentStep.update(step => step - 1);
    }
  }

  goToStep(step: number): void {
    if (step >= 1 && step <= this.totalSteps && step <= this.currentStep()) {
      this.slideDirection.set(step < this.currentStep() ? 'prev' : 'next');
      this.currentStep.set(step);
    }
  }

  selectService(value: string): void {
    this.contactForm.get('service')?.setValue(value);
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting.set(true);

      const formData = this.contactForm.value;
      const serviceLabel = this.serviceOptions.find(s => s.value === formData.service)?.label || formData.service;

      // Web3Forms API call
      const payload = {
        access_key: this.WEB3FORMS_KEY,
        subject: `Neue Anfrage: ${serviceLabel} von ${formData.name}`,
        from_name: 'Hoffmann Blitz & Blank Website',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: serviceLabel,
        address: `${formData.street || ''}, ${formData.zip || ''} ${formData.city || ''}`.trim().replace(/^,\s*/, ''),
        message: formData.message || 'Keine zusätzliche Nachricht',
      };

      this.http.post('https://api.web3forms.com/submit', payload)
        .subscribe({
          next: () => {
            this.isSubmitting.set(false);
            this.formSubmitted.set(true);
            this.contactForm.reset();
          },
          error: (err) => {
            console.error('Fehler beim Senden:', err);
            this.isSubmitting.set(false);
            alert('Fehler beim Senden. Bitte versuchen Sie es erneut oder rufen Sie uns an.');
          }
        });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.formSubmitted.set(false);
    this.currentStep.set(1);
    this.contactForm.reset();
  }
}
