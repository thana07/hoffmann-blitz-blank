import { Component, ChangeDetectionStrategy, inject, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, combineLatestWith } from 'rxjs/operators';
import { ContentService, Location } from '../../services/content.service';
import { SeoService } from '../../services/seo.service';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { ImageGeneratorService } from '../../services/image-generator.service';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ContactFormComponent, RouterLink],
})
export class LocationDetailComponent {
  private route = inject(ActivatedRoute);
  private contentService = inject(ContentService);
  private seoService = inject(SeoService);
  private imageService = inject(ImageGeneratorService);

  // Get slug from either route params or route data (for legacy URLs)
  private slug = toSignal(
    this.route.paramMap.pipe(
      combineLatestWith(this.route.data),
      map(([params, data]) => data['slug'] as string || params.get('slug')!)
    )
  );

  location = computed(() => {
    const currentSlug = this.slug();
    if (!currentSlug) return undefined;
    return this.contentService.getLocationBySlug(currentSlug);
  });

  // Get location image
  locationImage = computed(() => {
    const currentSlug = this.slug();
    if (!currentSlug) return '';
    return this.imageService.getLocationImage(currentSlug);
  });

  // Get all services
  services = this.contentService.getServices();

  // Get all locations for the sidebar
  allLocations = this.contentService.getLocations();

  constructor() {
    effect(() => {
      const l = this.location();
      if (l) {
        const title = `Entrümpelung in ${l.name} | Hoffmann Blitz & Blank`;
        this.seoService.updateTitle(title);
        this.seoService.updateMetaTags(`Professionelle Entrümpelung, Haushaltsauflösung und Reinigung in ${l.name}. Kontaktieren Sie uns für ein kostenloses Angebot.`);
        this.setLocationSchema(l);
      } else {
        this.seoService.setJsonLd(null);
      }
    });
  }

  private setLocationSchema(location: Location) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": `Hoffmann Blitz & Blank ${location.name}`,
      "image": "https://hoffmannblitz-blank.de/wp-content/uploads/2021/09/new-logo-update-1.png",
      "url": `https://hoffmannblitz-blank.de/#/standort/${location.slug}`,
      "telephone": location.phone,
      "email": location.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": location.address.split(',')[0],
        "addressLocality": location.name,
        "postalCode": location.address.split(',')[1]?.trim().split(' ')[0] || '',
        "addressCountry": "DE"
      },
      "description": location.description,
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "07:00",
        "closes": "22:00"
      }
    };
    this.seoService.setJsonLd(schema);
  }
}
