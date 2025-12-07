import { Injectable, signal, inject } from '@angular/core';
import { ImageGeneratorService } from './image-generator.service';

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
}

export interface Location {
  slug: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  legacyUrl?: string; // Old WordPress URL for SEO compatibility
}

export interface Testimonial {
  name: string;
  role: string;
  comment: string;
}

export interface Article {
  slug: string;
  title: string;
  author: string;
  date: string;
  summary: string;
  content: string;
  imageUrl: string;
}

export interface GalleryItem {
  beforeImageUrl: string;
  afterImageUrl: string;
  title: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class ContentService {
  private imageService = inject(ImageGeneratorService);

  private readonly services: Service[] = [
    {
      slug: 'entruempelung',
      title: 'Entrümpelung',
      shortDescription: 'Wir übernehmen für Sie Entrümpelungen aller Art. Ob private oder gewerbliche Räume, Häuser, Wohnungen und Firmenhallen.',
      longDescription: 'Egal ob Geschäftsaufgabe, Auswanderung, Zwangsräumung, Todesfall oder Umzug ins Seniorenheim – es gibt verschiedene Gründe für Haushaltsauflösungen oder Wohnungsauflösungen. Unsere erfahrenen Mitarbeiter gehen bei Haushaltsauflösungen stets fachmännisch, gründlich und diskret vor und erledigen alle Aufgaben zu Ihrer vollsten Zufriedenheit. Wir bieten Ihnen flexible Leistungen zu fairen Konditionen.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>`
    },
    {
      slug: 'haushaltsaufloesung',
      title: 'Haushaltsauflösung',
      shortDescription: 'Komplette Haushaltsauflösungen mit Entrümpelung, Entsorgung und besenreiner Übergabe.',
      longDescription: 'Eine Haushaltsauflösung ist oft mit emotionalen Herausforderungen verbunden. Ob nach einem Todesfall, bei Umzug ins Pflegeheim oder aus anderen Gründen – wir übernehmen die komplette Auflösung Ihres Haushalts. Von der Sichtung und Sortierung über die fachgerechte Entsorgung bis zur besenreinen Übergabe. Wertgegenstände werden auf Wunsch geschätzt und können vermittelt werden. Wir arbeiten diskret, respektvoll und zuverlässig.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>`
    },
    {
      slug: 'wohnungsaufloesung',
      title: 'Wohnungsauflösung',
      shortDescription: 'Professionelle Wohnungsauflösungen mit Festpreisgarantie und termingerechter Durchführung.',
      longDescription: 'Bei einer Wohnungsauflösung kümmern wir uns um alles: Möbel, Hausrat, Elektrogeräte und persönliche Gegenstände werden sortiert, abtransportiert und fachgerecht entsorgt. Brauchbare Gegenstände können gespendet oder verkauft werden. Wir arbeiten schnell und effizient, damit Sie oder der Vermieter die Wohnung termingerecht übergeben können. Auf Wunsch übernehmen wir auch die Endreinigung.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>`
    },
    {
      slug: 'hausreinigung',
      title: 'Hausreinigung',
      shortDescription: 'Mit uns haben Sie einen kompetenten Partner für sämtliche Reinigungstätigkeiten rund ums Haus.',
      longDescription: 'Wir bieten Haushalts- und Reinigungsservices für Häuser, Wohnungen und Büros an: Grundreinigung, Büroreinigung, Glasreinigung, Baureinigung, Industriereinigung. Detailgenauigkeit, Sorgfältigkeit und ein qualitativ hochwertiger Service zu einem angemessenen Preis – das können Sie von uns erwarten.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.003 8.003 0 0117.657 18.657z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1014.12 11.88l-4.242 4.242z" /></svg>`
    },
    {
      slug: 'transporte',
      title: 'Transporte',
      shortDescription: 'Vom einfachen Möbeltransport oder Singleumzug bis zum kompletten Haushaltsumzug.',
      longDescription: 'Sie benötigen einen kurzfristigen sowie preiswerten Transport oder Kleintransport? Dann sind Sie bei uns genau richtig! Egal ob die zu transportierenden Güter schwer, sperrig oder beides zugleich sind, wir bringen sie sicher an Ihr gewünschtes Ziel.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2-2h8a1 1 0 001-1z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1v-4a1 1 0 011-1h2a1 1 0 011 1v4" /></svg>`
    },
    {
      slug: 'seniorenumzuege',
      title: 'Seniorenumzüge',
      shortDescription: 'Wir helfen älteren Menschen bei den emotionalen und physischen Aspekten eines Umzugs.',
      longDescription: 'Bei einem Umzug ins Seniorenheim oder in eine Senioren-WG können Senioren oft nur ein paar wenige Lieblingsstücke mit ins neue Zuhause nehmen. Wir planen mit Ihnen den Tag des Transportes, verpacken Ihre Einrichtung und bringen sie pünktlich, sicher und zuverlässig an ihren neuen Platz. Wir nehmen Ihnen gerne den Stress ab.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>`
    },
    {
      slug: 'hausmeisterservice',
      title: 'Hausmeisterservice',
      shortDescription: 'Wir erledigen schnell, zuverlässig und gewissenhaft alle Arbeiten rund um Ihre Immobilie.',
      longDescription: 'Mit uns haben Sie einen kompetenten Partner für sämtliche Hausmeister-Tätigkeiten. Wir sichern den Werterhalt Ihrer Immobilie durch professionelle Pflege und Wartung und reduzieren Ihren Verwaltungsaufwand. Mitdenken und verantwortungsvolles Handeln gehören zu unseren Stärken.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>`
    },
    {
      slug: 'tatortreinigung',
      title: 'Tatortreinigung',
      shortDescription: 'Erfahrene Profis helfen Ihnen bei der diskreten und gründlichen Tatortreinigung.',
      longDescription: 'Von Unfällen, über Tötungsdelikte bis zum natürlichen Ableben eines Menschen. Unsere professionellen Tatortreiniger beseitigen jederlei Hinterlassenschaften des Geschehens wie z.B. Urin, Blut, Fäkalien, Gerüche oder andere dabei entstandenen Körperflüssigkeiten zuverlässig. Mit mehreren dafür speziell ausgerichteten Geräten säubern und desinfizieren wir jederlei Flächen.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>`
    },
    {
      slug: 'messie-wohnung-entruempelung-reinigung',
      title: 'Messie-Entrümpelung',
      shortDescription: 'Einfühlsame und diskrete Messie-Entrümpelung mit professioneller Reinigung und Desinfektion.',
      longDescription: 'Messie-Wohnungen erfordern besondere Sensibilität und Fachkompetenz. Unser geschultes Team geht behutsam und diskret vor, um Betroffenen und Angehörigen in dieser schwierigen Situation zu helfen. Wir entrümpeln systematisch, sortieren Wertgegenstände aus, entsorgen fachgerecht und führen eine Tiefenreinigung mit Desinfektion durch. Bei Schädlingsbefall koordinieren wir die professionelle Bekämpfung. Absolute Diskretion ist für uns selbstverständlich – unsere Fahrzeuge sind neutral beschriftet, und wir arbeiten schnell und unauffällig.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>`
    },
    {
      slug: 'professionelle-polsterreinigung-sofa-matratze',
      title: 'Polsterreinigung',
      shortDescription: 'Professionelle Tiefenreinigung für Sofas, Matratzen, Autositze und alle Polstermöbel.',
      longDescription: 'Polstermöbel sind täglich hohen Belastungen ausgesetzt und sammeln Staub, Milben, Bakterien und Flecken. Unsere professionelle Polsterreinigung bringt Ihre Sofas, Sessel, Matratzen und Autositze wieder zum Strahlen. Mit modernster Sprühextraktionstechnik und umweltfreundlichen Reinigungsmitteln entfernen wir selbst hartnäckige Flecken, neutralisieren Gerüche und eliminieren Allergene. Das Ergebnis: hygienisch saubere, frisch duftende Polster mit verlängerter Lebensdauer. Wir reinigen vor Ort bei Ihnen – schnell, gründlich und schonend für alle Stoffarten.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>`
    }
  ];

  private readonly locations: Location[] = [
    { slug: 'essen', name: 'Essen', address: 'Heidhauser Str. 60, 45239 Essen', phone: '0176 81281360', email: 'info@hoffmannblitz-blank.de', description: 'Als Ihr lokaler Partner in Essen bieten wir schnelle und zuverlässige Entrümpelungen für Privat- und Geschäftskunden. Von der Kellerentrümpelung bis zur kompletten Büroauflösung – wir schaffen Platz und Ordnung, damit Sie sich wieder auf das Wesentliche konzentrieren können.', legacyUrl: '/entruempelung-essen-festpreis-guenstig' },
    { slug: 'dusseldorf', name: 'Düsseldorf', address: 'Harffstraße 8, 40591 Düsseldorf', phone: '0177 7931013', email: 'info@hoffmannblitz-blank.de', description: 'In der dynamischen Metropole Düsseldorf stehen wir für professionelle Haushaltsauflösungen und Reinigungsdienste. Wir arbeiten diskret und effizient, um Ihnen in anspruchsvollen Situationen wie Umzügen oder Nachlässen zur Seite zu stehen.', legacyUrl: '/dusseldorf-entrumpelung' },
    { slug: 'ratingen', name: 'Ratingen', address: 'Speestr. 28, 40885 Ratingen', phone: '0157 33152046', email: 'info@hoffmannblitz-blank.de', description: 'Für unsere Kunden in Ratingen bieten wir maßgeschneiderte Lösungen für Seniorenumzüge und Transporte. Wir verstehen die besonderen Anforderungen und sorgen für einen stressfreien Übergang in ein neues Zuhause, mit Sorgfalt und Empathie.', legacyUrl: '/ratingen-entruempelung-haushaltsaufloesung-wohnungsaufloesung' },
    { slug: 'wuppertal', name: 'Wuppertal', address: 'Bogenstr. 39, 42283 Wuppertal', phone: '0176 21045792', email: 'info@hoffmannblitz-blank.de', description: 'In Wuppertal und Umgebung sind wir Ihr Ansprechpartner für gründliche Hausreinigungen und Hausmeisterdienste. Ob regelmäßige Unterhaltsreinigung oder die Pflege Ihrer Immobilie, wir garantieren Sauberkeit und Werterhalt.', legacyUrl: '/wuppertal-haushaltsaufloesung-wohnungsaufloesung-entruempelung' },
    { slug: 'wulfrath', name: 'Wülfrath', address: 'Mettmanner Str. 20, 42489 Wülfrath', phone: '0176 26590022', email: 'info@hoffmannblitz-blank.de', description: 'Hoffmann Blitz & Blank in Wülfrath ist spezialisiert auf die Entrümpelung von Gewerbeobjekten und anspruchsvollen Privaträumen. Wir entsorgen fachgerecht und übergeben jedes Objekt besenrein.', legacyUrl: '/wulfrath-entrumpelung' },
    { slug: 'mettmann', name: 'Mettmann', address: 'Mühlenstr. 1, 40822 Mettmann', phone: '0159 06697460', email: 'info@hoffmannblitz-blank.de', description: 'Unser Team in Mettmann bietet einen umfassenden Service, der von der einfachen Entrümpelung bis zur spezialisierten Tatortreinigung reicht. Diskretion, Professionalität und Respekt sind die Grundpfeiler unserer Arbeit.', legacyUrl: '/mettmann-entruempelung-haushaltsaufloesung-wohnungsaufloesung' },
    { slug: 'hattingen', name: 'Hattingen', address: 'Werksstr. 5, 45527 Hattingen', phone: '0176 21768146', email: 'info@hoffmannblitz-blank.de', description: 'In der historischen Stadt Hattingen unterstützen wir Sie bei Haushaltsauflösungen und Transporten. Wir kümmern uns um die gesamte Logistik, damit Sie sich um nichts sorgen müssen.', legacyUrl: '/hattingen-wohnungsaufloesung' },
    { slug: 'muelheim-a-d-ruhr', name: 'Mülheim a.d. Ruhr', address: 'Oberhausener Str. 182, 45476 Mülheim', phone: '0172 9247497', email: 'info@hoffmannblitz-blank.de', description: 'Für Mülheim an der Ruhr und die umliegende Region bieten wir flexible und kostengünstige Transportlösungen. Vom einzelnen Möbelstück bis zum kompletten Umzug, wir sind pünktlich und zuverlässig.', legacyUrl: '/muelheim-an-der-ruhr-entrumpelung' },
    { slug: 'krefeld', name: 'Krefeld', address: 'Gerberstr. 50, 47798 Krefeld', phone: '0176 63472993', email: 'info@hoffmannblitz-blank.de', description: 'Unser Standort in Krefeld ist Ihr Experter für professionelle Reinigungsdienste. Wir sorgen für strahlende Sauberkeit in Büros, Praxen und Privathaushalten, damit Sie sich wohlfühlen.', legacyUrl: '/krefeld-entrumpelung' },
    { slug: 'solingen', name: 'Solingen', address: 'Eschbachstrasse 55-57, 42659 Solingen', phone: '0176 32950532', email: 'info@hoffmannblitz-blank.de', description: 'In Solingen, der Klingenstadt, schärfen wir unseren Blick für Details bei Entrümpelungen und Haushaltsauflösungen. Wir arbeiten sauber, schnell und übergeben Ihr Objekt in einem tadellosen Zustand.', legacyUrl: '/solingen-entruempelung-haushaltsaufloesung-wohnungsaufloesung' }
  ];

  private readonly testimonials: Testimonial[] = [
    { name: 'Hans P.', role: 'Kunde', comment: 'Vom ersten Kontakt an war die Betreuung freundlich und kompetent. Alle Zusagen wurden eingehalten. Das Team arbeitete schnell und genau.' },
    { name: 'George W.', role: 'Kunde', comment: 'Ein Umzug mit Profis. Ein eingespieltes Team hat uns sehr geholfen. Keine Schäden, weder an Wänden noch sonst etwas. Super.' },
    { name: 'Laura F.', role: 'Kundin', comment: 'Große Weiterempfehlung für die Firma Hoffmann! Wir sind mit zwei LKWs umgezogen und waren 100% zufrieden. Sehr nette Mitarbeiter.' },
    { name: 'Hans Mertens', role: 'Senior', comment: 'Perfekter Umzug! Termin absolut pünktlich eingehalten. Super nettes und eingespieltes Team. Schnell, sauber perfekt. Absolut weiter zu empfehlen!' }
  ];

  private readonly articles: Article[] = [
    {
      slug: 'checkliste-haushaltsaufloesung',
      title: 'Die ultimative Checkliste für eine stressfreie Haushaltsauflösung',
      author: 'Das Team von Hoffmann Blitz & Blank',
      date: '15. Juli 2024',
      summary: 'Eine Haushaltsauflösung kann überwältigend sein. Mit unserer praktischen Checkliste behalten Sie den Überblick und meistern die Aufgabe Schritt für Schritt.',
      content: '<p>Die Auflösung eines Haushalts ist eine große Aufgabe, die oft mit emotionalen und organisatorischen Herausforderungen verbunden ist. Eine gute Planung ist der Schlüssel zum Erfolg. Unsere Checkliste hilft Ihnen dabei, nichts zu vergessen:</p><h3>1. Frühzeitige Planung (4-6 Wochen vorher)</h3><ul><li><strong>Bestandsaufnahme:</strong> Gehen Sie durch alle Räume und verschaffen Sie sich einen Überblick. Was soll behalten, verkauft, verschenkt oder entsorgt werden?</li><li><strong>Wichtige Dokumente sichern:</strong> Sammeln Sie alle wichtigen Unterlagen wie Testamente, Verträge, Urkunden und persönliche Papiere an einem sicheren Ort.</li><li><strong>Profis beauftragen:</strong> Holen Sie sich Angebote von professionellen Entrümpelungsfirmen wie uns ein. Eine kostenlose Besichtigung hilft, den Aufwand genau einzuschätzen.</li></ul><h3>2. Die Sortierphase (2-3 Wochen vorher)</h3><ul><li><strong>Kategorien bilden:</strong> Nutzen Sie farbige Aufkleber oder Kisten, um Gegenstände zu markieren: Behalten, Verkaufen, Spenden, Entsorgen.</li><li><strong>Container bestellen:</strong> Planen Sie, welchen Müll Sie haben werden (Sperrmüll, Elektroschrott, etc.) und bestellen Sie bei Bedarf entsprechende Container. Ein Profi-Dienstleister übernimmt das für Sie.</li><li><strong>Verkauf starten:</strong> Bieten Sie gut erhaltene Möbel oder Gegenstände online oder auf Flohmärkten an.</li></ul><h3>3. Die finale Woche</h3><ul><li><strong>Termine koordinieren:</strong> Bestätigen Sie den Termin mit dem Entrümpelungsunternehmen.</li><li><strong>Persönliches beiseitelegen:</strong> Räumen Sie alle Dinge, die Sie behalten möchten, an einen separaten, klar markierten Ort.</li><li><strong>Nachbarn informieren:</strong> Sagen Sie Ihren Nachbarn Bescheid, dass es am Tag der Räumung etwas lauter werden könnte.</li></ul><p>Mit der richtigen Vorbereitung und einem starken Partner an Ihrer Seite wird die Haushaltsauflösung zu einem beherrschbaren Projekt. Wir unterstützen Sie gerne dabei!</p>',
      imageUrl: 'https://picsum.photos/800/400?image=201'
    },
    {
      slug: 'keller-entruempeln-tipps',
      title: 'Keller entrümpeln: 5 Tipps für mehr Ordnung und Platz',
      author: 'Das Team von Hoffmann Blitz & Blank',
      date: '01. Juli 2024',
      summary: 'Ein unordentlicher Keller raubt nicht nur Platz, sondern auch Nerven. Mit diesen fünf einfachen Tipps verwandeln Sie Ihr Kellerchaos in einen nützlichen Stauraum.',
      content: '<p>Der Keller wird oft zum Abstellraum für alles, was man gerade nicht braucht. Doch irgendwann ist der Punkt erreicht, an dem man den Überblick verliert. So gehen Sie das Projekt "Keller entrümpeln" richtig an:</p><ol><li><strong>Alles raus:</strong> Der radikalste, aber effektivste Schritt. Räumen Sie den Keller komplett leer. Nur so sehen Sie das wahre Ausmaß und können von Grund auf neu organisieren.</li><li><strong>Gnadenlos aussortieren:</strong> Fragen Sie sich bei jedem Gegenstand: Brauche ich das wirklich? Habe ich es im letzten Jahr benutzt? Wenn nicht, weg damit. Seien Sie ehrlich zu sich selbst.</li><li><strong>Themeninseln schaffen:</strong> Gruppieren Sie zusammengehörige Dinge. Werkzeug zu Werkzeug, Weihnachtsdeko zu Weihnachtsdeko, Sportausrüstung zu Sportausrüstung. Das erleichtert das Wiederfinden.</li><li><strong>Clever lagern:</strong> Investieren Sie in stabile Regale und beschriftete, transparente Boxen. So sehen Sie auf einen Blick, was wo ist, und schützen Ihre Sachen vor Staub und Feuchtigkeit.</li><li><strong>Regelmäßig dranbleiben:</strong> Planen Sie einmal im Jahr eine kleine Aufräumaktion ein. So verhindern Sie, dass sich das Chaos erneut ausbreitet.</li></ol><p>Keine Zeit oder Lust, das Projekt allein anzugehen? Wir von Hoffmann Blitz & Blank übernehmen die komplette Kellerentrümpelung für Sie – schnell, professionell und besenrein.</p>',
      imageUrl: 'https://picsum.photos/800/400?image=202'
    },
    {
      slug: 'umweltgerechte-entsorgung',
      title: 'Warum umweltgerechte Entsorgung so wichtig ist',
      author: 'Das Team von Hoffmann Blitz & Blank',
      date: '20. Juni 2024',
      summary: 'Bei einer Entrümpelung fällt viel Müll an. Eine fachgerechte Trennung und Entsorgung schont nicht nur die Umwelt, sondern ist auch gesetzlich vorgeschrieben.',
      content: '<p>Eine Entrümpelung ist mehr als nur das Leerräumen von Zimmern. Ein wesentlicher Teil unserer Arbeit ist die verantwortungsvolle Entsorgung der anfallenden Materialien. Warum das so wichtig ist, erklären wir hier.</p><h3>Recycling und Ressourcenschonung</h3><p>Viele Gegenstände enthalten wertvolle Rohstoffe. Holz, Metall, Papier und sogar Kunststoffe können recycelt und wiederverwertet werden. Durch sorgfältige Mülltrennung tragen wir dazu bei, natürliche Ressourcen zu schonen und den Energieverbrauch bei der Neuproduktion zu senken.</p><h3>Schutz vor Schadstoffen</h3><p>Besonders bei Elektroschrott, alten Farben, Lacken oder Batterien ist Vorsicht geboten. Diese Materialien enthalten Schadstoffe, die bei unsachgemäßer Entsorgung in den Boden und das Grundwasser gelangen können. Als zertifizierter Fachbetrieb stellen wir sicher, dass Sondermüll fachgerecht behandelt und unschädlich gemacht wird.</p><h3>Gesetzliche Vorgaben</h3><p>Das Kreislaufwirtschaftsgesetz regelt klar, wie Abfälle zu entsorgen sind. Verstöße können zu hohen Bußgeldern führen. Wenn Sie uns beauftragen, können Sie sicher sein, dass alle gesetzlichen Vorschriften eingehalten werden. Wir stellen Ihnen auf Wunsch auch gerne einen Entsorgungsnachweis aus.</p><p>Indem Sie auf eine professionelle und umweltgerechte Entsorgung setzen, leisten Sie einen wichtigen Beitrag zum Umweltschutz und sind rechtlich auf der sicheren Seite. Hoffmann Blitz & Blank ist Ihr Partner für eine saubere Lösung.</p>',
      imageUrl: 'https://picsum.photos/800/400?image=203'
    }
  ];
  
  // Gallery items now use generated images from ImageGeneratorService
  private getGalleryItemsData(): GalleryItem[] {
    return [
      {
        beforeImageUrl: this.imageService.getImageUrl('gallery-wohnung-before'),
        afterImageUrl: this.imageService.getImageUrl('gallery-wohnung-after'),
        title: 'Wohnungsauflösung',
        description: 'Komplette Räumung und besenreine Übergabe einer 3-Zimmer-Wohnung.'
      },
      {
        beforeImageUrl: this.imageService.getImageUrl('gallery-keller-before'),
        afterImageUrl: this.imageService.getImageUrl('gallery-keller-after'),
        title: 'Kellerentrümpelung',
        description: 'Ein überfüllter Keller wurde entrümpelt und neu geordnet.'
      },
      {
        beforeImageUrl: this.imageService.getImageUrl('gallery-buero-before'),
        afterImageUrl: this.imageService.getImageUrl('gallery-buero-after'),
        title: 'Büroreinigung',
        description: 'Tiefenreinigung und Neuorganisation eines Großraumbüros.'
      }
    ];
  }

  getServices() {
    return signal(this.services);
  }

  getServiceBySlug(slug: string): Service | undefined {
    return this.services.find(s => s.slug === slug);
  }

  getLocations() {
    return signal(this.locations);
  }

  getLocationBySlug(slug: string): Location | undefined {
    return this.locations.find(l => l.slug === slug);
  }

  getTestimonials() {
    return signal(this.testimonials);
  }

  getArticles() {
    return signal(this.articles);
  }

  getArticleBySlug(slug: string): Article | undefined {
    return this.articles.find(a => a.slug === slug);
  }
  
  getGalleryItems() {
    return signal(this.getGalleryItemsData());
  }
}
