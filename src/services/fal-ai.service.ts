import { Injectable, signal } from '@angular/core';

export interface GeneratedImage {
  url: string;
  prompt: string;
  width: number;
  height: number;
  timestamp: Date;
}

export interface FalAiConfig {
  prompt: string;
  negativePrompt?: string;
  width?: number;
  height?: number;
  numInferenceSteps?: number;
  guidanceScale?: number;
  seed?: number;
  aspectRatio?: string;
  referenceImageUrl?: string;  // For logo/brand reference
  referenceStrength?: number;
}

// Company logo URL for brand integration
const COMPANY_LOGO_URL = 'https://hoffmannblitz-blank.de/wp-content/uploads/2021/09/new-logo-update-1.png';

@Injectable({ providedIn: 'root' })
export class FalAiService {
  private readonly FAL_API_KEY = 'dff37094-c457-4e25-9c72-739ea521fa89:f4376ce9e9a4fc913e574e55ae93960b';

  // Using SeedDream v4.5 by ByteDance - excellent for branded imagery and logos
  private readonly FAL_API_URL = 'https://fal.run/fal-ai/bytedance/seedream/v4.5/text-to-image';

  // Signal for loading state
  isGenerating = signal(false);

  // Signal for generated images cache
  generatedImages = signal<Map<string, GeneratedImage>>(new Map());

  // Error state
  error = signal<string | null>(null);

  // Company logo for reference
  readonly companyLogoUrl = COMPANY_LOGO_URL;

