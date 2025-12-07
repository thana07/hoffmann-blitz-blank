import { Injectable, signal } from '@angular/core';
import { FalAiService } from './fal-ai.service';

export interface ImageAsset {
  id: string;
  url: string;
  category: 'hero' | 'service' | 'location' | 'gallery' | 'article' | 'branding';
  name: string;
  description: string;
  prompt: string;
  generated: boolean;
  fallbackUrl: string;
}

// =============================================================================
// COMPANY BRANDING CONSTANTS FOR AI IMAGE GENERATION
// =============================================================================
// These constants create a consistent brand identity across all generated images

const COMPANY_NAME = 'Hoffmann Blitz & Blank';
const BRAND_COLORS = 'vibrant golden yellow (#FAD205) and navy blue (#1E3A5F)';

// Detailed uniform description for workers in all images
const WORKER_UNIFORM = `
  professional workers wearing bright golden yellow polo shirts with navy blue collar trim,
  embroidered company name "Hoffmann Blitz & Blank" on left chest with golden yellow lightning bolt emblem,
  navy blue cargo work pants with golden yellow stitching details,
  matching golden yellow safety vests with reflective silver stripes,
  branded golden yellow baseball caps featuring the lightning bolt logo
`.trim();

// Detailed vehicle branding for trucks and vans
const VEHICLE_BRANDING = `
  custom branded Mercedes Sprinter van painted in bright golden yellow with white and navy accents,
  large "Hoffmann Blitz & Blank" company name on both sides in bold navy letters,
  oversized golden yellow lightning bolt logo prominently displayed,
  contact number "0176 81281360" on rear doors,
  professional vehicle wrap with clean golden yellow-to-white gradient design
`.trim();

// Equipment and supplies branding
const EQUIPMENT_BRANDING = `
  golden yellow-branded professional cleaning equipment,
  spray bottles with "HBB" labels and lightning bolt icons,
  golden yellow moving boxes and crates marked with company logo,
  protective blankets with "Hoffmann Blitz & Blank" woven pattern,
  golden yellow tool bags and supply containers with embroidered branding
`.trim();

// General brand style applied to all images
const BRAND_STYLE = `
  ${BRAND_COLORS} color scheme prominently featured,
  German professional quality and precision,
  clean, trustworthy, efficient corporate appearance,
  photorealistic, high-end commercial photography style,
  4K quality, sharp focus, professional lighting
`.trim();

// Photography style constants
const PHOTO_STYLE = 'ultra-realistic photography, Canon EOS R5, 35mm lens, natural lighting, sharp details, commercial quality';

// LocalStorage key for persisting generated images
const STORAGE_KEY = 'hbb_generated_images';

@Injectable({ providedIn: 'root' })
export class ImageGeneratorService {

