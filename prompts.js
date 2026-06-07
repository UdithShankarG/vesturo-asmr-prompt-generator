// ═══════════════════════════════════════
// PROMPT ENGINE — Vesturo ASMR Prompt Generator
// v2.0 — Original Colors, Stronger Prompts, More Styles
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

  // ─── ORIGINAL SUBJECT COLOR DATABASE ───────────
  const ORIGINAL_COLORS = {
    // Automobiles
    'Lamborghini Aventador': 'a vibrant Lamborghini Giallo Orion (intense bright yellow) metallic automotive paint finish with deep candy-like clearcoat depth, micro-metallic flake catching light in golden sparkles — the exact factory yellow of the Aventador',
    'Porsche 911 GT3': 'a Guards Red metallic automotive finish — the iconic deep cherry-red Porsche color with rich warm undertones, high-gloss clearcoat showing deep reflection pools, the exact shade Porsche uses on their GT3 models',
    'Ford Mustang GT': 'a Race Red metallic automotive finish — bold American muscle-car red with orange-fire undertones, glossy deep clearcoat with subtle metallic flake, the unmistakable Mustang red',
    'Tesla Cybertruck': 'a raw unpainted brushed stainless steel finish — cold, industrial, with visible directional brush marks in the metal grain, dull matte-satin reflections with no clearcoat, exactly like real Tesla Cybertruck bare steel panels',
    'BMW M4': 'an Isle of Man Green metallic finish — deep British racing green with subtle blue shift, rich metallic depth that looks almost black in shadows but reveals vivid green in direct light, the iconic BMW M color',
    'Mercedes AMG GT': 'a Selenite Grey metallic finish — sophisticated cool silver-grey with micro-shimmer, the signature Mercedes luxury tone that shifts between silver and gunmetal depending on angle',
    'Ferrari F40': 'a Rosso Corsa metallic finish — the definitive Ferrari red, a pure intense crimson with no orange and no blue, slightly deeper than cherry, absolutely iconic and unmistakable, high-gloss racing paint',
    'Bugatti Chiron': 'a two-tone French Racing Blue over Glacier White metallic finish — deep vivid royal blue on the upper surfaces transitioning to pearl white on the lower panels, the signature Bugatti Chiron livery',
    'McLaren P1': 'a Volcano Yellow metallic finish — an aggressive neon-adjacent bright yellow with subtle green undertones, ultra-glossy with visible metallic depth, the signature McLaren hypercar shade',
    'Audi R8': 'a Nardo Grey matte finish — the cult-favorite Audi flat grey with zero metallic flake, perfectly smooth matte surface that absorbs light evenly, the trendsetting color that defined modern matte car finishes',
    // Aircraft
    'F-22 Raptor': 'an air superiority grey stealth coating — flat, radar-absorbing matte blue-grey with subtle angular panel variations, exactly like the real F-22 radar-absorbent material coating with visible panel seams in slightly different grey tones',
    'Boeing 747': 'a polished bare aluminum fuselage finish with white upper crown — mirror-bright natural aluminum lower fuselage reflecting the sky, clean white upper body, exactly like a classic airliner livery',
    'SR-71 Blackbird': 'a deep flat black radar-absorbing finish — near-total light absorption, the deepest darkest matte black imaginable with a subtle blue-purple shimmer from the titanium substrate beneath, exactly like the real Blackbird',
    'Concorde': 'a brilliant white with reflective aluminum underbelly — pure white anti-flash paint on upper surfaces, polished mirror-finish aluminum on the lower fuselage, the iconic British Airways Concorde livery',
    'B-2 Spirit Bomber': 'a dark charcoal grey stealth coating — flat, light-absorbing dark grey that appears almost black, with subtle seam variations between radar-absorbing panels, the flying wing stealth finish',
    'Spitfire': 'a RAF Dark Earth and Dark Green camouflage pattern over Sky Blue underside — authentic WWII-era matte olive-brown and forest-green irregular patches on top, duck-egg blue underneath, with roundel markings',
    'Apache Helicopter': 'a US Army olive drab green — flat matte military green with brown-khaki undertones, worn and utilitarian, exactly like active-duty Apache gunship paint',
    'A-10 Warthog': 'a European One camouflage scheme — two-tone dark green and medium green matte patches with dark grey undersides, exactly like the tank-buster ground attack aircraft',
    'F-14 Tomcat': 'a low-visibility tactical grey two-tone — lighter compass ghost grey on upper surfaces, darker gunship grey underneath, the iconic Top Gun era Navy F-14 paint scheme',
    'P-51 Mustang': 'a bare polished aluminum with invasion stripes — mirror-bright unpainted aluminum fuselage with bold black and white D-Day invasion stripes on wings and tail, the iconic WWII fighter finish',
    // Dinosaurs
    'Tyrannosaurus Rex': 'a deep earthy dark brown-green with amber undertones — like weathered ancient bark, with darker charcoal striping along the spine and lighter sandy-tan on the underbelly, rendered as a painted metallic surface with the same color zones, completely static and lifeless',
    'Velociraptor': 'a mottled olive-green and sandy-tan camouflage pattern — dark forest green on the back with irregular tan patches on the sides, lighter cream underbelly, rendered as painted metallic panels, lifeless and static',
    'Triceratops': 'a dusty slate grey-brown base with darker charcoal frill markings — earthy elephant-grey body with distinctive darker patterns on the neck frill, rendered in metallic paint over rigid metal plates',
    'Brachiosaurus': 'a warm earth-green with golden-brown highlights — deep olive green on the back fading to warm sandy-brown on the sides and cream underbelly, painted over metal in natural gradient zones',
    'Stegosaurus': 'a rugged grey-green with rust-orange plate accents — muted grey-green body with the distinctive back plates in warm burnt-orange, rendered as colored metallic panels, completely static',
    'Pteranodon': 'a sandy tan-brown with darker wingtip markings — warm light brown body with darker chocolate-brown edges on the wing membranes, painted over articulated metal wing panels',
    'Spinosaurus': 'a dark teal-green with crimson sail markings — deep blue-green body with the iconic dorsal sail in striking red-orange gradient, rendered as painted metal with vivid color zones',
    'Ankylosaurus': 'a rocky brown-grey armored coloring — dense grey-brown like weathered stone, with darker borders between armor plates, painted metallic finish resembling ancient fortified rock',
    'Diplodocus': 'a warm grey-green with soft brown banding — gentle olive-grey base with subtle horizontal darker bands along the massive body, painted metallic finish',
    'Parasaurolophus': 'a forest green with golden-yellow crest highlight — rich green body with the distinctive head crest in bright amber-gold, painted metallic finish with bold color accent',
    // Animals
    'Lion': 'a rich golden-tawny mane color with warm amber body — deep sun-gold for the magnificent mane, warm sandy-amber for the body, darker honey-brown underbelly, all rendered as painted metallic surface with the exact natural lion color distribution',
    'Wolf': 'a silver-grey agouti coat pattern — mixed dark charcoal and light silver-grey with white chest and muzzle markings, painted over metallic surface mimicking the timber wolf pelage pattern',
    'Eagle': 'a deep chocolate brown body with brilliant white head — rich dark brown body and wings, pure white head and tail feathers, golden-yellow beak accent, the iconic Bald Eagle coloring painted on metal',
    'Tiger': 'a vivid orange with black stripe pattern — bright burnt-orange base with bold black tiger stripes, white underbelly and inner legs, the unmistakable Bengal tiger pattern rendered as painted metallic panels',
    'Bear': 'a deep rich dark brown — warm chocolate-brown all over with subtle darker and lighter patches where muscles catch light, the classic grizzly bear coat color painted over metallic surface',
    'Horse': 'a sleek chestnut bay — warm reddish-brown body with darker black mane, tail, and lower legs, a subtle sheen suggesting healthy coat gloss, classic thoroughbred coloring on metal',
    'Elephant': 'a weathered grey with subtle brown-dust tones — elephant-skin grey with earthy dust-brown in the creases, the warm rough grey of an African elephant rendered as textured painted metal',
    'Gorilla': 'a deep jet black with silvery-grey saddle back — intense black body and limbs with the iconic silver-grey patch across the back, the mountain silverback gorilla coloring on metal',
    'Shark': 'a counter-shaded steel blue-grey on top fading to white underneath — dark blue-grey dorsal surface with clean transition to pure white ventral, the Great White shark coloring on metal',
    'Rhino': 'a thick slate grey — heavy, dense charcoal-grey like weathered stone, with subtle fold lines between armor-like skin plates, the rhinoceros grey painted over heavily textured metal',
    // Birds
    'Bald Eagle': 'a deep chocolate brown body with brilliant white head — rich dark brown body and wings, pure white head plumage and tail, golden-yellow sharp beak, the iconic American Bald Eagle coloring on metal',
    'Peregrine Falcon': 'a blue-grey back with barred white chest — slate blue-grey upper body, cream-white breast with fine dark horizontal barring, dark malar stripe on face, falcon coloring on metal',
    'Owl': 'a mottled tawny-brown with cream spots — warm brown with irregular cream and white spots and streaks, large golden-yellow eye circles, the classic barn owl pattern on metal',
    'Hummingbird': 'an iridescent emerald green with ruby throat — brilliant metallic green back and crown, vivid ruby-red gorget on throat, white breast, the Anna\'s Hummingbird coloring as painted metallic shimmer',
    'Phoenix (Mythical)': 'a blazing gradient from deep crimson core to bright gold-orange wing tips — fiery red body transitioning through orange to brilliant gold at the extremities, painted as dramatic metallic gradient',
    'Raven': 'a deep iridescent blue-black — jet black base with purple and blue-green iridescent sheen visible at certain angles, like oil on obsidian, the corvid sheen on metal',
    'Hawk': 'a rich rufous-brown back with cream-barred chest — warm reddish-brown upper body, cream breast with brown streaking, the Red-tailed Hawk pattern on metal',
    'Parrot': 'a vivid scarlet red with blue and yellow wing accents — bright red body, cobalt blue wing flight feathers, brilliant yellow shoulder patches, the Scarlet Macaw coloring on metal',
    'Crane': 'an elegant white body with black wing tips and red crown — pure white plumage, jet black primaries, vivid red crown patch on head, the Japanese Crane coloring on metal',
    'Peacock': 'an iridescent royal blue body with green-gold tail eye spots — intense blue neck and breast, the fan tail in metallic green-gold with characteristic eye-spot patterns in blue-green-bronze, painted as shimmering metallic',
    // Marine
    'Blue Whale': 'a mottled blue-grey with lighter underbelly — deep slate blue-grey on top with subtle mottling, paler blue-white underneath, the ocean giant coloring on metal',
    'Great White Shark': 'a counter-shaded dark grey-blue top and white bottom — dark blue-grey dorsal surface with clean line to pure white ventral, the apex predator coloring on metal',
    'Octopus': 'a mottled reddish-brown with cream suckers — warm copper-red to brown with irregular darker patches and cream-colored sucker undersides, the common octopus coloring on metal',
    'Manta Ray': 'a jet black dorsal with white ventral — deep black top surface, clean white underside with distinctive dark markings near the mouth, the giant manta coloring on metal',
    'Sea Turtle': 'a rich olive-brown shell with golden-yellow skin patches — warm olive-brown carapace with radiating darker pattern, golden-tan skin on head and flippers, green sea turtle coloring on metal',
    'Hammerhead Shark': 'a grey-brown dorsal fading to white belly — olive-grey to brown on top, graduating to white underneath, the distinctive hammerhead coloring on metal',
    'Dolphin': 'a sleek dark grey back with lighter grey sides and white belly — three-tone grey gradient from dark charcoal top through medium grey to white underside, the bottlenose dolphin pattern on metal',
    'Orca': 'a bold black and white pattern — jet black body with distinctive white eye patches, white chin and underbelly, grey saddle patch behind the dorsal fin, the iconic killer whale pattern on metal',
    'Seahorse': 'a warm coral-orange with lighter belly — bright orange to peach body with tiny darker speckles, the common seahorse coloring on delicately textured metal',
    'Jellyfish': 'a translucent pale blue-violet with white tentacles — ethereal light purple-blue bell with trailing white tendrils, the moon jellyfish coloring as semi-transparent painted metal effect',
    // Insects
    'Scorpion': 'a dark glossy black-brown — deep near-black brown with a subtle glossy chitinous sheen, the emperor scorpion coloring on segmented metal',
    'Praying Mantis': 'a vivid leaf green — bright natural green matching fresh foliage, with slightly darker green at joints, the common mantis coloring on articulated metal',
    'Beetle': 'an iridescent metallic green-gold — brilliant metallic sheen shifting between emerald green and gold, the jewel beetle coloring as actual metallic paint',
    'Dragonfly': 'an iridescent blue-green body with transparent amber wings — shimmering blue-green thorax and abdomen, wings painted as amber-tinted semi-transparent metallic panels',
    'Spider': 'a glossy jet black with red hourglass marking — deep shiny black body, bold red hourglass on the abdomen underside, the black widow coloring on metal',
    'Butterfly': 'a vivid orange with black vein patterns and white spots — bright monarch orange wings with bold black veining and white dot borders, the Monarch butterfly pattern on metal panels',
    'Ant': 'a dark reddish-brown — deep mahogany red-brown with darker head and legs, the fire ant coloring on segmented metal',
    'Wasp': 'a bold black and yellow striped pattern — alternating jet black and bright yellow warning bands on the abdomen, dark wings, the yellowjacket pattern on metal',
    'Centipede': 'a dark reddish-brown with orange legs — deep brown body segments with bright orange-yellow legs, the giant centipede coloring on articulated metal',
    'Moth': 'a dusty grey-brown with subtle eye spot markings — muted warm grey wings with darker border and two faint eye-spot patterns, the luna moth variant in pale green on metal',
    // Architecture
    'Eiffel Tower': 'a distinctive Eiffel Tower brown — the specific warm bronze-brown paint color used on the real tower (officially "Eiffel Tower Brown"), with subtle gradient from darker at base to slightly lighter at top',
    'Taj Mahal': 'a luminous white marble finish — pure milky white with subtle warm ivory undertones and faint grey veining, the Makrana marble appearance of the real Taj Mahal as painted metallic',
    'Colosseum': 'a warm travertine stone beige — sandy cream-beige like aged Roman travertine limestone, with subtle orange-warm patches and darker weathering in recesses',
    'Empire State Building': 'a warm limestone grey with Art Deco chrome accents — grey-beige limestone panels with polished silver-chrome Art Deco trim and eagle motifs at corners',
    'Burj Khalifa': 'a reflective silver-blue glass curtain wall finish — mirrored blue-silver panels reflecting sky tones, with silver-grey structural spine, the glass tower aesthetic on metal',
    'Big Ben': 'a golden-tan stone with dark green and gold accents — warm honey-colored stone finish with the famous dark green and gold clock face details and gothic ornament',
    'Golden Gate Bridge': 'International Orange — the specific vivid red-orange paint (not red, not orange, but the exact International Orange #C0362C) used on the real Golden Gate Bridge',
    'Sydney Opera House': 'a brilliant white with cream sail tiles — pure white ceramic tile pattern on the sail roofs with subtle shadow-lines between tiles, warm concrete-grey base podium',
    'Parthenon': 'an aged white marble with golden-warm patina — creamy white Pentelic marble with warm honey-gold age toning and subtle grey weathering',
    'Great Wall Tower': 'a grey stone and earth-brown mortar — cool grey stone blocks with warm brown mortar lines, aged and weathered, the Great Wall watchtower appearance',
    // Robots & Mechs
    'Humanoid Robot': 'a clean white polymer with blue LED accent lines — glossy white body panels with electric cyan-blue illuminated panel lines and joint indicators, futuristic consumer robot aesthetic',
    'Spider Mech': 'a military olive drab with hazard-yellow joint markings — flat military green body with yellow-black chevron patterns at leg joints, industrial mech aesthetic',
    'Battle Mech': 'a desert tan camouflage with worn red markings — sandy tan base with darker brown patches and faded red unit identification markings, battle-worn mech aesthetic',
    'Drone Walker': 'a matte dark grey with orange sensor accents — charcoal grey body panels with bright safety-orange sensor eyes and antenna tips, recon drone aesthetic',
    'Industrial Arm': 'a safety yellow with black warning stripes — bright industrial yellow body with black diagonal warning stripes at joint pivot points, FANUC-style robot arm',
    'Nano Robot': 'a polished chrome-silver with blue circuit trace patterns — mirror-bright silver body with etched glowing blue circuit-board trace patterns across the surface',
    'Tank Mech': 'a woodland green camouflage with rust patches — dark green camo pattern with brown-rust weathering at exposed metal edges, heavy combat mech aesthetic',
    'Scout Drone': 'a matte black with red operational indicators — stealth black body with small red LED status lights at sensor positions, covert drone aesthetic',
    'Exoskeleton': 'a gunmetal grey frame with neon green bio-interface pads — dark grey structural frame with bright green padded contact surfaces where it interfaces with the human body',
    'AI Core Unit': 'a deep black glass with pulsing white light core — obsidian black outer shell with a visible inner chamber of bright white-blue light, like a contained energy source',
    // Weapons
    'Katana': 'a traditional tamahagane steel blade with ray-skin wrapped handle — the blade in mirror-polished silver with visible hamon temper line, handle in white ray-skin with dark silk cord wrapping, brass habaki collar',
    'Longsword': 'a polished carbon steel blade with leather grip — bright silver blade steel, brown leather-wrapped grip, polished steel crossguard and pommel, medieval European style',
    'Viking Axe': 'a dark forged iron head with ash wood handle — dark grey-black iron axe head with visible forge marks, warm light-brown ash wood handle with leather binding',
    'War Hammer': 'a heavy dark steel head with oak handle — dark burnished steel hammerhead with brutal striking surfaces, warm brown oak shaft with leather grip',
    'Trident': 'a golden bronze with sea-green patina accents — warm antiqued bronze-gold prongs and shaft with hints of green verdigris patina in the ornamental details, Poseidon-style',
    'Scimitar': 'a Damascus steel blade with gold inlay — swirling dark and light Damascus pattern on the curved blade, gold arabesque inlay on the guard, dark horn grip',
    'Dagger': 'a bright polished steel with ebony handle — mirror-finish steel blade with jet-black ebony wood handle and silver-steel bolsters',
    'Halberd': 'a dark steel head with red-stained oak shaft — blackened steel blade and spike, deep red-brown stained oak pole with iron reinforcement bands',
    'Spear': 'a leaf-shaped bronze spear point with ash shaft — warm golden-bronze broad spearhead, pale ash wood shaft with leather grip wrapping, Greek hoplite style',
    'Claymore': 'a grey steel blade with blue leather grip — broad grey steel blade with subtle fuller groove, royal blue leather-wrapped grip, steel basket hilt',
    // Instruments
    'Electric Guitar': 'a sunburst finish — the classic three-tone sunburst pattern radiating from cherry red at edges through amber to golden-yellow at center, with chrome pickup covers and hardware, the iconic Les Paul sunburst',
    'Grand Piano': 'a glossy jet black lacquer — deep piano black with mirror-like gloss finish showing room reflections, white ivory key faces visible, brass string frame, the quintessential concert grand appearance',
    'Violin': 'a warm amber-brown varnish — rich honey-amber to darker brown graduated varnish with visible wood grain beneath, the Stradivarius-style golden-brown classical finish',
    'Drum Kit': 'a pearl white wrap with chrome hardware — shimmering white pearl drum shell finish with highly polished chrome lugs, rims, and cymbal stands, classic stage kit aesthetic',
    'Saxophone': 'a warm gold lacquer — bright brass-gold lacquered body with darker gold in shadow areas, polished key mechanisms catching light, the classic alto sax golden finish',
    'Trumpet': 'a brilliant silver-plated finish — mirror-bright silver plating over brass, with visible valve casings and tubing, the professional silver trumpet appearance',
    'Cello': 'a deep reddish-brown varnish — rich dark cherry to warm brown graduated varnish showing figured maple grain, ebony fingerboard and tailpiece, classical string instrument finish',
    'Acoustic Guitar': 'a natural wood top with dark rosewood sides — pale spruce or cedar sound-board with darker rosewood sides and back, tortoiseshell pickguard, the classic dreadnought look',
    'Harp': 'a gilded gold with natural wood pillar — ornate gold-leaf decorative top and column, warm maple wood soundboard and neck, classical concert harp appearance',
    'Flute': 'a polished sterling silver — bright mirror-finish silver body with precision-machined key mechanisms, the professional concert flute appearance',
    // Generic fallbacks for unlisted subjects
    'default_automobiles': 'the exact real-world factory paint color of this specific vehicle model — with accurate metallic flake depth, correct clearcoat gloss level, and precise color-matched finish as it would appear on the actual production car',
    'default_aircraft': 'the exact real-world operational paint scheme of this specific aircraft — with accurate military or airline livery colors, correct panel tone variations, and authentic markings rendered as painted metallic surface',
    'default_spacecraft': 'the authentic color scheme of this specific spacecraft — thermal blanket gold, white thermal paint, and natural metal tones as they appear on the real vehicle',
    'default_dinosaurs': 'a scientifically plausible natural coloring based on the best paleontological reconstructions — rendered as painted metallic surface, earthy and naturalistic tones, completely static and lifeless',
    'default_animals': 'the exact natural coat/skin coloring of this specific animal species — accurate color patterns, markings, and gradients as seen in nature, rendered as painted metallic surface, static and lifeless',
    'default_birds': 'the exact natural plumage coloring of this specific bird species — accurate feather patterns, iridescence where applicable, rendered as painted metallic surface',
    'default_marine': 'the exact natural coloring of this specific marine species — accurate skin/scale patterns and counter-shading as seen in the wild, rendered as painted metallic surface',
    'default_insects': 'the exact natural coloring of this specific insect species — accurate exoskeleton colors, wing patterns, and segment markings rendered as painted metallic surface',
    'default_architecture': 'the exact real-world material colors of this specific building — accurate stone, glass, metal, or paint colors as they appear on the actual structure',
    'default_robots': 'a futuristic industrial finish combining clean panel colors with accent lighting indicators — matte primary body with gloss accent panels and colored operational indicators',
    'default_weapons': 'the authentic material colors of this specific weapon type — accurate blade steel finish, handle material color, and any traditional decorative elements',
    'default_instruments': 'the authentic finish of this specific instrument — accurate wood varnish, lacquer, plating, or paint as seen on a professional-grade version of the instrument',
    'default_racing': 'the authentic racing livery of this specific vehicle type — accurate team/manufacturer colors with racing number graphics and sponsor areas rendered as painted metallic',
    'default_trains': 'the authentic livery of this specific train — accurate railway company colors, trim lines, and operational markings as seen on the real locomotive',
    'default_armor': 'the authentic material finish of this specific armor type — accurate steel, bronze, leather, and decorative element colors as they would appear on a museum-quality historical piece',
    'default_heavy_machinery': 'the authentic manufacturer paint scheme — typically Caterpillar yellow, Komatsu blue, or the specific brand color with black accent panels and safety striping',
    'default_tanks': 'the authentic military camouflage pattern of this specific tank — accurate olive drab, desert tan, or woodland camo as used by the operating nation\'s armed forces',
    'default_electronics': 'the authentic consumer product coloring — accurate housing colors, button accents, and brand-specific design language as seen on the real product',
    'default_fantasy': 'a mythologically-inspired color scheme based on classical artistic depictions — dramatic, vivid colors appropriate to the creature\'s legendary associations, rendered as painted metallic, static and lifeless',
    'default_space_vehicles': 'the authentic color scheme from the source material — accurate hull paneling colors, accent lighting, and faction/fleet markings as depicted in the original franchise',
    'default_sports': 'the authentic coloring of this specific sports equipment — accurate material colors for leather, rubber, carbon fiber, or synthetic materials as seen on professional-grade gear',
    'default_tools': 'the authentic product coloring — accurate housing colors, handle materials, and brand-typical design as seen on the real commercial product',
  };

  // Function to get original color description
  function getOriginalColor(category, subject) {
    // Try exact match first
    if (ORIGINAL_COLORS[subject]) {
      return ORIGINAL_COLORS[subject];
    }
    // Try category default
    const defaultKey = `default_${category}`;
    if (ORIGINAL_COLORS[defaultKey]) {
      return ORIGINAL_COLORS[defaultKey].replace('this specific', `the ${subject}`);
    }
    // Ultimate fallback
    return `the exact real-world original color scheme of ${subject} — with accurate natural/factory colors, correct material finishes, and precise color-matching as it would appear in reality, rendered as a painted metallic surface`;
  }

  // ─── DEPLOYMENT STYLES (16 total now) ──────────
  const DEPLOYMENT_STYLES = [
    {
      id: 'sequential_unfold',
      name: 'Sequential Unfold',
      desc: 'Parts unfold one after another in a precise sequence, like opening a mechanical puzzle box.',
      promptDetail: 'Each segment lifts, rotates on its micro-hinge, and clicks into its final locked position before the next segment begins its motion. The sequence flows from the base upward (or front to back), creating a wave-like mechanical cascade. Every joint makes a distinct metallic "tick" as it locks. Even the smallest micro-panel shifting produces a faint metallic whisper.',
      animClass: 'anim-sequential'
    },
    {
      id: 'radial_bloom',
      name: 'Radial Bloom',
      desc: 'All parts deploy outward simultaneously from the center, like a mechanical flower blooming.',
      promptDetail: 'All segments radiate outward from the central core simultaneously, pushed by micro-actuators. The pieces fan out in a perfect radial pattern like petals of a metal flower opening. Each piece rotates as it moves outward, clicking into position with a satisfying mechanical snap. The core remains stationary while everything blooms around it. The combined whirring of multiple micro-motors creates a harmonic mechanical hum.',
      animClass: 'anim-radial'
    },
    {
      id: 'cascade_reveal',
      name: 'Cascade Reveal',
      desc: 'Parts cascade from top to bottom in a waterfall motion, each layer triggering the next.',
      promptDetail: 'The topmost layer of the abstract lifts first, pulling connected segments upward and outward in a cascading waterfall effect. Each tier triggers the tier below it through mechanical linkage. The motion flows downward like dominos made of precision metal, with each layer producing a deeper resonant click than the last. The cascading clicks create a descending musical scale of metallic tones.',
      animClass: 'anim-cascade'
    },
    {
      id: 'spiral_assembly',
      name: 'Spiral Assembly',
      desc: 'Parts spiral outward while rotating into position, creating a mesmerizing helix motion.',
      promptDetail: 'Parts unwind from the abstract in a spiral/helix pattern, rotating as they travel outward. Each piece follows a curved trajectory, spinning on its micro-bearing as it moves to its final position. The spiral motion creates a hypnotic visual pattern. The mechanical whirring of tiny motors blends with clicking latches as each piece locks into its designated slot. Bearing rotation creates a smooth, continuous metallic purr.',
      animClass: 'anim-spiral'
    },
    {
      id: 'butterfly_split',
      name: 'Butterfly Split',
      desc: 'Two symmetrical halves split open and unfold outward like butterfly wings.',
      promptDetail: 'The abstract splits perfectly along its center axis into two mirror-image halves. Both halves swing open on central hinges like a mechanical book or butterfly wings. As the halves open, internal segments unfold from within each side, extending and locking into place. The symmetrical motion is perfectly synchronized — both sides move at identical speeds. The splitting produces a satisfying metallic "crack" followed by harmonized deployment sounds from both halves.',
      animClass: 'anim-butterfly'
    },
    {
      id: 'accordion_expand',
      name: 'Accordion Expand',
      desc: 'Parts compress and expand like an accordion, stretching into final form.',
      promptDetail: 'The abstract stretches along its primary axis like a mechanical accordion. Compressed layers separate and expand, with zigzag linkages straightening out. Each fold opens with a precise geometric motion, segments sliding on tracks and extending telescopically. The expansion creates a rhythmic series of metallic sliding sounds punctuated by locking clicks. Each slide produces a distinct friction-whisper of polished metal on polished metal tracks.',
      animClass: 'anim-accordion'
    },
    {
      id: 'domino_chain',
      name: 'Domino Chain',
      desc: 'Each part triggers the next in a chain reaction, creating a mesmerizing domino effect.',
      promptDetail: 'One initial piece moves first, and through a mechanical chain-reaction, each piece triggers the next adjacent piece to deploy. The motion propagates through the entire structure like a wave. Each piece flips, rotates, or slides into position and its final locking motion releases a catch that starts the next piece. The chain of mechanical clicks builds into a crescendo. Each catch-release makes a tiny spring-loaded "tink" followed by the next piece moving.',
      animClass: 'anim-domino'
    },
    {
      id: 'telescopic_extension',
      name: 'Telescopic Extension',
      desc: 'Parts extend telescopically outward like nested tubes, building the shape layer by layer.',
      promptDetail: 'Nested sections extend outward from the core like a telescope or antenna. Inner sections push outer sections as they extend. Each telescopic stage locks with a distinct click at full extension before the next stage begins. The structure grows outward from a compact core, each extension adding more detail and surface area to the emerging form. Telescopic sliding produces smooth metallic drawer-slide sounds.',
      animClass: 'anim-telescopic'
    },
    {
      id: 'origami_unfold',
      name: 'Origami Unfold',
      desc: 'Paper-fold style deployment with geometric precision, each fold revealing new surfaces.',
      promptDetail: 'Flat panels unfold along precisely scored fold lines, like mechanical origami. Each panel swings open to reveal the panel beneath it, which then unfolds in turn. The motion is geometric and angular — clean 90-degree and 45-degree rotations along scored metal hinges. Each fold produces a sharp, crisp metallic crease sound as it locks flat. The crease-lock sounds are like tiny metallic finger-snaps.',
      animClass: 'anim-origami'
    },
    {
      id: 'mechanical_gearwork',
      name: 'Mechanical Gearwork',
      desc: 'Gear-driven sequential deployment with visible rotating mechanisms.',
      promptDetail: 'Visible micro-gears drive the entire deployment. As the internal motor spins, interlocking gears translate rotational motion into linear extension of parts. Cam mechanisms push segments outward at precisely timed intervals. The deployment has a clockwork quality — smooth, continuous rotation converting into stepped, mechanical movements. Tiny gears clicking and whirring are clearly audible. The rhythmic tick-tick-tick of gear teeth meshing creates a mechanical heartbeat.',
      animClass: 'anim-gearwork'
    },
    // ─── NEW DEPLOYMENT STYLES ───────────────────
    {
      id: 'hydraulic_press_reverse',
      name: 'Hydraulic Press Reverse',
      desc: 'Like a hydraulic press running in reverse — compressed parts push upward and outward with immense force.',
      promptDetail: 'Parts push outward with hydraulic pressure force — slow initial resistance, then smooth powerful extension. Internal pistons drive segments upward and outward, each extension accompanied by a deep pneumatic "hiss-thunk" as the hydraulic cylinder reaches full extension and the locking pin engages. The movement has visible power behind it — heavy parts lifting with controlled, deliberate force. Each piston extension produces a deep pressurized hissing sound followed by a heavy metallic THUNK of the lock engaging. Micro-hydraulic lines visibly flex.',
      animClass: 'anim-hydraulic'
    },
    {
      id: 'magnetic_snap',
      name: 'Magnetic Snap Assembly',
      desc: 'Parts fly apart and magnetically snap into position with sharp, decisive clicks.',
      promptDetail: 'Segments separate from the abstract with spring-loaded release — each piece pops free with a metallic PING, hovers momentarily at its maximum travel on its guide rail, then snaps decisively into its final position with a sharp magnetic CLACK as rare-earth micro-magnets lock it in place. The motion has a distinctive snap quality — quick separation followed by instant locking. Each magnetic connection produces a uniquely satisfying sharp metallic clack, like two strong magnets finding each other. The combined effect is a staccato burst of precision clicks.',
      animClass: 'anim-magnetic'
    },
    {
      id: 'shrapnel_reverse',
      name: 'Reverse Explosion',
      desc: 'Like an explosion playing in reverse — scattered parts rush inward and assemble with force.',
      promptDetail: 'All pieces spring outward simultaneously from the abstract core in a controlled burst, reaching maximum displacement on their guide rails — then immediately reverse direction, rushing back inward but this time each piece locks into its DEPLOYED position rather than its compressed position. The effect is like watching a freeze-frame explosion reverse itself into a perfectly assembled form. The initial burst produces a sharp metallic CRACK, followed by a rapid cascade of assembling clicks as every piece finds its place simultaneously. The final lock is one unified metallic CLANG of all pieces setting.',
      animClass: 'anim-explosion'
    },
    {
      id: 'layer_peel',
      name: 'Layer Peel',
      desc: 'Outer layers peel away like skin, each revealing the next layer of detail underneath.',
      promptDetail: 'The outermost shell of the abstract peels away first — panels lift at one edge and curl back on living hinges, revealing the next layer underneath. Each layer peels to expose finer detail beneath. The motion resembles peeling the skin of a fruit — smooth, continuous, with each layer revealing surprising complexity underneath. The peeling produces a smooth metallic sliding sound, like a credit card being drawn from a metal holder, followed by a soft click as the peeled panel locks into its deployed position forming part of the final form.',
      animClass: 'anim-peel'
    },
    {
      id: 'puzzle_lock',
      name: 'Puzzle Lock',
      desc: '3D puzzle pieces rotate and interlock in precise sequence, each piece enabling the next.',
      promptDetail: 'Each segment is a precision 3D puzzle piece that must rotate to a specific orientation before it can slide into its interlocking position. One piece rotates 90 degrees with a mechanical click, enabling the adjacent piece to slide into the newly created slot. The assembly is a sequence of rotate-slide-lock, rotate-slide-lock. Each rotation produces a ratcheted clicking (tick-tick-tick as it passes through detent positions), and each slide-lock produces a deep satisfying CHUNK as dovetail joints mate perfectly. The 3D puzzle-fitting creates uniquely complex mechanical sounds.',
      animClass: 'anim-puzzle'
    },
    {
      id: 'centrifugal_deploy',
      name: 'Centrifugal Spin Deploy',
      desc: 'The abstract spins rapidly on its center axis, centrifugal force throwing parts outward into position.',
      promptDetail: 'The abstract begins spinning on its vertical axis — slowly at first, then accelerating. As rotational speed increases, centrifugal force pushes segments outward along radial guide tracks. Parts extend outward while spinning, and as each reaches its full extension, a centrifugal latch engages to lock it in place. The spinning gradually slows as more parts lock, until the fully deployed form comes to rest. The spinning produces a rising-pitch mechanical whirr, punctuated by sharp centrifugal latch clicks as pieces lock at speed. The decelerating spin creates a descending whirr that ends in perfect stillness.',
      animClass: 'anim-centrifugal'
    },
  ];

  // ─── THEME PRESETS ─────────────────────────────
  const THEME_PRESETS = [
    { id: 'brushed_steel', name: 'Brushed Steel', colors: ['#8a9bae', '#5c6b7a', '#c0c8d0'], gradient: 'linear-gradient(135deg, #8a9bae, #5c6b7a)' },
    { id: 'midnight_chrome', name: 'Midnight Chrome', colors: ['#2c3e50', '#1a1a2e', '#4a6fa5'], gradient: 'linear-gradient(135deg, #2c3e50, #1a1a2e)' },
    { id: 'rose_gold', name: 'Rose Gold', colors: ['#b76e79', '#e8b4b8', '#8e4a52'], gradient: 'linear-gradient(135deg, #b76e79, #e8b4b8)' },
    { id: 'arctic_silver', name: 'Arctic Silver', colors: ['#c0c0c0', '#e8e8e8', '#808080'], gradient: 'linear-gradient(135deg, #c0c0c0, #e8e8e8)' },
    { id: 'gunmetal', name: 'Gunmetal', colors: ['#2c3539', '#536878', '#3d4f58'], gradient: 'linear-gradient(135deg, #2c3539, #536878)' },
    { id: 'copper_patina', name: 'Copper Patina', colors: ['#b87333', '#5f8575', '#d4956a'], gradient: 'linear-gradient(135deg, #b87333, #5f8575)' },
    { id: 'obsidian_gold', name: 'Obsidian & Gold', colors: ['#1a1a1a', '#ffd700', '#333333'], gradient: 'linear-gradient(135deg, #1a1a1a, #ffd700)' },
    { id: 'titanium_blue', name: 'Titanium Blue', colors: ['#4a6fa5', '#2c3e6b', '#7b9cc2'], gradient: 'linear-gradient(135deg, #4a6fa5, #2c3e6b)' },
    { id: 'burnt_bronze', name: 'Burnt Bronze', colors: ['#cd7f32', '#8b4513', '#a0522d'], gradient: 'linear-gradient(135deg, #cd7f32, #8b4513)' },
    { id: 'pearl_white', name: 'Pearl White', colors: ['#f0ead6', '#dfd9c6', '#e8e0cc'], gradient: 'linear-gradient(135deg, #f0ead6, #dfd9c6)' },
    { id: 'emerald_chrome', name: 'Emerald Chrome', colors: ['#2ecc71', '#1a8a4a', '#27ae60'], gradient: 'linear-gradient(135deg, #2ecc71, #1a8a4a)' },
    { id: 'crimson_metal', name: 'Crimson Metal', colors: ['#dc143c', '#8b0000', '#b22222'], gradient: 'linear-gradient(135deg, #dc143c, #8b0000)' },
    { id: 'sapphire', name: 'Sapphire', colors: ['#0f52ba', '#082567', '#1e90ff'], gradient: 'linear-gradient(135deg, #0f52ba, #082567)' },
    { id: 'matte_black', name: 'Matte Black', colors: ['#1c1c1c', '#2d2d2d', '#0d0d0d'], gradient: 'linear-gradient(135deg, #1c1c1c, #2d2d2d)' },
    { id: 'custom', name: 'Custom Colors', colors: ['#6c5ce7', '#00cec9', '#fd79a8'], gradient: 'linear-gradient(135deg, #6c5ce7, #fd79a8)' },
  ];

  // ─── HELPER: Get abstract shape description ────
  function getAbstractShapeDesc(category, subject) {
    const shapeMap = {
      automobiles: `a compact, angular rectangular block with slightly rounded edges — resembling a compressed car silhouette from above. The proportions hint at the body of ${subject} squeezed flat, roughly 6cm × 4cm × 3cm`,
      aircraft: `a sleek, elongated wedge shape with a tapered nose — the compressed silhouette of ${subject} folded into a swept-back aerodynamic abstract, roughly 7cm × 3cm × 3cm`,
      spacecraft: `a cylindrical capsule shape with a slightly conical top — ${subject} crushed into a rocket-like abstract tube, roughly 6cm × 3cm × 3cm`,
      motorcycles: `a compact oblong shape, wider on one end — the side-profile of ${subject} compressed into a smooth, elongated pebble form, roughly 7cm × 3cm × 2.5cm`,
      ships: `a wide, shallow rectangular shape with a pointed front — the hull outline of ${subject} compressed into a boat-hull-like abstract, roughly 7cm × 4cm × 2.5cm`,
      dinosaurs: `an organic, egg-shaped ovoid — ${subject} folded into a dense, smooth prehistoric-egg form, roughly 5cm × 4cm × 3.5cm`,
      animals: `a smooth, rounded organic form — ${subject} compressed into a dense, pebble-like abstract that subtly hints at the animal's silhouette, roughly 5cm × 4cm × 3cm`,
      birds: `a teardrop shape, slightly elongated — ${subject} folded into a streamlined, egg-like abstract, roughly 5cm × 3cm × 3cm`,
      marine: `a smooth, rounded streamlined shape — ${subject} compressed into a water-worn pebble form, roughly 6cm × 4cm × 3cm`,
      insects: `a small, dense hexagonal compact — ${subject} folded into a geometric, chitin-like abstract block, roughly 4cm × 3cm × 2.5cm`,
      architecture: `a geometric, tower-like rectangular prism — ${subject} compressed into an architectural block, roughly 4cm × 4cm × 5cm`,
      robots: `a precise cubic shape with beveled edges — ${subject} folded into a dense, tech-looking cube, roughly 4cm × 4cm × 4cm`,
      weapons: `a long, narrow rectangular block — ${subject} compressed into a handle-shaped abstract, roughly 8cm × 2cm × 2cm`,
      instruments: `a smooth, curved abstract — ${subject} folded into a shape hinting at its musical form, roughly 6cm × 3cm × 3cm`,
      racing: `a low, wide, aerodynamic wedge — ${subject} compressed into a race-car-profile abstract, roughly 7cm × 4cm × 2cm`,
      trains: `a long, rectangular block with a slightly rounded front — ${subject} compressed into a locomotive silhouette, roughly 8cm × 3cm × 3cm`,
      armor: `a flat, shield-like disc shape — ${subject} folded into a dense, round abstract with embossed-looking surface texture, roughly 5cm × 5cm × 2cm`,
      heavy_machinery: `a chunky, industrial cube shape — ${subject} compressed into a heavy, dense block, roughly 5cm × 4cm × 4cm`,
      tanks: `a squat, heavy rectangular block with angled edges — ${subject} compressed into a turret-like abstract, roughly 6cm × 4cm × 3cm`,
      electronics: `a clean, precise rectangular slab — ${subject} folded into a sleek tech-product-like abstract, roughly 6cm × 4cm × 2cm`,
      fantasy: `a dramatic, angular crystal-like shape — ${subject} compressed into a mythical-looking abstract with faceted surfaces, roughly 5cm × 4cm × 4cm`,
      space_vehicles: `a futuristic, angular wedge — ${subject} compressed into a sci-fi cockpit-shaped abstract, roughly 6cm × 4cm × 3cm`,
      sports: `a smooth, rounded compact — ${subject} folded into an athletic, aerodynamic abstract, roughly 5cm × 4cm × 3cm`,
      tools: `a compact, utilitarian rectangular block — ${subject} folded into a toolbox-like abstract, roughly 5cm × 3cm × 2.5cm`,
    };
    return shapeMap[category] || `a smooth, compact abstract shape — ${subject} compressed and folded tightly into a form that subtly hints at the subject's silhouette when viewed from above, roughly 5cm × 4cm × 3cm`;
  }

  // ─── HELPER: Get deployment description ────────
  function getDeploymentDesc(styleId, subject, numParts, durationSec) {
    const style = DEPLOYMENT_STYLES.find(s => s.id === styleId);
    if (!style) return '';
    const timePerPart = (durationSec / numParts).toFixed(1);
    return `DEPLOYMENT STYLE — "${style.name}": ${style.promptDetail} The entire ${subject} deploys in exactly ${durationSec} seconds, consisting of ${numParts} major moving segments. Each segment takes approximately ${timePerPart} seconds to fully deploy and lock into position. EVERY movement, no matter how small — even a 1mm micro-panel adjusting, even a tiny hex-bolt rotating a quarter-turn — produces its own corresponding real mechanical sound. There is ZERO silent motion. If metal moves, metal sounds.`;
  }

  // ─── HELPER: Get color/theme description ───────
  function getThemeDesc(themeId, customColor, useOriginalColor, category, subject) {
    // Original color takes priority
    if (useOriginalColor && category && subject) {
      return getOriginalColor(category, subject);
    }
    if (themeId === 'custom' && customColor) {
      return `a custom metallic finish in the color ${customColor}. The surface has a luxurious, high-end metallic sheen with subtle reflective highlights. The color is consistent across the entire body, with natural shadow variation adding depth. This exact same color and finish coats the abstract form as well — because the abstract IS the subject folded up, so they share identical surface appearance`;
    }
    const theme = THEME_PRESETS.find(t => t.id === themeId);
    if (!theme) return 'a brushed steel metallic finish with subtle directional grain patterns';
    const descMap = {
      brushed_steel: 'a brushed stainless steel finish with fine directional grain lines running along the surface. The metal has a cool, industrial blue-gray tone with subtle reflective streaks',
      midnight_chrome: 'a deep midnight blue chrome finish — almost black but with a rich navy metallic depth that catches light in deep blue flashes. Ultra-glossy, mirror-like reflections',
      rose_gold: 'a warm rose gold metallic finish with pink-copper tones. The surface has a soft, luxurious warmth with delicate reflective highlights',
      arctic_silver: 'a bright, clean arctic silver metallic finish. Highly reflective with a cool white-silver tone, like polished aluminum or white gold',
      gunmetal: 'a dark gunmetal gray finish — a dense, muted charcoal metallic with very subtle warm undertones. Matte-satin surface with controlled reflections',
      copper_patina: 'a copper finish showing natural patina variation — warm amber-copper base with hints of verdigris green in recessed areas, creating an aged, artisanal look',
      obsidian_gold: 'a dramatic two-tone finish — deep obsidian black base with gold-plated accent edges, hinges, and detail lines. The contrast creates a luxury premium appearance',
      titanium_blue: 'a titanium blue anodized finish — the distinctive blue-purple iridescent color of heat-treated titanium. The color shifts subtly with viewing angle',
      burnt_bronze: 'a rich burnt bronze finish — deep warm brown-gold metallic with darker edges suggesting heat treatment. Antiqued, heritage aesthetic',
      pearl_white: 'a pearl white metallic finish — creamy off-white base with an iridescent pearlescent layer that shifts between soft pink, gold, and green in the light',
      emerald_chrome: 'an emerald green chrome finish — deep, rich green with high-gloss mirror-like reflections. Jewel-toned and luxurious',
      crimson_metal: 'a deep crimson red metallic finish — rich, saturated red with subtle darker undertones. Glossy with controlled reflections, like a premium supercar paint',
      sapphire: 'a sapphire blue metallic finish — deep royal blue with subtle sparkle in the metallic flake. Rich and deep, like the gemstone it references',
      matte_black: 'a pure matte black finish — no reflections, no shine, just deep, light-absorbing darkness. Ultra-modern stealth aesthetic with soft edges visible only through shadow gradients',
    };
    return descMap[themeId] || descMap.brushed_steel;
  }

  // ─── HELPER: Subject-specific details ──────────
  function getSubjectDetails(category, subject) {
    const isLiving = ['dinosaurs', 'animals', 'birds', 'marine', 'insects', 'fantasy'].includes(category);
    let livingNote = '';
    if (isLiving) {
      livingNote = `\n\nCRITICAL LIVING-SUBJECT RULE: Even though the subject "${subject}" is a living creature in real life, this is a NON-LIVING metallic mechanical toy. There is absolutely ZERO life in it — no breathing, no eye movement, no organic texture, no muscle flex, no skin ripple. The ${subject} is rendered as a STATIC, MECHANICAL, METALLIC sculpture with every anatomical detail translated into rigid metal panels, plates, and segments. Muscles become curved metal plates. Scales/feathers/fur become etched surface textures on metal. Eyes are polished metallic spheres or lenses, completely lifeless and dead — like glass marbles set in steel sockets. The overall appearance should feel like a master metalworker sculpted the ${subject} from metal — anatomically perfect but clearly a non-living metal object with zero biological properties.`;
    }
    return `The ${subject} must be HYPER-DETAILED — every real-world feature of the actual ${subject} is present but rendered entirely in metal. Surface details include: micro-etched panel lines, tiny hex-bolt heads at joints, visible micro-hinge pins, hairline seam lines where parts meet, subtle surface texture variations between different material zones (some panels slightly more reflective, some with fine brushed grain). The scale is palm-sized (fits comfortably in an adult hand, approximately 10-12cm at the longest dimension when fully deployed). Despite the small size, the detail level is extraordinary — comparable to a premium die-cast collectible or a master-grade scale model kit. Every tiny feature is present — if the real ${subject} has it, the metallic toy version has a metal equivalent of it at this scale.${livingNote}`;
  }

  // ─── ULTRA-STRONG SOUND RULES ──────────────────
  function getSoundRules() {
    return `
═══ ABSOLUTE SOUND RULES — ZERO SILENT MOTION ═══

EVERY single physical movement in this video produces a corresponding real mechanical sound. There is ZERO silent motion anywhere. The sounds are NOT from any audio library, NOT from any sound effect pack, NOT generated separately — they come directly from the physical object being recorded by the phone's internal microphone.

SOUND-TO-MOTION BINDING (mandatory for every movement type):
• Hinge rotation → smooth metallic creak proportional to rotation speed, ending with a click-lock
• Sliding on track → continuous metallic whisper/slide sound, pitch rising as speed increases  
• Spring release → sharp metallic PING or TWANG
• Latch engaging → crisp metallic CLICK or SNAP
• Gear teeth meshing → rhythmic tick-tick-tick at gear rotation speed
• Motor running → continuous whirr, pitch proportional to motor RPM
• Heavy piece settling → deep metallic THUD with brief vibration ring
• Light piece locking → high-pitched metallic tick
• Magnetic connection → sharp, decisive CLACK
• Hydraulic piston → pressurized HISS followed by mechanical THUNK
• Ball-bearing rotation → smooth, continuous metallic purr
• Metal-on-metal friction → smooth sliding whisper
• Panel flexing under load → subtle metallic stress creak
• Final complete lock → decisive heavy CLUNK with brief reverb

MICRO-SOUND RULE: Even movements smaller than 2mm produce audible sound. A tiny hex-bolt rotating, a micro-panel shifting 1mm, a hairspring adjusting — ALL produce their own faint but audible metallic micro-sounds. The cumulative effect of dozens of tiny simultaneous micro-adjustments creates a rich, layered ASMR soundscape.

AMBIENT CONTEXT: Between mechanical movements, the room is near-silent — only the faintest room tone (air conditioning hum or distant ambient) is audible. This silence makes each mechanical sound stand out with crystal clarity. The contrast between silence and mechanical sound IS the ASMR experience.

RECORDING CONTEXT: All these sounds are captured by the phone's built-in microphone from approximately 30-50cm away. The sounds have natural room acoustics — slight reverb from the desk surface, natural frequency rolloff from distance. They sound REAL and PRESENT, not studio-recorded or processed.`;
  }

  // ─── AI PROBLEM PREVENTION RULES (expanded) ────
  function getAIProblemPrevention() {
    return `
═══ CRITICAL RULES TO PREVENT AI VIDEO GENERATION PROBLEMS ═══

1. NO TEXT/NUMBERS ON SCREEN: Do not render any measurements, dimensions, text labels, brand names, watermarks, or numerical values anywhere in the frame. The video is purely visual with no on-screen text whatsoever. No HUD, no overlays, no subtitles.

2. OBJECT PERMANENCE: The abstract/subject must remain in the EXACT same position on the desk throughout the entire video. It does not slide, shift, drift, or rotate on the surface. Only internal parts move — the base footprint stays fixed on the exact same desk coordinates from frame 1 to frame 300.

3. CONSISTENT LIGHTING: The lighting must remain perfectly consistent throughout the entire 10-second video. No flickering, no light source changes, no shadow jumping. Single soft overhead light source, consistent throughout. The light color temperature does not shift.

4. PHYSICS CONSISTENCY: Every moving part must obey real physics — parts have weight, momentum, and inertia. No parts floating, teleporting, or moving through each other. Hinges rotate on fixed axes. Sliding parts follow tracks. Nothing defies gravity. Heavier parts move slower. Lighter parts can move faster. Parts that extend far from the base have slight oscillation dampening.

5. HAND CONTINUITY: The human hand that appears at the start must be the same hand throughout (same skin tone, same fingers, same nail appearance). The hand enters from one side, interacts with the abstract, and fully exits the frame before the deployment begins.

6. CAMERA BEHAVIOR: The camera has subtle, organic handheld micro-shake throughout — never perfectly still, never dramatically shaking. The shake is consistent with a person holding a phone while trying to keep it steady. No sudden zooms, no focus pulls, no perspective changes. The focal length does not change. The angle does not shift more than ±2 degrees.

7. DESK SURFACE CONSISTENCY: The desk surface (worn white/light surface) remains identical throughout — same scratches, same imperfections, same color. No morphing, no texture changes. Every scratch visible in frame 1 is visible in the exact same position in frame 300.

8. SHADOW ACCURACY: The subject casts a real, consistent shadow on the desk that changes shape appropriately as parts deploy. Shadow direction and softness remain constant (matching the fixed light source). Shadow edges are soft and natural.

9. MATERIAL CONSISTENCY: The metallic finish and surface quality of every part remains identical throughout the transformation. No color shifting, no texture morphing, no material changes between frames. The same panel has the same reflectivity and color from the moment it becomes visible until the end.

10. SOUND-VISUAL SYNC: Every mechanical movement must correspond to an appropriate sound — clicks for latches, whirrs for motors, ticks for gears, slides for tracks. No silent movements. No sounds without corresponding visual motion. Even the tiniest movement has its own sound.

11. PART COUNT CONSISTENCY: The number of parts visible at the end must be consistent with the abstract. No parts appearing from nowhere. No parts disappearing. Every piece in the final subject was contained within the abstract. Conservation of mass and parts.

12. SCALE CONSISTENCY: The size of the object must remain physically consistent. The abstract is half-palm-sized. The deployed subject is palm-sized. The growth from abstract to subject comes from UNFOLDING, not from size-changing or scaling up.

13. FRAME RATE SMOOTHNESS: All motion must be smooth and continuous — no stuttering, no frame skipping, no jerky movements. Mechanical motion should be fluid and precise at a consistent frame rate.

14. NO MORPHING: Parts UNFOLD, ROTATE, SLIDE, and EXTEND — they never MORPH, MELT, DISSOLVE, WARP, or ORGANICALLY TRANSFORM. Every shape change is a rigid mechanical movement along defined axes. Metal stays rigid. Panels stay flat. Curves maintain their radius. No soft-body deformation.

15. NO PHANTOM REFLECTIONS: Reflections on the metallic surface must be consistent with the actual environment (desk, soft overhead light). No impossible reflections, no reflected objects that don't exist in the scene.

16. ABSTRACT-TO-SUBJECT COLOR CONTINUITY: The abstract and the deployed subject have the EXACT SAME surface color and finish — because the abstract IS the subject, just folded up. The color does not change during deployment. A panel that was visible on the abstract retains its exact color when it unfolds into the subject position.`;
  }

  // ─── GENERATE MASTER PROMPT ────────────────────
  function generateMasterPrompt(config) {
    const { category, subject, themeId, customThemeColor, useOriginalColor, deployStyle, transformDuration, numParts, speed } = config;

    const categoryData = CATEGORIES.find(c => c.id === category);
    const categoryName = categoryData ? categoryData.name : category;
    const abstractShape = getAbstractShapeDesc(category, subject);
    const themeDesc = getThemeDesc(themeId, customThemeColor, useOriginalColor, category, subject);
    const deployDesc = getDeploymentDesc(deployStyle, subject, numParts, transformDuration);
    const subjectDetails = getSubjectDetails(category, subject);
    const problemPrevention = getAIProblemPrevention();
    const soundRules = getSoundRules();
    const deployStyleObj = DEPLOYMENT_STYLES.find(s => s.id === deployStyle);
    const deployStyleName = deployStyleObj ? deployStyleObj.name : deployStyle;
    const colorMode = useOriginalColor ? 'ORIGINAL SUBJECT COLOR (real-world accurate)' : (customThemeColor || themeId);

    return `═══════════════════════════════════════════════════════════════
MASTER TRAINING PROMPT — VESTURO ASMR SELF-DEPLOYING TOY SYSTEM
═══════════════════════════════════════════════════════════════

You are going to help me create video prompts for AI video generation models (like Google Veo 3). Each video prompt must produce a 10-second video of a self-deploying mechanical metallic toy that transforms from a compact abstract into a fully detailed subject. Read every single word below with extreme focus — this is the COMPLETE system you need to understand. Nothing here is optional. Every detail matters. The output video must be indistinguishable from real raw phone footage of a real physical mechanical toy.

━━━ THE CONCEPT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This is an ASMR content concept for YouTube Shorts. The content shows palm-sized, hyper-detailed metallic mechanical toys that self-deploy from a compressed abstract shape into a fully formed subject. The audience should NEVER be able to tell this was generated by AI. Every frame must look like real raw phone footage.

The toys are engineered like precision aerospace devices:
• MATERIALS: The toy is constructed from micro-machined metals — steel alloy (frame structure), aluminum (body panels), magnesium (internal supports), titanium (hinges and fasteners), and tungsten (vibration dampening weights). Every surface has a genuine metallic finish — you can see the grain, the reflections, the machined edges. These are real metals with real weight.
• CONSTRUCTION: Each toy is made of multiple rigid metal segments connected by micro-hinges, micro-ball-bearings, and precision track-slides. Inside are tiny electric micro-motors that power the self-deployment. Each connection point is an engineered joint with specific range of motion.
• THE ABSTRACT: When fully compressed, all parts fold and interlock tightly into a compact shape (half-palm-sized). This compressed form is called "the abstract." The abstract's shape is specifically designed to be the subject itself folded up — it hints at the subject's silhouette. The abstract has the EXACT SAME color and surface finish as the deployed subject, because it IS the subject.
• THE BUTTON: On the surface of the abstract, there is one small mechanical push-button. When pressed, it produces a loud, satisfying ASMR click sound — this sound comes from the physical mechanism inside (a spring-loaded metal striker hitting a resonance plate), NOT from any speaker or audio library. The button click is the loudest, most satisfying sound in the entire video.
• DEPLOYMENT: After the button is pressed, the internal micro-motors activate. Parts begin to unfold, rotate, slide, and extend in a precisely choreographed sequence. Each movement is MECHANICAL — rigid parts moving on defined axes. NO morphing, no melting, no organic transformation. EVERY movement produces sound.
• THE SUBJECT: The fully deployed form is a hyper-detailed metallic sculpture of the subject, palm-sized, with extraordinary surface detail.
• THE SOUND: EVERY mechanical movement — no matter how small — produces its own real physical sound. There is ZERO silent motion. No audio library. No sound effects added. All sound is the actual physical sound of metal parts moving, captured by the phone microphone.

━━━ CURRENT CONFIGURATION ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CATEGORY: ${categoryName}
SUBJECT: ${subject}
COLOR/THEME: ${themeDesc}
COLOR MODE: ${colorMode}
DEPLOYMENT STYLE: ${deployStyleName}
TRANSFORMATION DURATION: ${transformDuration} seconds
NUMBER OF PARTS: ${numParts} major segments
SPEED: ${speed}

CRITICAL COLOR RULE: The abstract and the deployed subject have the EXACT SAME surface color and finish described above. They are the same object — one is folded, one is unfolded. The color does NOT change during transformation. What you see on the abstract's surface IS what you see on the deployed subject's surface.

━━━ THE ABSTRACT SHAPE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The abstract for "${subject}" is ${abstractShape}. The surface of the abstract shows: hairline seam lines where parts will separate, a uniform surface finish of ${themeDesc}, micro hex-bolt heads visible at structural junction points, and one clearly visible mechanical push-button (small, circular, slightly protruding, with a machined knurled edge for grip). The abstract's color and finish are IDENTICAL to the deployed subject because it IS the subject folded up.

━━━ SUBJECT DETAIL REQUIREMENTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${subjectDetails}

━━━ DEPLOYMENT SEQUENCE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${deployDesc}

${soundRules}

━━━ FILMING SETUP (RAW PHONE FOOTAGE) ━━━━━━━━━━━━━━━━━━━━━━

CAMERA: The video is filmed with a smartphone held in hand (no tripod, no gimbal, no stabilization). The camera has natural handheld micro-shake — subtle, organic tremor consistent with a person trying to hold steady while filming something fascinating on their desk. The phone frame is NEVER visible — the video shows only what the phone camera sees. The footage looks exactly like someone casually filmed this on their phone — not cinematic, not professional, just raw authentic phone footage.

ANGLE: Elevated perspective, 45-60 degrees above the desk surface, looking down at the object. This angle shows both the top surface and front/side of the toy simultaneously, revealing its three-dimensional shape and surface details.

COMPOSITION: The desk surface fills at least 70% of the frame. The object sits in the center-lower portion of the frame. A thin sliver of the room environment is visible at the very top edge — blurred, out of focus, just enough to confirm this is a real room. The composition is slightly imperfect — not perfectly centered, because a real person holding a phone wouldn't frame it perfectly.

DESK: A real, used, worn white or light-colored desk surface. It has: faint scratches from daily use, a couple of small scuff marks, maybe a tiny chip in the paint near an edge. The desk is mostly empty — no other objects distracting from the subject. These desk imperfections are consistent throughout every frame.

LIGHTING: Soft, natural overhead lighting (like a desk lamp or room ceiling light). Creates gentle, realistic shadows. Not harsh, not dramatic — realistic indoor lighting that you'd see in any normal room. The lighting remains 100% consistent throughout the entire video. Single light source, fixed position, fixed intensity, fixed color temperature.

AUDIO: ALL sound is captured by the phone's internal microphone. No external microphones, no audio editing, no added sound effects, no music, no audio library sounds of any kind. Every sound in the video comes directly from the mechanical object itself: the button click, the motor whirr, the metal-on-metal clicks, the sliding of parts, the locking of hinges, the tiny bearing rotations, the micro-panel adjustments. Even the smallest 1mm movement of a tiny panel produces its own faint metallic sound. The room has natural ambient near-silence (maybe very faint HVAC or room tone). The mechanical sounds are the ASMR content. The silence between movements makes each sound more impactful.

━━━ VIDEO STRUCTURE (10 SECONDS) ━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECOND 0-1: The abstract sits on the desk. A real human hand enters the frame from the left side. The hand picks up the abstract with fingers, lifts it slightly, turns it to find the button. Faint metallic weight-sound as fingers grip the metal object. The abstract has visible weight in how the hand holds it.

SECOND 1-2: The hand finds the button and presses it firmly with the thumb. A LOUD, sharp, deeply satisfying mechanical CLICK sound echoes from the abstract — a crisp metallic snap from an internal spring-loaded striker hitting a tuned resonance plate. This click is THE signature sound. It rings briefly with metallic overtones. This is the most satisfying sound in the entire video.

SECOND 2-3: The hand gently places the abstract back onto the desk surface. Soft metallic tap as it touches down — the sound of a dense metal object being set on a hard surface. The hand pulls back and exits the frame to the left. The abstract sits motionless for a brief beat. Then a very faint, almost subliminal whirring begins from inside — micro-motors activating, tiny gears beginning to engage.

SECOND 3-${3 + transformDuration}: The deployment begins. Over exactly ${transformDuration} seconds, all ${numParts} segments deploy using the ${deployStyleName} pattern. Every single movement is mechanical, precise, and produces corresponding metallic ASMR sounds. Not a single movement is silent. The transformation progresses smoothly with no pauses or stutters. Each part moves with visible mechanical purpose — hinges rotate on axes, slides follow tracks, latches engage with clicks.

SECOND ${3 + transformDuration}-10: The final pieces lock into place with decisive, heavy clicks. The fully deployed ${subject} sits perfectly still on the desk. Brief moment of settling — the tiniest micro-vibration dampening as the last kinetic energy dissipates through tungsten dampeners. Then perfect stillness. The camera holds steady for a beat, letting the viewer admire the completed form in silence. The video ends on this beauty shot of the fully deployed metallic ${subject}.

${problemPrevention}

━━━ YOUR TASK ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Now generate the COMPLETE video prompt that I can directly paste into a video AI model. The prompt must describe every visual detail, every sound, every movement, frame by frame, with zero ambiguity. Include the FIRST FRAME description and the LAST FRAME description explicitly. Include ALL deployment movements with their specific sounds. Include ALL camera behavior. Make it one continuous, comprehensive, ultra-detailed prompt that leaves NOTHING to AI interpretation.

IMPORTANT: Output ONLY the video prompt text. No explanations, no headers, no notes — just the raw prompt ready to copy and paste.`;
  }

  // ─── GENERATE VIDEO PROMPT ─────────────────────
  function generateVideoPrompt(config) {
    const { category, subject, themeId, customThemeColor, useOriginalColor, deployStyle, transformDuration, numParts, speed } = config;

    const categoryData = CATEGORIES.find(c => c.id === category);
    const abstractShape = getAbstractShapeDesc(category, subject);
    const themeDesc = getThemeDesc(themeId, customThemeColor, useOriginalColor, category, subject);
    const deployStyleObj = DEPLOYMENT_STYLES.find(s => s.id === deployStyle);
    const deployStyleName = deployStyleObj ? deployStyleObj.name : deployStyle;
    const deployDetail = deployStyleObj ? deployStyleObj.promptDetail : '';
    const isLiving = ['dinosaurs', 'animals', 'birds', 'marine', 'insects', 'fantasy'].includes(category);

    const livingClarification = isLiving
      ? ` This is NOT a living creature — it is a completely STATIC, LIFELESS metallic mechanical sculpture of a ${subject}. Every anatomical feature (muscles, scales, feathers, eyes) is rendered as rigid metal panels and etched metal surfaces. The eyes are polished metallic spheres with no life — like glass marbles in steel sockets. Zero organic movement, zero breathing, zero biological animation. It is metal. It is dead. It is beautiful.`
      : '';

    const timeDeployStart = 3;
    const timeDeployEnd = timeDeployStart + parseInt(transformDuration);
    const timePerPart = (parseInt(transformDuration) / parseInt(numParts)).toFixed(1);

    let speedDesc = 'smooth, steady, deliberate pace — each movement is purposeful and precise';
    if (speed === 'slow') speedDesc = 'slow, deliberate, meditative pace — each movement lingers before the next begins, maximizing ASMR impact of each individual sound';
    if (speed === 'fast') speedDesc = 'quick, snappy, energetic pace — movements are brisk and decisive, clicks and snaps come in rapid succession';
    if (speed === 'variable') speedDesc = 'variable pace — starting slow and gradually accelerating, building momentum toward the final assembly, each movement faster than the last';

    return `A raw smartphone video filmed from an elevated handheld perspective, approximately 45-60 degrees above a desk, looking down. The phone camera has natural subtle handheld micro-shake throughout the entire video — never perfectly still, never stabilized, consistent with a person holding a phone trying to keep steady. No phone frame visible — this IS the phone camera's direct view. The footage looks like someone casually filmed this on their phone — raw, authentic, not cinematic.

FIRST FRAME: A worn white desk surface fills 70% of the frame, stretching out ahead. Faint scratches and small scuff marks visible on the desk — signs of real daily use. At the very top edge of the frame, a blurred sliver of a real room is barely visible (out of focus). In the center-lower portion of the frame sits a small, half-palm-sized metallic abstract object — ${abstractShape}. The abstract has ${themeDesc}. The ENTIRE abstract surface is coated in this exact finish — because this abstract IS the subject folded up, so it has the subject's own color. Hairline seam lines are visible on its surface where parts will separate. Tiny hex-bolt heads dot the structural junctions. One small, circular, slightly protruding mechanical push-button with a knurled edge is visible on the abstract's surface. Soft overhead indoor lighting casts a gentle, realistic shadow behind the abstract on the desk. The entire scene is quiet — natural room ambience only, near-silence.

SECONDS 0-1: A real adult human hand with natural skin enters the frame smoothly from the left side. The hand reaches down and picks up the small metallic abstract with the fingers. As the fingers close around it, there is a faint metallic contact sound — fingers gripping dense metal. The hand lifts it slightly off the desk — the object has visible WEIGHT, the hand adjusts grip to hold it securely. The hand rotates the abstract gently, searching for the button. The metallic surfaces catch the soft overhead light as it turns, showing the reflective finish and surface details. Faint metallic micro-sounds as fingers shift on the surface.

SECONDS 1-2: The thumb finds the button and presses it firmly. A LOUD, sharp, deeply satisfying mechanical CLICK sound echoes from the abstract itself — a crisp metallic SNAP from an internal spring-loaded striker mechanism hitting a tuned metal resonance plate. This is a real physical sound, not electronic, not from an audio library. The click is the loudest, most satisfying sound in the entire video. It resonates with a brief metallic ring that fades over half a second. The click has tactile impact — you can almost feel it through the screen.

SECONDS 2-3: The hand gently places the abstract back onto the desk surface. A soft metallic TAP as the dense metal object contacts the hard desk — the sound of weight being set down. The hand pulls back smoothly and exits the frame to the left. The abstract sits motionless on the desk for a brief beat of silence. Then — a very faint, almost subliminal whirring begins from deep inside the abstract — micro-motors activating, tiny gear trains beginning to engage. The faintest tick-tick-tick of gears starting to mesh.

SECONDS ${timeDeployStart}-${timeDeployEnd}: THE DEPLOYMENT BEGINS. The internal micro-motors power the self-transformation at a ${speedDesc}. ${deployDetail}

The abstract unfolds into a hyper-detailed, palm-sized metallic sculpture of a ${subject}.${livingClarification} The abstract and deployed subject have the EXACT SAME surface color and finish — ${themeDesc} — because they are the same object, one folded, one unfolded.

The deployment happens in ${numParts} major stages, each taking approximately ${timePerPart} seconds. EVERY movement produces its own corresponding real mechanical sound — not a single motion is silent, not even a 1mm micro-panel shift:

${generatePartStages(category, subject, numParts, deployStyle, timeDeployStart, transformDuration)}

Throughout the ENTIRE deployment: every mechanical movement produces corresponding real metallic ASMR sounds. Clicks for latches. Whirrs for motors. Ticks for gears. Whispers for metal-on-metal slides. Pings for spring releases. Thunks for heavy locks. Purrs for bearings. Even the smallest micro-adjustment of a tiny panel makes its own faint metallic sound. The accumulated soundscape is rich, layered, and deeply satisfying. All sounds come from the physical object itself, captured by the phone's internal microphone from approximately 30-50cm away, with natural room acoustics. No music. No added effects. No audio library. ZERO.

The object NEVER moves from its position on the desk. Only internal parts move — the base footprint stays completely fixed at the exact same desk coordinates throughout. True physics apply — heavier parts move with visible inertia, lighter parts snap crisply, nothing floats or teleports, every movement follows a physical axis of rotation or track of travel.

SECONDS ${timeDeployEnd}-10: The final segments lock into place with decisive, crisp metallic CLICKS — the heaviest, most final-sounding locks in the entire video. The fully deployed ${subject} sits perfectly still on the desk — a breathtaking, hyper-detailed metallic sculpture with ${themeDesc}. The tiniest settling vibration dampens through the structure — a barely audible metallic hum that fades to perfect silence. Every surface detail is extraordinary: micro-etched panel lines, tiny hex-bolt heads at every joint, visible micro-hinge pins, hairline seams where parts meet. The camera holds on this beauty shot with gentle handheld micro-shake. Soft, consistent shadow on the worn white desk beneath. Perfect stillness. Perfect silence except the faintest room tone.

LAST FRAME: The completed metallic ${subject} sculpture sits centered on the worn white desk. Full 3D detail visible from the 45-60 degree elevated angle — top surface and front/side simultaneously visible. The surface finish of ${themeDesc} catches the soft overhead light with realistic reflections. Gentle shadow behind it on the desk. The room sliver is blurred at the top edge. Pure silence except the faintest room tone. The object is motionless, a perfect mechanical creation at rest.${livingClarification}

ABSOLUTE RULES: No text, numbers, measurements, watermarks, or any writing anywhere in the frame at any point. No morphing — ALL shape changes are rigid mechanical movements (rotation on hinge axes, sliding on tracks, telescopic extension, spring release). Consistent lighting and shadows from a single fixed overhead source throughout all 10 seconds. The metallic surface color and quality NEVER changes between frames — same finish from first frame to last. Smooth, continuous motion at consistent frame rate with no stuttering. Camera angle stays locked at 45-60 degrees with only organic handheld micro-shake. This looks like REAL raw phone footage of a REAL physical mechanical toy sitting on a REAL desk — not CGI, not animation, not graphics, not AI-generated. The audience must believe this is a real object that really exists.`;
  }

  // ─── HELPER: Generate part-by-part deployment ──
  function generatePartStages(category, subject, numParts, deployStyle, startTime, duration) {
    const n = parseInt(numParts);
    const dur = parseInt(duration);
    const timePerPart = dur / n;
    const parts = [];

    const partSets = getPartNames(category, subject, n);

    for (let i = 0; i < n; i++) {
      const t1 = (startTime + i * timePerPart).toFixed(1);
      const t2 = (startTime + (i + 1) * timePerPart).toFixed(1);
      const partName = partSets[i] || `Segment ${i + 1}`;
      const motion = getMotionForStyle(deployStyle, i, n);
      parts.push(`Stage ${i + 1} (${t1}s - ${t2}s): ${partName} — ${motion}`);
    }

    return parts.join('\n\n');
  }

  function getPartNames(category, subject, count) {
    const genericParts = (prefix, specifics) => {
      const result = [];
      for (let i = 0; i < count; i++) {
        result.push(i < specifics.length ? specifics[i] : `${prefix} detail segment ${i + 1}`);
      }
      return result;
    };

    const partMap = {
      automobiles: genericParts('Body', ['Chassis base plate extends and locks flat', 'Wheel assemblies deploy from corners — four wheels fold out and lock', 'Body panels unfold upward forming the doors, roof, and hood', 'Front fascia extends — headlights, grille, bumper segments click into place', 'Rear section deploys — tail lights, exhaust tips, spoiler/trunk emerge', 'Interior cockpit details emerge — seats, steering wheel, dashboard', 'Final trim pieces lock — side mirrors, door handles, emblems', 'Window panels slide into door frames', 'Engine bay details extend from the front', 'Antenna and final micro-details snap into position']),
      aircraft: genericParts('Fuselage', ['Fuselage center section extends and locks', 'Wings unfold outward from the body on hinges', 'Tail section deploys — vertical and horizontal stabilizers extend', 'Nose cone telescopes forward into final position', 'Engine nacelles deploy from under wings or fuselage', 'Landing gear folds down from the belly', 'Cockpit canopy or windshield section rises', 'Wing control surfaces (flaps, ailerons) snap into position', 'Intake scoops and air vents open', 'Final antenna and sensor details click into place']),
      spacecraft: genericParts('Hull', ['Main body/hull extends to full length', 'Propulsion nozzles or rocket engines deploy from the base', 'Solar panels or radiator fins unfold outward', 'Command module or cockpit section extends', 'Fuel tank sections telescope outward', 'Antenna arrays and communication dishes deploy', 'Landing legs or docking ports extend', 'Heat shield sections lock into position', 'Thruster nozzles rotate into alignment', 'Final sensor packages and detail panels click into place']),
      motorcycles: genericParts('Frame', ['Main frame spine extends and locks — the central structural backbone of the motorcycle', 'Engine block deploys beneath the frame — cylinders, exhaust headers, and crankcase taking shape', 'Rear swingarm extends backward with chain drive and rear sprocket locking into alignment', 'Front forks telescope downward and lock — triple clamp, fork tubes, and front axle assembly', 'Fuel tank panels unfold and curve over the frame — sculpted bodywork forming the iconic tank shape', 'Wheels deploy — front and rear wheels with disc brakes, spokes/rims fold outward and lock round', 'Seat and tail section extend rearward — seat cowl, rear fender, tail light housing', 'Handlebars and controls deploy — clip-ons or bars with levers, grips, mirrors extending', 'Exhaust system extends from engine headers — pipes routing along the underside, muffler/can deploying', 'Final details snap into place — instrument cluster, headlight lens, chain guard, footpegs locking']),
      ships: genericParts('Hull', ['Main hull keel and bottom plates extend to full length — the backbone of the vessel', 'Hull side panels unfold upward forming the port and starboard walls of the ship', 'Deck plates extend and lock flat across the top — creating the main deck surface', 'Superstructure rises from the deck — bridge tower, command center, radar masts deploying upward', 'Bow section sharpens and locks — the forward prow plates folding into the cutting edge', 'Stern section deploys — propellers, rudder, and transom plates extending rearward', 'Armament or cargo features deploy — gun turrets rotating up, or crane arms extending, or cargo hatches opening', 'Mast and rigging details extend upward — communication arrays, flag poles, signal equipment', 'Railing and deck detail segments lock — handrails, lifeboats, anchor chain mechanisms', 'Final hull details — porthole rings, waterline markings, name plate, and micro-panel trim pieces click into position']),
      birds: genericParts('Body', ['Core torso/chest mass expands outward — the compact body of the bird forming its keel-shaped breast', 'Wings unfold outward from tucked position — primary and secondary feather panels extending in sequence like metal fan blades', 'Tail feather assembly extends rearward — flat metal plume segments fanning out and locking', 'Head and beak deploy from the tucked neck — skull extending forward, sharp metal beak pieces clicking together', 'Legs unfold downward — thin articulated metal leg segments with knee joints and ankle joints locking', 'Talons/feet deploy — individual metal toe segments spreading and curving, tiny claw tips locking sharp', 'Wing detail feathers layer — smaller covert feather panels clicking into rows along the wing surface', 'Eye sockets set with polished metallic sphere eyes — completely lifeless, no gleam of life', 'Crest, crown, or head plumage details rise — any distinctive head features extending and locking', 'Final feather-edge trim and micro-details snap — wingtips, tail tip refinements, tiny ankle scales locking']),
      marine: genericParts('Body', ['Core body mass expands — the main torso/body of the marine creature forming its hydrodynamic shape', 'Fins or flippers extend outward — pectoral, dorsal, and caudal fin panels unfolding from the body', 'Tail/flukes deploy — the powerful tail section extending and the tail fin spreading into its final shape', 'Head section extends forward — skull, jaw, snout forming with teeth as tiny metal points if applicable', 'Gill plates or breathing apparatus details lock — slits or blowhole cover plates clicking into place', 'Tentacles, arms, or appendages extend — if applicable, segmented metal limbs unfurling in sequence', 'Dorsal and ventral detail panels lock — creating the counter-shaded color break line', 'Eye sockets set with polished metallic spheres — completely lifeless like glass in steel', 'Mouth and jaw mechanics deploy — baleen plates, tooth rows, or beak segments locking', 'Final surface texture panels and micro-details snap — scale patterns, barnacle textures, fin-edge trim']),
      insects: genericParts('Body', ['Thorax core expands — the central body segment of the insect forming the main structural mass', 'Legs unfold in sequence — six articulated metal legs deploying from the thorax, each with multiple joint segments', 'Abdomen extends rearward — segmented metal plates telescoping outward, each segment clicking into the next', 'Head capsule deploys forward — compound eye domes, mandible pieces, and antenna bases extending', 'Wings unfold from wing cases or thorax — thin etched metal wing panels spreading to full span', 'Antennae extend — delicate segmented metal feelers rising and curving into their characteristic shape', 'Mandibles or mouthparts deploy — tiny metal jaw pieces clicking together with precision', 'Leg detail segments lock — tarsal claws, joint spines, and sensory hair-like metal bristles', 'Wing venation details lock — the intricate vein pattern panels clicking flat across each wing', 'Final exoskeleton texture plates and micro-details snap — segment borders, spiracle holes, surface texture']),
      architecture: genericParts('Structure', ['Foundation and base platform extends and locks — the ground-level structural footprint', 'Primary vertical columns or walls rise — the main load-bearing structure deploying upward', 'Secondary structural framework extends — arches, beams, flying buttresses, or cross-bracing', 'Floor/level plates extend and lock — each story or platform level clicking into position', 'Facade detail panels unfold — windows, ornamental stonework, or glass curtain wall segments', 'Roof or dome structure deploys — the crowning element rising and locking into its final form', 'Tower, spire, or antenna extends upward — the highest point telescoping to full height', 'Entrance and portico details deploy — doors, steps, columns, or grand archway elements', 'Decorative and ornamental elements lock — sculptures, reliefs, cornices, clock faces, or motifs', 'Final architectural trim and micro-details snap — window mullions, railing spindles, surface texture']),
      robots: genericParts('Chassis', ['Central torso/chassis core expands — the main body housing power systems and AI core', 'Legs or locomotion base deploys — bipedal legs, quadruped limbs, tank treads, or wheel assemblies extending', 'Arms or manipulator limbs extend from shoulder joints — articulated segments with elbow and wrist pivots', 'Head unit rises from the torso — sensor dome, camera eyes, and antenna array deploying', 'Hand/gripper end-effectors deploy — fingers, claws, or tool attachments extending with fine articulation', 'Armor plating and body panels unfold — protective exterior shell covering the internal framework', 'Weapon systems or tool mounts extend — if applicable, barrel, blade, or utility arm deploying', 'Sensor arrays and communication dishes unfold — radar, lidar, or antenna elements extending', 'Joint actuator details lock — visible pistons, hydraulic lines, and servo motor housings', 'Final LED indicators, panel lines, and micro-details snap into place — status lights, serial markings']),
      weapons: genericParts('Blade', ['Core handle/grip structure extends and locks — the central element the hand would hold', 'Blade or striking head deploys from the handle — the primary weapon edge extending to full length', 'Guard, crossguard, or tsuba unfolds — the protective hand barrier extending from both sides', 'Pommel or counterweight locks into the handle base — providing balance to the deployed weapon', 'Blade edge detail panels lock — the sharpened edge, fuller groove, or cutting surface refining', 'Handle wrapping or grip texture segments deploy — cord wrap, leather binding, or ray-skin panels', 'Decorative elements extend — engravings, inlay panels, clan markings, or rune details emerging', 'Secondary features deploy — if applicable: hook, spike, lanyard ring, or sheath mount', 'Blade surface finish panels lock — revealing the final polished, Damascus, or tempered pattern', 'Final pommel cap, tip point, and micro-embellishment details snap into their finished positions']),
      instruments: genericParts('Body', ['Main resonating body or soundboard extends and forms its characteristic shape', 'Neck or tube section extends — the primary tonal column deploying to full length', 'String/key/valve mechanisms deploy — the sound-producing elements clicking into operational position', 'Tuning mechanisms extend — pegs, machine heads, tuning slides, or tension adjusters', 'Bridge, soundpost, or reed housing locks into position — the critical tonal transfer point', 'Body detail panels lock — f-holes, sound holes, fret markers, or valve casings', 'Accessory hardware deploys — chin rest, endpin, mouthpiece, or pickup selector', 'Decorative binding, inlay, and trim elements lock — purfling, position markers, brand logos', 'Stand, rest, or support mechanism extends — if applicable: legs, spike, or strap button', 'Final micro-details snap — string ends, key felt, valve caps, fine tuning adjusters']),
      racing: genericParts('Chassis', ['Monocoque or chassis tub extends and locks flat — the structural safety cell of the race car', 'Suspension arms and pushrod assemblies deploy from all four corners with damper units', 'Wheels deploy from tucked position — racing slick tires on center-lock hubs clicking into place', 'Bodywork panels unfold — aerodynamic side pods, engine cover, and nose cone forming', 'Front wing assembly extends forward — multi-element wing with endplates and flap adjusters', 'Rear wing and diffuser deploy — the massive downforce-generating rear element rising', 'Engine and drivetrain details extend rearward — exhaust pipes, gearbox casing, heat shielding', 'Cockpit details emerge — steering wheel, HANS device mount, harness points, display screen', 'Aerodynamic detail pieces lock — vortex generators, bargeboards, turning vanes, gurney flaps', 'Final livery-detail panels, mirror stalks, and pitot tubes snap into position']),
      trains: genericParts('Body', ['Main locomotive body shell extends to full length — the primary boiler or passenger car body', 'Wheel bogies and truck assemblies deploy beneath — drive wheels, coupling rods, and rail wheels locking', 'Cab or driving compartment extends — windshield, control console, and crew area forming', 'Smokebox, chimney, or pantograph rises — the characteristic top feature deploying upward', 'Coupling mechanisms extend from front and rear — buffer beams, hook-and-link, or knuckle couplers', 'Running boards and side detail panels lock — riveted panels, louver vents, number plates', 'Tender or fuel car section extends rearward — coal bunker, water tank, or fuel supply', 'Steam dome, safety valves, or cooling fans deploy — mechanical top-mounted features rising', 'Headlamp, marker lights, and signal equipment extend — front and rear lighting clicking on', 'Final rivet lines, handrail stanchions, and micro-detail trim pieces snap into place']),
      armor: genericParts('Plate', ['Breastplate / cuirass front plate extends and curves — the main chest protection forming', 'Back plate deploys and locks to the breastplate — completing the torso shell', 'Shoulder pauldrons unfold and rise — curved metal shoulder guards extending outward', 'Gauntlets or arm guards extend along the arms — vambrace and rerebrace plates locking in sequence', 'Leg armor deploys — greaves, cuisses, and knee cops extending downward and locking', 'Helmet rises from the gorget — visor, crown, and cheek guards folding into the head shape', 'Shield face extends and locks — the broad protective surface with boss and rim deploying', 'Chain mail or scale detail panels fill the gaps — flexible-looking but rigid metal weave sections', 'Decorative crests, plumes, or heraldic elements rise — the identifying features of the armor', 'Final buckle, strap hardware, and micro-detail rivet heads snap into their finished positions']),
      heavy_machinery: genericParts('Frame', ['Main chassis frame extends and locks — the heavy structural base of the machine', 'Tracks or wheels deploy beneath — caterpillar track links or massive rubber tire assemblies', 'Boom arm extends upward and outward — the primary working arm telescoping to reach', 'Cab structure rises — operator cabin with glass panels, controls, and safety cage forming', 'Hydraulic cylinders extend — massive piston assemblies pushing boom segments into position', 'Bucket, blade, or attachment deploys at the arm end — the working tool clicking into place', 'Counterweight swings into position at the rear — the heavy balance mass locking', 'Hydraulic line routing deploys — visible hose runs connecting cylinders to the power unit', 'Outrigger stabilizers extend to the sides — locking legs that prevent tipping during operation', 'Final safety stripes, warning decals, and micro-detail panels snap into position']),
      tanks: genericParts('Hull', ['Hull floor plate extends and locks flat — the heavy armored base of the tank', 'Hull side armor plates unfold upward — thick sloped armor panels forming the hull walls', 'Track assemblies deploy on both sides — road wheels, drive sprocket, idler wheel, and track links', 'Turret ring and base deploys on top of the hull — the rotating platform for the main gun', 'Main gun barrel extends forward from the turret — the long cannon tube telescoping to full length', 'Turret armor panels unfold and lock — the armored fighting compartment forming around the gun', 'Engine deck and rear plates lock into position — exhaust grilles, engine access panels', 'Commander cupola and hatches rise — the observation and entry points on the turret top', 'Secondary weapons deploy — machine gun mounts, smoke grenade launchers on turret sides', 'Final reactive armor blocks, antenna whips, and micro-detail stowage snap into position']),
      electronics: genericParts('Housing', ['Main housing shell extends — the outer case of the electronic device forming its shape', 'Internal PCB or circuit board platform extends and locks — the electronic backbone', 'Display or primary interface panel deploys — screen, dial face, or viewing element', 'Control inputs deploy — buttons, knobs, switches, keys, or touchpad extending into position', 'Ports and connectors extend from the sides — USB, audio jack, power input, antenna jacks', 'Speaker grilles or audio output elements lock into position — mesh covers, driver housings', 'Lens, sensor, or pickup element deploys — camera lens, laser, turntable cartridge, or sensor array', 'Internal component details lock — visible chipsets, capacitors, heat sinks clicking in', 'Cable, cord, or wireless antenna extends — power cord, headphone cable, or wireless aerial', 'Final badge, LED indicators, and micro-trim details snap into their finished positions']),
      fantasy: genericParts('Body', ['Core torso/body mass expands — the mythical creature central body forming its powerful shape', 'Primary limbs deploy — massive legs, arms, or tentacles extending with articulated metal joints', 'Wings or dorsal features unfold — if winged, enormous metal wing frames with membrane panels extending', 'Head and jaws deploy — fearsome skull with horns, crest, or multiple heads extending', 'Tail extends and curves — segmented metal tail with spines, spikes, or fin details', 'Claws, talons, or weapons deploy — deadly appendage tips extending and curving to sharp points', 'Scale, plate, or hide texture panels lock — surface armor covering the creature body', 'Eye sockets set with polished metallic spheres — completely lifeless, no magical glow, just dead metal', 'Crest, horns, mane, or crown details rise — the distinctive mythological features extending', 'Final spine ridges, barb tips, and micro-detail creature features snap into position']),
      space_vehicles: genericParts('Hull', ['Main hull or fuselage extends to full length — the primary body of the vehicle taking shape', 'Engine nacelles or thruster pods deploy — propulsion units extending from the hull', 'Wing or fin structures unfold — stabilizer fins, solar sails, or weapon pylons', 'Cockpit or bridge canopy deploys — the command section with viewport panels', 'Weapon systems extend — laser turrets, torpedo tubes, or deflector arrays if applicable', 'Landing gear or docking clamps extend — the interface for surface or station connection', 'Sensor arrays and communication equipment deploy — radar dishes, antenna, scanner pods', 'Hull panel detail segments lock — plating patterns, access hatches, running lights', 'Shield emitters or defensive systems deploy — deflector panels, armor plating segments', 'Final greeble details, registration markings, and micro-panel lines snap into position']),
      sports: genericParts('Frame', ['Main body or frame extends — the primary structural element of the equipment', 'Grip, handle, or interface surface deploys — where the athlete holds or wears the equipment', 'Striking surface or functional face extends — racket head, blade, wheel, or contact area', 'Structural supports and reinforcement lock — ribs, stays, spokes, or internal framework', 'Padding, cushion, or protection elements deploy — foam, rubber, or composite panels', 'Fastening and adjustment mechanisms extend — laces, straps, buckles, or tension systems', 'Aerodynamic or performance features deploy — fins, channels, tread patterns, or airflow elements', 'Branding and identification panels lock — logo areas, size markings, model designators', 'Accessory attachment points extend — mounting hardware, clip points, or add-on interfaces', 'Final grip texture, surface finish details, and micro-trim elements snap into position']),
      tools: genericParts('Body', ['Main body or housing extends — the core structural element of the tool', 'Handle or grip extends — the ergonomic user-interface section deploying', 'Working edge, bit, or functional head deploys — the blade, drill bit, jaw, or tool tip extending', 'Pivot, hinge, or rotation mechanism locks — the joint that allows the tool to function', 'Locking or adjustment mechanism deploys — ratchet, cam lock, or size adjustment', 'Secondary tools or attachments extend — if multi-tool: additional blades, files, or accessories', 'Spring or tension mechanism clicks into place — the internal force element', 'Measurement markings or guide features deploy — ruler edge, level bubble, or alignment aids', 'Carry attachment extends — lanyard ring, belt clip, or keychain loop', 'Final surface knurling, logo stamp, and micro-detail trim pieces snap into position']),
      default: genericParts('Section', ['Base platform extends and locks', 'Primary structural framework deploys', 'Main body panels unfold and lock', 'Secondary detail sections extend', 'Fine detail components deploy', 'Surface finishing panels click into place', 'Accent and trim pieces lock', 'Final micro-detail elements snap into position', 'Structural reinforcement pieces lock', 'Topmost finishing elements complete the form']),
    };

    return partMap[category] || partMap.default;
  }

  function getMotionForStyle(styleId, partIndex, totalParts) {
    const motions = {
      sequential_unfold: [
        'lifts on its micro-hinge with a faint creak, rotates outward with a smooth mechanical whirr from the micro-motor, and clicks into locked position with a sharp metallic SNAP. The hinge pin makes a tiny tick as it passes through its travel stop.',
        'the next segment catches and begins its rotation, lifting away from the core. Tiny gear teeth engage with an audible tick-tick-tick, the micro-motor whirrs at a slightly different pitch. Locks firmly with a decisive metallic CLICK that rings briefly.',
        'following the sequence, this segment unfolds smoothly on its hinge axis. The micro-motor produces a continuous, even whirr as it guides the piece through its arc. A faint metallic scraping whisper as the panel slides past an adjacent surface. Locks with a crisp tick.',
        'continuing the cascade, this part lifts and rotates in perfect mechanical rhythm. The hinge bearing produces a smooth metallic purr. Each movement is precise and deliberate. The locking mechanism engages with a satisfying spring-loaded CLICK.',
        'deploys in sequence with the preceding parts, maintaining the rhythmic unfolding pattern. Metal surfaces catch and release light as they rotate. The bearing rotation creates a soft continuous hum. Final lock produces a clean, decisive snap.'
      ],
      radial_bloom: [
        'pushes outward from the center simultaneously with other segments. Micro-actuators produce a collective mechanical hum as multiple pieces move at once. The piece rotates on its bearing (smooth metallic purr) as it moves outward, clicking into its final radial position with a CLACK.',
        'blooms outward from the core in sync with all other segments. The combined motor sound creates a harmonic mechanical chord. Fanning out like a metal petal with a sliding metallic whisper along the guide rail. Locks with a snap.',
        'extends radially with a smooth mechanical push. The actuator produces a firm, purposeful hum. Spinning slightly on its bearing with an audible whirr. All pieces moving together create a layered soundscape of overlapping mechanical sounds. Clicks into position.',
        'the radial expansion continues as this segment finds its position. Tiny clicking sounds from the detent mechanism — tick, tick, CLICK as it passes through intermediate positions and locks at full extension.',
        'locks into its final radial position with a decisive metallic SNAP, completing its portion of the blooming pattern. The vibration from the lock propagates briefly through the metal structure — a barely audible metallic ring that fades instantly.'
      ],
      cascade_reveal: [
        'the topmost layer lifts first, pulling this segment upward and outward in a cascading waterfall motion. Hinge creak transitioning to motor whirr. Mechanical linkage transfers momentum downward with an audible chain of metallic ticks.',
        'triggered by the tier above through physical linkage, this layer cascades open with a deeper resonant CLICK. The linkage rod slides with a smooth metallic whisper. Reveals the next layer beneath with the panel producing a soft metallic breath as air moves.',
        'the cascade continues downward. Each layer opening produces a progressively deeper metallic click — like descending notes on a metallic xylophone. The mechanical waterfall effect builds a satisfying rhythmic pattern.',
        'flowing down with the cascade momentum, this tier opens smoothly. The linkage mechanism transfers energy with precise metallic tick-tick sounds. Each connection point adds its own micro-sound to the cascade.',
        'the cascade reaches this level, unfolding with accumulated momentum. The click is now the deepest, most resonant in the series. The cascade crescendo reaches its climax — a rich chord of metallic locking sounds.'
      ],
      spiral_assembly: [
        'unwinds from the core in a spiral path, rotating on its micro-bearing as it traces a curved trajectory. The bearing produces a smooth, continuous metallic purr. The spiral track guides the piece with a faint sliding whisper. Locks with a click at the endpoint.',
        'follows a helical path outward, spinning as it travels along the spiral track. The whirring of its micro-bearing is clearly audible — a high-pitched metallic hum. Guide rail produces a smooth sliding sound. Snaps into position with a decisive click.',
        'continues the spiral pattern, each piece tracing a slightly different radius. The bearing whirr has a slightly different pitch — creating a harmony with the other spinning pieces. Smooth rotational motion with a clicking lock at the endpoint.',
        'spirals outward following the established helix. The continuous rotation creates a smooth, hypnotic mechanical hum. As it reaches its designated slot, the speed decreases — the pitch drops — and it snaps into position with a satisfying CLACK.',
        'the final spiral arc completes. The spinning piece decelerates with a descending whirr, the bearing pitch dropping as it slows. Reaches its position and locks with a crisp final CLICK. The spinning settles with a brief metallic vibration that dampens instantly.'
      ],
      butterfly_split: [
        'the abstract splits along its center axis with a sharp metallic CRACK — two halves separating along the precision-machined split line. This half swings open on the central hinge with a smooth creak. Mirror-synchronized with the opposite half — both produce identical sounds.',
        'as the halves open, internal segments within this side begin to extend outward. Unfolding from within with a series of quick metallic clicks — tick-tick-tick — like a mechanical lock being picked. Each small piece snaps into its extended position.',
        'deeper segments emerge from inside the opened butterfly wing. The motor produces a determined whirr. Each piece extends with its own tiny click and slides into its locked position with a metallic whisper followed by a snap.',
        'the symmetrical deployment continues, both sides moving at identical speeds producing stereo-matched mechanical sounds. This segment extends from within the wing structure with a smooth slide and a decisive locking click.',
        'final internal segments deploy from within the fully opened halves. The last pieces click into position with a rapid burst of small metallic snaps — like a tiny mechanical drumroll — completing the symmetrical form.'
      ],
      accordion_expand: [
        'the compressed layers begin to separate — this zigzag linkage straightens as the abstract stretches along its primary axis. Metallic sliding sound — smooth, continuous, like a well-oiled drawer sliding open. The slide has weight and friction.',
        'the accordion continues expanding — this fold opens with geometric precision. Segments sliding on precision tracks produce a polished metal-on-metal whisper. Rhythmic clicking as detent positions are passed — tick... tick... tick... CLICK at full extension.',
        'extending telescopically, this section pushes outward as the zigzag mechanism straightens. Each straightening linkage produces its own tiny metallic snap. The cumulative effect is a series of rapid-fire micro-clicks.',
        'the expansion reaches this layer — the compressed fold opens fully. Track slides produce a smooth metallic whisper. The locking mechanism at full extension engages with a clean, decisive CLICK. The rhythmic expansion pattern continues.',
        'final accordion fold opens and locks flat. The entire structure is now at full extension. The final locking click is the heaviest, most decisive of the series — a deep metallic CLUNK that announces the expansion is complete.'
      ],
      domino_chain: [
        'the initial piece moves first — flipping on its hinge with a quick metallic whistle of air displacement. Its locking motion compresses a tiny spring that releases a catch — TINK — triggering the next piece. The chain reaction begins.',
        'triggered by the previous piece\'s catch release, this segment flips into position with a crisp metallic snap. Its own locking motion releases the next catch with an audible TINK. The chain propagates.',
        'the domino chain propagates — this piece deploys from the mechanical impulse of its predecessor. Each flip produces a unique pitch of metallic snap based on the piece size. The chain of clicks is building in complexity.',
        'continuing the chain reaction, each piece triggers the next with increasing speed. The mechanical clicking builds into a crescendo — a rapid-fire series of metallic snaps getting faster and louder.',
        'the chain reaction reaches this piece — the final links in the domino sequence click into place with a rapid burst. The crescendo peaks with the loudest, most satisfying series of clicks, ending with one final decisive CLANK.'
      ],
      telescopic_extension: [
        'the innermost section pushes outward, extending like a telescope from the core. Smooth sliding sound — polished metal on polished metal track. It locks at full extension with a distinct CLICK and the extension stop produces a brief metallic ring.',
        'the next nested section extends outward, pushed by the inner section. Smooth telescopic motion — the sliding sound is slightly deeper as this section is larger. Locked click at full extension resonates with more mass.',
        'continuing the telescopic sequence, this stage extends further. The sliding sound builds as each subsequent stage adds more mass and surface area. Each extension is precise, each lock is clean.',
        'the telescopic reach extends further — this section pushes out with a smooth drawer-slide sound. More surface area is now visible, revealing more detail of the forming subject. Lock click.',
        'the final telescopic stage extends and locks. The heaviest section produces the deepest sliding sound and the most resonant locking click. The structure has grown from compact core to full size through layered extension.'
      ],
      origami_unfold: [
        'the first flat panel swings open along a precisely scored fold line — a clean 90-degree rotation on a metal hinge. Sharp, crisp metallic crease sound — like a tiny metallic finger-snap. The panel locks flat with a decisive tick.',
        'the revealed panel beneath now unfolds in turn — another geometric fold opens with angular precision. The hinge creak is slightly different in pitch. Crisp metallic click as it locks into position.',
        'continuing the origami sequence, each panel reveals another beneath it. The angular, geometric unfolding is precise and clean. Each fold produces its own unique metallic crease sound based on the panel size.',
        'this panel swings open at a 45-degree scored line, revealing intricate detail underneath. The fold sound is sharp and metallic — a quick, crisp SNAP as the living hinge reaches its stop.',
        'the final origami folds open, each locking flat with a decisive snap. The geometric unfolding is complete. The last fold produces the most satisfying crease-lock sound — a clean, final metallic CLICK.'
      ],
      mechanical_gearwork: [
        'visible micro-gears begin spinning as the internal motor activates. This cam mechanism pushes the segment outward with clockwork precision. Gears produce a rhythmic tick-tick-tick at rotation speed, the motor a continuous whirr.',
        'interlocking gears translate rotational motion into linear extension. The clockwork mechanism is smooth and continuous. Gear teeth meshing create a rapid-fire clicking sound — precise, rhythmic, mechanical.',
        'the gear train drives this segment — cam mechanisms timed precisely to push it into position. Tiny gears clicking rhythmically — tick-tick-tick-tick — like a mechanical watch being wound.',
        'continued gear-driven deployment — smooth rotation converting into stepped mechanical movement. The whirring and clicking blend into a complex mechanical symphony. Each gear has its own pitch.',
        'the final gear-driven segments lock into place. The clockwork mechanism completes its cycle. Gears decelerate with a descending pitch whirr, settling with a final, deeply satisfying TICK of the last tooth engaging.'
      ],
      // New styles
      hydraulic_press_reverse: [
        'the micro-hydraulic piston inside activates — initial slow resistance followed by smooth, powerful extension. A deep pressurized HISS as fluid pushes through the micro-cylinder, followed by a heavy metallic THUNK as the piston reaches full extension and the locking pin drops into place. Visible power behind the movement.',
        'the next hydraulic stage activates. Another HISS-THUNK sequence, this one slightly deeper in pitch. The extension has controlled, deliberate force — the part pushes outward like it\'s being pressed from inside. Micro-hydraulic lines flex visibly.',
        'hydraulic pressure drives this segment outward. The characteristic HISS of pressurized fluid is followed by the heavy metallic THUNK of the lock. The sound has weight — you can feel the force.',
        'continued hydraulic deployment. Each piston extension is smooth but powerful. The HISS-THUNK sequence creates a rhythmic industrial beat. Each lock is heavy and final.',
        'the final hydraulic piston reaches full extension. The deepest HISS yet, followed by the heaviest THUNK. The hydraulic system depressurizes with a final soft hiss as the deployment locks permanently.'
      ],
      magnetic_snap: [
        'the first segment pops free from the abstract with a spring-loaded metallic PING — the release spring sending it to maximum travel on its guide rail. It hovers at full extension for a split second, then rare-earth micro-magnets CLACK it decisively into its locked deployed position. Sharp, satisfying magnetic snap.',
        'another segment releases with a PING, travels along its guide rail with a smooth metallic whisper, then CLACKS into position. The magnetic connection is instant and decisive — no bounce, no adjustment, just perfect magnetic lock.',
        'spring release — PING — rail travel — smooth slide — magnetic lock — CLACK. Each magnetic snap has a uniquely satisfying quality — the decisive finality of strong magnets finding each other through steel.',
        'rapid-fire now: PING-slide-CLACK, PING-slide-CLACK. The staccato rhythm of spring releases and magnetic snaps creates an addictive, repeating ASMR pattern.',
        'the final magnetic snap. The last piece releases, travels, and CLACKS home with the loudest, most decisive magnetic connection. The assembled form is held together by dozens of powerful micro-magnets — immovable.'
      ],
      shrapnel_reverse: [
        'ALL pieces spring outward simultaneously from the abstract core with a collective metallic CRACK — a controlled burst of metal pieces separating in every direction along their guide rails. The sound is sharp, explosive, metallic.',
        'at maximum displacement, all pieces reverse direction instantly. They rush back inward along their rails with a rising-pitch metallic WHOOSH of multiple sliding pieces, but now each locks into its DEPLOYED position rather than compressed.',
        'the reassembly cascade begins — pieces clicking into deployed positions from all directions simultaneously. A STORM of metallic clicks, snaps, and clacks from every angle — dozens of locks engaging at once.',
        'the click-storm intensifies as smaller detail pieces find their positions. Each tiny piece adds its own micro-click to the chaotic-but-precise assembly crescendo.',
        'the final pieces slam home. The last simultaneous locks engage with one unified metallic CLANG — every remaining piece locking at the same instant. A brief ringing vibration, then perfect stillness.'
      ],
      layer_peel: [
        'the outermost shell panel lifts at one edge with a soft metallic creak, then curls back smoothly on a living hinge — like peeling metal skin. The peel produces a smooth, continuous metallic sliding sound, like a credit card drawn from a metal slot. The peeled panel clicks into its deployed position.',
        'the next layer is revealed. Another panel peels away with a smooth metallic whisper, exposing finer detail underneath. The living hinge produces a soft, continuous creak. Clicks into deployed position.',
        'continuing to peel inward. Each layer reveals surprising complexity underneath. The peeling sound is smooth and satisfying — continuous metallic slide followed by a soft positional click. Like unwrapping a metal present.',
        'deeper layers peel away, revealing the finest details. The panels are smaller now, the peeling sounds are higher in pitch. Quick, delicate metallic whispers followed by tiny clicks.',
        'the final innermost layer peels away and locks. The last peel reveals the completed detailed core. A final soft metallic whisper, a decisive click, and the form is fully revealed.'
      ],
      puzzle_lock: [
        'the first 3D puzzle piece rotates 90 degrees with a ratcheted clicking — tick-tick-tick as it passes through three detent positions — then CLICK as it reaches its target orientation. Now the adjacent piece can slide into the newly created interlocking slot with a deep, satisfying CHUNK as the dovetail joint mates.',
        'rotate: tick-tick-CLICK. Slide-lock: CHUNK. The puzzle assembly sequence is precise and deliberate. Each rotation enables the next piece. The ratchet clicks are crisp and the dovetail CHUNKS are deep and heavy.',
        'another rotation sequence — tick-tick-tick-CLICK — followed by a complex multi-piece slide where two pieces interlock simultaneously: CHUNK-CHUNK in rapid succession. The 3D puzzle is assembling.',
        'the puzzle becomes more complex. Multiple rotations and slides now happen in quick sequence: tick-tick-CLICK-CHUNK, tick-tick-CLICK-CHUNK. The rhythm builds.',
        'the final puzzle piece rotates — tick-tick-CLICK — and slides home with the deepest, most satisfying CHUNK of all. The 3D puzzle is complete. Every piece interlocked with zero play, zero wobble. Perfectly assembled.'
      ],
      centrifugal_deploy: [
        'the abstract begins spinning on its vertical axis — slowly at first, the motor producing a low-pitched whirr that gradually rises in pitch. Centrifugal force starts to push the outermost segments outward along their radial guide tracks. A soft sliding whisper begins.',
        'rotational speed increases. The motor whirr rises in pitch. More segments extend outward, each one sliding along its track with increasing speed. Centrifugal latches begin engaging — CLICK — as pieces reach full extension at speed. Each click happens at a different rotational position.',
        'the spinning is now at peak speed. The motor whirr is a high-pitched hum. Multiple latches click in rapid sequence — CLICK-CLICK-CLICK — as centrifugal force locks pieces at full extension. The combined sound of spinning metal and locking clicks is mesmerizing.',
        'as more pieces lock, the mass distribution changes. The spinning begins to slow — the motor whirr descends in pitch. Remaining pieces extend and lock with slower, more deliberate clicks.',
        'the spinning decelerates to a stop. The motor whirr descends through a satisfying pitch sweep from high to low. The last pieces lock with slow, heavy clicks. The form comes to perfect rest — one final tick as the last bearing stops. Complete stillness.'
      ],
    };

    const styleMotions = motions[styleId] || motions.sequential_unfold;
    return styleMotions[partIndex % styleMotions.length];
  }

  // ─── ABSTRACT COMPRESSION STYLES ──────────────
  const ABSTRACT_STYLES = [
    { id: 'auto', name: 'Auto (Category Default)', desc: 'Automatically determined by the subject category — the abstract shape subtly hints at the subject silhouette.' },
    { id: 'tight_geometric', name: 'Tight Geometric Fold', desc: 'Sharp angular compression with clean geometric faces — like an origami-inspired metal cube with precision-scored fold lines.' },
    { id: 'organic_compression', name: 'Organic Compression', desc: 'Smooth, rounded compression — the abstract has flowing curves, like a river-tumbled metal pebble or a seed pod.' },
    { id: 'puzzle_block', name: 'Mechanical Puzzle Block', desc: 'The abstract looks like a 3D puzzle — visible interlocking seams, dovetail joints, and sliding-panel lines on every surface.' },
    { id: 'crystalline', name: 'Crystalline Compression', desc: 'Faceted, gemstone-like compression — multiple flat faces at different angles, catching light like a cut diamond made of metal.' },
    { id: 'industrial_capsule', name: 'Industrial Capsule', desc: 'A smooth cylindrical capsule with rounded ends — looks like a precision-machined ammunition round or medical capsule.' },
    { id: 'fractal_nest', name: 'Fractal Nested', desc: 'Self-similar nested shapes — a shape within a shape, like Russian nesting dolls compressed into one, with visible concentric seam rings.' },
  ];

  // ─── YOUTUBE TITLE GENERATOR ──────────────────
  function generateYouTubeTitle(config) {
    const { category, subject, deployStyle } = config;
    const deployStyleObj = DEPLOYMENT_STYLES.find(s => s.id === deployStyle);
    const deployName = deployStyleObj ? deployStyleObj.name : 'Self-Deploying';

    const titleTemplates = [
      `This Tiny Metal ${subject} Builds Itself 🤯 #asmr #satisfying`,
      `${subject} Self-Deploys From a Metal Block 😱 #mechanical #asmr`,
      `Unreal Self-Assembling ${subject} | Pure Mechanical ASMR 🔩`,
      `Watch This Metal Abstract Transform Into a ${subject} ⚙️ #shorts`,
      `Satisfying ${deployName}: Tiny ${subject} Self-Builds 🔧 #asmr`,
      `Palm-Sized ${subject} BUILDS ITSELF | Mechanical ASMR 🤤`,
      `The Most Satisfying ${subject} Transformation 🧲 #satisfying #shorts`,
      `Mini Metal ${subject} — ${deployName} Deployment 🔩✨ #asmr`,
    ];

    // Pick a deterministic but varied template based on subject name hash
    let hash = 0;
    for (let i = 0; i < subject.length; i++) {
      hash = ((hash << 5) - hash + subject.charCodeAt(i)) | 0;
    }
    const idx = Math.abs(hash) % titleTemplates.length;

    return titleTemplates[idx];
  }

  // ─── YOUTUBE DESCRIPTION GENERATOR ────────────
  function generateYouTubeDescription(config) {
    const { category, subject, deployStyle, transformDuration, numParts, speed } = config;
    const categoryData = CATEGORIES.find(c => c.id === category);
    const categoryName = categoryData ? categoryData.name : category;
    const deployStyleObj = DEPLOYMENT_STYLES.find(s => s.id === deployStyle);
    const deployName = deployStyleObj ? deployStyleObj.name : 'self-deploying';

    return `🔩 Watch this palm-sized metallic ${subject} self-deploy from a compressed abstract block into a hyper-detailed mechanical sculpture — pure satisfying ASMR!

⚙️ Every click, whirr, and snap you hear comes directly from the real mechanical movements of precision-engineered metal parts. No sound effects, no music — just pure mechanical ASMR.

📋 Specs:
• Subject: ${subject} (${categoryName})
• Deployment: ${deployName}
• Parts: ${numParts} major segments
• Transform time: ${transformDuration} seconds
• Materials: Steel, Aluminum, Magnesium, Titanium, Tungsten

🔔 Subscribe to @vesturo_ASMR for daily satisfying mechanical transformations!

👍 Like if you watched till the end!

💬 Comment which subject you want to see next!

#asmr #satisfying #mechanical #transformation #shorts #metalwork #engineering #oddlysatisfying #selfassembly #miniature #toymaking #vesturoASMR #${subject.replace(/\s+/g, '')} #${categoryName.replace(/[\s&]+/g, '')} #mechanicalASMR #satisfyingvideos #tinkering #precisionengineering #metalart #kinetic #oddlysatisfyingvideos`;
  }

  // ─── PUBLIC API ────────────────────────────────
  return {
    CATEGORIES,
    DEPLOYMENT_STYLES,
    THEME_PRESETS,
    ORIGINAL_COLORS,
    ABSTRACT_STYLES,
    getOriginalColor,
    getAbstractShapeDesc,
    generateMasterPrompt,
    generateVideoPrompt,
    generateYouTubeTitle,
    generateYouTubeDescription,
    getAIProblemPrevention,
  };

})();
