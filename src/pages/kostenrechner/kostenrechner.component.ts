
import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ContentService } from '../../services/content.service';
import { CalculatorService } from '../../services/calculator.service';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';

@Component({
  selector: 'app-kostenrechner',
  templateUrl: './kostenrechner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ContactFormComponent],
})
export class KostenrechnerComponent {
  private fb = inject(FormBuilder);
  private contentService = inject(ContentService);
  private calculatorService = inject(CalculatorService);

  services = this.contentService.getServices();
  
  currentStep = signal(1);
  calculationResult = signal<{ min: number; max: number } | null>(null);

  calculatorForm = this.fb.group({
    service: ['', Validators.required],
    size: [50, [Validators.required, Validators.min(10)]],
    floor: ['eg', Validators.required],
    disassembly: [false, Validators.required],
    wasteType: ['normal', Validators.required],
  });

  resultText = computed(() => {
    const result = this.calculationResult();
    if (!result) return '';
    const serviceSlug = this.calculatorForm.value.service;
    const service = this.services().find(s => s.slug === serviceSlug);
    const serviceName = service ? service.title : 'Ihre Anfrage';
    return `Für eine ${serviceName} mit den von Ihnen angegebenen Parametern liegt die unverbindliche Kostenschätzung zwischen ${result.min} € und ${result.max} €. Für ein verbindliches Festpreisangebot, füllen Sie bitte das untenstehende Formular aus.`;
  });

  nextStep() {
    this.currentStep.update(step => (step < 3 ? step + 1 : step));
  }

  prevStep() {
    this.currentStep.update(step => (step > 1 ? step - 1 : step));
  }
  
  goToStep(step: number) {
    this.currentStep.set(step);
  }

  calculate() {
    if (this.calculatorForm.valid) {
      const result = this.calculatorService.calculateCost(this.calculatorForm.value);
      this.calculationResult.set(result);
      this.currentStep.set(3); // Go to result step
    } else {
        this.calculatorForm.markAllAsTouched();
    }
  }
  
  startOver() {
    this.calculatorForm.reset({
        size: 50,
        floor: 'eg',
        disassembly: false,
        wasteType: 'normal',
        service: ''
    });
    this.calculationResult.set(null);
    this.currentStep.set(1);
  }
}
