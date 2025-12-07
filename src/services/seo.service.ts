import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product' | 'service';
  articleAuthor?: string;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  noIndex?: boolean;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private document = inject(DOCUMENT);
  private scriptId = 'app-json-ld';
  private baseUrl = 'https://hoffmannblitz-blank.de';

  updateTitle(title: string) {
    this.titleService.setTitle(title);
  }

  updateMetaTags(description: string) {
    this.metaService.updateTag({ name: 'description', content: description });
  }

  /**
   * Comprehensive SEO update with all meta tags
   */
  updateSeo(config: SeoConfig) {
    // Title
    this.titleService.setTitle(config.title);

    // Primary Meta Tags
    this.metaService.updateTag({ name: 'description', content: config.description });
    if (config.keywords) {
      this.metaService.updateTag({ name: 'keywords', content: config.keywords });
    }

    // Robots
    if (config.noIndex) {
      this.metaService.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    } else {
      this.metaService.updateTag({ name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' });
    }

    // Open Graph
    this.metaService.updateTag({ property: 'og:title', content: config.title });
    this.metaService.updateTag({ property: 'og:description', content: config.description });
    this.metaService.updateTag({ property: 'og:type', content: config.ogType || 'website' });
    if (config.canonicalUrl) {
      this.metaService.updateTag({ property: 'og:url', content: config.canonicalUrl });
    }
    if (config.ogImage) {
      this.metaService.updateTag({ property: 'og:image', content: config.ogImage });
    }

    // Twitter Card
    this.metaService.updateTag({ name: 'twitter:title', content: config.title });
    this.metaService.updateTag({ name: 'twitter:description', content: config.description });
    if (config.ogImage) {
      this.metaService.updateTag({ name: 'twitter:image', content: config.ogImage });
    }

    // Article specific tags
    if (config.ogType === 'article') {
      if (config.articleAuthor) {
        this.metaService.updateTag({ property: 'article:author', content: config.articleAuthor });
      }
      if (config.articlePublishedTime) {
        this.metaService.updateTag({ property: 'article:published_time', content: config.articlePublishedTime });
      }
      if (config.articleModifiedTime) {
        this.metaService.updateTag({ property: 'article:modified_time', content: config.articleModifiedTime });
      }
    }

    // Canonical URL
    this.updateCanonicalUrl(config.canonicalUrl);
  }

  /**
   * Update canonical URL
   */
  updateCanonicalUrl(url?: string) {
    let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');

    if (url) {
      if (!link) {
        link = this.document.createElement('link');
        link.setAttribute('rel', 'canonical');
        this.document.head.appendChild(link);
      }
      link.setAttribute('href', url);
    } else if (link) {
      link.remove();
    }
  }

  setJsonLd(schema: object | object[] | null) {
    this.removeExistingJsonLd();
    if (!schema) {
      return;
    }
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = this.scriptId;
    script.innerHTML = JSON.stringify(Array.isArray(schema) ? schema : schema);
    this.document.head.appendChild(script);
  }

  private removeExistingJsonLd() {
    const existingScript = this.document.getElementById(this.scriptId);
    if (existingScript) {
      this.document.head.removeChild(existingScript);
    }
  }

  /**
   * Generate Organization Schema
   */
  getOrganizationSchema() {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${this.baseUrl}/#organization`,
      "name": "Hoffmann Blitz & Blank",
      "url": this.baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${this.baseUrl}/assets/logo.png`,
        "width": 300,
        "height": 100
      },
      "image": `${this.baseUrl}/assets/og-image.jpg`,
      "description": "Professionelle Entrümpelung, Haushaltsauflösung, Reinigung und Transporte in NRW",
      "email": "info@hoffmannblitz-blank.de",
      "telephone": "+4917681281360",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Heidhauser Str. 60",
        "addressLocality": "Essen",
        "postalCode": "45239",
        "addressRegion": "NRW",
        "addressCountry": "DE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 51.4556432,
        "longitude": 7.0115552
      },
      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 51.4556432,
          "longitude": 7.0115552
        },
        "geoRadius": "100000"
      },
      "sameAs": [
        "https://www.facebook.com/hoffmannblitzblank",
        "https://www.instagram.com/hoffmannblitzblank"
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+4917681281360",
          "contactType": "customer service",
          "availableLanguage": ["German"],
          "areaServed": "DE"
        }
      ]
    };
  }

  /**
   * Generate LocalBusiness Schema with all locations
   */
  getLocalBusinessSchema(locations: any[]) {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${this.baseUrl}/#localbusiness`,
      "name": "Hoffmann Blitz & Blank",
      "image": `${this.baseUrl}/assets/og-image.jpg`,
      "url": this.baseUrl,
      "telephone": "+4917681281360",
      "priceRange": "€€",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Heidhauser Str. 60",
        "addressLocality": "Essen",
        "postalCode": "45239",
        "addressRegion": "NRW",
        "addressCountry": "DE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 51.4556432,
        "longitude": 7.0115552
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "07:00",
          "closes": "22:00"
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "127",
        "bestRating": "5",
        "worstRating": "1"
      },
      "department": locations.map(loc => ({
        "@type": "LocalBusiness",
        "name": `Hoffmann Blitz & Blank ${loc.name}`,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": loc.address.split(',')[0],
          "addressLocality": loc.name,
          "postalCode": loc.address.split(',')[1]?.trim().split(' ')[0] || '',
          "addressRegion": "NRW",
          "addressCountry": "DE"
        },
        "telephone": loc.phone
      }))
    };
  }

  /**
   * Generate Service Schema
   */
  getServiceSchema(service: { title: string; slug: string; longDescription: string }) {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${this.baseUrl}/dienstleistung/${service.slug}/#service`,
      "name": service.title,
      "description": service.longDescription,
      "provider": {
        "@type": "LocalBusiness",
        "@id": `${this.baseUrl}/#localbusiness`
      },
      "areaServed": {
        "@type": "State",
        "name": "Nordrhein-Westfalen",
        "addressCountry": "DE"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": service.title,
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": service.title
            }
          }
        ]
      }
    };
  }

  /**
   * Generate Article Schema for blog posts
   */
  getArticleSchema(article: { title: string; slug: string; summary: string; content: string; author: string; date: string; imageUrl: string }) {
    const publishDate = this.parseGermanDate(article.date);

    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${this.baseUrl}/ratgeber/${article.slug}/#article`,
      "headline": article.title,
      "description": article.summary,
      "image": article.imageUrl,
      "author": {
        "@type": "Organization",
        "name": article.author,
        "@id": `${this.baseUrl}/#organization`
      },
      "publisher": {
        "@type": "Organization",
        "name": "Hoffmann Blitz & Blank",
        "@id": `${this.baseUrl}/#organization`,
        "logo": {
          "@type": "ImageObject",
          "url": `${this.baseUrl}/assets/logo.png`
        }
      },
      "datePublished": publishDate,
      "dateModified": publishDate,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${this.baseUrl}/ratgeber/${article.slug}`
      },
      "articleSection": "Ratgeber",
      "inLanguage": "de-DE"
    };
  }

  /**
   * Generate FAQ Schema
   */
  getFaqSchema(faqs: { question: string; answer: string }[]) {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  }

  /**
   * Generate Breadcrumb Schema
   */
  getBreadcrumbSchema(items: BreadcrumbItem[]) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url.startsWith('http') ? item.url : `${this.baseUrl}${item.url}`
      }))
    };
  }

  /**
   * Generate WebSite Schema with SearchAction
   */
  getWebsiteSchema() {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${this.baseUrl}/#website`,
      "url": this.baseUrl,
      "name": "Hoffmann Blitz & Blank",
      "description": "Professionelle Entrümpelung, Haushaltsauflösung, Reinigung und Transporte in NRW",
      "publisher": {
        "@type": "Organization",
        "@id": `${this.baseUrl}/#organization`
      },
      "inLanguage": "de-DE"
    };
  }

  /**
   * Generate Review Schema
   */
  getReviewSchema(reviews: { name: string; comment: string; role: string }[]) {
    return reviews.map((review, index) => ({
      "@context": "https://schema.org",
      "@type": "Review",
      "@id": `${this.baseUrl}/#review-${index}`,
      "author": {
        "@type": "Person",
        "name": review.name
      },
      "reviewBody": review.comment,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1"
      },
      "itemReviewed": {
        "@type": "LocalBusiness",
        "@id": `${this.baseUrl}/#localbusiness`
      },
      "datePublished": new Date().toISOString().split('T')[0]
    }));
  }

  /**
   * Generate HowTo Schema for process steps
   */
  getHowToSchema(steps: { name: string; description: string }[]) {
    return {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "So funktioniert eine Entrümpelung mit Hoffmann Blitz & Blank",
      "description": "Unser unkomplizierter Ablauf für Ihre Entrümpelung in 4 einfachen Schritten",
      "totalTime": "PT24H",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "EUR",
        "value": "0"
      },
      "step": steps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": step.name,
        "text": step.description,
        "url": `${this.baseUrl}/#step-${index + 1}`
      }))
    };
  }

  /**
   * Helper to parse German date format
   */
  private parseGermanDate(germanDate: string): string {
    const months: { [key: string]: string } = {
      'Januar': '01', 'Februar': '02', 'März': '03', 'April': '04',
      'Mai': '05', 'Juni': '06', 'Juli': '07', 'August': '08',
      'September': '09', 'Oktober': '10', 'November': '11', 'Dezember': '12'
    };

    const parts = germanDate.split(' ');
    if (parts.length === 3) {
      const day = parts[0].replace('.', '').padStart(2, '0');
      const month = months[parts[1]] || '01';
      const year = parts[2];
      return `${year}-${month}-${day}`;
    }
    return new Date().toISOString().split('T')[0];
  }
}
