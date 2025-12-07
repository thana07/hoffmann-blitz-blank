import { Component, inject, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContentService, Service, Location } from '../../services/content.service';
import { SeoService } from '../../services/seo.service';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-service-location',
  standalone: true,
  imports: [CommonModule, RouterLink, ContactFormComponent],
  templateUrl: './service-location.component.html'
})
export class ServiceLocationComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private contentService = inject(ContentService);
  private seoService = inject(SeoService);

  service = signal<Service | undefined>(undefined);
  location = signal<Location | undefined>(undefined);
  otherServices = this.contentService.getServices();
  otherLocations = this.contentService.getLocations();

  ngOnInit() {
    // Subscribe to both params and data to support both URL patterns
    combineLatest([this.route.params, this.route.data]).subscribe(([params, data]) => {
      // Try to get slugs from route data first (for static routes), then from params
      const serviceSlug = data['serviceSlug'] || params['serviceSlug'];
      const locationSlug = data['locationSlug'] || params['locationSlug'];

      if (serviceSlug && locationSlug) {
        const foundService = this.contentService.getServiceBySlug(serviceSlug);
        const foundLocation = this.contentService.getLocationBySlug(locationSlug);

        this.service.set(foundService);
        this.location.set(foundLocation);

        if (foundService && foundLocation) {
          this.seoService.updateSeo({
            title: `${foundService.title} in ${foundLocation.name} | Hoffmann Blitz & Blank`,
            description: `Professionelle ${foundService.title} in ${foundLocation.name} und Umgebung. Festpreisgarantie, kostenlose Besichtigung. Jetzt anrufen: ${foundLocation.phone}`,
            keywords: `${foundService.title}, ${foundLocation.name}, Entrümpelung, Haushaltsauflösung, ${foundLocation.name} Umgebung`,
            canonicalUrl: `https://hoffmannblitz-blank.de/${serviceSlug}-in-${locationSlug}/`
          });
        }
      }
    });
  }
}
