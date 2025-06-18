/*
  # Seed Initial Data

  1. Insert sample authors
  2. Insert sample posts
  
  This migration populates the database with the existing sample data
  to maintain continuity with the current application state.
*/

-- Insert authors
INSERT INTO authors (id, name, bio, avatar, email, social_links) VALUES
(
  '1',
  'Marko Petrović',
  'Pisac i novinar iz Beograda. Piše o kulturi, istoriji i društvenim temama.',
  'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
  'marko@example.com',
  '{"twitter": "https://twitter.com/markop", "website": "https://markoblog.com"}'::jsonb
),
(
  '2',
  'Ana Jovanović',
  'Književnica i profesorka srpskog jezika. Specijalizovana za savremenu književnost.',
  'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400',
  'ana@example.com',
  '{"linkedin": "https://linkedin.com/in/anaj"}'::jsonb
),
(
  '3',
  'Stefan Nikolić',
  'Istoričar i istraživač tradicije Zaplanskog kraja. Autor nekoliko knjiga o lokalnoj istoriji.',
  'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
  'stefan@example.com',
  '{"website": "https://stefannikolic.rs"}'::jsonb
);

-- Insert posts
INSERT INTO posts (id, title, slug, excerpt, content, cover_image, author_id, published_at, reading_time, tags, featured) VALUES
(
  '1',
  'Tradicija i običaji Zaplanskog kraja',
  'tradicija-i-obicaji-zaplanskog-kraja',
  'Duboko ukorenjeni običaji i tradicije koje čuvaju identitet ovog prelepog kraja kroz vekove.',
  '# Tradicija i običaji Zaplanskog kraja

Zaplanje, ovaj predeli kraj na jugu Srbije, čuva u sebi bogatstvo tradicije koje se prenosi s kolena na koleno. Kroz vekove, stanovnici ovog kraja su negovali običaje koji danas predstavljaju neprocenjivo kulturno blago.

## Narodni običaji

Jedan od najznačajnijih običaja je **Đurđevdan**, kada se cele porodice okupljaju da proslave dolazak proleća. Tradicionalno se priprema jagnje na ražnju, a devojke prave venčiće od cveća.

### Zimski običaji

Tokom zimskih meseci, posebno se ističe **Badnji dan** kada se u svaku kuću unosi badnjak. Ovaj običaj simbolizuje svetlost koja pobеđuje tamu i nadu za bolju budućnost.

## Narodna nošnja

Tradicionalna nošnja Zaplanskog kraja odlikuje se:
- Bogatim vezovima u zlatnim i srebrnim nitima
- Karakterističnim bojama - crvenom, plavom i belom
- Posebnim načinom nošenja marame kod žena

Ova tradicija i danas živi u srcima ljudi ovog kraja, čuvajući identitet i povezujući prošlost sa sadašnjošću.',
  'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=1200',
  '3',
  '2024-01-15T10:00:00Z',
  8,
  ARRAY['tradicija', 'kultura', 'zaplanje', 'običaji'],
  true
),
(
  '2',
  'Priče naših predaka',
  'price-nasih-predaka',
  'Legendе i priče koje su se prenosile usmenim putem kroz generacije u Zaplanskom kraju.',
  '# Priče naših predaka

U svakom selu Zaplanskog kraja postoje priče koje su se prenosile s oca na sina, s majke na ćerku. Ove priče nisu samo zabava - one su čuvari istorije, morala i mudrosti naših predaka.

## Legenda o Đorđevom kamenu

Na vrhu brda iznad sela stoji veliki kamen za koji se priča da je tu ostavio sam Sveti Đorđe. Legenda kaže da je svetac tu odmarao svoj konj tokom putovanja kroz ove krajeve.

### Čudesna svojstva

Meštani veruju da ovaj kamen ima čudesna svojstva:
- Donosi sreću mladencima koji se tu zaklnu u ljubav
- Čuva selo od zla i nesreće
- Pomaže bolesnicima da ozdravljuju

## Priča o vili Milici

Najlepša od svih priča je ona o vili Milici koja je živela u šumi pokraj reke. Govorilo se da pomaže putnicima koji zalutaju, a kažnjava one koji čine zlo.

Ove priče i danas žive u srcima ljudi, podсećajući nas na bogato nasleđe naših predaka.',
  'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=1200',
  '1',
  '2024-01-10T14:30:00Z',
  6,
  ARRAY['priče', 'legende', 'folklor', 'nasleđe'],
  false
),
(
  '3',
  'Jezik i dijalekt našeg kraja',
  'jezik-i-dijalekt-naseg-kraja',
  'Analiza specifičnosti govora Zaplanskog kraja i njegovih lingvističkih karakteristika.',
  '# Jezik i dijalekt našeg kraja

Govor Zaplanskog kraja predstavlja jedinstvenu lingvističku celinu koja čuva arhajčne elemente srpskog jezika, ali i pokazuje uticaje susednih dijalekata.

## Karakteristike govora

Osnovne karakteristike ovog dijalekta su:

### Fonološke osobine
- Čuvanje starih glasovnih promena
- Specifična akcentuacija
- Karakteristični vokalizam

### Leksičke specifičnosti
Mnoge reči koje se koriste u ovom kraju nisu poznate u standardnom srpskom jeziku:
- **Đeram** - alat za obradu zemlje
- **Čutura** - posuda za vodu
- **Pendžer** - prozor

## Značaj za lingvistiku

Ovaj dijalekt predstavlja važan izvor za proučavanje:
- Istorije srpskog jezika
- Balkanskih jezičkih kontakata
- Dijalekatske geografije

Čuvanje ovog govora je od izuzetnog značaja za našu kulturnu baštinu.',
  'https://images.pexels.com/photos/159581/dictionary-reference-book-learning-meaning-159581.jpeg?auto=compress&cs=tinysrgb&w=1200',
  '2',
  '2024-01-05T09:15:00Z',
  5,
  ARRAY['jezik', 'dijalekt', 'lingvistika', 'kultura'],
  false
),
(
  '4',
  'Gastronomija Zaplanskog kraja',
  'gastronomija-zaplanskog-kraja',
  'Tradicionalna jela i recepti koji čine bogatu kulinarsku tradiciju ovog kraja.',
  '# Gastronomija Zaplanskog kraja

Kuhinja Zaplanskog kraja odlikuje se jednostavnošću, ali i bogatstvom ukusa. Tradicionalna jela nastala su iz potrebe da se iskoriste lokalni proizvodi i prilagode klimatskim uslovima.

## Tradicionalna jela

### Zaplanjski kačamak
Najpoznatije jelo kraja, priprema se od:
- Kukuruznog brašna
- Sira
- Kajmaka
- Masla

### Komplet lepinja
Specifičnost ovog kraja, sastoji se od:
- Domaće lepinje
- Kajmaka
- Jaja
- Urnebes salate

## Zimnica i konzerviranja

Stanovnici ovog kraja oduvek su znali da čuvaju hranu za zimske mesece:
- **Turšija** - kiselo povrće
- **Pekmez** - od šljiva i jabuka
- **Suvo meso** - tradicionalno dimljeno

## Pića

Tradicionalna pića uključuju:
- Domaću rakiju od šljiva
- Čaj od planinskog bilja
- Bozу od kukuruza

Ova bogata gastronomska tradicija i danas se čuva u porodicama ovog kraja.',
  'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200',
  '1',
  '2024-01-20T16:45:00Z',
  7,
  ARRAY['gastronomija', 'hrana', 'recepti', 'tradicija'],
  true
);