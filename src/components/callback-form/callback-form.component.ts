import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-callback-form',
  templateUrl: './callback-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class CallbackFormComponent {
  formSubmitted = signal(false);
  
  callbackForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    if (this.callbackForm.valid) {
      console.log('Callback request submitted!', this.callbackForm.value);
      this.formSubmitted.set(true);
    } else {
      this.callbackForm.markAllAsTouched();
    }
  }
}