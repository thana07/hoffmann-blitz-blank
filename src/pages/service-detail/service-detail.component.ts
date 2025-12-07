import { Component, ChangeDetectionStrategy, inject, computed, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { ContentService, Service } from '../../services/content.service';
import { SeoService } from '../../services/seo.service';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { ImageGeneratorService } from '../../services/image-generator.service';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterLink, ContactFormComponent],
})
export class ServiceDetailComponent {
  private route = inject(ActivatedRoute);
  private contentService = inject(ContentService);
  private seoService = inject(SeoService);
  private imageService = inject(ImageGeneratorService);

  // Get slug from either route params or route data (for direct URLs like /entruempelung)
  private paramSlug = toSignal(this.route.paramMap.pipe(map(params => params.get('slug'))));
  private dataSlug = toSignal(this.route.data.pipe(map(data => data['slug'] as string | undefined)));

  private slug = computed(() => this.paramSlug() || this.dataSlug());

  service = computed(() => {
    const currentSlug = this.slug();
    if (!currentSlug) return undefined;
    return this.contentService.getServiceBySlug(currentSlug);
  });

  // Get service image
  serviceImage = computed(() => {
    const currentSlug = this.slug();
    if (!currentSlug) return '';
    return this.imageService.getServiceImage(currentSlug);
  });

  otherServices = this.contentService.getServices();

  constructor() {
    effect(() => {
      const s = this.service();
      if (s) {
        const title = `${s.title} | Hoffmann Blitz & Blank`;
        this.seoService.updateTitle(title);
        this.seoService.updateMetaTags(s.shortDescription);
        this.setServiceSchema(s);
      } else {
        this.seoService.setJsonLd(null);
      }
    });
  }

  private setServiceSchema(service: Service) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": service.title,
      "description": service.longDescription,
      "provider": {
        "@type": "LocalBusiness",
        "name": "Hoffmann Blitz & Blank"
      },
      "areaServed": {
        "@type": "Country",
        "name": "DE"
      },
      "serviceType": service.title,
    };
    this.seoService.setJsonLd(schema);
  }
}
