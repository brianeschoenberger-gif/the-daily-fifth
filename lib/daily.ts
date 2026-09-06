import { currentSystemsEdition } from './current-daily';

export type Confidence = 'guessing' | 'pretty-sure' | 'certain';

export type DiscoverySource = {
  label: string;
  publisher: string;
  url: string;
};

export type Discovery = {
  id: string;
  category: string;
  collection:
    | 'Science & Nature'
    | 'Deep History'
    | 'Hidden Systems'
    | 'Human Ingenuity';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  prompt: string;
  choices: string[];
  correct: number;
  reveal: string;
  surprise: string;
  mechanism: string;
  origins: string;
  ripples: string;
  namedConcept: { term: string; definition: string };
  sources: DiscoverySource[];
  verificationNote: string;
  surpriseScore: number;
  tellabilityScore: number;
  evergreen: boolean;
  callback: { prompt: string; answer: string };
  rabbitHole: string;
  icon: string;
  image?: { src: string; alt: string; credit: string; creditUrl: string };
};

export type DailyEdition = {
  id: string;
  date: string;
  eyebrow: string;
  title: string;
  deck: string;
  discoveries: Discovery[];
};

export const dailyEdition: DailyEdition = {
  id: 'origins-and-ripples-001',
  date: 'Today’s Daily Five',
  eyebrow: 'Surprise · Origins · Ripples',
  title: 'How heavy is something that floats?',
  deck: 'Five questions that begin with a guess and end somewhere unexpected.',
  discoveries: [
    {
      id: 'cloud-weight',
      category: 'Hidden physics',
      collection: 'Science & Nature',
      difficulty: 'Medium',
      prompt:
        'About how much water is inside a typical one-kilometer-wide cumulus cloud?',
      choices: [
        '1,100 pounds',
        '22,000 pounds',
        '1.1 million pounds',
        '110 million pounds',
      ],
      correct: 2,
      reveal:
        'That weightless-looking cloud holds about 1.1 million pounds of water.',
      surprise:
        'The droplets are tiny and dispersed, but the cloud occupies roughly a billion cubic meters. A small amount of liquid in each cubic meter adds up fast.',
      mechanism:
        'A typical estimate uses about 0.5 grams of liquid water per cubic meter. Multiply that by a cubic kilometer and the result is roughly 500,000 kilograms.',
      origins:
        'Clouds acquired their “weightless” reputation because we experience them from below, without a visible boundary or supporting surface. The mass is real even when its distribution hides it.',
      ripples:
        'The same scaling effect explains why seemingly trace concentrations across enormous volumes can drive rainfall, aviation icing, and climate effects.',
      namedConcept: {
        term: 'Scale effect',
        definition:
          'A tiny amount per unit becomes enormous when multiplied across a very large system.',
      },
      sources: [
        {
          label: 'How much does a cloud weigh?',
          publisher: 'U.S. Geological Survey',
          url: 'https://www.usgs.gov/media/images/how-much-does-a-cloud-weigh',
        },
        {
          label: 'Condensation and the water cycle',
          publisher: 'U.S. Geological Survey',
          url: 'https://www.usgs.gov/water-science-school/science/condensation-and-water-cycle',
        },
      ],
      verificationNote:
        'The estimate assumes a 1 km × 1 km × 1 km cumulus cloud with about 0.5 g/m³ of liquid water; real clouds vary substantially.',
      surpriseScore: 5,
      tellabilityScore: 5,
      evergreen: true,
      callback: {
        prompt:
          'What makes a cloud’s tiny water concentration add up to enormous mass?',
        answer: 'Its billion-cubic-meter volume—a scale effect.',
      },
      rabbitHole:
        'Why millions of pounds of water remain suspended instead of dropping all at once.',
      icon: '☁️',
    },
    {
      id: 'railroad-time',
      category: 'Everyday infrastructure',
      collection: 'Deep History',
      difficulty: 'Hard',
      prompt:
        'Who effectively introduced the U.S. system of standard time zones decades before Congress made it law?',
      choices: [
        'Railroad companies',
        'The U.S. Navy',
        'Telegraph operators',
        'Watch manufacturers',
      ],
      correct: 0,
      reveal:
        'American time zones began as railroad infrastructure, not federal law.',
      surprise:
        'On November 18, 1883, North American railroads switched their operating clocks to Standard Railway Time. Cities followed; Congress did not formalize national standard time until 1918.',
      mechanism:
        'Local solar time worked when travel was slow. Rail networks connected towns whose clocks disagreed, turning harmless local variation into a scheduling and safety problem.',
      origins:
        'Railroad officials coordinated a private standard because their network needed interoperability before public law caught up.',
      ripples:
        'Train scheduling reorganized civic life: municipal clocks, commerce, communications, and eventually federal law aligned around a standard created for a transportation network.',
      namedConcept: {
        term: 'Path dependence',
        definition:
          'An early solution becomes embedded, shaping later choices even after the original circumstances change.',
      },
      sources: [
        {
          label: 'Today in History: Standard Railway Time',
          publisher: 'Library of Congress',
          url: 'https://www.loc.gov/item/today-in-history/november-18/',
        },
        {
          label: 'A Walk Through Time',
          publisher: 'National Institute of Standards and Technology',
          url: 'https://www.nist.gov/pml/time-and-frequency-division/popular-links/walk-through-time/walk-through-time-world-time-scales',
        },
      ],
      verificationNote:
        'Railroads adopted Standard Railway Time in 1883; the federal Standard Time Act followed in 1918.',
      surpriseScore: 5,
      tellabilityScore: 5,
      evergreen: true,
      callback: {
        prompt:
          'What industry standardized U.S. time before the federal government?',
        answer: 'The railroad industry, in 1883.',
      },
      rabbitHole:
        'The “Day of Two Noons,” when some city clocks struck noon twice.',
      icon: '🚂',
    },
    {
      id: 'oxford-tenochtitlan',
      category: 'Deep history',
      collection: 'Deep History',
      difficulty: 'Medium',
      prompt: 'Which began first?',
      choices: [
        'Teaching at Oxford University',
        'The founding of Tenochtitlan',
        'They began in the same decade',
        'Historians cannot place either one',
      ],
      correct: 0,
      reveal:
        'Oxford teaching predates the founding of Tenochtitlan by more than two centuries.',
      surprise:
        'Teaching existed at Oxford by 1096. Mexico’s National Institute of Anthropology and History dates the founding of Mexico-Tenochtitlan to 1325.',
      mechanism:
        'Our mental timelines often sort “medieval Europe” and “the Aztecs” into vague, non-overlapping boxes. Putting dated events side by side exposes the distortion.',
      origins:
        'Oxford did not appear through a single founding ceremony; it accumulated teachers, students, privileges, and colleges. Tenochtitlan, meanwhile, grew rapidly into the center of the Mexica world.',
      ripples:
        'Chronological comparisons can correct Eurocentric or linear stories of history—but they can also mislead if a university’s gradual emergence is treated as identical to a city’s founding.',
      namedConcept: {
        term: 'Periodization',
        definition:
          'Dividing history into named eras—a useful tool that can conceal events happening simultaneously across societies.',
      },
      sources: [
        {
          label: 'History of the University',
          publisher: 'University of Oxford',
          url: 'https://www.ox.ac.uk/about/the-university/history?lang=en',
        },
        {
          label: 'Historic center of Mexico City',
          publisher: 'Instituto Nacional de Antropología e Historia',
          url: 'https://lugares.inah.gob.mx/en/node/4833',
        },
      ],
      verificationNote:
        'Oxford says teaching existed by 1096 but gives no single foundation date; INAH dates Tenochtitlan’s founding to 1325.',
      surpriseScore: 5,
      tellabilityScore: 5,
      evergreen: true,
      callback: {
        prompt:
          'What historical thinking error does the Oxford–Tenochtitlan comparison expose?',
        answer:
          'Misleading periodization: distant histories we mentally separate were unfolding at the same time.',
      },
      rabbitHole:
        'How a royal ban on English students attending Paris accelerated Oxford’s growth after 1167.',
      icon: '⌛',
    },
    {
      id: 'apollo-memory',
      category: 'Technology origins',
      collection: 'Human Ingenuity',
      difficulty: 'Medium',
      prompt:
        'How much memory did the Apollo Guidance Computer have, expressed in modern terms?',
      choices: [
        'About 72 kilobytes',
        'About 8 megabytes',
        'About 1 gigabyte',
        'About 64 gigabytes',
      ],
      correct: 0,
      reveal: 'Apollo reached the Moon with roughly 72 kilobytes of memory.',
      surprise:
        'The striking part is not merely how little memory it had. Its software was physically woven into core-rope memory, making late changes slow and expensive.',
      mechanism:
        'Wires threaded through or around magnetic cores represented binary values. The design was compact, nonvolatile, and extraordinarily reliable, but manufacturing forced software decisions early.',
      origins:
        'Apollo’s extreme limits helped drive priority-based computing: when overloaded during the lunar descent, the system shed lower-priority work and preserved guidance tasks.',
      ripples:
        'Hardware constraints shaped software architecture, verification practices, labor, and schedules. Reliability came partly from accepting inflexibility—a tradeoff modern software often reverses.',
      namedConcept: {
        term: 'Constraint-driven design',
        definition:
          'Severe limits force architectural choices that can produce unusual efficiency or reliability.',
      },
      sources: [
        {
          label: 'Apollo Guidance Computer oral history',
          publisher: 'NASA Johnson Space Center',
          url: 'https://www.nasa.gov/wp-content/uploads/2025/07/battinrh-4-18-00.pdf',
        },
        {
          label: 'Apollo 11 program alarms',
          publisher: 'NASA History',
          url: 'https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/a11.1201-fm.html',
        },
      ],
      verificationNote:
        'NASA sources describe 2K words of erasable RAM plus 36K words of fixed core-rope memory, commonly summarized as about 72 KB.',
      surpriseScore: 5,
      tellabilityScore: 5,
      evergreen: true,
      callback: {
        prompt:
          'Why did Apollo’s woven software make the computer reliable but inflexible?',
        answer:
          'The program was physically encoded in nonvolatile core-rope memory, so it survived power loss but took time to manufacture or change.',
      },
      rabbitHole:
        'How priority scheduling helped the Apollo 11 computer recover from its famous 1201 and 1202 alarms.',
      icon: '🌕',
    },
    {
      id: 'shark-deep-time',
      category: 'Deep time',
      collection: 'Science & Nature',
      difficulty: 'Easy',
      prompt: 'Which appeared in the fossil record first?',
      choices: [
        'Sharks',
        'Large forests',
        'They appeared together',
        'The fossil record cannot tell us',
      ],
      correct: 0,
      reveal:
        'Sharks were swimming tens of millions of years before large forests spread across land.',
      surprise:
        'Confirmed shark scales date to roughly 420 million years ago. The great coal-forming forests familiar from the Carboniferous flourished much later, beginning around 359 million years ago.',
      mechanism:
        'Evolution did not move from familiar land ecosystems into the sea. Complex marine lineages were already ancient while terrestrial plants were still transforming continents.',
      origins:
        'Shark fossils are unusually fragmentary because cartilage rarely fossilizes; much of their deep history is reconstructed from teeth, scales called denticles, and a few impressions.',
      ripples:
        'Deep evolutionary age is not protection. Slow reproduction makes many shark populations especially vulnerable to a rapid new pressure: industrial fishing.',
      namedConcept: {
        term: 'Evolutionary mismatch',
        definition:
          'Traits suited to a long-standing environment become liabilities when conditions change faster than adaptation can follow.',
      },
      sources: [
        {
          label: 'Shark evolution',
          publisher: 'Smithsonian Ocean',
          url: 'https://ocean.si.edu/ocean-life/sharks-rays/sharks',
        },
        {
          label: 'Fossils—Deep Time',
          publisher: 'Smithsonian Institution',
          url: 'https://www.si.edu/newsdesk/factsheets/david-h-koch-hall-fossils-deep-time',
        },
      ],
      verificationNote:
        'The comparison is between early shark evidence and large Carboniferous forests, not the first land plants of any kind.',
      surpriseScore: 5,
      tellabilityScore: 5,
      evergreen: true,
      callback: {
        prompt:
          'Why is a lineage surviving mass extinctions still vulnerable today?',
        answer:
          'Its slow reproductive strategy is mismatched with the speed and scale of industrial fishing.',
      },
      rabbitHole:
        'Why the 400-year lifespan of Greenland sharks can make population recovery take centuries.',
      icon: '🦈',
    },
  ],
};

