import { Component, ChangeDetectionStrategy, inject, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { ContentService, Article } from '../../services/content.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-ratgeber-detail',
  templateUrl: './ratgeber-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class RatgeberDetailComponent {
  private route = inject(ActivatedRoute);
  private contentService = inject(ContentService);
  private seoService = inject(SeoService);

  private slug = toSignal(this.route.paramMap.pipe(map(params => params.get('slug')!)));

  article = computed(() => {
    const currentSlug = this.slug();
    if (!currentSlug) return undefined;
    return this.contentService.getArticleBySlug(currentSlug);
  });

  otherArticles = this.contentService.getArticles();

  constructor() {
    effect(() => {
      const a = this.article();
      if (a) {
        const title = `${a.title} | Hoffmann Blitz & Blank Ratgeber`;
        this.seoService.updateTitle(title);
        this.seoService.updateMetaTags(a.summary);
        this.setArticleSchema(a);
      } else {
        this.seoService.setJsonLd(null);
      }
    });
  }

  private setArticleSchema(article: Article) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "image": article.imageUrl,
      "author": {
        "@type": "Organization",
        "name": "Hoffmann Blitz & Blank"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Hoffmann Blitz & Blank",
        "logo": {
          "@type": "ImageObject",
          "url": "https://hoffmannblitz-blank.de/wp-content/uploads/2021/09/new-logo-update-1.png"
        }
      },
      "datePublished": this.parseGermanDate(article.date),
      "description": article.summary
    };
    this.seoService.setJsonLd(schema);
  }

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
