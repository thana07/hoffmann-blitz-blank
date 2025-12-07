
import { Component, ChangeDetectionStrategy, signal, computed, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ContactFormComponent {
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

      // Simulate API call
      setTimeout(() => {
        console.log('Form Submitted!', this.contactForm.value);
        this.isSubmitting.set(false);
        this.formSubmitted.set(true);
        this.contactForm.reset();
      }, 1500);
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
