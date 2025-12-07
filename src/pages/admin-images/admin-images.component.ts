import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageGeneratorService, ImageAsset } from '../../services/image-generator.service';

@Component({
  selector: 'app-admin-images',
  templateUrl: './admin-images.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class AdminImagesComponent {
  imageService = inject(ImageGeneratorService);

  selectedCategory = signal<ImageAsset['category'] | 'all'>('all');

  categories: { key: ImageAsset['category'] | 'all'; label: string; icon: string }[] = [
    { key: 'all', label: 'Alle Bilder', icon: '🖼️' },
    { key: 'hero', label: 'Hero Banner', icon: '🎯' },
    { key: 'service', label: 'Services', icon: '🧹' },
    { key: 'location', label: 'Standorte', icon: '📍' },
    { key: 'gallery', label: 'Galerie', icon: '📸' },
    { key: 'article', label: 'Artikel', icon: '📰' },
    { key: 'branding', label: 'Branding', icon: '⚡' },
  ];

  get filteredImages(): ImageAsset[] {
    const category = this.selectedCategory();
    if (category === 'all') {
      return this.imageService.imageAssets();
    }
    return this.imageService.getImagesByCategory(category);
  }

  get generatedCount(): number {
    return this.imageService.imageAssets().filter(a => a.generated).length;
  }

  get pendingCount(): number {
    return this.imageService.imageAssets().filter(a => !a.generated).length;
  }

  async generateSingle(id: string) {
    await this.imageService.generateImageById(id);
  }

  async generateCategory(category: ImageAsset['category']) {
    await this.imageService.generateCategoryImages(category);
  }

  async generateAll() {
    await this.imageService.generateAllImages();
  }

  selectCategory(category: ImageAsset['category'] | 'all') {
    this.selectedCategory.set(category);
  }

  getImageSrc(asset: ImageAsset): string {
    return asset.url || asset.fallbackUrl;
  }

  copyPrompt(prompt: string) {
    navigator.clipboard.writeText(prompt);
  }

  downloadImage(url: string, name: string) {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name}.jpg`;
    link.target = '_blank';
    link.click();
  }

  exportUrls() {
    const urls = this.imageService.exportGeneratedUrls();
    const json = JSON.stringify(urls, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hbb-images-backup.json';
    link.click();
    URL.revokeObjectURL(url);
  }

  async importUrls(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const text = await file.text();
      try {
        const urls = JSON.parse(text);
        this.imageService.importImageUrls(urls);
        alert(`${Object.keys(urls).length} Bilder importiert!`);
      } catch (error) {
        alert('Fehler beim Importieren der Datei');
      }
    }
  }

  clearAll() {
    if (confirm('Alle generierten Bilder wirklich löschen?')) {
      this.imageService.clearAllGenerated();
    }
  }
}