  // All image assets with creative prompts - optimized for Flux Pro 1.1 Ultra
  readonly imageAssets = signal<ImageAsset[]>([
    // ===== HERO IMAGES =====
    {
      id: 'hero-main',
      url: '',
      category: 'hero',
      name: 'Hauptbanner',
      description: 'Hauptseiten Hero-Bild',
      prompt: `Cinematic wide-angle photograph of a professional German cleaning crew at work,
        team of 4 workers ${WORKER_UNIFORM},
        actively clearing out a cluttered apartment in Germany,
        ${VEHICLE_BRANDING} visible through the window,
        dramatic before/after transformation scene,
        ${BRAND_STYLE}, ${PHOTO_STYLE},
        golden hour sunlight streaming through windows, heroic composition`.replace(/\s+/g, ' ').trim(),
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920'
    },
    {
      id: 'hero-about',
      url: '',
      category: 'hero',
      name: 'Über Uns Banner',
      description: 'About page hero image',
      prompt: `Professional corporate group portrait of the ${COMPANY_NAME} team,
        8 diverse German workers standing proudly ${WORKER_UNIFORM},
        positioned in front of ${VEHICLE_BRANDING},
        German residential neighborhood background with beautiful homes,
        team members smiling confidently with arms crossed or hands on hips,
        ${BRAND_STYLE}, ${PHOTO_STYLE},
        warm afternoon sunlight, professional team photo composition`.replace(/\s+/g, ' ').trim(),
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920'
    },
    {
      id: 'hero-contact',
      url: '',
      category: 'hero',
      name: 'Kontakt Banner',
      description: 'Contact page hero image',
      prompt: `Modern German business office reception area for ${COMPANY_NAME},
        friendly female receptionist ${WORKER_UNIFORM} at sleek white desk,
        golden yellow accent wall behind featuring large illuminated lightning bolt logo,
        digital appointment tablet visible on desk showing calendar,
        ${BRAND_STYLE}, ${PHOTO_STYLE},
        warm welcoming atmosphere, professional interior design`.replace(/\s+/g, ' ').trim(),
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920'
    },

    // ===== SERVICE IMAGES =====
    {
      id: 'service-entruempelung',
      url: '',
      category: 'service',
      name: 'Entrümpelung',
      description: 'Professionelle Entrümpelung',
      prompt: `Dynamic action photograph of professional house clearance in Germany,
        two strong workers ${WORKER_UNIFORM},
        carefully carrying old furniture down apartment stairs,
        ${EQUIPMENT_BRANDING} stacked neatly in hallway,
        ${VEHICLE_BRANDING} visible through open door,
        efficient teamwork in action,
        ${BRAND_STYLE}, ${PHOTO_STYLE}`.replace(/\s+/g, ' ').trim(),
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200'
    },
    {
      id: 'service-hausreinigung',
      url: '',
      category: 'service',
      name: 'Hausreinigung',
      description: 'Professionelle Reinigung',
      prompt: `Pristine modern German kitchen after professional deep cleaning,
        gleaming stainless steel appliances and sparkling countertops,
        one professional cleaner ${WORKER_UNIFORM},
        holding golden yellow branded spray bottle with lightning bolt logo,
        ${EQUIPMENT_BRANDING} visible in cleaning caddy,
        dramatic reflection in polished surfaces showing transformation,
        ${BRAND_STYLE}, ${PHOTO_STYLE},
        bright natural lighting flooding through clean windows`.replace(/\s+/g, ' ').trim(),
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200'
    },
    {
      id: 'service-transporte',
      url: '',
      category: 'service',
      name: 'Transporte',
      description: 'Transport und Umzug',
      prompt: `Professional moving scene on a sunny German residential street,
        ${VEHICLE_BRANDING} with rear doors open,
        two movers ${WORKER_UNIFORM},
        carefully loading wrapped sofa using proper lifting technique,
        ${EQUIPMENT_BRANDING} - golden yellow moving blankets and dollies visible,
        well-organized professional operation,
        ${BRAND_STYLE}, ${PHOTO_STYLE},
        blue sky with soft clouds, afternoon lighting`.replace(/\s+/g, ' ').trim(),
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=1200'
    },
    {
      id: 'service-seniorenumzuege',
      url: '',
      category: 'service',
      name: 'Seniorenumzüge',
      description: 'Seniorenumzüge mit Herz',
      prompt: `Heartwarming scene of senior moving assistance in German home,
        compassionate young mover ${WORKER_UNIFORM},
        gently helping elderly woman (white hair, kind face) wrap photo frames,
        cozy traditional German living room with warm wood furniture,
        ${EQUIPMENT_BRANDING} - golden yellow boxes labeled with hearts and care symbols,
        respectful and patient interaction between generations,
        ${BRAND_STYLE}, ${PHOTO_STYLE},
        soft warm afternoon light, emotional authentic moment`.replace(/\s+/g, ' ').trim(),
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=1200'
    },
    {
      id: 'service-hausmeisterservice',
      url: '',
      category: 'service',
      name: 'Hausmeisterservice',
      description: 'Facility Management',
      prompt: `Professional German facility management inspection scene,
        property manager ${WORKER_UNIFORM},
        inspecting well-maintained apartment building entrance with tablet,
        beautifully manicured garden and clean walkways visible,
        ${VEHICLE_BRANDING} parked in driveway,
        clipboard with checklist featuring golden yellow lightning bolt header,
        ${BRAND_STYLE}, ${PHOTO_STYLE},
        clear sunny day, professional real estate photography style`.replace(/\s+/g, ' ').trim(),
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200'
    },
    {
      id: 'service-tatortreinigung',
      url: '',
      category: 'service',
      name: 'Tatortreinigung',
      description: 'Spezialisierte Reinigung',
      prompt: `Professional specialized cleaning scene in clinical setting,
        biohazard specialist in full white Tyvek protective suit,
        golden yellow ${COMPANY_NAME} badge on chest and golden yellow accents on suit,
        professional-grade cleaning equipment and biohazard containers,
        respectful and discrete atmosphere,
        ${BRAND_STYLE}, ${PHOTO_STYLE},
        clinical lighting, professional and dignified composition`.replace(/\s+/g, ' ').trim(),
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1200'
    },
    {
      id: 'service-messi-entruempelung',
      url: '',
      category: 'service',
      name: 'Messie-Entrümpelung',
      description: 'Diskrete Messie-Hilfe',
      prompt: `Compassionate professional messie apartment clearance scene in Germany,
        empathetic worker ${WORKER_UNIFORM} carefully sorting through items with respect,
        transformation in progress - half of room already cleared and clean,
        ${EQUIPMENT_BRANDING} including heavy-duty cleaning supplies and sorting containers,
        discrete unmarked ${VEHICLE_BRANDING} visible through window for privacy,
        sensitive and non-judgmental atmosphere,
        ${BRAND_STYLE}, ${PHOTO_STYLE},
        soft natural lighting, documentary-style authenticity`.replace(/\s+/g, ' ').trim(),
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200'
    },
    {
      id: 'service-polsterreinigung',
      url: '',
      category: 'service',
      name: 'Polsterreinigung',
      description: 'Professionelle Polsterpflege',
      prompt: `Professional upholstery cleaning service in elegant German living room,
        technician ${WORKER_UNIFORM} using professional extraction cleaning machine,
        beautiful grey fabric sofa being deep cleaned - visible clean vs dirty contrast,
        ${EQUIPMENT_BRANDING} - golden yellow branded cleaning equipment and solutions,
        spray extraction process creating visible foam and steam,
        before/after effect showing dramatic improvement on cushions,
        ${BRAND_STYLE}, ${PHOTO_STYLE},
        bright airy interior, satisfying transformation photography`.replace(/\s+/g, ' ').trim(),
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200'
    },

    // ===== LOCATION IMAGES (NRW Städte) =====
    {
      id: 'location-essen',
      url: '',
      category: 'location',
      name: 'Essen',
      description: 'Standort Essen',
      prompt: `Stunning cityscape photograph of Essen Germany at golden hour,
        iconic Zeche Zollverein UNESCO World Heritage industrial complex in background,
        ${VEHICLE_BRANDING} parked in foreground on cobblestone street,
        worker ${WORKER_UNIFORM} standing next to van waving,
        modern Ruhr metropolis skyline with mix of historic and contemporary architecture,
        ${BRAND_STYLE}, ${PHOTO_STYLE}`.replace(/\s+/g, ' ').trim(),
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1567954970774-58d6aa6c50dc?w=1600'
    },
    {
      id: 'location-duesseldorf',
      url: '',
      category: 'location',
      name: 'Düsseldorf',
      description: 'Standort Düsseldorf',
      prompt: `Elegant Düsseldorf cityscape at blue hour,
        famous Rheinturm tower and modern Medienhafen architecture,
        ${VEHICLE_BRANDING} parked on Rhine riverfront promenade,
        professional team of 3 workers ${WORKER_UNIFORM} unloading equipment,
        beautiful reflection in calm river water,
        ${BRAND_STYLE}, ${PHOTO_STYLE}`.replace(/\s+/g, ' ').trim(),
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1552661397-a504c42f3e4a?w=1600'
    },
    {
      id: 'location-ratingen',
      url: '',
      category: 'location',
      name: 'Ratingen',
      description: 'Standort Ratingen',
      prompt: `Charming historic Ratingen old town scene,
        beautiful half-timbered Fachwerk houses lining cobblestone street,
        ${VEHICLE_BRANDING} carefully parked respecting historic character,
        two workers ${WORKER_UNIFORM} carrying boxes into restored historic building,
        quintessential German small-town charm,
        ${BRAND_STYLE}, ${PHOTO_STYLE}, sunny afternoon`.replace(/\s+/g, ' ').trim(),
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1600'
    },
    {
      id: 'location-wuppertal',
      url: '',
      category: 'location',
      name: 'Wuppertal',
      description: 'Standort Wuppertal',
      prompt: `Dramatic photograph of Wuppertal with iconic Schwebebahn suspension railway,
        historic monorail train passing overhead above the Wupper river,
        ${VEHICLE_BRANDING} driving on street below the elevated track,
        unique German engineering landmark,
        ${BRAND_STYLE}, ${PHOTO_STYLE}, dramatic perspective`.replace(/\s+/g, ' ').trim(),
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600'
    },
    {
      id: 'location-wuelfrath',
      url: '',
      category: 'location',
      name: 'Wülfrath',
      description: 'Standort Wülfrath',
      prompt: `Scenic Wülfrath landscape with famous limestone hills and quarries,
        picturesque small German town nestled in green valley,
        ${VEHICLE_BRANDING} parked at charming family home,
        workers ${WORKER_UNIFORM} greeting friendly homeowners,
        natural beauty of Bergisches Land region,
        ${BRAND_STYLE}, ${PHOTO_STYLE}`.replace(/\s+/g, ' ').trim(),
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600'
    },
    {
      id: 'location-mettmann',
      url: '',
      category: 'location',
      name: 'Mettmann',
      description: 'Standort Mettmann',
      prompt: `Historic Mettmann city center with view toward Neanderthal Museum area,
        charming German town square with traditional architecture,
        ${VEHICLE_BRANDING} parked near historic town hall,
        professional team ${WORKER_UNIFORM} consulting with customer,
        cultural heritage meets modern professional service,
        ${BRAND_STYLE}, ${PHOTO_STYLE}`.replace(/\s+/g, ' ').trim(),
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1600'
    },
    {
      id: 'location-hattingen',
      url: '',
      category: 'location',
      name: 'Hattingen',
      description: 'Standort Hattingen',
      prompt: `Beautiful Hattingen old town with stunning Fachwerk timber-framed houses,
        medieval German architecture perfectly preserved,
        two workers ${WORKER_UNIFORM} carefully navigating narrow historic street,
        ${EQUIPMENT_BRANDING} being transported by hand trolley,
        romantic golden afternoon sunlight,
        ${BRAND_STYLE}, ${PHOTO_STYLE}`.replace(/\s+/g, ' ').trim(),
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600'
    },
    {
      id: 'location-muelheim',
      url: '',
      category: 'location',
      name: 'Mülheim a.d. Ruhr',
      description: 'Standort Mülheim',
      prompt: `Mülheim an der Ruhr cityscape with scenic Ruhr river view,
        historic Schloss Broich castle and modern bridge in background,
        ${VEHICLE_BRANDING} crossing bridge over river,
        industrial heritage transformed into vibrant modern city,
        ${BRAND_STYLE}, ${PHOTO_STYLE}, urban river landscape`.replace(/\s+/g, ' ').trim(),
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1567954970774-58d6aa6c50dc?w=1600'
    },
    {
      id: 'location-krefeld',
      url: '',
      category: 'location',
      name: 'Krefeld',
      description: 'Standort Krefeld',
      prompt: `Elegant Krefeld scene showcasing silk and velvet city heritage,
        beautiful Wilhelminian-era villa with ornate facade,
        ${VEHICLE_BRANDING} parked in driveway of stately home,
        workers ${WORKER_UNIFORM} providing premium service,
        sophisticated urban setting,
        ${BRAND_STYLE}, ${PHOTO_STYLE}`.replace(/\s+/g, ' ').trim(),
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1600'
    },
    {
      id: 'location-solingen',
      url: '',
      category: 'location',
      name: 'Solingen',
      description: 'Standort Solingen',
      prompt: `Solingen cityscape with stunning Müngstener Brücke railway bridge in background,
        Germany highest railway bridge spanning the Wupper valley,
        ${VEHICLE_BRANDING} in foreground symbolizing precision and quality,
        city known for blade craftsmanship and precision work,
        ${BRAND_STYLE}, ${PHOTO_STYLE}, engineering excellence theme`.replace(/\s+/g, ' ').trim(),
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600'
    },

    // ===== GALLERY BEFORE/AFTER =====
    {
      id: 'gallery-wohnung-before',
      url: '',
      category: 'gallery',
      name: 'Wohnung Vorher',
      description: 'Wohnungsauflösung vorher',
      prompt: `Extremely cluttered German apartment living room filled with old furniture, stacked boxes, dusty items everywhere, overwhelming mess, dim lighting, realistic photography of hoarding situation`,
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'
    },
    {
      id: 'gallery-wohnung-after',
      url: '',
      category: 'gallery',
      name: 'Wohnung Nachher',
      description: 'Wohnungsauflösung nachher',
      prompt: `Completely empty pristine German apartment after professional clearance, spotless hardwood floors gleaming, fresh white walls, bright natural sunlight streaming through clean windows, golden yellow "Hoffmann Blitz & Blank" door sign visible, ${BRAND_STYLE}, transformation complete, photorealistic`,
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
    },
    {
      id: 'gallery-keller-before',
      url: '',
      category: 'gallery',
      name: 'Keller Vorher',
      description: 'Kellerentrümpelung vorher',
      prompt: `Dark cluttered German basement cellar packed with years of accumulated junk, old bicycles, boxes, broken furniture, spider webs, chaotic storage nightmare, realistic photography`,
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'
    },
    {
      id: 'gallery-keller-after',
      url: '',
      category: 'gallery',
      name: 'Keller Nachher',
      description: 'Kellerentrümpelung nachher',
      prompt: `Perfectly organized clean German basement with new shelving system, labeled golden yellow storage boxes with lightning bolt logo, swept concrete floor, bright LED lighting, ${BRAND_STYLE}, organized storage solution, photorealistic`,
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'
    },
    {
      id: 'gallery-buero-before',
      url: '',
      category: 'gallery',
      name: 'Büro Vorher',
      description: 'Büroreinigung vorher',
      prompt: `Messy cluttered German office space with papers everywhere, dusty keyboards, coffee stains, disorganized desks, chaotic workplace, realistic office mess photography`,
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'
    },
    {
      id: 'gallery-buero-after',
      url: '',
      category: 'gallery',
      name: 'Büro Nachher',
      description: 'Büroreinigung nachher',
      prompt: `Immaculate modern German office after professional deep cleaning, sparkling glass surfaces, perfectly aligned desks, fresh plants, golden yellow accent chair with lightning bolt cushion, ${BRAND_STYLE}, productive workspace, photorealistic`,
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'
    },

    // ===== ARTICLE IMAGES =====
    {
      id: 'article-checkliste',
      url: '',
      category: 'article',
      name: 'Checkliste Artikel',
      description: 'Haushaltsauflösung Checkliste',
      prompt: `Professional clipboard with golden yellow checkmark checklist for house clearance, branded pen with lightning bolt logo, moving boxes in background, organized planning concept, ${BRAND_STYLE}, flat lay photography style, photorealistic`,
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200'
    },
    {
      id: 'article-keller',
      url: '',
      category: 'article',
      name: 'Keller Tipps Artikel',
      description: 'Keller entrümpeln Tipps',
      prompt: `Split image concept showing basement transformation, left side cluttered mess, right side organized with golden yellow labeled storage system featuring lightning bolt logo, ${BRAND_STYLE}, before after comparison, infographic style, photorealistic`,
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200'
    },
    {
      id: 'article-umwelt',
      url: '',
      category: 'article',
      name: 'Umwelt Artikel',
      description: 'Umweltgerechte Entsorgung',
      prompt: `Eco-friendly waste sorting station with color-coded recycling bins, green environment background, golden yellow "Hoffmann Blitz & Blank" branded recycling truck, sustainability concept, ${BRAND_STYLE}, environmental responsibility theme, photorealistic`,
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200'
    },

    // ===== BRANDING IMAGES =====
    {
      id: 'branding-team',
      url: '',
      category: 'branding',
      name: 'Team Foto',
      description: 'Unser Team',
      prompt: `Professional team portrait of 12 diverse cleaning service workers in matching golden yellow and navy uniforms with lightning bolt logo badges, standing proudly in front of golden yellow company vehicles, German industrial background, ${BRAND_STYLE}, corporate team photo, warm professional lighting, photorealistic`,
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200'
    },
    {
      id: 'branding-truck',
      url: '',
      category: 'branding',
      name: 'Firmenfahrzeug',
      description: 'Gebrandetes Fahrzeug',
      prompt: `Side view of golden yellow and white Mercedes Sprinter van with bold "Hoffmann Blitz & Blank" branding, large lightning bolt logo on side, professional vehicle wrap design, parked on German street, ${BRAND_STYLE}, commercial vehicle photography, photorealistic`,
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=1200'
    },
    {
      id: 'branding-equipment',
      url: '',
      category: 'branding',
      name: 'Ausrüstung',
      description: 'Professionelle Ausrüstung',
      prompt: `Array of professional cleaning equipment and tools neatly arranged, golden yellow branded spray bottles, vacuum cleaners, protective gear all featuring lightning bolt logo, ${BRAND_STYLE}, product photography style, clean white background, photorealistic`,
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200'
    },
    {
      id: 'branding-office',
      url: '',
      category: 'branding',
      name: 'Büro',
      description: 'Unser Büro',
      prompt: `Modern German company office reception with golden yellow accent wall featuring large lightning bolt logo, friendly receptionist in branded uniform, clean professional interior design, ${BRAND_STYLE}, corporate office photography, photorealistic`,
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200'
    },
    {
      id: 'branding-certificate',
      url: '',
      category: 'branding',
      name: 'Zertifikate',
      description: 'Qualitätszertifikate',
      prompt: `Professional quality certificates and awards displayed on golden yellow wall, framed ISO certifications, customer satisfaction badges with lightning bolt seal, ${BRAND_STYLE}, achievement display, photorealistic`,
      generated: false,
      fallbackUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200'
    }
  ]);

