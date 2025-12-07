
import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
})
export class GalleryItemComponent {
  beforeImageUrl = input.required<string>();
  afterImageUrl = input.required<string>();
  title = input.required<string>();
  description = input.required<string>();

  showAfter = signal(false);

  toggleView(isAfter: boolean) {
    this.showAfter.set(isAfter);
  }
}