export const invisibleSystemsEdition: DailyEdition = {
  id: 'invisible-systems-001',
  date: 'Archive edition',
  eyebrow: 'The systems hiding in plain sight',
  title: 'Who keeps your blue dot from drifting?',
  deck: 'Five ordinary conveniences with extraordinary machinery underneath.',
  discoveries: [
    {
      id: 'gps-relativity',
      category: 'Invisible physics',
      collection: 'Hidden Systems',
      difficulty: 'Hard',
      prompt:
        'Without relativity corrections, how much faster would a GPS satellite’s clock run than one on Earth?',
      choices: [
        '38 microseconds per day',
        '38 milliseconds per day',
        '38 seconds per day',
        'It would run slower',
      ],
      correct: 0,
      reveal:
        'Your phone’s blue dot depends on correcting 38 microseconds of relativity every day.',
      surprise:
        'Speed makes the satellite clock lose about 7 microseconds per day, while weaker gravity makes it gain about 45. The net effect is 38 microseconds faster than a clock on Earth.',
      mechanism:
        'GPS calculates position from signal travel times. Because light covers roughly 300 meters in one microsecond, tiny clock errors rapidly become large location errors.',
      origins:
        'Einstein developed relativity decades before satellite navigation. GPS engineers later had to turn what seemed like abstract physics into an operating requirement.',
      ripples:
        'GPS timing synchronizes telecommunications, finance, power grids, and transportation. A correction associated with navigation quietly supports infrastructure far beyond maps.',
      namedConcept: {
        term: 'Technology stack dependency',
        definition:
          'An everyday service rests on layers of earlier discoveries and infrastructure that users rarely see.',
      },
      sources: [
        {
          label: 'Putting Einstein to the Test',
          publisher: 'National Institute of Standards and Technology',
          url: 'https://www.nist.gov/atomic-clocks/a-powerful-tool-for-science/putting-einstein-test',
        },
        {
          label: 'Global positioning receivers and relativity',
          publisher: 'NIST Technical Note 1385',
          url: 'https://nvlpubs.nist.gov/nistpubs/Legacy/TN/nbstechnicalnote1385.pdf',
        },
      ],
      verificationNote:
        'The 38-microsecond figure is the combined daily rate difference from special- and general-relativistic effects for GPS satellite clocks.',
      surpriseScore: 5,
      tellabilityScore: 5,
      evergreen: true,
      callback: {
        prompt: 'Why does an error measured in microseconds matter for GPS?',
        answer:
          'GPS converts signal timing into distance, and light travels about 300 meters in one microsecond.',
      },
      rabbitHole: 'Why gravity makes clocks at higher altitude run faster.',
      icon: '🛰️',
    },
    {
      id: 'containerization',
      category: 'Global trade',
      collection: 'Hidden Systems',
      difficulty: 'Medium',
      prompt:
        'Before container shipping, what accounted for almost half the cost of transporting some cargo?',
      choices: [
        'Moving goods between ship and pier',
        'Fuel burned at sea',
        'Marine insurance',
        'Customs inspections',
      ],
      correct: 0,
      reveal:
        'Moving cargo the last few feet onto and off a ship could consume almost half its transport cost.',
      surprise:
        'Before standardized containers, workers repeatedly handled sacks, barrels, boxes, and crates. Loading one shipment could take many labor-intensive steps and keep a vessel in port for days.',
      mechanism:
        'A sealed standard box can move between truck, train, and ship without unpacking its contents. Standardization reduces handling, damage, theft, delay, and coordination costs at once.',
      origins:
        'Trucking entrepreneur Malcolm McLean’s converted tanker Ideal-X sailed in 1956 carrying 58 containers. Adoption then required ships, cranes, ports, roads, and standards to change together.',
      ripples:
        'Containerization helped disperse supply chains across countries, transformed waterfront labor, shifted ports away from old city docks, and made distant production economically practical.',
      namedConcept: {
        term: 'Intermodal standardization',
        definition:
          'A shared physical standard lets cargo move across different transport networks without being repacked.',
      },
      sources: [
        {
          label: 'Transforming the Waterfront',
          publisher: 'Smithsonian National Museum of American History',
          url: 'https://americanhistory.si.edu/explore/exhibitions/america-on-the-move/online/transforming-waterfront',
        },
        {
          label: 'American Racer historic engineering report',
          publisher: 'U.S. Maritime Administration',
          url: 'https://www.maritime.dot.gov/sites/marad.dot.gov/files/docs/about-us/history/vessels-maritime-administration/856/americanracerhaerreport.pdf',
        },
      ],
      verificationNote:
        'The “almost half” estimate comes from Matson’s 1950s research into its transportation costs; the share varied by cargo and route.',
      surpriseScore: 5,
      tellabilityScore: 5,
      evergreen: true,
      callback: {
        prompt:
          'What did the shipping container standardize besides the box itself?',
        answer:
          'The handoff between ships, trains, trucks, cranes, ports, and warehouses.',
      },
      rabbitHole:
        'How container ports reshaped waterfront neighborhoods and dock labor.',
      icon: '🚢',
    },
    {
      id: 'first-barcode',
      category: 'Retail machinery',
      collection: 'Human Ingenuity',
      difficulty: 'Easy',
      prompt:
        'What became the first retail product scanned with a modern UPC barcode?',
      choices: [
        'A pack of chewing gum',
        'A can of soup',
        'A carton of milk',
        'A newspaper',
      ],
      correct: 0,
      reveal: 'The barcode economy began with a pack of Wrigley’s chewing gum.',
      surprise:
        'On June 26, 1974, a Marsh supermarket in Troy, Ohio used one of its first ten scanners to read the UPC on a pack of gum.',
      mechanism:
        'A laser reflected from dark and light bars into a photodiode. The register translated the pattern into a product identifier and looked up its price in a database.',
      origins:
        'The breakthrough was not merely inventing striped symbols. Grocery manufacturers and retailers had to agree on one code, then invest in labels, scanners, registers, and shared data practices.',
      ripples:
        'The humble checkout code enabled automated inventory, purchasing data, faster restocking, and increasingly detailed measurement of consumer behavior.',
      namedConcept: {
        term: 'Coordination standard',
        definition:
          'A common convention becomes valuable because many independent organizations agree to use it.',
      },
      sources: [
        {
          label: 'Supermarket Scanner',
          publisher: 'Smithsonian National Museum of American History',
          url: 'https://americanhistory.si.edu/collections/object/nmah_892778',
        },
        {
          label: 'History of the barcode',
          publisher: 'GS1',
          url: 'https://www.gs1.org/standards/barcodes',
        },
      ],
      verificationNote:
        'The Smithsonian identifies the gum as the first purchase made using scanners capable of reading the newly standardized UPC.',
      surpriseScore: 4,
      tellabilityScore: 5,
      evergreen: true,
      callback: {
        prompt: 'Why did the barcode require more than a clever pattern?',
        answer:
          'Retailers and manufacturers needed a shared standard plus scanners, databases, and labeled products.',
      },
      rabbitHole:
        'Why the original scanned pack of gum ended up in the Smithsonian.',
      icon: '▥',
    },
    {
      id: 'water-chlorination',
      category: 'Public health',
      collection: 'Hidden Systems',
      difficulty: 'Medium',
      prompt:
        'When did the first U.S. city begin routinely disinfecting its community drinking water?',
      choices: ['1908', '1938', '1968', '1988'],
      correct: 0,
      reveal:
        'Routine U.S. drinking-water disinfection began in Jersey City in 1908.',
      surprise:
        'In 1900, U.S. typhoid incidence was about 100 cases per 100,000 people. By 1920—after disinfection spread alongside sanitation improvements—it had fallen to 33.8.',
      mechanism:
        'A low residual level of chlorine or chloramine keeps killing germs while treated water travels through miles of pipes, not only while it is inside the treatment plant.',
      origins:
        'Clean water became a collective public-health system rather than a purely household responsibility. Treatment, sewerage, source protection, and regulation evolved together.',
      ripples:
        'The remaining disinfectant protects distribution networks but can create byproducts and interact with pipe chemistry, so solving one risk creates new monitoring responsibilities.',
      namedConcept: {
        term: 'Preventive infrastructure',
        definition:
          'A shared system quietly prevents harm so effectively that users rarely encounter the danger it controls.',
      },
      sources: [
        {
          label: 'History of Drinking Water Treatment',
          publisher: 'Centers for Disease Control and Prevention',
          url: 'https://archive.cdc.gov/www_cdc_gov/healthywater/drinking/history.html',
        },
        {
          label: 'Water disinfection with chlorine and chloramine',
          publisher: 'Centers for Disease Control and Prevention',
          url: 'https://www.cdc.gov/drinking-water/about/about-water-disinfection-with-chlorine-and-chloramine.html',
        },
      ],
      verificationNote:
        'The typhoid decline had multiple causes, including source-water protection, sanitation, and hygiene; it should not be attributed to chlorination alone.',
      surpriseScore: 4,
      tellabilityScore: 5,
      evergreen: true,
      callback: {
        prompt:
          'Why does disinfectant remain in tap water after it leaves the plant?',
        answer:
          'To keep killing germs that may enter or grow while water moves through distribution pipes.',
      },
      rabbitHole:
        'How switching from chlorine to chloramine can change lead and copper behavior in pipes.',
      icon: '🚰',
    },
    {
      id: 'elevator-city',
      category: 'Cities',
      collection: 'Human Ingenuity',
      difficulty: 'Medium',
      prompt:
        'Which overlooked invention helped make the modern skyscraper practical?',
      choices: [
        'The automatic elevator safety brake',
        'The revolving door',
        'The pneumatic mail tube',
        'The electric streetlamp',
      ],
      correct: 0,
      reveal:
        'The skyscraper depended on convincing people that a broken elevator rope would not kill them.',
      surprise:
        'Elisha Otis sold a hoist with an automatic safety brake in 1853. Passenger elevators, paired with steel-frame construction, made high-rise buildings practical.',
      mechanism:
        'If the hoisting rope failed, the safety mechanism engaged the guide rails and arrested the platform. The invention changed the perceived risk of vertical travel.',
      origins:
        'Hoists already existed. The pivotal innovation addressed trust: people would not routinely enter a suspended room until failure became survivable.',
      ripples:
        'Fast vertical transportation changed land values and social geography. Upper floors shifted from undesirable climbs to premium views, while dense business districts could grow upward.',
      namedConcept: {
        term: 'Enabling technology',
        definition:
          'An innovation whose importance comes from making an entire class of other products or systems possible.',
      },
      sources: [
        {
          label: 'Otis and his Elevator',
          publisher: 'Library of Congress',
          url: 'https://www.loc.gov/item/today-in-history/september-20',
        },
        {
          label: 'Otis Elevator Company historic-place report',
          publisher: 'National Park Service',
          url: 'https://npgallery.nps.gov/GetAsset/10444073-4c01-43cf-be8c-979ab7135c78',
        },
      ],
      verificationNote:
        'Elevators alone did not create skyscrapers; steel framing, foundations, fireproofing, and other systems were also necessary.',
      surpriseScore: 5,
      tellabilityScore: 5,
      evergreen: true,
      callback: {
        prompt: 'What problem did Otis solve that earlier hoists had not?',
        answer:
          'Trust and survivability: the platform would stop if its lifting rope failed.',
      },
      rabbitHole:
        'How elevators reversed the status hierarchy of upper and lower floors.',
      icon: '↟',
    },
  ],
};

export const dailyEditions = [
  dailyEdition,
  invisibleSystemsEdition,
  currentSystemsEdition,
];
