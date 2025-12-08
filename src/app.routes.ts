
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServiceDetailComponent } from './pages/service-detail/service-detail.component';
import { LocationDetailComponent } from './pages/location-detail/location-detail.component';
import { ServiceLocationComponent } from './pages/service-location/service-location.component';
import { ImpressumComponent } from './pages/impressum/impressum.component';
import { DatenschutzComponent } from './pages/datenschutz/datenschutz.component';
import { StandorteComponent } from './pages/standorte/standorte.component';
import { DienstleistungenComponent } from './pages/dienstleistungen/dienstleistungen.component';
import { UeberUnsComponent } from './pages/ueber-uns/ueber-uns.component';
import { RatgeberComponent } from './pages/ratgeber/ratgeber.component';
import { RatgeberDetailComponent } from './pages/ratgeber-detail/ratgeber-detail.component';
import { AdminImagesComponent } from './pages/admin-images/admin-images.component';
import { GalerieComponent } from './pages/galerie/galerie.component';


export const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent, title: 'Hoffmann Blitz & Blank | Startseite' },

  // === HAUPTSEITEN (page-sitemap.xml) ===
  { path: 'leistungen', component: DienstleistungenComponent, title: 'Unsere Dienstleistungen' },
  { path: 'ueber-uns', component: UeberUnsComponent, title: 'Über Uns | Hoffmann Blitz & Blank' },
  { path: 'datenschutz', component: DatenschutzComponent, title: 'Datenschutz | Hoffmann Blitz & Blank' },
  { path: 'kontakt', component: UeberUnsComponent, title: 'Kontakt | Hoffmann Blitz & Blank' },
  { path: 'impressum', component: ImpressumComponent, title: 'Impressum | Hoffmann Blitz & Blank' },

  // === ALTE LOCATION SEITEN (page-sitemap.xml - Redirects zu Standorten) ===
  { path: 'wuppertal-haushaltsaufloesung-wohnungsaufloesung-entruempelung', component: LocationDetailComponent, data: { slug: 'wuppertal' } },
  { path: 'entruempelung-entsorgung-hilden-entruempeln-inkl-entsorgung', component: LocationDetailComponent, data: { slug: 'hilden' } },
  { path: 'mettmann-entruempelung-haushaltsaufloesung-wohnungsaufloesung', component: LocationDetailComponent, data: { slug: 'mettmann' } },
  { path: 'monheim-entruempelung', component: LocationDetailComponent, data: { slug: 'monheim' } },
  { path: 'remscheid-entruempelung-haushaltsaufloesung-wohnungsaufloesung', component: LocationDetailComponent, data: { slug: 'remscheid' } },
  { path: 'solingen-entruempelung-haushaltsaufloesung-wohnungsaufloesung', component: LocationDetailComponent, data: { slug: 'solingen' } },
  { path: 'velbert-entruempelung-haushaltsaufloesung-wohnungsaufloesung', component: LocationDetailComponent, data: { slug: 'velbert' } },
  { path: 'ratingen-entruempelung-haushaltsaufloesung-wohnungsaufloesung', component: LocationDetailComponent, data: { slug: 'ratingen' } },
  { path: 'wuppertal-entruempelung', component: LocationDetailComponent, data: { slug: 'wuppertal' } },
  { path: 'hattingen-wohnungsaufloesung', component: LocationDetailComponent, data: { slug: 'hattingen' } },
  { path: 'mettmann-entrumpelung', component: LocationDetailComponent, data: { slug: 'mettmann' } },
  { path: 'wulfrath-entrumpelung', component: LocationDetailComponent, data: { slug: 'wulfrath' } },
  { path: 'entruempelung-essen-festpreis-guenstig', component: LocationDetailComponent, data: { slug: 'essen' } },
  { path: 'muelheim-an-der-ruhr-entrumpelung', component: LocationDetailComponent, data: { slug: 'muelheim-a-d-ruhr' } },
  { path: 'krefeld-entrumpelung', component: LocationDetailComponent, data: { slug: 'krefeld' } },
  { path: 'solingen-entrumpelung', component: LocationDetailComponent, data: { slug: 'solingen' } },
  { path: 'dusseldorf-entrumpelung', component: LocationDetailComponent, data: { slug: 'dusseldorf' } },

  // === SERVICES ÜBERSICHT (post-sitemap.xml) ===
  { path: 'services', component: DienstleistungenComponent, title: 'Unsere Dienstleistungen' },
  { path: 'dienstleistungen', component: DienstleistungenComponent, title: 'Unsere Dienstleistungen' },

  // === DIREKTE SERVICE-URLs (post-sitemap.xml) ===
  { path: 'entruempelung', component: ServiceDetailComponent, data: { slug: 'entruempelung' } },
  { path: 'haushaltsaufloesung', component: ServiceDetailComponent, data: { slug: 'haushaltsaufloesung' } },
  { path: 'wohnungsaufloesung', component: ServiceDetailComponent, data: { slug: 'wohnungsaufloesung' } },
  { path: 'hausreinigung', component: ServiceDetailComponent, data: { slug: 'hausreinigung' } },
  { path: 'transporte', component: ServiceDetailComponent, data: { slug: 'transporte' } },
  { path: 'seniorenumzuege', component: ServiceDetailComponent, data: { slug: 'seniorenumzuege' } },
  { path: 'hausmeisterservice', component: ServiceDetailComponent, data: { slug: 'hausmeisterservice' } },
  { path: 'tatortreinigung', component: ServiceDetailComponent, data: { slug: 'tatortreinigung' } },

  // === SERVICE-IN-LOCATION URLs (post-sitemap.xml) ===
  // Entrümpelung
  { path: 'entruempelung-in-essen', component: ServiceLocationComponent, data: { serviceSlug: 'entruempelung', locationSlug: 'essen' } },
  { path: 'entruempelung-in-ratingen', component: ServiceLocationComponent, data: { serviceSlug: 'entruempelung', locationSlug: 'ratingen' } },
  { path: 'entruempelung-in-wuppertal', component: ServiceLocationComponent, data: { serviceSlug: 'entruempelung', locationSlug: 'wuppertal' } },
  { path: 'entruempelung-in-velbert', component: ServiceLocationComponent, data: { serviceSlug: 'entruempelung', locationSlug: 'velbert' } },
  { path: 'entruempelung-in-mettmann', component: ServiceLocationComponent, data: { serviceSlug: 'entruempelung', locationSlug: 'mettmann' } },
  { path: 'entruempelung-in-mettmann-2', component: ServiceLocationComponent, data: { serviceSlug: 'entruempelung', locationSlug: 'mettmann' } },
  { path: 'entruempelung-in-muelheim-a-d-ruhr', component: ServiceLocationComponent, data: { serviceSlug: 'entruempelung', locationSlug: 'muelheim-a-d-ruhr' } },

  // Wohnungsauflösung
  { path: 'wohnungsaufloesung-in-essen', component: ServiceLocationComponent, data: { serviceSlug: 'wohnungsaufloesung', locationSlug: 'essen' } },
  { path: 'wohnungsaufloesung-in-ratingen', component: ServiceLocationComponent, data: { serviceSlug: 'wohnungsaufloesung', locationSlug: 'ratingen' } },
  { path: 'wohnungsaufloesung-in-wuppertal', component: ServiceLocationComponent, data: { serviceSlug: 'wohnungsaufloesung', locationSlug: 'wuppertal' } },
  { path: 'wohnungsaufloesung-in-velbert', component: ServiceLocationComponent, data: { serviceSlug: 'wohnungsaufloesung', locationSlug: 'velbert' } },
  { path: 'wohnungsaufloesung-in-mettmann', component: ServiceLocationComponent, data: { serviceSlug: 'wohnungsaufloesung', locationSlug: 'mettmann' } },
  { path: 'wohnungsaufloesung-in-muelheim-a-d-ruhr', component: ServiceLocationComponent, data: { serviceSlug: 'wohnungsaufloesung', locationSlug: 'muelheim-a-d-ruhr' } },

  // Haushaltsauflösung
  { path: 'haushaltsaufloesung-in-essen', component: ServiceLocationComponent, data: { serviceSlug: 'haushaltsaufloesung', locationSlug: 'essen' } },
  { path: 'haushaltsaufloesung-in-ratingen', component: ServiceLocationComponent, data: { serviceSlug: 'haushaltsaufloesung', locationSlug: 'ratingen' } },
  { path: 'haushaltsaufloesung-in-wuppertal', component: ServiceLocationComponent, data: { serviceSlug: 'haushaltsaufloesung', locationSlug: 'wuppertal' } },
  { path: 'haushaltsaufloesung-in-velbert', component: ServiceLocationComponent, data: { serviceSlug: 'haushaltsaufloesung', locationSlug: 'velbert' } },
  { path: 'haushaltsaufloesung-in-mettmann', component: ServiceLocationComponent, data: { serviceSlug: 'haushaltsaufloesung', locationSlug: 'mettmann' } },
  { path: 'haushaltsaufloesung-in-muelheim-a-d-ruhr', component: ServiceLocationComponent, data: { serviceSlug: 'haushaltsaufloesung', locationSlug: 'muelheim-a-d-ruhr' } },

  // Hausreinigung
  { path: 'hausreinigung-in-essen', component: ServiceLocationComponent, data: { serviceSlug: 'hausreinigung', locationSlug: 'essen' } },
  { path: 'hausreinigung-in-ratingen', component: ServiceLocationComponent, data: { serviceSlug: 'hausreinigung', locationSlug: 'ratingen' } },
  { path: 'hausreinigung-in-wuppertal', component: ServiceLocationComponent, data: { serviceSlug: 'hausreinigung', locationSlug: 'wuppertal' } },
  { path: 'hausreinigung-in-velbert', component: ServiceLocationComponent, data: { serviceSlug: 'hausreinigung', locationSlug: 'velbert' } },
  { path: 'hausreinigung-in-mettmann', component: ServiceLocationComponent, data: { serviceSlug: 'hausreinigung', locationSlug: 'mettmann' } },
  { path: 'hausreinigung-in-muelheim-a-d-ruhr', component: ServiceLocationComponent, data: { serviceSlug: 'hausreinigung', locationSlug: 'muelheim-a-d-ruhr' } },

  // Hausmeisterservice
  { path: 'hausmeisterservice-in-essen', component: ServiceLocationComponent, data: { serviceSlug: 'hausmeisterservice', locationSlug: 'essen' } },
  { path: 'hausmeisterservice-in-ratingen', component: ServiceLocationComponent, data: { serviceSlug: 'hausmeisterservice', locationSlug: 'ratingen' } },
  { path: 'hausmeisterservice-in-wuppertal', component: ServiceLocationComponent, data: { serviceSlug: 'hausmeisterservice', locationSlug: 'wuppertal' } },
  { path: 'hausmeisterservice-in-velbert', component: ServiceLocationComponent, data: { serviceSlug: 'hausmeisterservice', locationSlug: 'velbert' } },
  { path: 'hausmeisterservice-in-mettmann', component: ServiceLocationComponent, data: { serviceSlug: 'hausmeisterservice', locationSlug: 'mettmann' } },
  { path: 'hausmeisterservice-in-muelheim-a-d-ruhr', component: ServiceLocationComponent, data: { serviceSlug: 'hausmeisterservice', locationSlug: 'muelheim-a-d-ruhr' } },

  // Seniorenumzüge
  { path: 'seniorenumzuege-in-essen', component: ServiceLocationComponent, data: { serviceSlug: 'seniorenumzuege', locationSlug: 'essen' } },
  { path: 'seniorenumzuege-in-ratingen', component: ServiceLocationComponent, data: { serviceSlug: 'seniorenumzuege', locationSlug: 'ratingen' } },
  { path: 'seniorenumzuege-in-wuppertal', component: ServiceLocationComponent, data: { serviceSlug: 'seniorenumzuege', locationSlug: 'wuppertal' } },
  { path: 'seniorenumzuege-in-velbert', component: ServiceLocationComponent, data: { serviceSlug: 'seniorenumzuege', locationSlug: 'velbert' } },
  { path: 'seniorenumzuege-in-mettmann', component: ServiceLocationComponent, data: { serviceSlug: 'seniorenumzuege', locationSlug: 'mettmann' } },
  { path: 'seniorenumzuege-in-muelheim-a-d-ruhr', component: ServiceLocationComponent, data: { serviceSlug: 'seniorenumzuege', locationSlug: 'muelheim-a-d-ruhr' } },

  // Tatortreinigung
  { path: 'tatortreinigung-in-essen', component: ServiceLocationComponent, data: { serviceSlug: 'tatortreinigung', locationSlug: 'essen' } },
  { path: 'tatortreinigung-in-ratingen', component: ServiceLocationComponent, data: { serviceSlug: 'tatortreinigung', locationSlug: 'ratingen' } },
  { path: 'tatortreinigung-in-wuppertal', component: ServiceLocationComponent, data: { serviceSlug: 'tatortreinigung', locationSlug: 'wuppertal' } },
  { path: 'tatortreinigung-in-velbert', component: ServiceLocationComponent, data: { serviceSlug: 'tatortreinigung', locationSlug: 'velbert' } },
  { path: 'tatortreinigung-in-mettmann', component: ServiceLocationComponent, data: { serviceSlug: 'tatortreinigung', locationSlug: 'mettmann' } },
  { path: 'tatortreinigung-in-muelheim-a-d-ruhr', component: ServiceLocationComponent, data: { serviceSlug: 'tatortreinigung', locationSlug: 'muelheim-a-d-ruhr' } },

  // Transporte
  { path: 'transporte-in-essen', component: ServiceLocationComponent, data: { serviceSlug: 'transporte', locationSlug: 'essen' } },
  { path: 'transporte-in-ratingen', component: ServiceLocationComponent, data: { serviceSlug: 'transporte', locationSlug: 'ratingen' } },
  { path: 'transporte-in-wuppertal', component: ServiceLocationComponent, data: { serviceSlug: 'transporte', locationSlug: 'wuppertal' } },
  { path: 'transporte-in-velbert', component: ServiceLocationComponent, data: { serviceSlug: 'transporte', locationSlug: 'velbert' } },
  { path: 'transporte-in-mettmann', component: ServiceLocationComponent, data: { serviceSlug: 'transporte', locationSlug: 'mettmann' } },
  { path: 'transporte-in-muelheim-a-d-ruhr', component: ServiceLocationComponent, data: { serviceSlug: 'transporte', locationSlug: 'muelheim-a-d-ruhr' } },

  // === STANDORTE (NEU) ===
  { path: 'standorte', component: StandorteComponent, title: 'Unsere Standorte' },
  { path: 'standort/:slug', component: LocationDetailComponent },

  // === NEUE SERVICE-DETAIL ROUTE ===
  { path: 'dienstleistung/:slug', component: ServiceDetailComponent },

  // === SONSTIGE SEITEN ===
  { path: 'ratgeber', component: RatgeberComponent, title: 'Ratgeber | Hoffmann Blitz & Blank' },
  { path: 'ratgeber/:slug', component: RatgeberDetailComponent },
  { path: 'galerie', component: GalerieComponent, title: 'Galerie | Hoffmann Blitz & Blank' },
  { path: 'admin/images', component: AdminImagesComponent, title: 'Bild-Generator | Admin' },

  // === FALLBACK ===
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