  // Generation progress tracking
  generationProgress = signal<{ current: number; total: number; currentName: string }>({
    current: 0,
    total: 0,
    currentName: ''
  });

  isGenerating = signal(false);

  constructor(private falAiService: FalAiService) {
    this.loadFromStorage();
  }

  /**
   * Check if we're in browser environment
   */
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  /**
   * Load generated images from localStorage
   */
  private loadFromStorage(): void {
    if (!this.isBrowser()) {
      return;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const savedImages: { [id: string]: string } = JSON.parse(stored);
        const assets = this.imageAssets();
        const updatedAssets = assets.map(asset => {
          if (savedImages[asset.id]) {
            return { ...asset, url: savedImages[asset.id], generated: true };
          }
          return asset;
        });
        this.imageAssets.set(updatedAssets);
        console.log(`✅ Loaded ${Object.keys(savedImages).length} generated images from storage`);
      } else {
        console.log('ℹ️ No saved images found in localStorage');
      }
    } catch (error) {
      console.error('❌ Error loading images from storage:', error);
    }
  }

  /**
   * Save generated images to localStorage
   */
  private saveToStorage(): void {
    if (!this.isBrowser()) {
      return;
    }

    try {
      const assets = this.imageAssets();
      const generatedImages: { [id: string]: string } = {};
      assets.forEach(asset => {
        if (asset.generated && asset.url) {
          generatedImages[asset.id] = asset.url;
        }
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(generatedImages));
      console.log(`💾 Saved ${Object.keys(generatedImages).length} images to storage`);
    } catch (error) {
      console.error('❌ Error saving images to storage:', error);
    }
  }

  /**
   * Generate a single image by ID
   */
  async generateImageById(id: string): Promise<string | null> {
    const assets = this.imageAssets();
    const asset = assets.find(a => a.id === id);

    if (!asset) {
      console.error(`Image asset with id "${id}" not found`);
      return null;
    }

    this.isGenerating.set(true);

    try {
      const url = await this.falAiService.generateImage({
        prompt: asset.prompt,
        width: asset.category === 'hero' ? 1920 : asset.category === 'location' ? 1600 : 1200,
        height: asset.category === 'hero' ? 1080 : asset.category === 'location' ? 900 : 800,
        numInferenceSteps: 4
      });

      if (url) {
        // Update the asset with the generated URL
        const updatedAssets = assets.map(a =>
          a.id === id ? { ...a, url, generated: true } : a
        );
        this.imageAssets.set(updatedAssets);
        this.saveToStorage(); // Persist to localStorage
        return url;
      }

      return asset.fallbackUrl;
    } catch (error) {
      console.error(`Error generating image for "${id}":`, error);
      return asset.fallbackUrl;
    } finally {
      this.isGenerating.set(false);
    }
  }

  /**
   * Generate all images in a category
   */
  async generateCategoryImages(category: ImageAsset['category']): Promise<void> {
    const assets = this.imageAssets().filter(a => a.category === category && !a.generated);

    this.generationProgress.set({
      current: 0,
      total: assets.length,
      currentName: ''
    });
    this.isGenerating.set(true);

    for (let i = 0; i < assets.length; i++) {
      this.generationProgress.set({
        current: i + 1,
        total: assets.length,
        currentName: assets[i].name
      });

      await this.generateImageById(assets[i].id);

      // Small delay between requests to avoid rate limiting
      if (i < assets.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    this.isGenerating.set(false);
  }

  /**
   * Generate all images
   */
  async generateAllImages(): Promise<void> {
    const assets = this.imageAssets().filter(a => !a.generated);

    this.generationProgress.set({
      current: 0,
      total: assets.length,
      currentName: ''
    });
    this.isGenerating.set(true);

    for (let i = 0; i < assets.length; i++) {
      this.generationProgress.set({
        current: i + 1,
        total: assets.length,
        currentName: assets[i].name
      });

      await this.generateImageById(assets[i].id);

      // Small delay between requests
      if (i < assets.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    }

    this.isGenerating.set(false);
  }

  /**
   * Get image URL by ID (returns generated or fallback)
   */
  getImageUrl(id: string): string {
    const asset = this.imageAssets().find(a => a.id === id);
    return asset?.url || asset?.fallbackUrl || '';
  }

  /**
   * Get all images in a category
   */
  getImagesByCategory(category: ImageAsset['category']): ImageAsset[] {
    return this.imageAssets().filter(a => a.category === category);
  }

  /**
   * Get service image by slug
   * Note: Some slugs in content.service.ts have unusual formatting
   */
  getServiceImage(slug: string): string {
    const idMap: { [key: string]: string } = {
      // Standard mappings
      'entruempelung': 'service-entruempelung',
      'haushaltsaufloesung': 'service-entruempelung', // Uses same image
      'wohnungsaufloesung': 'service-entruempelung', // Uses same image
      'hausreinigung': 'service-hausreinigung',
      'transporte': 'service-transporte',
      'seniorenumzuege': 'service-seniorenumzuege',
      'hausmeisterservice': 'service-hausmeisterservice',
      'tatortreinigung': 'service-tatortreinigung',
      'messi-entruempelung': 'service-messi-entruempelung',
      'messie-wohnung-entruempelung-reinigung': 'service-messi-entruempelung',
      'polsterreinigung': 'service-polsterreinigung',
      'professionelle-polsterreinigung-sofa-matratze': 'service-polsterreinigung',
      // Legacy/alternate slug formats from content.service.ts
      'entruempelu-g': 'service-entruempelung'
    };
    return this.getImageUrl(idMap[slug] || 'service-entruempelung');
  }

  /**
   * Get location image by slug
   */
  getLocationImage(slug: string): string {
    const idMap: { [key: string]: string } = {
      // Standard slugs
      'essen': 'location-essen',
      'duesseldorf': 'location-duesseldorf',
      'dusseldorf': 'location-duesseldorf', // Alternative spelling without umlaut
      'ratingen': 'location-ratingen',
      'wuppertal': 'location-wuppertal',
      'wuelfrath': 'location-wuelfrath',
      'wulfrath': 'location-wuelfrath', // Alternative spelling without umlaut
      'mettmann': 'location-mettmann',
      'hattingen': 'location-hattingen',
      'muelheim-ruhr': 'location-muelheim',
      'muelheim-a-d-ruhr': 'location-muelheim', // Route slug format
      'krefeld': 'location-krefeld',
      'solingen': 'location-solingen',
      // New locations added to content.service.ts
      'velbert': 'location-wuelfrath', // Uses similar region image
      'hilden': 'location-duesseldorf', // Near Düsseldorf
      'monheim': 'location-duesseldorf', // Near Düsseldorf
      'remscheid': 'location-solingen' // Near Solingen in Bergisches Land
    };
    return this.getImageUrl(idMap[slug] || 'location-essen');
  }

  /**
   * Get gallery images as pairs
   */
  getGalleryPairs(): { before: ImageAsset; after: ImageAsset; title: string }[] {
    const gallery = this.imageAssets().filter(a => a.category === 'gallery');
    return [
      {
        before: gallery.find(a => a.id === 'gallery-wohnung-before')!,
        after: gallery.find(a => a.id === 'gallery-wohnung-after')!,
        title: 'Wohnungsauflösung'
      },
      {
        before: gallery.find(a => a.id === 'gallery-keller-before')!,
        after: gallery.find(a => a.id === 'gallery-keller-after')!,
        title: 'Kellerentrümpelung'
      },
      {
        before: gallery.find(a => a.id === 'gallery-buero-before')!,
        after: gallery.find(a => a.id === 'gallery-buero-after')!,
        title: 'Büroreinigung'
      }
    ];
  }

  /**
   * Manually set an image URL (for importing externally generated images)
   */
  setImageUrl(id: string, url: string): void {
    const assets = this.imageAssets();
    const updatedAssets = assets.map(a =>
      a.id === id ? { ...a, url, generated: true } : a
    );
    this.imageAssets.set(updatedAssets);
    this.saveToStorage();
  }

  /**
   * Clear all generated images from storage
   */
  clearAllGenerated(): void {
    const assets = this.imageAssets();
    const resetAssets = assets.map(a => ({ ...a, url: '', generated: false }));
    this.imageAssets.set(resetAssets);
    localStorage.removeItem(STORAGE_KEY);
  }

  /**
   * Export all generated image URLs for backup
   */
  exportGeneratedUrls(): { [id: string]: string } {
    const result: { [id: string]: string } = {};
    this.imageAssets().forEach(asset => {
      if (asset.generated && asset.url) {
        result[asset.id] = asset.url;
      }
    });
    return result;
  }

  /**
   * Import image URLs from backup
   */
  importImageUrls(urls: { [id: string]: string }): void {
    const assets = this.imageAssets();
    const updatedAssets = assets.map(asset => {
      if (urls[asset.id]) {
        return { ...asset, url: urls[asset.id], generated: true };
      }
      return asset;
    });
    this.imageAssets.set(updatedAssets);
    this.saveToStorage();
  }
}
