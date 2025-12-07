import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageGeneratorService } from '../../services/image-generator.service';
import { SeoService } from '../../services/seo.service';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';

@Component({
  selector: 'app-galerie',
  templateUrl: './galerie.component.html',
  standalone: true,
  imports: [CommonModule, ContactFormComponent],
})
export class GalerieComponent {
  private imageService = inject(ImageGeneratorService);
  private seoService = inject(SeoService);

  galleryPairs = this.imageService.getGalleryPairs();
  selectedPair = signal<number | null>(null);
  sliderPosition = signal(50);
  isDragging = signal(false);

  constructor() {
    effect(() => {
      this.seoService.updateTitle('Galerie - Vorher/Nachher | Hoffmann Blitz & Blank');
      this.seoService.updateMetaTags(
        'Sehen Sie unsere beeindruckenden Vorher-Nachher Transformationen. Entrümpelungen, Reinigungen und mehr.'
      );
    });
  }

  selectPair(index: number) {
    this.selectedPair.set(index);
    this.sliderPosition.set(50);
  }

  closeLightbox() {
    this.selectedPair.set(null);
  }

  onSliderMouseDown(event: MouseEvent) {
    this.isDragging.set(true);
    this.updateSliderPosition(event);
  }

  onSliderMouseMove(event: MouseEvent) {
    if (this.isDragging()) {
      this.updateSliderPosition(event);
    }
  }

  onSliderMouseUp() {
    this.isDragging.set(false);
  }

  onSliderTouchStart(event: TouchEvent) {
    this.isDragging.set(true);
    this.updateSliderPositionTouch(event);
  }

  onSliderTouchMove(event: TouchEvent) {
    if (this.isDragging()) {
      this.updateSliderPositionTouch(event);
    }
  }

  onSliderTouchEnd() {
    this.isDragging.set(false);
  }

  private updateSliderPosition(event: MouseEvent) {
    const container = event.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    this.sliderPosition.set(percentage);
  }

  private updateSliderPositionTouch(event: TouchEvent) {
    const container = event.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();
    const x = event.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    this.sliderPosition.set(percentage);
  }

  getBeforeImage(pair: { before: { url: string; fallbackUrl: string }; after: { url: string; fallbackUrl: string }; title: string }): string {
    return pair.before.url || pair.before.fallbackUrl;
  }

  getAfterImage(pair: { before: { url: string; fallbackUrl: string }; after: { url: string; fallbackUrl: string }; title: string }): string {
    return pair.after.url || pair.after.fallbackUrl;
  }
}