  /**
   * Generate an image using Fal AI FLUX Pro 1.1 Ultra model
   * This model produces the highest quality photorealistic images
   */
  async generateImage(config: FalAiConfig): Promise<string | null> {
    this.isGenerating.set(true);
    this.error.set(null);

    try {
      // Build request body for SeedDream v4.5 by ByteDance
      const requestBody: Record<string, unknown> = {
        prompt: config.prompt,
        num_images: 1,
        enable_safety_checker: true,
        output_format: 'jpeg'
      };

      // Handle image size - SeedDream uses image_size with specific dimensions
      if (config.width && config.height) {
        requestBody.image_size = {
          width: config.width,
          height: config.height
        };
      } else if (config.aspectRatio) {
        // Map aspect ratio to dimensions
        const aspectMap: Record<string, { width: number; height: number }> = {
          '21:9': { width: 1920, height: 820 },
          '16:9': { width: 1920, height: 1080 },
          '4:3': { width: 1600, height: 1200 },
          '1:1': { width: 1024, height: 1024 },
          '3:4': { width: 1200, height: 1600 },
          '9:16': { width: 1080, height: 1920 }
        };
        requestBody.image_size = aspectMap[config.aspectRatio] || { width: 1920, height: 1080 };
      } else {
        // Default to 16:9 landscape
        requestBody.image_size = { width: 1920, height: 1080 };
      }

      // Add guidance scale if specified
      if (config.guidanceScale) {
        requestBody.guidance_scale = config.guidanceScale;
      }

      // Add negative prompt if specified
      if (config.negativePrompt) {
        requestBody.negative_prompt = config.negativePrompt;
      }

      const response = await fetch(this.FAL_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Key ${this.FAL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Fal AI API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      if (data.images && data.images.length > 0) {
        const imageUrl = data.images[0].url;

        // Cache the result
        const cache = new Map(this.generatedImages());
        cache.set(config.prompt, {
          url: imageUrl,
          prompt: config.prompt,
          width: config.width || 1024,
          height: config.height || 1024,
          timestamp: new Date()
        });
        this.generatedImages.set(cache);

        return imageUrl;
      }

      return null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error generating image';
      this.error.set(errorMessage);
      console.error('Fal AI Error:', err);
      return null;
    } finally {
      this.isGenerating.set(false);
    }
  }

  /**
   * Generate service-specific images
   */
  async generateServiceImage(serviceName: string): Promise<string | null> {
    const prompts: { [key: string]: string } = {
      'Entrümpelung': 'Professional house clearance service, clean empty room after decluttering, modern German apartment, before after transformation, photorealistic, bright natural lighting, wide angle shot',
      'Hausreinigung': 'Professional cleaning service team, sparkling clean modern kitchen, German home interior, cleaning equipment, photorealistic, bright and fresh atmosphere',
      'Transporte': 'Professional moving service, white moving truck, German residential street, movers carrying furniture, photorealistic, daylight, organized and efficient',
      'Seniorenumzüge': 'Caring movers helping elderly couple, gentle and respectful atmosphere, German home, warm lighting, photorealistic, compassionate service',
      'Hausmeisterservice': 'Professional facility management, well-maintained German apartment building exterior, clean garden and entrance, photorealistic, sunny day',
      'Tatortreinigung': 'Professional biohazard cleaning team in protective gear, specialized cleaning equipment, clinical and professional atmosphere, photorealistic'
    };

    const prompt = prompts[serviceName] || `Professional ${serviceName} service, German business, photorealistic, high quality`;

    return this.generateImage({
      prompt,
      width: 1200,
      height: 800,
      numInferenceSteps: 4
    });
  }

  /**
   * Generate location-specific hero images
   */
  async generateLocationImage(cityName: string): Promise<string | null> {
    const prompt = `Beautiful cityscape of ${cityName}, Germany, modern urban architecture, professional service area, photorealistic, golden hour lighting, wide angle panoramic view`;

    return this.generateImage({
      prompt,
      width: 1600,
      height: 900,
      numInferenceSteps: 4
    });
  }

  /**
   * Generate before/after gallery images
   */
  async generateBeforeAfterImages(projectType: string): Promise<{ before: string | null; after: string | null }> {
    const beforePrompt = `Cluttered messy ${projectType}, full of old items and junk, disorganized German home interior, realistic photography`;
    const afterPrompt = `Clean empty ${projectType} after professional clearance, spotless floors, bright and spacious, German home interior, realistic photography`;

    const [before, after] = await Promise.all([
      this.generateImage({ prompt: beforePrompt, width: 800, height: 600 }),
      this.generateImage({ prompt: afterPrompt, width: 800, height: 600 })
    ]);

    return { before, after };
  }

  /**
   * Generate hero section background
   */
  async generateHeroBackground(): Promise<string | null> {
    return this.generateImage({
      prompt: 'Professional cleaning and clearance service, modern German living space, before after transformation concept, clean bright interior, photorealistic, wide angle, dramatic lighting',
      width: 1920,
      height: 1080,
      numInferenceSteps: 4
    });
  }

  /**
   * Generate team/about us image
   */
  async generateTeamImage(): Promise<string | null> {
    return this.generateImage({
      prompt: 'Professional cleaning service team, diverse group of workers in uniform, German business, friendly and professional atmosphere, photorealistic, natural lighting, group portrait',
      width: 1200,
      height: 800,
      numInferenceSteps: 4
    });
  }

  /**
   * Generate blog article featured images
   */
  async generateArticleImage(topic: string): Promise<string | null> {
    const topicPrompts: { [key: string]: string } = {
      'haushaltsaufloesung': 'House clearance checklist concept, organized moving boxes with labels, German home interior, photorealistic, bright and organized atmosphere',
      'keller-entruempeln': 'Organized basement storage after decluttering, labeled storage boxes on shelves, clean German cellar, photorealistic, good lighting',
      'umweltgerechte-entsorgung': 'Eco-friendly waste disposal, recycling containers, green environment concept, sustainable waste management, photorealistic'
    };

    const prompt = topicPrompts[topic] || `Professional ${topic} concept image, German business context, photorealistic, high quality`;

    return this.generateImage({
      prompt,
      width: 1200,
      height: 630,
      numInferenceSteps: 4
    });
  }

  /**
   * Check if an image is cached
   */
  getCachedImage(prompt: string): GeneratedImage | undefined {
    return this.generatedImages().get(prompt);
  }

  /**
   * Clear the image cache
   */
  clearCache(): void {
    this.generatedImages.set(new Map());
  }
}
