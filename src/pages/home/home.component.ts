import { Component, ChangeDetectionStrategy, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { FaqItemComponent } from '../../components/faq-item/faq-item.component';
import { SeoService } from '../../services/seo.service';
import { GalleryItemComponent } from '../../components/gallery-item/gallery-item.component';
import { ImageGeneratorService } from '../../services/image-generator.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterLink, ContactFormComponent, FaqItemComponent, GalleryItemComponent],
})
export class HomeComponent implements OnInit {
  private contentService = inject(ContentService);
  private seoService = inject(SeoService);
  imageService = inject(ImageGeneratorService);

  services = this.contentService.getServices();
  testimonials = this.contentService.getTestimonials();
  galleryItems = this.contentService.getGalleryItems();
  locations = this.contentService.getLocations();

  // Get hero image from image service
  get heroImage(): string {
    return this.imageService.getImageUrl('hero-main');
  }
  isLoadingHeroImage = this.imageService.isGenerating;

  // Animated counter for stats
  statsAnimated = signal(false);
  stats = [
    { value: 10, suffix: '+', label: 'Standorte in NRW', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
    { value: 2500, suffix: '+', label: 'Zufriedene Kunden', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { value: 15, suffix: '+', label: 'Jahre Erfahrung', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { value: 100, suffix: '%', label: 'Kundenzufriedenheit', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' }
  ];

  features = [
    { name: 'Transport inklusive', icon: 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2-2h8a1 1 0 001-1z', description: 'Kompletter Abtransport im Preis enthalten' },
    { name: 'Festpreisgarantie', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 13v-1m-4.5-9.5a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z', description: 'Keine versteckten Kosten' },
    { name: 'Haftpflichtversichert', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', description: 'Vollständig versichert für Ihre Sicherheit' },
    { name: 'Kostenfreie Besichtigung', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', description: 'Unverbindliche Vor-Ort-Besichtigung' },
  ];

  process = [
    { name: 'Online Termin', description: 'Nehmen Sie bequem via Mail oder Telefon Kontakt auf und vereinbaren Sie einen Termin.', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { name: 'Kostenfreie Besichtigung', description: 'Unser Mitarbeiter begutachtet und berät Sie vor Ort – kostenlos und unverbindlich.', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M17.636 17.636l-2.828-2.828' },
    { name: 'Festpreis Angebot', description: 'Unser Angebot umfasst Entrümpelung, Transport, Entsorgung und besenreine Übergabe.', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' },
    { name: 'Pünktlich & Sauber', description: 'Wir erledigen Ihre Entrümpelung pünktlich und mit allen Leistungen aus unserem Angebot.', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' }
  ];

  faqs = [
    {
      question: 'Was kostet eine Entrümpelung?',
      answer: 'Die Kosten sind individuell und hängen vom Umfang der zu entrümpelnden Gegenstände und der Größe des Objekts ab. Nach einer kostenlosen und unverbindlichen Besichtigung erstellen wir Ihnen ein Festpreisangebot ohne versteckte Kosten.'
    },
    {
      question: 'Wie schnell können Sie einen Termin anbieten?',
      answer: 'Wir sind sehr flexibel und bemühen uns, Ihnen schnellstmöglich einen Besichtigungstermin anzubieten, oft schon innerhalb von 24-48 Stunden. Die eigentliche Entrümpelung kann dann zeitnah nach Ihrer Zusage erfolgen.'
    },
    {
      question: 'Entsorgen Sie den Müll umweltgerecht?',
      answer: 'Ja, absolut. Wir legen großen Wert auf eine fachgerechte und umweltfreundliche Entsorgung. Der Müll wird sorgfältig getrennt und über zertifizierte Fachbetriebe entsorgt.'
    },
    {
      question: 'Was passiert mit Wertgegenständen?',
      answer: 'Finden wir während der Entrümpelung Wertgegenstände, werden diese selbstverständlich an Sie übergeben. Auf Wunsch können wir auch eine Wertanrechnung im Angebot berücksichtigen, was den Endpreis für Sie reduziert.'
    },
    {
      question: 'Bieten Sie auch kurzfristige Termine an?',
      answer: 'Ja, wir verstehen, dass manchmal schnelles Handeln erforderlich ist. Kontaktieren Sie uns telefonisch unter 0176 81281360 für Express-Termine. Wir tun unser Bestes, um auch kurzfristig verfügbar zu sein.'
    },
    {
      question: 'In welchen Städten sind Sie tätig?',
      answer: 'Wir sind in ganz NRW tätig mit Standorten in Essen, Düsseldorf, Ratingen, Wuppertal, Wülfrath, Mettmann, Hattingen, Mülheim an der Ruhr, Krefeld und Solingen. Auch andere Städte in der Region bedienen wir gerne.'
    }
  ];

  // Trust badges/certifications
  trustBadges = [
    { name: 'TÜV geprüft', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    { name: 'Zertifizierte Entsorgung', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
    { name: 'Datenschutz konform', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
    { name: 'Faire Preise', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
  ];

  ngOnInit() {
    this.setHomePageSeo();

    // Trigger stats animation after a delay
    setTimeout(() => this.statsAnimated.set(true), 500);
  }

  private setHomePageSeo() {
    const locations = this.locations();
    const baseUrl = 'https://hoffmannblitz-blank.de';

    // Update comprehensive SEO
    this.seoService.updateSeo({
      title: 'Hoffmann Blitz & Blank | Professionelle Entrümpelung & Haushaltsauflösung NRW',
      description: 'Ihr Experte für Entrümpelung, Haushaltsauflösung, Messie-Entrümpelung, Polsterreinigung & Transporte in NRW. 10 Standorte ✓ Festpreisgarantie ✓ Kostenlose Besichtigung ✓ Rufen Sie an: 0176 81281360',
      keywords: 'Entrümpelung, Haushaltsauflösung, Wohnungsauflösung, Kellerentrümpelung, Messie-Entrümpelung, Messie-Wohnung räumen, Polsterreinigung, Sofa reinigen, Matratzenreinigung, Reinigung, Transporte, Seniorenumzüge, Hausmeisterservice, Tatortreinigung, NRW, Essen, Düsseldorf, Ratingen, Wuppertal, Mülheim, Krefeld, Solingen, Ruhrgebiet',
      canonicalUrl: baseUrl,
      ogImage: `${baseUrl}/assets/og-image.jpg`,
      ogType: 'website'
    });

    // Combine multiple schemas
    const schemas = [
      this.seoService.getWebsiteSchema(),
      this.seoService.getOrganizationSchema(),
      this.seoService.getLocalBusinessSchema(locations),
      this.seoService.getFaqSchema(this.faqs),
      this.seoService.getHowToSchema(this.process),
      this.seoService.getBreadcrumbSchema([
        { name: 'Startseite', url: '/' }
      ])
    ];

    this.seoService.setJsonLd(schemas);
  }

  // Get service image by slug
  getServiceImage(slug: string): string {
    return this.imageService.getServiceImage(slug);
  }

  // Get location image by slug
  getLocationImage(slug: string): string {
    return this.imageService.getLocationImage(slug);
  }

  // Helper to format large numbers with animation
  formatNumber(value: number): string {
    if (value >= 1000) {
      return value.toLocaleString('de-DE');
    }
    return value.toString();
  }

  // Track by functions for ngFor optimization
  trackBySlug(index: number, item: { slug: string }): string {
    return item.slug;
  }

  trackByName(index: number, item: { name: string }): string {
    return item.name;
  }

  trackByQuestion(index: number, item: { question: string }): string {
    return item.question;
  }

  trackByTitle(index: number, item: { title: string }): string {
    return item.title;
  }
}
