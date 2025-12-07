import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

let faqIdCounter = 0;

@Component({
  selector: 'app-faq-item',
  templateUrl: './faq-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class FaqItemComponent {
  question = input.required<string>();
  answer = input.required<string>();

  isOpen = signal(false);
  id = ++faqIdCounter;

  toggle() {
    this.isOpen.update(value => !value);
  }
}
