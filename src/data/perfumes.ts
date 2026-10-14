import type { PerfumeProduct } from '../types';

export const INITIAL_PERFUMES: PerfumeProduct[] = [
  {
    id: 'aurais-oud-nocturne',
    slug: 'oud-nocturne-extrait',
    name: 'Oud Nocturne',
    subtitle: 'Extrait de Parfum • 30% Essence',
    tagline: 'A velvety chiaroscuro of smoked agarwood, midnight damask rose, and liquid black amber.',
    story:
      'Born from late evening walks along the labyrinthine stone riads of Marrakech, Oud Nocturne captures the stillness right as dusk dissolves into starlight. It is neither brash nor medicinal; rather, it is a masterclass in slow, opulent warmth, draping over the collarbone like bespoke cashmere.',
    inspiration: 'Ancient resin trades, nocturnal gardens in Grasse, and the glowing embers of sacred woods.',
    perfumer: 'Laurent Delaunay (Master Perfumer, Grasse)',
    olfactoryFamily: 'Woody & Amber',
    concentration: 'Extrait de Parfum (30%)',
    pyramid: {
      top: [
        { name: 'Calabrian Bergamot', category: 'citrus', description: 'Crisp, luminescent opening' },
        { name: 'Pink Peppercorn', category: 'spicy', description: 'Subtle piquant sparkle' },
        { name: 'Saffron Threads', category: 'spicy', description: 'Warm metallic sweetness' }
      ],
      heart: [
        { name: 'Damascena Rose Absolue', category: 'floral', description: 'Velvety nocturnal petals' },
        { name: 'Smoked Tonka Bean', category: 'gourmand', description: 'Deep almond-vanillic warmth' },
        { name: 'Aged Guaiacwood', category: 'woody', description: 'Lustrous balsamic smoke' }
      ],
      base: [
        { name: 'Assam Agarwood (Oud)', category: 'woody', description: 'Wild-harvested, aged 12 years' },
        { name: 'Cistus Labdanum', category: 'amber', description: 'Rich honeyed amber' },
        { name: 'Skin Musk & Birch Tar', category: 'musk', description: 'Sensual, magnetic trail' }
      ]
    },
    longevityScore: 5, // 14+ hours
    sillageScore: 4.5,
    season: ['Autumn', 'Winter'],
    gender: 'Unisex',
    mood: ['Opulent', 'Nocturnal', 'Magnetic', 'Mysterious'],
    accords: ['Woody', 'Warm Spicy', 'Amber', 'Rose', 'Smoky'],
    variants: [
      { size: '2ml Sample', volumeMl: 2, price: 14, inStock: true },
      { size: '30ml Travel Flacon', volumeMl: 30, price: 145, inStock: true },
      { size: '50ml Signature', volumeMl: 50, price: 220, originalPrice: 245, inStock: true },
      { size: '100ml Grand Flacon', volumeMl: 100, price: 340, inStock: true }
    ],
    defaultVariantIndex: 2,
    images: {
      hero: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80',
      ambient: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=80',
      detail: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1000&q=80'
    },
    rating: 4.95,
    reviewCount: 142,
    reviews: [
      {
        id: 'rev-1',
        author: 'Eleanor Vance',
        rating: 5,
        date: 'October 2, 2026',
        title: 'An ethereal triumph. Not your standard oud.',
        comment:
          'Most oud fragrances punch you in the jaw. Oud Nocturne kisses your neck. The rose is deep, never powdery, and the drydown lasts through an entire transatlantic flight.',
        verifiedPurchase: true,
        longevityVote: 'Eternal (14h+)',
        sillageVote: 'Moderate'
      },
      {
        id: 'rev-2',
        author: 'Julian Thorne',
        rating: 5,
        date: 'September 18, 2026',
        title: 'Bespoke quality in every droplet.',
        comment:
          'I bought the 50ml flacon. The magnetic cap has weight, the atomizer produces an ultra-fine micro-mist, and the included 2ml sample allowed me to test it before unwrapping the luxury seal.',
        verifiedPurchase: true,
        longevityVote: 'Eternal (14h+)',
        sillageVote: 'Enormous'
      }
    ],
    isBestseller: true,
    isNewArrival: false,
    stockCount: 18,
    layeringTip: 'Spray once on the nape of your neck, then layer with Santal Céleste on wrists for an unforgettable woody-creamy trail.',
    applicationRitual: 'Dispense two sprays directly onto pulse points at body temperature: inner wrists, clavicle, and behind the ears. Do not rub wrists together; allow the notes to evaporate uncrushed.'
  },
  {
    id: 'aurais-santal-celeste',
    slug: 'santal-celeste-edp',
    name: 'Santal Céleste',
    subtitle: 'Eau de Parfum • 22% Essence',
    tagline: 'Luminous Australian sandalwood infused with cardamom, Florentine orris, and warm cedar.',
    story:
      'Santal Céleste is quiet luxury translated into vapor. Evoking the sun-drenched sanctuary of a private library in Provence, it balances the lactonic creaminess of sustainably sourced sandalwood with the powdery sophistication of Tuscan orris root.',
    inspiration: 'Midday sunlight cutting through sheer linen curtains, aged vellum books, and polished marble.',
    perfumer: 'Camille Montagne (Haute Parfumeuse)',
    olfactoryFamily: 'Woody & Amber',
    concentration: 'Eau de Parfum (20%)',
    pyramid: {
      top: [
        { name: 'Guatemalan Cardamom', category: 'spicy', description: 'Fresh, aromatic coolness' },
        { name: 'Violet Leaf', category: 'floral', description: 'Dewy green crispness' },
        { name: 'Mandarin Zest', category: 'citrus', description: 'Subtle solar radiance' }
      ],
      heart: [
        { name: 'Florentine Orris Butter', category: 'floral', description: 'Velvety, powdery aristocracy' },
        { name: 'Papyrus Reed', category: 'woody', description: 'Dry crisp warmth' },
        { name: 'Nutmeg Infusion', category: 'spicy', description: 'Warm comforting spice' }
      ],
      base: [
        { name: 'Australian Sandalwood', category: 'woody', description: 'Lactonic, creamy, sustainably harvested' },
        { name: 'Atlas Cedarwood', category: 'woody', description: 'Clean resinous backbone' },
        { name: 'White Ambergris', category: 'amber', description: 'Golden skin warmth' }
      ]
    },
    longevityScore: 4.5,
    sillageScore: 3.8,
    season: ['Spring', 'Autumn', 'Winter'],
    gender: 'Unisex',
    mood: ['Sophisticated', 'Comforting', 'Architectural', 'Intimate'],
    accords: ['Woody', 'Powdery', 'Warm Spicy', 'Aromatic'],
    variants: [
      { size: '2ml Sample', volumeMl: 2, price: 12, inStock: true },
      { size: '30ml Travel Flacon', volumeMl: 30, price: 130, inStock: true },
      { size: '50ml Signature', volumeMl: 50, price: 195, inStock: true },
      { size: '100ml Grand Flacon', volumeMl: 100, price: 295, inStock: true }
    ],
    defaultVariantIndex: 2,
    images: {
      hero: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80',
      ambient: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=1000&q=80',
      detail: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80'
    },
    rating: 4.88,
    reviewCount: 96,
    reviews: [
      {
        id: 'rev-3',
        author: 'Dr. Marcus Sterling',
        rating: 5,
        date: 'October 5, 2026',
        title: 'The ultimate signature boardroom fragrance.',
        comment:
          'Subtle yet commanding. Colleagues lean in during meetings just to ask what scent I am wearing. Never offensive, impeccably blended.',
        verifiedPurchase: true,
        longevityVote: 'Long Lasting (8-12h)',
        sillageVote: 'Moderate'
      }
    ],
    isBestseller: true,
    isNewArrival: false,
    stockCount: 24,
    layeringTip: 'Acts as the holy grail base layer for any floral or citrus fragrance to extend longevity by 4+ hours.',
    applicationRitual: 'Target the hollow of your neck and hair ends for an enduring scent halo throughout the working day.'
  },
  {
    id: 'aurais-fleur-doranger-sauvage',
    slug: 'fleur-doranger-sauvage',
    name: 'Fleur d’Oranger Sauvage',
    subtitle: 'Eau de Parfum • 20% Essence',
    tagline: 'Solar orange blossoms drenched in Mediterranean rain, white honey, and golden neroli.',
    story:
      'A memory of coastal Seville in late April. The morning mist burns away under radiant Andalusian sunshine, liberating the intoxicating nectar of bitter orange groves interwoven with salty coastal breeze.',
    inspiration: 'Sunlit courtyards of Andalusia, wet terra-cotta tiles, and morning sea spray.',
    perfumer: 'Laurent Delaunay',
    olfactoryFamily: 'Floral & Powdery',
    concentration: 'Eau de Parfum (20%)',
    pyramid: {
      top: [
        { name: 'Tunisian Neroli', category: 'citrus', description: 'Crisp green petally glow' },
        { name: 'Petitgrain Bigarade', category: 'citrus', description: 'Crushed citrus twigs' },
        { name: 'Bergamot Peel', category: 'citrus', description: 'Sparkling effervescence' }
      ],
      heart: [
        { name: 'Orange Blossom Absolue', category: 'floral', description: 'Heady, honeyed floral core' },
        { name: 'Sambac Jasmine', category: 'floral', description: 'Luminous white flowers' },
        { name: 'Solar Marine Accord', category: 'earthy', description: 'Coastal breeze salinity' }
      ],
      base: [
        { name: 'White Meadow Honey', category: 'gourmand', description: 'Sun-warmed organic sweetness' },
        { name: 'Ambroxan Crystals', category: 'amber', description: 'Radiant modern warmth' },
        { name: 'Cedar Flakes', category: 'woody', description: 'Clean grounding structure' }
      ]
    },
    longevityScore: 4.2,
    sillageScore: 4.0,
    season: ['Spring', 'Summer'],
    gender: 'Unisex',
    mood: ['Radiant', 'Uplifting', 'Euphoric', 'Solar'],
    accords: ['White Floral', 'Citrus', 'Sweet', 'Honey', 'Fresh'],
    variants: [
      { size: '2ml Sample', volumeMl: 2, price: 12, inStock: true },
      { size: '30ml Travel Flacon', volumeMl: 30, price: 125, inStock: true },
      { size: '50ml Signature', volumeMl: 50, price: 185, inStock: true },
      { size: '100ml Grand Flacon', volumeMl: 100, price: 275, inStock: true }
    ],
    defaultVariantIndex: 2,
    images: {
      hero: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=1000&q=80',
      ambient: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=80',
      detail: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=1000&q=80'
    },
    rating: 4.91,
    reviewCount: 68,
    reviews: [
      {
        id: 'rev-4',
        author: 'Sophea Kim',
        rating: 5,
        date: 'September 28, 2026',
        title: 'Instant dopamine in a bottle.',
        comment:
          'I normally find orange blossom too synthetic or soapy. Aurais extracted the true botanical blossom with that touch of wild honey. Exquisite for warm days.',
        verifiedPurchase: true,
        longevityVote: 'Long Lasting (8-12h)',
        sillageVote: 'Moderate'
      }
    ],
    isBestseller: false,
    isNewArrival: true,
    stockCount: 30,
    layeringTip: 'Layer over Vétiver Minérale for an invigorating citrus-earthy signature.',
    applicationRitual: 'Generously mist onto clothing collar and shoulders for maximum solar diffusion as you walk.'
  },
  {
    id: 'aurais-vanille-fumee',
    slug: 'vanille-fumee-imperiale',
    name: 'Vanille Fumée Impériale',
    subtitle: 'Extrait de Parfum • 28% Essence',
    tagline: 'Dark Madagascar bourbon vanilla infused with charred oak, Cuban tobacco leaf, and ambered rum.',
    story:
      'The antidote to sugary confectionery scents. Vanille Fumée explores the primal, nocturnal side of the vanilla orchid: cured pods split open beside smoldering birch firewood in an aristocratic salon.',
    inspiration: 'Velvet lounge banquettes, vintage single-cask rum, and the dark intoxicating pods of Sambava.',
    perfumer: 'Camille Montagne',
    olfactoryFamily: 'Oriental & Gourmand',
    concentration: 'Extrait de Parfum (30%)',
    pyramid: {
      top: [
        { name: 'Dark Caribbean Rum', category: 'gourmand', description: 'Intoxicating boozy prelude' },
        { name: 'Bitter Cacao Nibs', category: 'gourmand', description: 'Rich roasted crunch' },
        { name: 'Star Anise', category: 'spicy', description: 'Cool herbal contrast' }
      ],
      heart: [
        { name: 'Cuban Tobacco Leaf', category: 'spicy', description: 'Dry, aromatic cigar leaf' },
        { name: 'Smoked Tonka Bean', category: 'gourmand', description: 'Almond coumarin velvet' },
        { name: 'Smoldering Immortelle', category: 'floral', description: 'Caramelized syrup warmth' }
      ],
      base: [
        { name: 'Madagascar Bourbon Vanilla Pods', category: 'gourmand', description: 'Aged 18 months, resinous & dark' },
        { name: 'Charred Oak Barrel', category: 'woody', description: 'Deep smoky tannins' },
        { name: 'Golden Benzoin of Siam', category: 'amber', description: 'Balsamic sweet cushion' }
      ]
    },
    longevityScore: 5.0,
    sillageScore: 4.7,
    season: ['Autumn', 'Winter'],
    gender: 'Unisex',
    mood: ['Hedonistic', 'Intoxicating', 'Cozy', 'Seductive'],
    accords: ['Vanilla', 'Sweet', 'Tobacco', 'Warm Spicy', 'Woody'],
    variants: [
      { size: '2ml Sample', volumeMl: 2, price: 14, inStock: true },
      { size: '30ml Travel Flacon', volumeMl: 30, price: 140, inStock: true },
      { size: '50ml Signature', volumeMl: 50, price: 215, inStock: true },
      { size: '100ml Grand Flacon', volumeMl: 100, price: 325, inStock: true }
    ],
    defaultVariantIndex: 2,
    images: {
      hero: 'https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&w=1000&q=80',
      ambient: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=1000&q=80',
      detail: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=80'
    },
    rating: 4.97,
    reviewCount: 215,
    reviews: [
      {
        id: 'rev-5',
        author: 'Christian Bauer',
        rating: 5,
        date: 'October 8, 2026',
        title: 'Masterpiece. The smoky tobacco cuts the sweetness perfectly.',
        comment:
          'If you hate cheap cupcake vanilla, this is for you. It smells like leather-bound books, aged spirits, and pure raw vanilla bean. Lasts easily 16 hours.',
        verifiedPurchase: true,
        longevityVote: 'Eternal (14h+)',
        sillageVote: 'Enormous'
      }
    ],
    isBestseller: true,
    isNewArrival: false,
    stockCount: 12,
    layeringTip: 'Spritz lightly beneath Oud Nocturne to add an addictive vanillic undertone to the smoked woods.',
    applicationRitual: 'Apply onto chest and wrists before formal evening engagements.'
  },
  {
    id: 'aurais-vetiver-minerale',
    slug: 'vetiver-minerale',
    name: 'Vétiver Minérale',
    subtitle: 'Eau de Parfum • 20% Essence',
    tagline: 'Smoky Haitian vetiver rooted in Atlantic sea salt, pink pepper, and damp slate.',
    story:
      'Where tempestuous ocean waves crash against granite cliffs. Vétiver Minérale strips vetiver of its traditional dusty qualities, elevating it into a mineral, invigorating force of elemental earth and ozone.',
    inspiration: 'Brittany coastlines after a storm, rain-slicked stones, and wild coastal roots.',
    perfumer: 'Laurent Delaunay',
    olfactoryFamily: 'Fresh & Citrus',
    concentration: 'Eau de Parfum (20%)',
    pyramid: {
      top: [
        { name: 'Grapefruit Peel', category: 'citrus', description: 'Bitter, zesty sunrise' },
        { name: 'Crushed Pink Peppercorn', category: 'spicy', description: 'Airy, sparkling kick' },
        { name: 'Ozone Marine Accord', category: 'earthy', description: 'Crisp Atlantic breeze' }
      ],
      heart: [
        { name: 'Fleur de Sel (Sea Salt)', category: 'earthy', description: 'Crystalline salinity' },
        { name: 'Juniper Berries', category: 'woody', description: 'Sharp aromatic clarity' },
        { name: 'Geranium Bourbon', category: 'floral', description: 'Aromatic green freshness' }
      ],
      base: [
        { name: 'Haitian Vetiver Roots', category: 'earthy', description: 'Earthy, grassy, smoky depth' },
        { name: 'Grey Driftwood', category: 'woody', description: 'Sun-bleached salt timber' },
        { name: 'Mineral Amber', category: 'amber', description: 'Clean modern projection' }
      ]
    },
    longevityScore: 4.3,
    sillageScore: 3.9,
    season: ['Spring', 'Summer', 'Autumn'],
    gender: 'Unisex',
    mood: ['Invigorating', 'Disciplined', 'Crisp', 'Architectural'],
    accords: ['Earthy', 'Woody', 'Aromatic', 'Marine', 'Citrus'],
    variants: [
      { size: '2ml Sample', volumeMl: 2, price: 12, inStock: true },
      { size: '30ml Travel Flacon', volumeMl: 30, price: 120, inStock: true },
      { size: '50ml Signature', volumeMl: 50, price: 180, inStock: true },
      { size: '100ml Grand Flacon', volumeMl: 100, price: 265, inStock: true }
    ],
    defaultVariantIndex: 2,
    images: {
      hero: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80',
      ambient: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=80',
      detail: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=80'
    },
    rating: 4.84,
    reviewCount: 54,
    reviews: [
      {
        id: 'rev-6',
        author: 'Henrik Lindqvist',
        rating: 5,
        date: 'October 1, 2026',
        title: 'Refreshing without smelling like shower gel.',
        comment:
          'High perfumery freshness at its finest. The sea salt and vetiver combination is ultra-sophisticated and never cloying in high heat.',
        verifiedPurchase: true,
        longevityVote: 'Long Lasting (8-12h)',
        sillageVote: 'Moderate'
      }
    ],
    isBestseller: false,
    isNewArrival: true,
    stockCount: 22,
    layeringTip: 'Pair with Santal Céleste to create an earthy, aristocratic woods profile.',
    applicationRitual: 'Spray over wrists and torso after a cool morning shower for an all-day crisp awakening.'
  },
  {
    id: 'aurais-rose-ephemere',
    slug: 'rose-ephemere-absolue',
    name: 'Rose Éphémère',
    subtitle: 'Extrait de Parfum • 26% Essence',
    tagline: 'Centifolia rose plucked at dawn, steeped in crushed raspberries, pink pepper, and dark patchouli.',
    story:
      'In May, the May Rose (Rosa Centifolia) blooms in Grasse for only three brief weeks. Hand-harvested between 6:00 and 9:00 AM before the sun evaporates the morning dew, Rose Éphémère immortalizes this fleeting, glorious harvest.',
    inspiration: 'Dawn harvests in Grasse, velvet evening gowns, and vintage raspberry liqueur.',
    perfumer: 'Camille Montagne',
    olfactoryFamily: 'Floral & Powdery',
    concentration: 'Extrait de Parfum (30%)',
    pyramid: {
      top: [
        { name: 'Macerated Raspberry', category: 'citrus', description: 'Juicy, tart burgundy wine note' },
        { name: 'Pink Peppercorn', category: 'spicy', description: 'Vibrant rosy effervescence' },
        { name: 'Lychee Nectar', category: 'citrus', description: 'Dewy crystalline sweetness' }
      ],
      heart: [
        { name: 'Grasse Rose Centifolia Absolue', category: 'floral', description: 'Full-bodied, velvety bloom' },
        { name: 'Turkish Damask Rose Essence', category: 'floral', description: 'Spiced honey undertones' },
        { name: 'Geranium Leaf', category: 'floral', description: 'Green dewy stem realism' }
      ],
      base: [
        { name: 'Indonesian Patchouli Heart', category: 'woody', description: 'Purified of camphor, warm & woody' },
        { name: 'Liquid White Musk', category: 'musk', description: 'Second-skin sensual veil' },
        { name: 'Papyrus & Sandalwood', category: 'woody', description: 'Refined structure' }
      ]
    },
    longevityScore: 4.8,
    sillageScore: 4.4,
    season: ['Spring', 'Autumn', 'Winter'],
    gender: 'Unisex',
    mood: ['Hypnotic', 'Romance', 'Magnetic', 'Sophisticated'],
    accords: ['Rose', 'Fruity', 'Patchouli', 'Floral', 'Woody'],
    variants: [
      { size: '2ml Sample', volumeMl: 2, price: 14, inStock: true },
      { size: '30ml Travel Flacon', volumeMl: 30, price: 135, inStock: true },
      { size: '50ml Signature', volumeMl: 50, price: 210, inStock: true },
      { size: '100ml Grand Flacon', volumeMl: 100, price: 315, inStock: true }
    ],
    defaultVariantIndex: 2,
    images: {
      hero: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=80',
      ambient: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80',
      detail: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1000&q=80'
    },
    rating: 4.93,
    reviewCount: 110,
    reviews: [
      {
        id: 'rev-7',
        author: 'Valerie Dupuis',
        rating: 5,
        date: 'October 10, 2026',
        title: 'A dark, sensual rose. Unbelievable longevity.',
        comment:
          'This is not your grandmother’s rose water. The raspberry and patchouli make it modern, intoxicating, and seductive. I get compliments from strangers everywhere.',
        verifiedPurchase: true,
        longevityVote: 'Eternal (14h+)',
        sillageVote: 'Enormous'
      }
    ],
    isBestseller: false,
    isNewArrival: false,
    stockCount: 16,
    layeringTip: 'Layer with Oud Nocturne to deepen the rose into a regal Middle-Eastern court composition.',
    applicationRitual: 'Dab on collarbones, wrists, and back of the knees for an intoxicating sillage in motion.'
  },
  {
    id: 'aurais-cuir-imperial',
    slug: 'cuir-imperial-extrait',
    name: 'Cuir Impérial',
    subtitle: 'Extrait de Parfum • 29% Essence',
    tagline: 'Supple Florentine saddle leather infused with wild saffron, thyme, birch tar, and ambered styrax.',
    story:
      'Inspired by the artisan leather workshops of Florence at twilight. Cuir Impérial wraps the skin in the prestige of hand-burnished equestrian leather, warmed by golden spices and precious resins.',
    inspiration: 'Handcrafted leather travel trunks, vintage sports car interiors, and autumn bonfires.',
    perfumer: 'Laurent Delaunay',
    olfactoryFamily: 'Smoky & Incense',
    concentration: 'Extrait de Parfum (30%)',
    pyramid: {
      top: [
        { name: 'Wild Saffron', category: 'spicy', description: 'Red gold spice luminescence' },
        { name: 'Mountain Thyme', category: 'earthy', description: 'Herbal aromatic bite' },
        { name: 'Raspberry Glaze', category: 'citrus', description: 'Sweet contrast to dry leather' }
      ],
      heart: [
        { name: 'Florentine Suede Accord', category: 'woody', description: 'Buttery, supple leather' },
        { name: 'Frankincense Tears', category: 'amber', description: 'Smoky sacred resin' },
        { name: 'Night Jasmine', category: 'floral', description: 'Floral softness' }
      ],
      base: [
        { name: 'Russian Birch Tar', category: 'woody', description: 'Smoky wood leather tradition' },
        { name: 'Golden Amber Resin', category: 'amber', description: 'Velvety drydown cushion' },
        { name: 'Spanish Labdanum', category: 'amber', description: 'Warm balsam tenacity' }
      ]
    },
    longevityScore: 5.0,
    sillageScore: 4.6,
    season: ['Autumn', 'Winter'],
    gender: 'Unisex',
    mood: ['Commanding', 'Equestrian', 'Aristocratic', 'Bold'],
    accords: ['Leather', 'Smoky', 'Warm Spicy', 'Amber', 'Aromatic'],
    variants: [
      { size: '2ml Sample', volumeMl: 2, price: 14, inStock: true },
      { size: '30ml Travel Flacon', volumeMl: 30, price: 145, inStock: true },
      { size: '50ml Signature', volumeMl: 50, price: 225, inStock: true },
      { size: '100ml Grand Flacon', volumeMl: 100, price: 335, inStock: true }
    ],
    defaultVariantIndex: 2,
    images: {
      hero: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80',
      ambient: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80',
      detail: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80'
    },
    rating: 4.89,
    reviewCount: 78,
    reviews: [
      {
        id: 'rev-8',
        author: 'Alexander Sterling',
        rating: 5,
        date: 'October 4, 2026',
        title: 'Pure charisma. Leather scent perfection.',
        comment:
          'Rich, buttery, uncompromising. The saffron and raspberry keep it modern rather than overly raw. Unmatched projection.',
        verifiedPurchase: true,
        longevityVote: 'Eternal (14h+)',
        sillageVote: 'Enormous'
      }
    ],
    isBestseller: false,
    isNewArrival: false,
    stockCount: 15,
    layeringTip: 'Spray a fine mist over woolen overcoats or scarf for a week-long aristocratic trail.',
    applicationRitual: 'Apply onto pulse points 30 minutes before evening arrivals.'
  },
  {
    id: 'aurais-grand-quintet-discovery',
    slug: 'discovery-flight-grand-quintet',
    name: 'The Grand Quintet Discovery Set',
    subtitle: '5 × 2ml Extrait & EDP Sampler Box',
    tagline: 'Experience the entire Aurais repertoire in bespoke mini flacons with 100% voucher credit towards your full flacon.',
    story:
      'Finding a signature scent should never be a blind leap of faith. The Grand Quintet includes 2ml samples of our five most iconic creations: Oud Nocturne, Santal Céleste, Fleur d’Oranger Sauvage, Vanille Fumée, and Rose Éphémère. Every set includes an exclusive digital voucher redeemable for the full purchase price against any 50ml or 100ml flacon.',
    inspiration: 'Olfactory voyage across the world’s most prized botanical terroir.',
    perfumer: 'Laurent Delaunay & Camille Montagne',
    olfactoryFamily: 'Woody & Amber',
    concentration: 'Extrait de Parfum (30%)',
    pyramid: {
      top: [
        { name: 'Oud Nocturne', category: 'woody', description: 'Assam Oud & Damask Rose' },
        { name: 'Santal Céleste', category: 'woody', description: 'Australian Sandalwood & Cardamom' }
      ],
      heart: [
        { name: 'Fleur d’Oranger Sauvage', category: 'floral', description: 'Orange Blossom & White Honey' },
        { name: 'Rose Éphémère', category: 'floral', description: 'May Rose & Burgundy Raspberry' }
      ],
      base: [
        { name: 'Vanille Fumée Impériale', category: 'gourmand', description: 'Smoked Vanilla & Bourbon Rum' },
        { name: '100% Value Credit', category: 'amber', description: 'Full price credited to bottle' }
      ]
    },
    longevityScore: 4.9,
    sillageScore: 4.5,
    season: ['Spring', 'Summer', 'Autumn', 'Winter'],
    gender: 'Unisex',
    mood: ['Curious', 'Exploratory', 'Gift', 'Luxurious'],
    accords: ['Discovery', 'Luxury Gift', 'Risk-Free', 'Voucher Included'],
    variants: [
      { size: '2ml Sample', volumeMl: 10, price: 45, originalPrice: 65, inStock: true }
    ],
    defaultVariantIndex: 0,
    images: {
      hero: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1000&q=80',
      ambient: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=80',
      detail: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80'
    },
    rating: 4.98,
    reviewCount: 382,
    reviews: [
      {
        id: 'rev-9',
        author: 'Chloe Davenport',
        rating: 5,
        date: 'October 11, 2026',
        title: 'The best way to buy perfume ever invented.',
        comment:
          'Got this to test before buying. Ended up falling hopelessly in love with Vanille Fumée, and used the $45 voucher immediately on the 100ml flacon! Superb packaging too.',
        verifiedPurchase: true,
        longevityVote: 'Long Lasting (8-12h)',
        sillageVote: 'Moderate'
      }
    ],
    isBestseller: true,
    isNewArrival: false,
    isDiscoverySet: true,
    stockCount: 45,
    layeringTip: 'Use these miniature sprayers to experiment with custom fragrance layering combinations at home.',
    applicationRitual: 'Test one scent per day on clean wrists. Observe how the scent evolves through the morning, afternoon, and evening.'
  }
];
