// ═══════════════════════════════════════
// PROMPT ENGINE — Vesturo ASMR Prompt Generator
// v3.0 — Universal Subjects, Abstract Shapes, Extreme Quality
// ═══════════════════════════════════════

const PromptEngine = (() => {

  // ─── CATEGORY DATA ─────────────────────────────
  const CATEGORIES = [
    { id: 'automobiles', name: 'Automobiles', icon: '🚗', subjects: ['Lamborghini Aventador', 'Porsche 911 GT3', 'Ford Mustang GT', 'Tesla Cybertruck', 'BMW M4', 'Mercedes AMG GT', 'Ferrari F40', 'Bugatti Chiron', 'McLaren P1', 'Audi R8'] },
    { id: 'aircraft', name: 'Aircraft', icon: '✈️', subjects: ['F-22 Raptor', 'Boeing 747', 'SR-71 Blackbird', 'Concorde', 'B-2 Spirit Bomber', 'Spitfire', 'Apache Helicopter', 'A-10 Warthog', 'F-14 Tomcat', 'P-51 Mustang'] },
    { id: 'spacecraft', name: 'Spacecraft', icon: '🚀', subjects: ['Space Shuttle', 'Saturn V Rocket', 'SpaceX Starship', 'Apollo Lunar Module', 'International Space Station', 'Voyager Probe', 'Mars Rover Curiosity', 'Hubble Telescope', 'Soyuz Capsule', 'X-Wing (Concept)'] },
    { id: 'motorcycles', name: 'Motorcycles', icon: '🏍️', subjects: ['Ducati Panigale V4', 'Harley Davidson Fat Boy', 'Yamaha YZF-R1', 'Kawasaki Ninja H2', 'BMW S1000RR', 'Indian Scout', 'Triumph Speed Triple', 'Honda CBR1000RR', 'KTM 1290 Super Duke', 'Suzuki Hayabusa'] },
    { id: 'ships', name: 'Ships & Boats', icon: '🚢', subjects: ['Aircraft Carrier', 'Submarine', 'Battleship Yamato', 'Titanic', 'Destroyer', 'Speedboat', 'Sailing Yacht', 'Cargo Ship', 'Frigate', 'Pirate Galleon'] },
    { id: 'dinosaurs', name: 'Dinosaurs', icon: '🦖', subjects: ['Tyrannosaurus Rex', 'Velociraptor', 'Triceratops', 'Brachiosaurus', 'Stegosaurus', 'Pteranodon', 'Spinosaurus', 'Ankylosaurus', 'Diplodocus', 'Parasaurolophus'] },
    { id: 'animals', name: 'Animals', icon: '🦁', subjects: ['Lion', 'Wolf', 'Eagle', 'Tiger', 'Bear', 'Horse', 'Elephant', 'Gorilla', 'Shark', 'Rhino'] },
    { id: 'birds', name: 'Birds', icon: '🦅', subjects: ['Bald Eagle', 'Peregrine Falcon', 'Owl', 'Hummingbird', 'Phoenix (Mythical)', 'Raven', 'Hawk', 'Parrot', 'Crane', 'Peacock'] },
    { id: 'marine', name: 'Marine Life', icon: '🐋', subjects: ['Blue Whale', 'Great White Shark', 'Octopus', 'Manta Ray', 'Sea Turtle', 'Hammerhead Shark', 'Dolphin', 'Orca', 'Seahorse', 'Jellyfish'] },
    { id: 'insects', name: 'Insects', icon: '🐛', subjects: ['Scorpion', 'Praying Mantis', 'Beetle', 'Dragonfly', 'Spider', 'Butterfly', 'Ant', 'Wasp', 'Centipede', 'Moth'] },
    { id: 'architecture', name: 'Architecture', icon: '🏛️', subjects: ['Eiffel Tower', 'Taj Mahal', 'Colosseum', 'Empire State Building', 'Burj Khalifa', 'Big Ben', 'Golden Gate Bridge', 'Sydney Opera House', 'Parthenon', 'Great Wall Tower'] },
    { id: 'robots', name: 'Robots & Mechs', icon: '🤖', subjects: ['Humanoid Robot', 'Spider Mech', 'Battle Mech', 'Drone Walker', 'Industrial Arm', 'Nano Robot', 'Tank Mech', 'Scout Drone', 'Exoskeleton', 'AI Core Unit'] },
    { id: 'weapons', name: 'Bladed Weapons', icon: '⚔️', subjects: ['Katana', 'Longsword', 'Viking Axe', 'War Hammer', 'Trident', 'Scimitar', 'Dagger', 'Halberd', 'Spear', 'Claymore'] },
    { id: 'instruments', name: 'Instruments', icon: '🎸', subjects: ['Electric Guitar', 'Grand Piano', 'Violin', 'Drum Kit', 'Saxophone', 'Trumpet', 'Cello', 'Acoustic Guitar', 'Harp', 'Flute'] },
    { id: 'racing', name: 'Racing Vehicles', icon: '🏎️', subjects: ['Formula 1 Car', 'NASCAR Stock Car', 'Rally Car', 'Drag Racer', 'Le Mans Prototype', 'Go-Kart', 'Trophy Truck', 'Sprint Car', 'IndyCar', 'Drift Car'] },
    { id: 'trains', name: 'Trains', icon: '🚂', subjects: ['Steam Locomotive', 'Bullet Train', 'Diesel Engine', 'Freight Train', 'Monorail', 'Subway Car', 'Orient Express', 'Maglev Train', 'Mountain Railway', 'Double Decker Train'] },
    { id: 'armor', name: 'Armor & Shields', icon: '🛡️', subjects: ['Knight Full Plate', 'Samurai Armor', 'Viking Shield', 'Roman Centurion', 'Spartan Shield', 'Medieval Helmet', 'Chain Mail', 'Gladiator Armor', 'Gauntlet', 'War Shield'] },
    { id: 'heavy_machinery', name: 'Heavy Machinery', icon: '🏗️', subjects: ['Excavator', 'Crane', 'Bulldozer', 'Dump Truck', 'Forklift', 'Concrete Mixer', 'Backhoe', 'Drilling Rig', 'Roller', 'Tower Crane'] },
    { id: 'tanks', name: 'Tanks & Military', icon: '🪖', subjects: ['M1 Abrams', 'Tiger Tank', 'T-90', 'Leopard 2', 'Sherman Tank', 'Panzer IV', 'Challenger 2', 'Merkava', 'T-34', 'Bradley IFV'] },
    { id: 'electronics', name: 'Electronics', icon: '💻', subjects: ['Gaming PC', 'Retro Camera', 'Vintage Radio', 'Mechanical Keyboard', 'Headphones', 'Drone', 'Smartwatch', 'Turntable', 'Amplifier', 'Telescope'] },
    { id: 'fantasy', name: 'Fantasy Creatures', icon: '🐉', subjects: ['Dragon', 'Griffin', 'Kraken', 'Pegasus', 'Hydra', 'Chimera', 'Basilisk', 'Cerberus', 'Minotaur', 'Wyvern'] },
    { id: 'space_vehicles', name: 'Sci-Fi Vehicles', icon: '🛸', subjects: ['Star Destroyer', 'Millennium Falcon', 'TARDIS', 'Enterprise', 'Tie Fighter', 'Delorean Time Machine', 'Batmobile', 'Tron Light Cycle', 'Pod Racer', 'Colonial Viper'] },
    { id: 'sports', name: 'Sports Equipment', icon: '⚽', subjects: ['Football Helmet', 'Baseball Glove', 'Tennis Racket', 'Golf Club Set', 'Boxing Glove', 'Skateboard', 'Hockey Stick', 'Surfboard', 'Basketball Shoe', 'Bicycle'] },
    { id: 'tools', name: 'Tools & Gadgets', icon: '🔧', subjects: ['Swiss Army Knife', 'Power Drill', 'Chainsaw', 'Wrench Set', 'Multi-Tool', 'Compass', 'Binoculars', 'Lantern', 'Pocket Watch', 'Lighter'] },
  ];

  // ─── ABSTRACT SHAPES ────────────────────────────
  const ABSTRACT_SHAPES = [
    {
      id: 'compressed_cube',
      name: 'Compressed Cube',
      desc: 'Tightly folded into a dense angular cube',
      svgPath: 'M12 2L22 8V16L12 22L2 16V8L12 2Z',
      promptDesc: (subject) => `a dense, angular cube with abnormally sharp faceted edges — as if ${subject} was hydraulically crushed and compressed from all six directions simultaneously into an impossibly tight 5cm × 5cm × 5cm metallic cube. The surfaces show visible stress lines and pressure marks from the extreme compression. Hairline seam lines reveal where the folded segments will split apart. The cube has an unsettling density — it looks far heavier than its size suggests, as if containing immense stored potential energy. Tiny hex-bolt heads are visible at corner junctions. One small mechanical push-button with knurled edge protrudes from one face.`
    },
    {
      id: 'twisted_torus',
      name: 'Twisted Torus',
      desc: 'Warped ring shape, spiraling compression',
      svgPath: 'M12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4ZM12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8Z',
      promptDesc: (subject) => `a twisted, warped torus (donut ring) approximately 6cm diameter — as if ${subject} was spirally wound and compressed into a continuous metallic loop with abnormal twisting distortions. The ring surface has irregular bulges and compressions where the subject's features are tightly packed. The metal surface shows spiral stress patterns from the rotational compression. Every millimeter of the torus contains folded subject detail waiting to deploy. Seam lines spiral around the ring. Tiny precision bolts mark the structural nodes. A push-button sits flush on the outer curve, its knurled edge catching the light.`
    },
    {
      id: 'crystalline_cluster',
      name: 'Crystalline Cluster',
      desc: 'Jagged mineral-like compressed formation',
      svgPath: 'M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z',
      promptDesc: (subject) => `a jagged, crystalline cluster of irregular faceted surfaces — roughly 6cm × 5cm × 5cm — as if ${subject} was compressed into a formation that resembles a mineral crystal cluster grown under extreme geological pressure. Multiple sharp angular planes intersect at unnatural angles. Each faceted surface is a compressed section of the subject. The formation has an alien, mineral-like quality — beautiful but deeply abnormal, like metal that crystallized under impossible conditions. Fracture lines and stress marks pattern every surface. Micro-bolts anchor the crystal junctions. A recessed push-button hides in one of the deeper facet valleys.`
    },
    {
      id: 'organic_cocoon',
      name: 'Organic Cocoon',
      desc: 'Smooth egg-like shell with surface distortions',
      svgPath: 'M12 3C7 3 3 7.5 3 12.5C3 17 6 21 12 21C18 21 21 17 21 12.5C21 7.5 17 3 12 3Z',
      promptDesc: (subject) => `a smooth, ovoid cocoon shape — roughly 6cm × 4cm × 4cm — as if ${subject} was wrapped and compressed into a dense metallic egg with subtle surface distortions. The cocoon surface is mostly smooth but has irregular bumps and depressions where the subject's compressed features push against the outer shell. It looks like a chrysalis made of precision-machined metal — organic in overall silhouette but unmistakably mechanical in surface finish. Faint seam lines trace organic curves across the shell. The surface has a taut, pressurized quality — as if the subject inside is straining against its compressed form. A small button protrudes like a navel on the widest curve.`
    },
    {
      id: 'fractured_sphere',
      name: 'Fractured Sphere',
      desc: 'Cracked sphere with visible pressure seams',
      svgPath: 'M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z M12 6L14 10L12 14L8 11Z',
      promptDesc: (subject) => `a nearly spherical form approximately 5cm diameter with visible fracture lines and stress cracks across its surface — as if ${subject} was implosion-compressed into a metallic sphere under immense pressure, and the sphere subsequently developed hairline cracks from the internal tension of the folded subject straining to deploy. The cracks reveal glimpses of layered compressed metal beneath the surface shell. The sphere has a disturbing quality of barely-contained energy — like a grenade made of compressed art. Each fracture line will become a deployment seam. Micro-bolts stud the intersection points of the fractures. The push-button sits at the "north pole" of the sphere.`
    },
    {
      id: 'mobius_fold',
      name: 'Möbius Fold',
      desc: 'Continuous twisted strip of folded panels',
      svgPath: 'M4 12C4 8 6 4 10 4C14 4 14 8 14 12C14 16 14 20 18 20C22 20 20 16 20 12 M4 12C4 16 6 20 10 20C14 20 14 16 14 12C14 8 14 4 18 4C22 4 20 8 20 12',
      promptDesc: (subject) => `a continuous Möbius-strip-like twisted band approximately 6cm across — as if ${subject} was stretched into a ribbon, then folded and twisted into a single-surface loop with no beginning or end. The band is roughly 2cm wide and twists through 180 degrees, creating an impossible-looking single-sided surface. The compressed subject detail wraps continuously around the twist. The metal surface shows torsional stress marks from the twisting compression. Running a finger along the surface would traverse every part of the compressed subject without lifting. Seam lines follow the twist geometry. The push-button sits at the point of maximum twist tension.`
    },
    {
      id: 'nested_shell',
      name: 'Nested Shell',
      desc: 'Multiple concentric layers compressed together',
      svgPath: 'M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22S22 17.5 22 12S17.5 2 12 2Z M12 6C9.2 6 7 8.2 7 11S9.2 17 12 17S17 14.8 17 12S14.8 6 12 6Z M12 9.5C10.6 9.5 9.5 10.6 9.5 12S10.6 14.5 12 14.5S14.5 13.4 14.5 12S13.4 9.5 12 9.5Z',
      promptDesc: (subject) => `a set of nested concentric shells — roughly 5cm outer diameter — as if ${subject} was compressed into multiple layers, each shell containing a smaller compressed version inside, like a metallic Russian nesting doll compressed into a single solid mass. The outermost shell shows the broadest features compressed flat. Each inner layer contains progressively finer detail. Gaps between the layers are barely visible — hair-thin dark lines revealing the multi-shell structure. The compression is so tight the shells have partially fused at pressure points. The push-button on the outermost shell will trigger the sequential peeling of all layers.`
    },
    {
      id: 'crushed_diamond',
      name: 'Crushed Diamond',
      desc: 'Gem-like faceted shape with pressure planes',
      svgPath: 'M12 2L20 8L12 22L4 8L12 2Z M4 8L20 8',
      promptDesc: (subject) => `a faceted diamond-like form approximately 5cm tall × 4cm wide — as if ${subject} was compressed into the geometry of a cut gemstone with irregular pressure facets. The upper crown has multiple angular facets angled upward, meeting at an off-center apex. The lower pavilion tapers to a point. Each facet is a flat compressed plane of subject detail. The edges between facets are razor-sharp machined lines. Light catches each facet at different angles, creating a jewel-like play of reflections across the metallic surface. The facets will split apart along their edges during deployment. The push-button is set into one of the upper crown facets.`
    },
    {
      id: 'vortex_spiral',
      name: 'Vortex Spiral',
      desc: 'Tornado-like compressed spiral form',
      svgPath: 'M12 4C8 4 5 6 5 9C5 12 8 13 12 13C16 13 19 15 19 18C19 21 16 22 12 22 M12 4C16 4 19 6 19 9 M5 18C5 15 8 13 12 13',
      promptDesc: (subject) => `a vortex-like spiral form approximately 6cm tall — as if ${subject} was caught in a metallic tornado and compressed into a spiraling funnel shape. The widest part at the base gradually tightens into a narrow apex, with the subject's features wrapped in a continuous spiral from bottom to top. The spiral compression creates visible rotational stress marks on the metal surface — curved lines following the vortex path. The form has a dynamic, frozen-motion quality — like a whirlpool cast in metal. The spiral seam lines will unwind during deployment. The push-button sits at the calm center of the vortex base.`
    },
    {
      id: 'collapsed_origami',
      name: 'Collapsed Origami',
      desc: 'Angular paper-fold-like compressed mass',
      svgPath: 'M2 12L7 4L12 10L17 4L22 12L17 20L12 14L7 20L2 12Z',
      promptDesc: (subject) => `a sharp, angular origami-like mass approximately 6cm × 5cm × 3cm — as if ${subject} was precision-folded along scored metal lines into a flat-packed geometric form resembling collapsed paper art. Every surface is a precise flat plane meeting adjacent planes at exact angles (90°, 45°, 135°). The folding pattern is complex — dozens of intersecting scored lines create a dense geometric web on the surface. It looks like an engineering blueprint folded into three dimensions. Each fold line is a future deployment hinge. The flat planes will unfold sequentially to reveal the subject. The push-button is centered on the topmost facet.`
    },
    {
      id: 'implosion_core',
      name: 'Implosion Core',
      desc: 'Dense gravity-collapsed sphere with stress lines',
      svgPath: 'M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22S22 17.5 22 12S17.5 2 12 2Z M12 7L14 10L17 11L14.5 13.5L15 17L12 15.5L9 17L9.5 13.5L7 11L10 10L12 7Z',
      promptDesc: (subject) => `a dense, unnervingly heavy-looking sphere approximately 4.5cm diameter — as if ${subject} was collapsed by gravitational compression into a hyper-dense metallic core. The surface shows radiating stress lines emanating from the center outward, like a frozen shockwave in metal. The sphere appears to distort light around its edges due to its implied extreme density. The surface has micro-dimples and compression artifacts where individual subject features were crushed into the mass. Despite its small size, it looks like it weighs several kilograms. The stress radiation lines will become deployment fracture paths. The push-button is barely visible — a tiny circle on the surface that appears to be sinking inward from the compression force.`
    },
    {
      id: 'petrified_knot',
      name: 'Petrified Knot',
      desc: 'Organic tangled knot of folded metal',
      svgPath: 'M12 4C9 4 6 5 6 8C6 11 10 10 12 12C14 14 10 14 8 16C6 18 8 20 12 20C16 20 18 18 16 16C14 14 18 14 18 12C18 10 14 8 14 6C14 4 15 4 12 4Z',
      promptDesc: (subject) => `an organic, knotted tangle approximately 5cm × 5cm × 4cm — as if ${subject} was twisted and tied into a complex metallic knot, like a pretzel made of compressed engineering. The loops and crossings of the knot create an intricate three-dimensional maze of overlapping metal strands, each strand containing compressed subject detail. The knot has a petrified quality — frozen mid-tangle, with visible tension in the curves where metal strands press against each other. The interweaving pattern is beautiful but unnatural — no real knot could exist this way without mechanical precision. Pull-points in the knot will become deployment release points. The push-button is embedded where two strands cross and press against each other.`
    },
  ];

  // ─── ORIGINAL SUBJECT COLOR DATABASE ───────────
  const ORIGINAL_COLORS = {
    'Lamborghini Aventador': 'vibrant Lamborghini Giallo Orion (intense bright yellow) with deep candy-like clearcoat depth and micro-metallic golden flake — the exact factory yellow',
    'Porsche 911 GT3': 'Guards Red metallic — the iconic deep cherry-red Porsche color with rich warm undertones and high-gloss clearcoat showing deep reflection pools',
    'Ford Mustang GT': 'Race Red metallic — bold American muscle-car red with orange-fire undertones and glossy deep clearcoat with subtle metallic flake',
    'Tesla Cybertruck': 'raw unpainted brushed stainless steel — cold industrial finish with visible directional brush marks, dull matte-satin reflections, no clearcoat',
    'BMW M4': 'Isle of Man Green metallic — deep British racing green with subtle blue shift, looks almost black in shadows but vivid green in direct light',
    'Mercedes AMG GT': 'Selenite Grey metallic — sophisticated cool silver-grey with micro-shimmer that shifts between silver and gunmetal with viewing angle',
    'Ferrari F40': 'Rosso Corsa — the definitive Ferrari red, pure intense crimson with no orange and no blue, iconic high-gloss racing paint',
    'Bugatti Chiron': 'two-tone French Racing Blue over Glacier White — deep vivid royal blue upper surfaces transitioning to pearl white lower panels',
    'McLaren P1': 'Volcano Yellow metallic — aggressive neon-adjacent bright yellow with subtle green undertones, ultra-glossy with visible metallic depth',
    'Audi R8': 'Nardo Grey matte — cult-favorite flat grey with zero metallic flake, perfectly smooth matte surface that absorbs light evenly',
    'F-22 Raptor': 'air superiority grey stealth coating — flat radar-absorbing matte blue-grey with subtle angular panel variations',
    'Boeing 747': 'polished bare aluminum fuselage with white upper crown — mirror-bright natural aluminum lower, clean white upper body',
    'SR-71 Blackbird': 'deep flat black radar-absorbing finish — near-total light absorption with subtle blue-purple shimmer from titanium substrate',
    'Concorde': 'brilliant white with reflective aluminum underbelly — pure white anti-flash paint upper, polished mirror-finish aluminum lower',
    'B-2 Spirit Bomber': 'dark charcoal grey stealth coating — flat light-absorbing dark grey, almost black, with subtle seam variations',
    'Spitfire': 'RAF Dark Earth and Dark Green camouflage over Sky Blue underside — authentic WWII matte olive-brown and forest-green patches',
    'Apache Helicopter': 'US Army olive drab green — flat matte military green with brown-khaki undertones',
    'A-10 Warthog': 'European One camouflage — two-tone dark green and medium green matte patches with dark grey undersides',
    'F-14 Tomcat': 'low-visibility tactical grey two-tone — lighter compass ghost grey upper, darker gunship grey underneath',
    'P-51 Mustang': 'bare polished aluminum with invasion stripes — mirror-bright unpainted aluminum with bold black and white D-Day stripes',
    'Tyrannosaurus Rex': 'deep earthy dark brown-green with amber undertones, darker charcoal striping along the spine, lighter sandy-tan underbelly — painted metallic surface preserving natural color zones',
    'Velociraptor': 'mottled olive-green and sandy-tan camouflage — dark forest green back with irregular tan patches, lighter cream underbelly as painted metallic',
    'Triceratops': 'dusty slate grey-brown base with darker charcoal frill markings — earthy elephant-grey body with distinctive darker neck frill patterns on metal',
    'Brachiosaurus': 'warm earth-green with golden-brown highlights — deep olive green back fading to warm sandy-brown sides and cream underbelly painted over metal',
    'Stegosaurus': 'rugged grey-green with rust-orange plate accents — muted grey-green body with back plates in warm burnt-orange metallic',
    'Pteranodon': 'sandy tan-brown with darker wingtip markings — warm light brown body with darker chocolate-brown wing edges on metal panels',
    'Spinosaurus': 'dark teal-green with crimson sail markings — deep blue-green body with iconic dorsal sail in striking red-orange gradient on metal',
    'Ankylosaurus': 'rocky brown-grey armored coloring — dense grey-brown like weathered stone with darker borders between armor plates as metallic finish',
    'Diplodocus': 'warm grey-green with soft brown banding — gentle olive-grey base with subtle horizontal darker bands painted on metal',
    'Parasaurolophus': 'forest green with golden-yellow crest highlight — rich green body with distinctive head crest in bright amber-gold on metal',
    'Lion': 'rich golden-tawny mane with warm amber body — deep sun-gold mane, warm sandy-amber body, darker honey-brown underbelly painted on metal',
    'Wolf': 'silver-grey agouti pattern — mixed dark charcoal and light silver-grey with white chest and muzzle markings on metallic surface',
    'Eagle': 'deep chocolate brown body with brilliant white head — rich dark brown body and wings, pure white head, golden-yellow beak on metal',
    'Tiger': 'vivid orange with black stripe pattern — bright burnt-orange base with bold black stripes, white underbelly painted on metallic panels',
    'Bear': 'deep rich dark brown — warm chocolate-brown all over with subtle darker and lighter muscle patches, classic grizzly coloring on metal',
    'Horse': 'sleek chestnut bay — warm reddish-brown body with darker black mane, tail, and lower legs on metallic surface',
    'Elephant': 'weathered grey with subtle brown-dust tones — elephant-skin grey with earthy dust-brown in creases as textured painted metal',
    'Gorilla': 'deep jet black with silvery-grey saddle back — intense black body with iconic silver-grey back patch on metal',
    'Shark': 'counter-shaded steel blue-grey top fading to white underneath — dark blue-grey dorsal, pure white ventral on metal',
    'Rhino': 'thick slate grey — heavy dense charcoal-grey like weathered stone with subtle fold lines between armor-like skin plates on metal',
    'Bald Eagle': 'deep chocolate brown body with brilliant white head — rich dark brown, pure white head plumage, golden-yellow beak on metal',
    'Peregrine Falcon': 'blue-grey back with barred white chest — slate blue-grey upper body, cream-white breast with fine dark barring on metal',
    'Owl': 'mottled tawny-brown with cream spots — warm brown with irregular cream and white spots, golden-yellow eye circles on metal',
    'Hummingbird': 'iridescent emerald green with ruby throat — brilliant metallic green back, vivid ruby-red gorget, white breast as painted shimmer',
    'Phoenix (Mythical)': 'blazing gradient from deep crimson core to bright gold-orange wing tips — fiery red through orange to brilliant gold as dramatic metallic gradient',
    'Raven': 'deep iridescent blue-black — jet black base with purple and blue-green iridescent sheen, like oil on obsidian',
    'Hawk': 'rich rufous-brown back with cream-barred chest — warm reddish-brown upper body, cream breast with brown streaking on metal',
    'Parrot': 'vivid scarlet red with blue and yellow wing accents — bright red body, cobalt blue wings, brilliant yellow shoulders on metal',
    'Crane': 'elegant white body with black wing tips and red crown — pure white plumage, jet black primaries, vivid red crown on metal',
    'Peacock': 'iridescent royal blue body with green-gold tail eye spots — intense blue neck, fan tail in metallic green-gold with eye-spot patterns',
    'Blue Whale': 'mottled blue-grey with lighter underbelly — deep slate blue-grey on top with subtle mottling, paler blue-white underneath on metal',
    'Great White Shark': 'counter-shaded dark grey-blue top and white bottom — dark blue-grey dorsal, pure white ventral on metal',
    'Octopus': 'mottled reddish-brown with cream suckers — warm copper-red to brown with cream-colored sucker undersides on metal',
    'Manta Ray': 'jet black dorsal with white ventral — deep black top, clean white underside with dark mouth markings on metal',
    'Sea Turtle': 'rich olive-brown shell with golden-yellow skin — warm olive-brown carapace with radiating pattern, golden-tan skin on metal',
    'Hammerhead Shark': 'grey-brown dorsal fading to white belly — olive-grey to brown top, white underneath on metal',
    'Dolphin': 'sleek dark grey back with lighter grey sides and white belly — three-tone grey gradient on metal',
    'Orca': 'bold black and white pattern — jet black body with distinctive white eye patches, white chin, grey saddle patch on metal',
    'Seahorse': 'warm coral-orange with lighter belly — bright orange to peach body with tiny darker speckles on delicate metal',
    'Jellyfish': 'translucent pale blue-violet with white tentacles — ethereal light purple-blue bell with trailing white tendrils as semi-transparent metal effect',
    'Scorpion': 'dark glossy black-brown — deep near-black brown with subtle glossy chitinous sheen on segmented metal',
    'Praying Mantis': 'vivid leaf green — bright natural green matching fresh foliage with slightly darker joints on articulated metal',
    'Beetle': 'iridescent metallic green-gold — brilliant sheen shifting between emerald green and gold, jewel beetle coloring as actual metallic paint',
    'Dragonfly': 'iridescent blue-green body with transparent amber wings — shimmering blue-green thorax, amber-tinted wing panels on metal',
    'Spider': 'glossy jet black with red hourglass marking — deep shiny black body, bold red hourglass on abdomen on metal',
    'Butterfly': 'vivid orange with black vein patterns and white spots — bright monarch orange wings with bold black veining on metal panels',
    'Ant': 'dark reddish-brown — deep mahogany red-brown with darker head and legs on segmented metal',
    'Wasp': 'bold black and yellow stripes — alternating jet black and bright yellow warning bands on metal',
    'Centipede': 'dark reddish-brown with orange legs — deep brown body segments with bright orange-yellow legs on articulated metal',
    'Moth': 'dusty grey-brown with subtle eye spot markings — muted warm grey wings with darker border and faint eye-spots on metal',
    'Eiffel Tower': 'distinctive Eiffel Tower brown — warm bronze-brown paint with subtle gradient from darker base to lighter top',
    'Taj Mahal': 'luminous white marble — pure milky white with subtle warm ivory undertones and faint grey veining as painted metallic',
    'Colosseum': 'warm travertine stone beige — sandy cream-beige like aged Roman travertine with subtle orange-warm patches',
    'Empire State Building': 'warm limestone grey with Art Deco chrome accents — grey-beige limestone panels with polished silver-chrome trim',
    'Burj Khalifa': 'reflective silver-blue glass curtain wall — mirrored blue-silver panels reflecting sky tones with silver-grey structural spine',
    'Big Ben': 'golden-tan stone with dark green and gold accents — warm honey-colored stone with famous dark green and gold clock details',
    'Golden Gate Bridge': 'International Orange — the specific vivid red-orange (#C0362C) used on the real Golden Gate Bridge',
    'Sydney Opera House': 'brilliant white with cream sail tiles — pure white ceramic tile pattern on sail roofs, warm concrete-grey base',
    'Parthenon': 'aged white marble with golden-warm patina — creamy white Pentelic marble with warm honey-gold age toning',
    'Great Wall Tower': 'grey stone and earth-brown mortar — cool grey stone blocks with warm brown mortar lines, aged and weathered',
    'Humanoid Robot': 'clean white polymer with blue LED accent lines — glossy white body panels with electric cyan-blue illuminated panel lines',
    'Spider Mech': 'military olive drab with hazard-yellow joint markings — flat military green with yellow-black chevron patterns',
    'Battle Mech': 'desert tan camouflage with worn red markings — sandy tan base with darker brown patches and faded red unit marks',
    'Drone Walker': 'matte dark grey with orange sensor accents — charcoal grey body with bright safety-orange sensor eyes',
    'Industrial Arm': 'safety yellow with black warning stripes — bright industrial yellow with black diagonal warning stripes, FANUC-style',
    'Nano Robot': 'polished chrome-silver with blue circuit trace patterns — mirror-bright silver with etched glowing blue circuit traces',
    'Tank Mech': 'woodland green camouflage with rust patches — dark green camo with brown-rust weathering at exposed edges',
    'Scout Drone': 'matte black with red operational indicators — stealth black body with small red LED status lights',
    'Exoskeleton': 'gunmetal grey frame with neon green bio-interface pads — dark grey structural frame with bright green padded contacts',
    'AI Core Unit': 'deep black glass with pulsing white light core — obsidian black outer shell with visible bright white-blue inner light',
    'Katana': 'mirror-polished tamahagane steel blade with visible hamon temper line, white ray-skin handle with dark silk cord, brass habaki collar',
    'Longsword': 'polished carbon steel blade — bright silver steel, brown leather-wrapped grip, polished steel crossguard and pommel',
    'Viking Axe': 'dark forged iron head with ash wood handle — dark grey-black iron with visible forge marks, warm light-brown ash wood',
    'War Hammer': 'heavy dark steel head with oak handle — dark burnished steel hammerhead, warm brown oak shaft with leather grip',
    'Trident': 'golden bronze with sea-green patina — warm antiqued bronze-gold with hints of green verdigris patina, Poseidon-style',
    'Scimitar': 'Damascus steel blade with gold inlay — swirling dark and light Damascus pattern, gold arabesque inlay, dark horn grip',
    'Dagger': 'bright polished steel with ebony handle — mirror-finish steel blade with jet-black ebony wood handle and silver bolsters',
    'Halberd': 'dark steel head with red-stained oak shaft — blackened steel blade and spike, deep red-brown stained oak pole',
    'Spear': 'leaf-shaped bronze spear point with ash shaft — warm golden-bronze broad spearhead, pale ash wood shaft, Greek hoplite style',
    'Claymore': 'grey steel blade with blue leather grip — broad grey steel blade with fuller groove, royal blue leather-wrapped grip',
    'Electric Guitar': 'classic three-tone sunburst — cherry red edges through amber to golden-yellow center, chrome pickups and hardware',
    'Grand Piano': 'glossy jet black lacquer — deep piano black with mirror-like gloss, white ivory keys, brass string frame',
    'Violin': 'warm amber-brown varnish — rich honey-amber to darker brown graduated varnish with visible wood grain, Stradivarius-style',
    'Drum Kit': 'pearl white wrap with chrome hardware — shimmering white pearl shells with polished chrome lugs and rims',
    'Saxophone': 'warm gold lacquer — bright brass-gold lacquered body with polished key mechanisms, classic alto sax finish',
    'Trumpet': 'brilliant silver-plated — mirror-bright silver plating over brass with visible valve casings, professional silver trumpet',
    'Cello': 'deep reddish-brown varnish — rich dark cherry to warm brown graduated varnish showing figured maple grain',
    'Acoustic Guitar': 'natural wood top with dark rosewood sides — pale spruce soundboard with darker rosewood sides, tortoiseshell pickguard',
    'Harp': 'gilded gold with natural wood pillar — ornate gold-leaf decorative top, warm maple wood soundboard',
    'Flute': 'polished sterling silver — bright mirror-finish silver with precision key mechanisms',
    'Dragon': 'deep emerald green scales with amber-gold underbelly and crimson wing membranes — dramatic mythical coloring on metal',
    'Griffin': 'golden-brown eagle upper with tawny lion lower — rich golden-brown feathered head transitioning to warm tawny fur body',
    'Kraken': 'deep purple-black with bioluminescent blue markings — dark abyssal purple with glowing cyan spots and tentacle patterns',
    'Pegasus': 'pure brilliant white with silver wing feathers — pristine white body with metallic silver-white wing plumage',
    'Hydra': 'dark swamp green with yellow-green belly scales — murky dark green with toxic-looking yellow-green underbelly accents',
    'Chimera': 'tricolor: lion gold body, goat grey mid-section, serpent dark green tail — three-creature coloring zones',
    'Basilisk': 'venomous green-yellow scales with dark emerald crown crest — toxic bright green with darker crown marking',
    'Cerberus': 'charcoal black with ember-orange eyes and muzzle glow — dark black triple-headed hound with fiery orange accents',
    'Minotaur': 'dark brown hide with bronze armor accents — deep brown bull-body with Minoan bronze chest plate and arm bands',
    'Wyvern': 'slate grey-blue with crimson wing webbing — cold blue-grey body scales with vivid red membranous wing panels',
    'Formula 1 Car': 'the authentic racing livery of this specific car — accurate team/manufacturer colors with racing number graphics',
    'NASCAR Stock Car': 'bold multi-sponsor racing livery — vivid primary colors with multiple sponsor decals and racing numbers',
    'Rally Car': 'Subaru World Rally Blue with gold wheels — the iconic WRC blue and gold combination',
    'Go-Kart': 'bright racing red with white racing stripes — classic karting red with bold white accent stripes',
    'Steam Locomotive': 'glossy black boiler with red wheels and gold trim — classic steam engine black, bright red driving wheels, brass fittings',
    'Bullet Train': 'pristine white with blue racing stripe — clean white body with signature blue accent line, Shinkansen style',
    'Football Helmet': 'team-specific colors with facemask chrome — bold team primary color with chrome or grey facemask cage',
    'Skateboard': 'natural maple deck with colorful grip tape art — light wood underside with vibrant artwork on top surface',
    'Swiss Army Knife': 'iconic Victorinox red with silver tools — bright Swiss red handle scales with polished steel tool blades',
    'Pocket Watch': 'polished gold case with white enamel face — warm gold exterior with classic white dial and black numerals',
  };

  // Color fallbacks by category
  const CATEGORY_COLOR_DEFAULTS = {
    automobiles: 'the exact real-world factory paint color of this specific vehicle — with accurate metallic flake, correct clearcoat gloss, and precise factory color-matched finish',
    aircraft: 'the exact operational paint scheme of this specific aircraft — accurate military or airline livery colors with correct panel tone variations',
    spacecraft: 'the authentic color scheme of this spacecraft — thermal blanket gold, white thermal paint, and natural metal tones as on the real vehicle',
    dinosaurs: 'scientifically plausible natural coloring based on best paleontological reconstructions — earthy and naturalistic tones painted on metallic surface',
    animals: 'the exact natural coat/skin coloring of this animal species — accurate color patterns, markings, and gradients as seen in nature, painted on metal',
    birds: 'the exact natural plumage coloring of this bird species — accurate feather patterns and iridescence where applicable, painted on metal',
    marine: 'the exact natural coloring of this marine species — accurate skin/scale patterns and counter-shading as in the wild, painted on metal',
    insects: 'the exact natural coloring of this insect species — accurate exoskeleton colors, wing patterns, and markings painted on metal',
    architecture: 'the exact real-world material colors of this building — accurate stone, glass, metal, or paint colors as on the actual structure',
    robots: 'a futuristic industrial finish — matte primary body with gloss accent panels and colored operational indicators',
    weapons: 'the authentic material colors of this weapon type — accurate blade steel, handle material, and decorative elements',
    instruments: 'the authentic finish of this instrument — accurate wood varnish, lacquer, plating, or paint as on a professional-grade version',
    racing: 'the authentic racing livery — accurate team/manufacturer colors with racing graphics rendered as painted metallic',
    trains: 'the authentic livery of this train — accurate railway company colors and operational markings',
    armor: 'the authentic material finish — accurate steel, bronze, leather, and decorative colors as on a museum-quality historical piece',
    heavy_machinery: 'the authentic manufacturer paint scheme — typically Caterpillar yellow, Komatsu blue, or brand-specific colors with safety striping',
    tanks: 'the authentic military camouflage — accurate olive drab, desert tan, or woodland camo as used by the operating nation',
    electronics: 'the authentic consumer product coloring — accurate housing colors, button accents, and brand-specific design language',
    fantasy: 'a mythologically-inspired color scheme based on classical artistic depictions — dramatic vivid colors appropriate to the creature\'s legends, painted on metal',
    space_vehicles: 'the authentic color scheme from the source material — accurate hull colors, accent lighting, and faction markings from the original franchise',
    sports: 'the authentic coloring of this sports equipment — accurate material colors for leather, rubber, carbon fiber as on professional-grade gear',
    tools: 'the authentic product coloring — accurate housing colors, handle materials, and brand-typical design',
  };

  function getOriginalColor(category, subject) {
    if (ORIGINAL_COLORS[subject]) return ORIGINAL_COLORS[subject];
    const catDefault = CATEGORY_COLOR_DEFAULTS[category];
    if (catDefault) return catDefault.replace('this specific', `the ${subject}`).replace('this animal', `the ${subject}`).replace('this bird', `the ${subject}`).replace('this marine', `the ${subject}`).replace('this insect', `the ${subject}`).replace('this building', subject).replace('this weapon', subject).replace('this instrument', subject).replace('this train', subject).replace('this armor', subject).replace('this spacecraft', subject).replace('this aircraft', subject);
    return `the exact real-world original color scheme of ${subject} — with accurate natural/factory colors, correct material finishes, and precise color-matching as seen in reality, all painted faithfully on the metallic mechanical surface`;
  }

  // ─── DEPLOYMENT STYLES ─────────────────────────
  const DEPLOYMENT_STYLES = [
    {
      id: 'sequential_unfold', name: 'Sequential Unfold', animClass: 'anim-sequential',
      desc: 'Parts unfold one after another in precise sequence.',
      promptDetail: 'Each segment lifts on its micro-hinge, rotates with a smooth metallic creak proportional to rotation speed, and clicks into final locked position with a sharp ringing metallic SNAP before the next segment begins. The sequence flows from base upward creating a wave-like mechanical cascade. Every joint makes a distinct resonant "tick" as it locks — each tick at a slightly different pitch based on the size of the locking mechanism. Even the smallest 1mm micro-panel shifting produces a faint but clearly audible metallic whisper. The sequential timing creates a rhythmic mechanical melody — tick, SNAP, tick, SNAP — each sound crisper than the last.'
    },
    {
      id: 'radial_bloom', name: 'Radial Bloom', animClass: 'anim-radial',
      desc: 'All parts deploy outward from center like a mechanical flower.',
      promptDetail: 'All segments radiate outward from the central core simultaneously, pushed by whirring micro-actuators that produce a collective harmonic mechanical hum — like a miniature engine room. The pieces fan out in a perfect radial pattern like petals of a metal flower. Each piece rotates on its bearing (smooth metallic purr audible individually) as it moves outward, then clicks into position with a satisfying mechanical CLACK. The combined whirring of multiple micro-motors creates a building harmonic chord that crescendos at maximum extension, then resolves into a staccato burst of locking clicks as every piece seats simultaneously.'
    },
    {
      id: 'cascade_reveal', name: 'Cascade Reveal', animClass: 'anim-cascade',
      desc: 'Parts cascade top-to-bottom like a waterfall.',
      promptDetail: 'The topmost layer lifts first, pulling connected segments upward and outward in a cascading waterfall effect — each tier triggers the tier below through mechanical linkage with momentum transfer. The motion flows downward like precision dominos, with each layer producing a progressively DEEPER resonant click than the last — creating a descending musical scale of metallic tones that spans from bright high-pitched "tink" at the top to a bass "CLUNK" at the base. The cascading clicks build into a descending chromatic run of mechanical notes. Each linkage rod sliding produces a smooth metallic drawer-slide whisper.'
    },
    {
      id: 'spiral_assembly', name: 'Spiral Assembly', animClass: 'anim-spiral',
      desc: 'Parts spiral outward while rotating into position.',
      promptDetail: 'Parts unwind from the abstract in a spiral/helix pattern, each piece following a curved trajectory while spinning on its micro-bearing — creating a visual tornado of unfolding metal. The bearing rotation produces a smooth continuous metallic purr that rises in pitch as rotation speed increases. Each piece clicks into its designated slot with a spring-loaded SNAP that rings with brief metallic overtones. The combined spiral motion creates layered sounds — the base purr of bearings, the mid-range whirr of motors, and the sharp high-frequency clicks of latches engaging in a mesmerizing mechanical symphony.'
    },
    {
      id: 'butterfly_split', name: 'Butterfly Split', animClass: 'anim-butterfly',
      desc: 'Two halves split and unfold like butterfly wings.',
      promptDetail: 'The abstract splits perfectly along its center axis with a loud, satisfying metallic CRACK — like snapping a precision-machined seal. Both mirror-image halves swing open on central hinges simultaneously, producing synchronized creaking metallic groans of heavy metal rotating. As the halves open, internal segments unfold from within each side with their own cascade of clicks. The symmetrical motion is perfectly synchronized — both sides move at identical speeds producing stereo mechanical sounds that create an immersive spatial audio experience. The splitting CRACK echoes with a 0.3-second metallic ring.'
    },
    {
      id: 'accordion_expand', name: 'Accordion Expand', animClass: 'anim-accordion',
      desc: 'Compressed layers expand like an accordion.',
      promptDetail: 'The abstract stretches along its primary axis like a mechanical accordion being pulled open. Compressed layers separate with zigzag linkages straightening, each fold opening with precise geometric motion. Segments slide on precision tracks with a distinctive friction-whisper of polished metal on polished metal — a smooth, continuous SHHHHH sound that rises and falls with sliding speed. Telescopic sections extend with each segment locking at full extension — producing rhythmic click-SHHHH-click-SHHHH patterns. The sliding sounds are deeply satisfying ASMR — like drawing a polished blade from a metal sheath.'
    },
    {
      id: 'domino_chain', name: 'Domino Chain', animClass: 'anim-domino',
      desc: 'Chain reaction — each part triggers the next.',
      promptDetail: 'One initial piece moves first, and through mechanical chain-reaction, each piece triggers its neighbor to deploy. The motion propagates through the entire structure like a wave of precision mechanical dominos. Each piece flips, rotates, or slides into position — its final locking motion releases a spring-loaded catch that starts the next piece. Every catch-release makes a tiny spring-loaded "TINK" (sharp, metallic, with a brief ring) followed immediately by the next piece moving with its own motor whirr. The chain of mechanical clicks builds into an accelerating crescendo — TINK-whirr-TINK-whirr-TINK-whirr, each faster than the last.'
    },
    {
      id: 'telescopic_extension', name: 'Telescopic Extension', animClass: 'anim-telescopic',
      desc: 'Nested sections extend outward like a telescope.',
      promptDetail: 'Nested sections extend outward from the core like a precision telescope — each inner section pushing the outer section. Each telescopic stage slides with a smooth metallic drawer-slide sound (the satisfying SHHH of precision-machined rails) and locks at full extension with a heavy decisive CLICK that reverberates through the entire structure. Each subsequent stage extends from within the previous one, creating a Russian-doll reveal of increasing detail. The sliding sounds get progressively softer as sections get smaller, while the locking clicks maintain their satisfying weight.'
    },
    {
      id: 'origami_unfold', name: 'Origami Unfold', animClass: 'anim-origami',
      desc: 'Paper-fold style with geometric precision.',
      promptDetail: 'Flat panels unfold along precisely scored fold lines, like mechanical origami made of real metal. Each panel swings open on its scored hinge to reveal the panel beneath, which then unfolds in turn. The motion is geometric and angular — clean 90° and 45° rotations along scored metal lines. Each fold produces a sharp, crisp metallic crease-SNAP as it locks flat — like a metallic finger-snap that rings with crystalline clarity. The geometric precision creates a deeply satisfying visual and auditory pattern — SNAP, pause, SNAP, pause — each fold revealing surprising new detail underneath.'
    },
    {
      id: 'mechanical_gearwork', name: 'Mechanical Gearwork', animClass: 'anim-gearwork',
      desc: 'Visible gears drive sequential deployment.',
      promptDetail: 'Visible micro-gears drive the entire deployment with clockwork precision. Interlocking gears translate rotational motion into linear extension — cam mechanisms push segments outward at precisely timed intervals. The deployment has a clockwork quality — smooth continuous rotation converting into stepped mechanical movements. The rhythmic tick-tick-tick-tick of gear teeth meshing creates a mechanical heartbeat that underlies the entire transformation. The gear sounds are hypnotic and deeply satisfying — each tooth engagement producing its own tiny metallic click, hundreds per second, creating a continuous mechanical purr with rhythmic accents.'
    },
    {
      id: 'hydraulic_press_reverse', name: 'Hydraulic Press Reverse', animClass: 'anim-sequential',
      desc: 'Parts push outward with hydraulic force.',
      promptDetail: 'Parts push outward with hydraulic pressure force — slow initial resistance building to smooth powerful extension. Internal pistons drive segments upward and outward, each extension accompanied by a deep pressurized HISS-THUNK as the hydraulic cylinder reaches full extension and the locking pin engages. The movement has visible POWER behind it — heavy parts lifting with controlled deliberate force that you can feel through the screen. Each piston extension produces a deep pressurized HISSSSSS (2-3 seconds) followed by a heavy metallic THUNK that shakes the entire structure. Micro-hydraulic lines visibly flex under pressure.'
    },
    {
      id: 'magnetic_snap', name: 'Magnetic Snap Assembly', animClass: 'anim-radial',
      desc: 'Parts fly apart and magnetically snap into place.',
      promptDetail: 'Segments separate from the abstract with spring-loaded release — each piece pops free with a bright metallic PING that rings like a tiny bell. After hovering momentarily at maximum travel on guide rails, each piece SNAPS decisively into final position with a sharp magnetic CLACK as rare-earth micro-magnets lock it in place. The CLACK is uniquely satisfying — like two strong magnets finding each other with absolute certainty. The combined effect is a staccato burst of PING-pause-CLACK, PING-pause-CLACK — spring releases and magnetic connections creating a call-and-response mechanical dialogue.'
    },
    {
      id: 'shrapnel_reverse', name: 'Reverse Explosion', animClass: 'anim-radial',
      desc: 'Like an explosion in reverse — parts rush inward and assemble.',
      promptDetail: 'All pieces spring outward simultaneously from the core in a controlled burst, reaching maximum displacement — then immediately reverse direction, rushing back inward but this time each piece locks into its DEPLOYED position. The effect is like watching a freeze-frame explosion reverse into a perfectly assembled form. The initial burst produces a sharp metallic CRACK like breaking a ceramic plate made of metal. The reverse assembly produces a rapid-fire machine-gun cascade of locking clicks — TAT-TAT-TAT-TAT — as every piece finds its place in under one second. The final unified CLANG of all pieces setting simultaneously is the loudest sound in the entire deployment sequence.'
    },
    {
      id: 'layer_peel', name: 'Layer Peel', animClass: 'anim-cascade',
      desc: 'Outer layers peel away revealing detail underneath.',
      promptDetail: 'The outermost shell peels away first — panels lift at one edge and curl back on living hinges, revealing the next layer underneath. Each layer peels to expose finer detail beneath, like unwrapping a precision-machined gift. The peeling produces a smooth metallic sliding sound — like slowly drawing a credit card from a polished metal case — SHHHHH — followed by a soft click as the peeled panel locks into its deployed position. Each peeled layer reveals surprising complexity underneath, creating a visual and auditory reveal that builds anticipation with each layer removed.'
    },
    {
      id: 'puzzle_lock', name: 'Puzzle Lock', animClass: 'anim-gearwork',
      desc: '3D puzzle pieces rotate and interlock precisely.',
      promptDetail: 'Each segment is a precision 3D puzzle piece that must rotate to a specific orientation before sliding into its interlocking position. One piece rotates with a ratcheted clicking (tick-tick-tick as it passes through detent positions), then slides into the newly created slot with a deep satisfying CHUNK as dovetail joints mate perfectly — the sound of precision-machined metal fitting together with zero tolerance. The rotate-slide-lock sequence creates uniquely complex mechanical sounds — the anticipation of the ratcheting, then the deeply satisfying CHUNK of perfect mechanical union.'
    },
    {
      id: 'centrifugal_deploy', name: 'Centrifugal Spin Deploy', animClass: 'anim-spiral',
      desc: 'Spinning motion throws parts outward into position.',
      promptDetail: 'The abstract begins spinning on its vertical axis — slowly at first then accelerating with a rising-pitch mechanical WHIRRRR that climbs from a low hum to a high-frequency whine. As rotational speed increases, centrifugal force pushes segments outward along radial guide tracks. Parts extend while spinning — each locking at full extension with a centrifugal latch CLICK audible above the whirring. The spinning gradually slows as more parts lock — the descending pitch of the decelerating whirr creating a satisfying wind-down that ends in perfect stillness and complete silence.'
    },
  ];

  // ─── THEME PRESETS (kept for optional metallic override) ──
  const THEME_PRESETS = [
    { id: 'original', name: 'Original Colors', colors: ['#f0f0f0', '#a0a0a0', '#606060'], gradient: 'linear-gradient(135deg, #f0f0f0, #a0a0a0)' },
    { id: 'brushed_steel', name: 'Brushed Steel', colors: ['#8a9bae', '#5c6b7a', '#c0c8d0'], gradient: 'linear-gradient(135deg, #8a9bae, #5c6b7a)' },
    { id: 'midnight_chrome', name: 'Midnight Chrome', colors: ['#2c3e50', '#1a1a2e', '#4a6fa5'], gradient: 'linear-gradient(135deg, #2c3e50, #1a1a2e)' },
    { id: 'rose_gold', name: 'Rose Gold', colors: ['#b76e79', '#e8b4b8', '#8e4a52'], gradient: 'linear-gradient(135deg, #b76e79, #e8b4b8)' },
    { id: 'gunmetal', name: 'Gunmetal', colors: ['#2c3539', '#536878', '#3d4f58'], gradient: 'linear-gradient(135deg, #2c3539, #536878)' },
    { id: 'obsidian_gold', name: 'Obsidian & Gold', colors: ['#1a1a1a', '#ffd700', '#333333'], gradient: 'linear-gradient(135deg, #1a1a1a, #ffd700)' },
    { id: 'matte_black', name: 'Matte Black', colors: ['#1c1c1c', '#2d2d2d', '#0d0d0d'], gradient: 'linear-gradient(135deg, #1c1c1c, #2d2d2d)' },
  ];

  // ─── HELPERS ──────────────────────────────────

  function getAbstractDesc(shapeId, subject) {
    const shape = ABSTRACT_SHAPES.find(s => s.id === shapeId);
    if (!shape) return ABSTRACT_SHAPES[0].promptDesc(subject);
    return shape.promptDesc(subject);
  }

  function getThemeDesc(themeId, customColor, category, subject) {
    if (themeId === 'original' || !themeId) {
      return getOriginalColor(category, subject);
    }
    if (themeId === 'custom' && customColor) {
      return `a custom metallic finish in ${customColor} — luxurious high-end metallic sheen with subtle reflective highlights, consistent across the entire body`;
    }
    const descMap = {
      brushed_steel: 'brushed stainless steel with fine directional grain — cool industrial blue-gray with subtle reflective streaks',
      midnight_chrome: 'deep midnight blue chrome — almost black with rich navy metallic depth, ultra-glossy mirror-like reflections',
      rose_gold: 'warm rose gold metallic — pink-copper tones with soft luxurious warmth and delicate reflective highlights',
      gunmetal: 'dark gunmetal gray — dense muted charcoal metallic with matte-satin surface and controlled reflections',
      obsidian_gold: 'dramatic obsidian black with gold-plated accent edges and detail lines — luxury two-tone contrast',
      matte_black: 'pure matte black — zero reflections, deep light-absorbing darkness, ultra-modern stealth aesthetic',
    };
    return descMap[themeId] || descMap.brushed_steel;
  }

  function getDeploymentDesc(styleId, subject, numParts, durationSec) {
    const style = DEPLOYMENT_STYLES.find(s => s.id === styleId);
    if (!style) return '';
    const timePerPart = (durationSec / numParts).toFixed(1);
    return `DEPLOYMENT STYLE — "${style.name}": ${style.promptDetail} The entire ${subject} deploys in exactly ${durationSec} seconds, consisting of ${numParts} major moving segments. Each segment takes approximately ${timePerPart} seconds to fully deploy and lock into position. EVERY movement, no matter how small — even a 1mm micro-panel adjusting, even a tiny hex-bolt rotating a quarter-turn — produces its own corresponding real mechanical sound at appropriate volume. There is ZERO silent motion. If metal moves, metal sounds. The sounds have natural room acoustics and decay.`;
  }

  function getSubjectDetails(category, subject) {
    const isLiving = ['dinosaurs', 'animals', 'birds', 'marine', 'insects', 'fantasy'].includes(category);
    let livingNote = '';
    if (isLiving) {
      livingNote = `\n\nCRITICAL LIVING-SUBJECT RULE: "${subject}" is a living creature in reality, but THIS IS A NON-LIVING METALLIC MECHANICAL TOY SCULPTURE. Zero life — no breathing, no eye movement, no organic texture, no muscle flex, no skin ripple, no biological animation of any kind. Every anatomical feature is translated into RIGID METAL: muscles become curved metal plates, scales/feathers/fur become etched surface textures on metal, eyes are polished metallic spheres (completely lifeless dead glass-marble-like lenses set in steel sockets). The overall appearance: a master metalworker sculpted ${subject} from precision-machined metal — anatomically perfect but clearly a static, dead, beautiful metal object with zero biological properties.`;
    }
    return `The deployed ${subject} must be HYPER-DETAILED — every real-world feature of the actual ${subject} is present but rendered entirely in precision-machined metal. Surface details include: micro-etched panel lines with 0.1mm precision, tiny hex-bolt heads (varying sizes: M0.5 to M1.5) at every structural joint, visible micro-hinge pins (polished steel dowels) at all articulation points, hairline seam lines (0.05mm gaps) where panels meet, surface texture variations between zones (some panels mirror-polished, some with fine brushed grain, some with micro-peen texture). Scale: palm-sized, 10-12cm at longest dimension when fully deployed. Despite the small size, the detail level is EXTRAORDINARY — comparable to a $500 premium die-cast collectible sculpted by a master artisan. If the real ${subject} has a feature, the metallic toy has a perfect metal equivalent at this scale. No detail is too small to include.${livingNote}`;
  }

  function getSoundRules() {
    return `
═══ ABSOLUTE SOUND RULES — ZERO SILENT MOTION ═══

EVERY physical movement produces corresponding REAL mechanical sound. These sounds come DIRECTLY from the physical object, captured by the phone's internal microphone from 30-50cm away with natural room acoustics. No audio library, no sound effects, no post-processing.

MANDATORY SOUND-TO-MOTION BINDING (every movement type):
• Hinge rotation → smooth metallic creak (pitch proportional to speed, volume proportional to size), ending with a CLICK-LOCK (sharp, metallic, with 0.1-0.3s ring decay)
• Sliding on track → continuous metallic whisper/SHHH (pitch rises with speed increase, volume proportional to contact area)
• Spring release → sharp metallic PING or TWANG (high-pitched, clear, with 0.5s bell-like decay ring)
• Latch engaging → crisp metallic CLICK or SNAP (decisive, sharp attack, 0.1s decay, satisfying finality)
• Gear teeth meshing → rhythmic tick-tick-tick at gear rotation speed (each tick at slightly different pitch from gear tooth variation)
• Motor running → continuous whirr/hum (pitch proportional to RPM, smooth and steady, slight vibrato from mechanical resonance)
• Heavy piece settling → deep metallic THUD with 0.4s vibration ring-out (bass-heavy, felt through desk surface)
• Light piece locking → high-pitched metallic tick (bright, brief, crystalline)
• Magnetic connection → sharp decisive CLACK (loud, authoritative, 0.2s ring)
• Hydraulic piston → pressurized HISSSSS (2-3 second sustained) followed by mechanical THUNK (heavy, with structural resonance)
• Ball-bearing rotation → smooth continuous metallic purr (pitch rises with speed, deeply satisfying constant tone)
• Metal-on-metal sliding → smooth friction whisper (like drawing a blade from a metal sheath)
• Panel flexing → subtle metallic stress creak (barely audible but present, adds realism)
• Final complete lock → decisive heavy CLUNK with 0.5s reverb (THE most satisfying sound — heavy, final, echoing briefly off the desk surface)

MICRO-SOUND RULE: Movements smaller than 2mm still produce audible sound. A tiny hex-bolt quarter-turn makes a faint tick. A micro-panel shifting 1mm makes a whisper. Dozens of simultaneous micro-adjustments create a rich layered ASMR soundscape — like rain on a metal roof, each drop distinct but creating a tapestry.

AMBIENT: Between movements, near-silence — only faintest room tone. This contrast makes each mechanical sound VIVID. The silence IS part of the ASMR.

VOLUME HIERARCHY: Button click (LOUDEST) > Final deployment lock > Heavy segment movements > Medium latches > Small clicks > Micro-adjustments (softest but still audible)`;
  }

  function getAIProblemPrevention() {
    return `
═══ CRITICAL RULES TO PREVENT AI VIDEO GENERATION PROBLEMS ═══

1. ABSOLUTELY NO TEXT/NUMBERS ON SCREEN: Zero measurements, dimensions, labels, brand names, watermarks, or writing anywhere. No HUD, overlays, subtitles. The video is purely visual with mechanical sound.

2. OBJECT PERMANENCE — FIXED POSITION: The abstract/subject stays at the EXACT same desk coordinates throughout all 10 seconds. Only internal parts move — the base footprint is welded to its position from frame 1 to frame 300. Zero drift, zero slide, zero rotation of the whole object.

3. CONSISTENT LIGHTING: Single soft overhead light source, fixed position, fixed intensity, fixed color temperature throughout all 300 frames. No flickering, no light changes, no shadow jumping. Shadows are soft, realistic, and directionally consistent.

4. REAL PHYSICS: Every part obeys physics — weight, momentum, inertia, gravity. No floating, no teleporting, no clipping through other parts. Hinges rotate on fixed axes. Slides follow tracks. Heavy parts move slower with visible inertia. Light parts snap crisply. Parts that extend far oscillate briefly then dampen.

5. HAND CONTINUITY: Same hand throughout (skin tone, fingers, nails). Enters left, interacts, exits left. Hand has natural weight — adjusts grip on the heavy metal object realistically.

6. CAMERA: Subtle organic handheld micro-shake throughout — never still, never dramatic. Consistent with a person holding a phone. No zooms, no focus pulls, no perspective changes, no focal length changes. Angle stays 45-60° ±2°.

7. DESK CONSISTENCY: Same desk surface every frame — same scratches, scuff marks, color. Zero morphing or texture changes. Frame 1 scratches = Frame 300 scratches.

8. SHADOW ACCURACY: Shadow shape changes as parts deploy but direction and softness stay constant with the fixed light source. Shadows are soft and natural.

9. MATERIAL CONSISTENCY: The metallic finish of every part stays identical throughout. No color shifting, no texture morphing. Same panel = same reflectivity from first visible frame to last.

10. SOUND-VISUAL SYNC: Every movement has sound. Every sound has visible cause. Zero silent motion. Zero phantom sounds.

11. PART COUNT CONSERVATION: All parts in the final form were contained in the abstract. No matter appearing or disappearing. Conservation of mass.

12. SCALE CONSISTENCY: Abstract = half-palm-sized. Deployed = palm-sized. Growth comes from UNFOLDING, not scaling up. Physical size is consistent.

13. SMOOTH MOTION: All motion fluid and continuous — no stuttering, frame-skipping, or jerky movements. Mechanical motion is precise at consistent frame rate.

14. NO MORPHING: Parts UNFOLD, ROTATE, SLIDE, EXTEND — never MORPH, MELT, DISSOLVE, WARP, or ORGANICALLY TRANSFORM. Metal stays rigid. Panels stay flat. Curves maintain radius. Zero soft-body deformation.

15. NO PHANTOM REFLECTIONS: Reflections match the actual environment — desk, soft light. No impossible reflections.

16. COLOR CONTINUITY: Abstract and deployed subject have IDENTICAL surface color — same object, different configuration. Zero color change during deployment.`;
  }

  function getPartNames(category, subject, count) {
    const generic = (prefix, specifics) => {
      const result = [];
      for (let i = 0; i < count; i++) {
        result.push(i < specifics.length ? specifics[i] : `${prefix} detail segment ${i + 1}`);
      }
      return result;
    };

    const partMap = {
      automobiles: generic('Body', ['Chassis base plate extends and locks flat — the structural spine of the vehicle', 'Wheel assemblies deploy — four wheels fold out from corners on micro-hinges and lock with decisive clicks', 'Body panels unfold upward — doors, roof, and hood panels rotate into position', 'Front fascia extends — headlights (tiny faceted lenses), grille mesh, bumper segments click in', 'Rear section deploys — tail light clusters, exhaust tip cylinders, spoiler/trunk panels emerge', 'Interior cockpit details — miniature seats, steering wheel disc, dashboard panel rise into place', 'Final trim — side mirror stalks pop out, door handle nubs click, badge emblems lock flush', 'Window panels slide into door frames with smooth metallic whisper', 'Engine bay detail extends from front compartment', 'Antenna mast and final micro-details snap into position']),
      aircraft: generic('Fuselage', ['Fuselage center section extends and locks — the main body tube', 'Wings unfold outward from body on main spar hinges — the wingspan extends dramatically', 'Tail section deploys — vertical stabilizer rises, horizontal stabilizers extend', 'Nose cone telescopes forward into final pointed position', 'Engine nacelles deploy from under-wing or fuselage positions', 'Landing gear folds down from belly compartments', 'Cockpit canopy or windshield section rises into position', 'Wing control surfaces — flaps, ailerons, slats snap into position', 'Intake scoops and air vents open with tiny mechanical breaths', 'Final antenna, sensor pods, and detail panels click into place']),
      dinosaurs: generic('Body', ['Torso/ribcage section expands outward — the core body mass forms with visible metallic rib plate articulation', 'Legs unfold downward and lock — powerful limbs with articulated metal joints and visible tendon-cables', 'Tail segments extend sequentially from base to tip — each vertebra-segment clicking into the next', 'Head and neck deploy — skull with individually articulated jaw, teeth as tiny polished metal spikes', 'Arms/forelimbs extend from torso with individual metal finger segments and tiny claw tips', 'Back plates/spines/crest details rise from dorsal surface — each plate on its own micro-hinge', 'Surface texture panels lock — etched scale patterns visible across entire body surface', 'Feet/claws deploy — individual metal toe segments spread and lock with tiny clicks', 'Eye sockets receive polished metallic sphere eyes — lifeless, reflective, beautiful glass-marble-like', 'Final tail tip, nostril detail, and micro-scale texture panels snap into position']),
      animals: generic('Body', ['Core torso expands and forms the main body shape — chest and abdomen metal plates lock', 'Four legs unfold downward and lock into standing position — each joint clicking securely', 'Head extends from body on articulated metal neck — jaw detail with tiny metal teeth points', 'Tail deploys from rear — segments extending sequentially with individual clicks', 'Ears, horns, or mane details rise from head section — each element on its own hinge', 'Jaw/mouth detail deploys — mandible articulates, tiny teeth lock in rows', 'Surface texture panels lock — etched fur/skin patterns visible across the entire metal body', 'Paws/hooves/feet deploy with individual metal toe/pad segments', 'Eye sockets set with polished metallic spheres — completely lifeless reflective orbs', 'Final whiskers (thin wire), claws (tiny metal points), or micro-detail features snap into place']),
      default: generic('Section', ['Base platform extends and locks — the structural foundation', 'Primary structural framework deploys — the skeleton of the form', 'Main body panels unfold and lock into position — the outer shell forms', 'Secondary detail sections extend — features and contours emerge', 'Fine detail components deploy — the character of the subject appears', 'Surface finishing panels click into place — surface detail sharpens', 'Accent and trim pieces lock — the refinement layer completes', 'Final micro-detail elements snap into position — the smallest features appear', 'Structural reinforcement pieces lock — internal rigidity finalizes', 'Topmost finishing elements complete the form — the last details click in']),
    };
    return partMap[category] || partMap.default;
  }

  function getMotionDesc(deployStyle, partIndex, totalParts) {
    const motionSets = {
      sequential_unfold: [
        'lifts on its micro-hinge with a smooth metallic creak (rising pitch over 0.3s), rotates outward with continuous motor whirr, and clicks into locked position with a sharp metallic SNAP that rings for 0.2s. The hinge pin makes a tiny tick as it passes its travel stop.',
        'catches from the previous motion and begins its own rotation — gear teeth engage with audible tick-tick-tick, the micro-motor whirrs at a slightly different pitch. Locks with a decisive metallic CLICK that rings briefly, deeper than the previous snap.',
        'unfolds smoothly on its hinge axis with continuous even whirr from the guiding motor. A faint metallic scraping whisper as the panel slides past an adjacent surface. Locks with a crisp tick — clean, bright, precise.',
        'lifts and rotates in perfect mechanical rhythm — the hinge bearing produces a smooth purr. Each movement deliberate and satisfying. Locking mechanism engages with a spring-loaded CLICK with 0.15s ring.',
        'deploys maintaining the rhythmic pattern — metal surfaces catch and release light as they rotate. Bearing purr blends with motor whirr. Final lock produces a clean decisive snap with brief structural vibration.'
      ],
      radial_bloom: [
        'pushes outward from center with other segments — collective mechanical hum from actuators. Rotates on bearing (smooth metallic purr) while moving outward. Clicks into radial position with a sharp CLACK. Combined motor sound creates harmonic chord.',
        'blooms outward in sync with all segments — the combined motor creates a building harmonic. Fans out like a metal petal with sliding metallic whisper along guide rail. Locks with a satisfying snap that joins the chorus.',
        'extends radially with smooth mechanical push — actuator produces firm purposeful hum. Spins slightly on bearing with audible whirr. All pieces moving together create layered overlapping mechanical sounds. Clicks into position.',
        'finds its radial position with detent mechanism — tick, tick, CLICK as it passes intermediate positions and locks at full extension. The detent clicks create a mechanical countdown.',
        'locks into final position with decisive metallic SNAP — vibration propagates through the metal structure creating a brief harmonic ring that fades in 0.2s.'
      ],
    };
    const motions = motionSets[deployStyle] || motionSets.sequential_unfold;
    return motions[partIndex % motions.length];
  }

  function generatePartStages(category, subject, numParts, deployStyle, startTime, duration) {
    const n = parseInt(numParts);
    const dur = parseInt(duration);
    const timePerPart = dur / n;
    const parts = [];
    const partNames = getPartNames(category, subject, n);

    for (let i = 0; i < n; i++) {
      const t1 = (startTime + i * timePerPart).toFixed(1);
      const t2 = (startTime + (i + 1) * timePerPart).toFixed(1);
      const partName = partNames[i] || `Segment ${i + 1}`;
      const motion = getMotionDesc(deployStyle, i, n);
      parts.push(`Stage ${i + 1} (${t1}s–${t2}s): ${partName} — ${motion}`);
    }
    return parts.join('\n\n');
  }

  // ─── GENERATE MASTER PROMPT ────────────────────
  function generateMasterPrompt(config) {
    const { category, subject, abstractShape, themeId, customThemeColor, deployStyle, transformDuration, numParts, speed } = config;

    const categoryData = CATEGORIES.find(c => c.id === category);
    const categoryName = categoryData ? categoryData.name : category;
    const abstractDesc = getAbstractDesc(abstractShape, subject);
    const colorDesc = getThemeDesc(themeId, customThemeColor, category, subject);
    const deployDesc = getDeploymentDesc(deployStyle, subject, numParts, transformDuration);
    const subjectDetails = getSubjectDetails(category, subject);
    const problemPrevention = getAIProblemPrevention();
    const soundRules = getSoundRules();
    const deployStyleObj = DEPLOYMENT_STYLES.find(s => s.id === deployStyle);
    const deployStyleName = deployStyleObj ? deployStyleObj.name : deployStyle;
    const shapeObj = ABSTRACT_SHAPES.find(s => s.id === abstractShape);
    const shapeName = shapeObj ? shapeObj.name : 'Compressed Cube';

    return `═══════════════════════════════════════════════════════════════
MASTER TRAINING PROMPT — VESTURO ASMR SELF-DEPLOYING TOY SYSTEM
═══════════════════════════════════════════════════════════════

You are going to help me create video prompts for AI video generation models (Google Veo 3, Kling, Runway). Each video prompt must produce a 10-second video of a self-deploying mechanical metallic toy that transforms from a compressed abstract shape into a fully detailed subject. Read every word below with extreme focus — this is the COMPLETE system. Nothing is optional. Every detail matters. The output must be indistinguishable from real raw phone footage of a real physical mechanical toy.

━━━ THE CONCEPT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ASMR content for YouTube Shorts. Palm-sized, hyper-detailed metallic mechanical toys that self-deploy from a compressed abstract shape into a fully formed subject. The audience must NEVER tell this was AI-generated. Every frame must look like real raw phone footage.

The toys are precision-engineered devices:
• MATERIALS: Micro-machined metals — steel alloy (frame), aluminum (panels), magnesium (supports), titanium (hinges/fasteners), tungsten (dampening weights). Real metals with real weight, real grain, real reflections, real machined edges.
• CONSTRUCTION: Multiple rigid metal segments connected by micro-hinges, micro-ball-bearings, and precision track-slides. Internal micro-motors power self-deployment. Each joint is engineered with specific range of motion.
• THE ABSTRACT: The subject, tightly folded and compressed into an abnormal, mysterious shape. Not a simple geometric form — an UNSETTLING, dense, pressure-formed mass that hints at immense stored potential energy. The abstract has the subject's original real-world colors painted on its metallic surface.
• THE BUTTON: One small mechanical push-button on the abstract surface. Pressing it produces the LOUDEST, most satisfying ASMR click in the entire video — a spring-loaded metal striker hitting a tuned resonance plate. Physical mechanism, not electronic.
• DEPLOYMENT: After button press, micro-motors activate. Parts unfold, rotate, slide, extend in choreographed sequence. ALL movement is MECHANICAL — rigid parts on defined axes. NO morphing. EVERY movement produces real sound.
• THE SUBJECT: Fully deployed = hyper-detailed metallic sculpture in the subject's ORIGINAL REAL-WORLD COLORS painted on the metal surface.
• THE SOUND: EVERY movement produces real physical sound. ZERO silent motion. All sound from the physical object, captured by phone microphone.

━━━ CURRENT CONFIGURATION ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CATEGORY: ${categoryName}
SUBJECT: ${subject}
ABSTRACT SHAPE: ${shapeName}
SURFACE COLOR: ${colorDesc} — the subject's real-world original colors, faithfully painted on the metallic mechanical surface
DEPLOYMENT STYLE: ${deployStyleName}
DURATION: ${transformDuration} seconds
PARTS: ${numParts} major segments
SPEED: ${speed}

COLOR RULE: The abstract and deployed subject have the EXACT SAME surface color/finish — they are the same object (folded vs. unfolded). The color preserves the subject's ORIGINAL real-world appearance. A ${subject} should LOOK like a ${subject} in color — just made of metal.

━━━ THE ABSTRACT SHAPE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The abstract for "${subject}" is ${abstractDesc}

The surface of this abstract is painted in ${colorDesc} — the subject's own real-world colors mapped onto the compressed form. You can see hints of the subject's color zones even in the compressed state.

━━━ SUBJECT DETAIL REQUIREMENTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${subjectDetails}

━━━ DEPLOYMENT SEQUENCE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${deployDesc}

${soundRules}

━━━ FILMING SETUP (RAW PHONE FOOTAGE) ━━━━━━━━━━━━━━━━━━━━━━

CAMERA: Smartphone, handheld (no tripod/gimbal). Natural handheld micro-shake — subtle organic tremor. No phone frame visible. Raw authentic phone footage, not cinematic.
ANGLE: 45-60° elevated, looking down at desk. Shows top and front/side simultaneously.
DESK: Real, worn white/light desk surface with faint scratches, scuff marks, character. Mostly empty.
LIGHTING: Soft natural overhead. Single fixed source. Gentle realistic shadows. Consistent throughout.
AUDIO: Phone's internal microphone ONLY. All sound from the physical object. No external mics, no editing, no music, no sound effects, no audio library. Mechanical sounds ARE the ASMR content.

━━━ VIDEO STRUCTURE (10 SECONDS) ━━━━━━━━━━━━━━━━━━━━━━━━━━━

SEC 0-1: Abstract sits on desk. Human hand enters from left, picks up the abstract. Faint metallic weight-sound as fingers grip dense metal. Visible weight in hand.
SEC 1-2: Thumb finds button, presses firmly. LOUD sharp satisfying mechanical CLICK — spring-loaded striker on tuned resonance plate. THE signature ASMR sound. Rings with metallic overtones for 0.5s.
SEC 2-3: Hand places abstract back on desk. Soft metallic TAP of dense metal on hard surface. Hand exits left. Brief silence. Then faint subliminal whirring — motors activating, gears engaging.
SEC 3-${3 + transformDuration}: Deployment. ${numParts} segments deploy using ${deployStyleName} pattern. Every movement produces sound. Every sound matches its motion.
SEC ${3 + parseInt(transformDuration)}-10: Final locks click with heavy decisive sounds. Fully deployed ${subject} sits still. Micro-vibration dampens to silence. Beauty shot with handheld micro-shake.

${problemPrevention}

━━━ YOUR TASK ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generate the COMPLETE video prompt for direct paste into a video AI model. Describe every visual detail, every sound, every movement frame by frame with zero ambiguity. Include FIRST FRAME and LAST FRAME descriptions. Include ALL deployment movements with specific sounds. Output ONLY the raw prompt text — no explanations, no headers, no notes.`;
  }

  // ─── GENERATE VIDEO PROMPT ─────────────────────
  function generateVideoPrompt(config) {
    const { category, subject, abstractShape, themeId, customThemeColor, deployStyle, transformDuration, numParts, speed } = config;

    const abstractDesc = getAbstractDesc(abstractShape, subject);
    const colorDesc = getThemeDesc(themeId, customThemeColor, category, subject);
    const deployStyleObj = DEPLOYMENT_STYLES.find(s => s.id === deployStyle);
    const deployStyleName = deployStyleObj ? deployStyleObj.name : deployStyle;
    const deployDetail = deployStyleObj ? deployStyleObj.promptDetail : '';
    const isLiving = ['dinosaurs', 'animals', 'birds', 'marine', 'insects', 'fantasy'].includes(category);

    const livingClarification = isLiving
      ? ` This is NOT a living creature — it is a completely STATIC, LIFELESS metallic mechanical sculpture of a ${subject}. Every anatomical feature is rendered as rigid metal — muscles are curved metal plates, scales/feathers/fur are etched metal textures, eyes are polished dead metallic spheres like glass marbles in steel sockets. Zero organic movement, zero breathing, zero life. It is metal. It is dead. It is exquisitely beautiful.`
      : '';

    const timeDeployStart = 3;
    const timeDeployEnd = timeDeployStart + parseInt(transformDuration);
    const timePerPart = (parseInt(transformDuration) / parseInt(numParts)).toFixed(1);

    let speedDesc = 'smooth, steady, deliberate pace — each movement purposeful and precise';
    if (speed === 'slow') speedDesc = 'slow, deliberate, meditative pace — each movement lingers, maximizing ASMR impact of each individual sound';
    if (speed === 'fast') speedDesc = 'quick, snappy, energetic pace — movements brisk and decisive, clicks and snaps in rapid succession';
    if (speed === 'variable') speedDesc = 'variable pace — starting slow and gradually accelerating, building momentum toward final assembly';

    return `A raw smartphone video filmed from an elevated handheld perspective, approximately 45-60 degrees above a desk, looking down. Natural subtle handheld micro-shake throughout — never perfectly still, never stabilized, consistent with a person holding a phone steady. No phone frame visible. This IS the phone camera's direct view — raw, authentic, not cinematic.

FIRST FRAME: A worn white desk surface fills 70% of the frame. Faint scratches and small scuff marks visible — real daily use. At the very top edge, a blurred sliver of a real room (out of focus). In the center-lower portion sits a small, half-palm-sized metallic abstract object — ${abstractDesc} The surface is painted in ${colorDesc} — the subject's own real-world colors faithfully applied to the compressed metallic form. Hairline seam lines visible where parts will separate. Tiny hex-bolt heads at structural junctions. One small circular push-button with knurled edge protrudes from the surface. Soft overhead lighting casts a gentle realistic shadow. The scene is quiet — near-silence with faintest room tone.

SECONDS 0-1: A real adult human hand with natural skin enters smoothly from the left. The hand reaches down and picks up the metallic abstract. Faint metallic contact sound — fingers gripping dense heavy metal. The hand lifts it slightly — visible WEIGHT, the hand adjusts grip. The hand rotates the abstract gently, searching for the button. Metallic surfaces catch the overhead light showing reflective finish and surface details. Faint metallic micro-sounds as fingers shift.

SECONDS 1-2: The thumb finds the button and presses firmly. A LOUD, sharp, deeply satisfying mechanical CLICK echoes from the abstract — a crisp metallic SNAP from a spring-loaded striker hitting a tuned metal resonance plate. This is the LOUDEST, most satisfying sound in the entire video. It resonates with metallic ring overtones that decay over 0.5 seconds. The click has visceral tactile impact — you can almost FEEL it through the screen.

SECONDS 2-3: The hand gently places the abstract back onto the desk. Soft metallic TAP as dense metal contacts hard surface — the sound of weight being set down. Hand pulls back and exits left. The abstract sits motionless. Brief beat of silence. Then — very faint subliminal whirring begins inside — micro-motors activating, tiny gear trains engaging with the faintest tick-tick-tick.

SECONDS ${timeDeployStart}-${timeDeployEnd}: THE DEPLOYMENT. Internal micro-motors power the transformation at a ${speedDesc}. ${deployDetail}

The abstract unfolds into a hyper-detailed, palm-sized metallic sculpture of a ${subject}.${livingClarification} The surface color is ${colorDesc} — the subject's real-world original colors painted faithfully on the precision-machined metal surface. The abstract and deployed form have IDENTICAL coloring — same object, different configuration.

The deployment happens in ${numParts} major stages, each ~${timePerPart} seconds. EVERY movement produces real mechanical sound:

${generatePartStages(category, subject, numParts, deployStyle, timeDeployStart, transformDuration)}

Throughout ALL deployment: every mechanical movement produces corresponding REAL metallic ASMR sounds — clicks for latches, whirrs for motors, ticks for gears, whispers for slides, pings for springs, thunks for heavy locks, purrs for bearings. Even the smallest micro-panel adjustment has its own faint sound. The accumulated soundscape is rich, layered, deeply satisfying. All sounds from the physical object, phone microphone, natural room acoustics. No music. No effects. ZERO.

The object NEVER moves from its desk position. Only internal parts move. True physics — weight, inertia, gravity. Nothing floats or teleports.

SECONDS ${timeDeployEnd}-10: Final segments lock with decisive heavy metallic CLICKS — the heaviest, most final sounds. The fully deployed ${subject} sits perfectly still — a breathtaking hyper-detailed metallic sculpture with ${colorDesc}. Tiniest settling vibration dampens — barely audible hum fading to silence. Every surface detail extraordinary: micro-etched panel lines, tiny hex-bolts at every joint, visible hinge pins, hairline seams. Camera holds the beauty shot with gentle handheld shake. Soft consistent shadow on worn white desk. Perfect stillness. Perfect silence.

LAST FRAME: The completed metallic ${subject} sculpture sits on the worn white desk. Full 3D detail visible from the elevated angle. The surface in ${colorDesc} catches soft overhead light with realistic reflections. Gentle shadow behind it. Blurred room sliver at top edge. Pure silence except faintest room tone. Motionless. A perfect mechanical creation at rest.${livingClarification}

ABSOLUTE RULES: No text/numbers/writing anywhere. No morphing — ALL changes are rigid mechanical movements (rotation, sliding, extension, spring release). Consistent lighting and shadows from single fixed source. Surface color NEVER changes between frames. Smooth continuous motion. Camera at 45-60° with only organic handheld shake. This looks like REAL raw phone footage of a REAL mechanical toy on a REAL desk — not CGI, not animation, not AI-generated. The audience must believe this is a real physical object.`;
  }

  // ─── PUBLIC API ────────────────────────────────
  return {
    CATEGORIES,
    ABSTRACT_SHAPES,
    DEPLOYMENT_STYLES,
    THEME_PRESETS,
    generateMasterPrompt,
    generateVideoPrompt,
    getOriginalColor,
    getMasterPromptForAI: generateMasterPrompt,
  };
})();
