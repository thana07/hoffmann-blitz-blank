import { Component, ChangeDetectionStrategy, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CallbackFormComponent } from '../callback-form/callback-form.component';

@Component({
  selector: 'app-floating-action-button',
  templateUrl: './floating-action-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, CallbackFormComponent],
})
export class FloatingActionButtonComponent {
  private platformId = inject(PLATFORM_ID);

  isModalOpen = signal(false);
  isExpanded = signal(false);

  toggleModal() {
    this.isModalOpen.update(value => !value);
    this.isExpanded.set(false);

    // Prevent body scroll when modal is open
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = this.isModalOpen() ? 'hidden' : '';
    }
  }

  toggleExpanded() {
    this.isExpanded.update(value => !value);
  }
}
