export type Source = {
  label: string;
  publisher: string;
  url: string;
};

export type Question = {
  prompt: string;
  choices: string[];
  correct: number;
  explanation: string;
  source: number;
};

export type Edition = {
  id: string;
  date: string;
  shortDate: string;
  category: string;
  title: string;
  deck: string;
  why: string;
  primer: string[];
  lens: string;
  sources: Source[];
  questions: Question[];
  conversation: {
    facts: string[];
    summary: string;
    nuance: string;
    question: string;
  };
};

export const editions: Edition[] = [
  {
    id: 'mail-voting-rules',
    date: 'September 4, 2026',
    shortDate: 'Sep 4',
    category: 'American democracy',
    title: 'A judge blocked new mail-voting rules. Here’s what that means.',
    deck: 'A late-breaking dispute over election authority, postal rules, and the calendar.',
    why: 'States are already sending midterm ballots. The ruling tests who controls election procedures—and what can change when voting has begun.',
    primer: [
      'A federal judge in Massachusetts issued a preliminary injunction preventing the U.S. Postal Service from putting a new mail-voting rule into effect during the 2026 midterms. The rule followed a presidential executive order and would have required state and local election offices to clear ballot-envelope designs with the Postal Service and submit voter information through a new federal portal.',
      'The timing is central. North Carolina began sending mail ballots on September 4, and other states were close behind. The states challenging the rule argued that changing election-mail procedures this late could prevent eligible voters from receiving or returning ballots.',
      'This is not the final judgment. A preliminary injunction keeps the rule from operating while the legal challenge continues. The administration said it would appeal to the First Circuit Court of Appeals.',
    ],
    lens: 'The dispute is partly about authority—and partly about timing.',
    sources: [
      {
        label: 'What the judge blocked',
        publisher: 'Associated Press',
        url: 'https://apnews.com/article/ce207ff2d0533de05cc2d299e91a0198',
      },
      {
        label: 'The court’s reasoning',
        publisher: 'U.S. Supreme Court docket',
        url: 'https://www.supremecourt.gov/DocketPDF/26/26A297/422948/20260903154027877_USPS%20Final%20Rule%20Stay%20and%20Appx.pdf',
      },
      {
        label: 'The original executive order',
        publisher: 'The White House',
        url: 'https://www.whitehouse.gov/wp-content/uploads/2026/03/eo-14399.pdf',
      },
      {
        label: 'States’ description of the rule',
        publisher: 'Connecticut Attorney General',
        url: 'https://portal.ct.gov/ag/press-releases/2026-press-releases/attorney-general-tong-secures-court-order-blocking-unlawful-mail-voting-rule',
      },
    ],
    questions: [
      {
        prompt: 'What exactly did the judge issue?',
        choices: [
          'A permanent ruling ending the case',
          'A preliminary injunction',
          'A recommendation to Congress',
          'A presidential pardon',
        ],
        correct: 1,
        explanation:
          'A preliminary injunction prevents the rule from taking effect while the court considers the underlying case. It replaced a shorter temporary restraining order, but it is not a final judgment.',
        source: 0,
      },
      {
        prompt:
          'Which federal agency would have implemented the disputed rule?',
        choices: [
          'The Census Bureau',
          'The Federal Election Commission',
          'The U.S. Postal Service',
          'The Department of Defense',
        ],
        correct: 2,
        explanation:
          'The U.S. Postal Service would have required election offices to obtain approval for ballot-envelope designs and use a new portal for voter information.',
        source: 3,
      },
      {
        prompt: 'Why was the date of the ruling especially important?',
        choices: [
          'Congress was leaving for recess',
          'States had begun sending mail ballots',
          'The Postal Service’s fiscal year was ending',
          'The presidential election was the next day',
        ],
        correct: 1,
        explanation:
          'North Carolina began sending mail ballots that day, with other states close behind. Courts often weigh whether a late procedural change could disrupt an election already in motion.',
        source: 0,
      },
      {
        prompt:
          'What was one requirement the rule would have imposed on election offices?',
        choices: [
          'Printing ballots only in English',
          'Getting USPS approval for envelope designs',
          'Counting ballots at federal courthouses',
          'Ending ballot tracking',
        ],
        correct: 1,
        explanation:
          'The rule called for Postal Service review of ballot and return-envelope designs, along with voter-data submissions through a federal portal.',
        source: 1,
      },
      {
        prompt: 'Where did the administration say it would appeal?',
        choices: [
          'The First Circuit Court of Appeals',
          'The Federal Election Commission',
          'The Senate Rules Committee',
          'The International Court of Justice',
        ],
        correct: 0,
        explanation:
          'The next stated venue was the U.S. Court of Appeals for the First Circuit. An appeal asks a higher court to review the injunction; it does not itself erase it.',
        source: 0,
      },
    ],
    conversation: {
      facts: [
        'A preliminary injunction is powerful but temporary: it preserves the status quo while a case continues.',
        'The Postal Service sits at an unusual junction between federal operations and state-run election administration.',
        'Election lawsuits often turn on timing because even a modest rule can become disruptive once ballots are being printed or mailed.',
      ],
      summary:
        'A federal judge stopped the Postal Service from applying new mail-ballot requirements during the midterms. The big issue is not simply mail voting—it is whether the federal government can impose those procedures, especially after states have started mailing ballots.',
      nuance:
        'The injunction does not settle whether every part of the executive order is lawful, and it does not decide the legality of mail voting generally. It pauses this implementation while the challenge proceeds.',
      question:
        'When an election is already underway, should avoiding disruption outweigh the government’s interest in changing procedures it considers important?',
    },
  },
  {
    id: 'diesel-record',
    date: 'September 4, 2026',
    shortDate: 'Sep 4',
    category: 'Pocketbook economics',
    title: '$5.85 diesel is more than a number at the pump.',
    deck: 'Why one fuel price can ripple from highways and farms to grocery aisles.',
    why: 'Diesel powers much of the machinery that moves and produces physical goods. A price shock can quietly work its way into delivery fees, farm costs, and store shelves.',
    primer: [
      'The U.S. average price of diesel reached about $5.85 a gallon on September 4, passing the nominal record set in 2022. The jump came as conflict involving Iran disrupted global fuel flows and U.S. distillate inventories remained unusually tight.',
      'Diesel matters far beyond diesel-car owners. Long-haul trucks, farm equipment, construction machinery, some trains, and backup generators rely on it. Carriers can add fuel surcharges quickly; producers and retailers may pass along higher transport costs more gradually.',
      'Perishable food is especially exposed because it can require diesel at several stages: harvesting, refrigeration, and frequent restocking. The result is not an instant, equal price increase for everything—but a new layer of cost moving through the supply chain.',
    ],
    lens: 'A fuel price becomes an economic story when it changes the cost of moving almost everything else.',
    sources: [
      {
        label: 'The record and its ripple effects',
        publisher: 'Associated Press',
        url: 'https://apnews.com/article/ebd01b9773365ee40550dcfd7d3ebf87',
      },
      {
        label: 'Daily national fuel averages',
        publisher: 'AAA',
        url: 'https://gasprices.aaa.com/',
      },
      {
        label: 'Weekly diesel price history',
        publisher: 'U.S. Energy Information Administration',
        url: 'https://www.eia.gov/dnav/pet/PET_PRI_GND_A_EPD2D_PTE_DPGAL_M.htm',
      },
      {
        label: 'Petroleum inventories and supply',
        publisher: 'U.S. Energy Information Administration',
        url: 'https://www.eia.gov/petroleum/data.php',
      },
    ],
    questions: [
      {
        prompt: 'What national average did diesel reach?',
        choices: [
          '$4.15 a gallon',
          '$4.92 a gallon',
          '$5.85 a gallon',
          '$7.20 a gallon',
        ],
        correct: 2,
        explanation:
          'The reported national average reached about $5.85 per gallon, edging above the previous nominal record from 2022.',
        source: 0,
      },
      {
        prompt: 'Why can diesel affect people who never buy it directly?',
        choices: [
          'It sets mortgage rates',
          'It powers much of freight and farm machinery',
          'It determines internet prices',
          'It is required in every passenger car',
        ],
        correct: 1,
        explanation:
          'Diesel is deeply embedded in the physical supply chain—from tractors and construction equipment to trucks that restock stores.',
        source: 0,
      },
      {
        prompt: 'Which goods may feel the pressure especially quickly?',
        choices: [
          'Digital downloads',
          'Perishable foods',
          'Streaming subscriptions',
          'Software licenses',
        ],
        correct: 1,
        explanation:
          'Produce, meat, and other perishables require frequent hauling and often refrigeration, while farming itself can consume diesel.',
        source: 0,
      },
      {
        prompt: 'When was the previous AAA diesel-price record set?',
        choices: ['2008', '2014', '2020', '2022'],
        correct: 3,
        explanation:
          'AAA lists the previous record in June 2022. Comparing the dates helps show that this is a nominal-dollar record, not a claim about every inflation-adjusted measure.',
        source: 1,
      },
      {
        prompt:
          'In federal energy data, diesel and heating oil inventories sit in which broad category?',
        choices: [
          'Motor gasoline',
          'Distillate fuel oil',
          'Natural gas liquids',
          'Aviation gasoline',
        ],
        correct: 1,
        explanation:
          'The EIA groups diesel and heating oil within distillate fuel oil. Tight distillate stocks can leave the market more exposed to disruptions.',
        source: 3,
      },
    ],
    conversation: {
      facts: [
        'Diesel’s previous AAA nominal record was set during the 2022 energy shock.',
        'A single head of lettuce can encounter diesel in harvesting, refrigerated transport, and store delivery.',
        'Fuel surcharges can move faster than shelf prices, so the consumer impact may arrive in stages.',
      ],
      summary:
        'Diesel reached roughly $5.85 a gallon, a new nominal record. That matters because diesel is less a personal-driving fuel than the bloodstream of the physical supply chain, so the shock can migrate into freight, farming, and food prices.',
      nuance:
        'A record in current dollars is not automatically a record after inflation, and higher transport costs do not translate one-for-one into every retail price.',
      question:
        'Which everyday product do you think has the most hidden exposure to diesel costs?',
    },
  },
  {
    id: 'iran-iaea-referral',
    date: 'September 4, 2026',
    shortDate: 'Sep 4',
    category: 'Global security',
    title: 'Iran may be referred to the U.N. Security Council. What changes?',
    deck: 'A nuclear watchdog, a diplomatic escalation, and the limits of what a referral actually does.',
    why: 'The move would elevate a technical safeguards dispute into the world’s highest-profile security forum—but referral is a step in diplomacy, not an automatic punishment.',
    primer: [
      'The United States, Britain, France, and Germany drafted a resolution asking the International Atomic Energy Agency’s Board of Governors to report Iran to the U.N. Security Council. The 35-member board was expected to consider the measure the following week.',
      'The IAEA is the U.N.-linked body responsible for nuclear verification. Its safeguards work is meant to verify that declared nuclear material is not diverted from peaceful activities. Reports say the agency’s access and continuity of knowledge in Iran have deteriorated, limiting what inspectors can confidently verify.',
      'A referral would raise the dispute’s diplomatic level and allow Security Council debate. It would not, by itself, automatically impose sanctions or authorize military force. Those would require separate decisions under different legal authorities.',
    ],
    lens: 'A referral changes who is formally considering the problem—not the problem itself.',
    sources: [
      {
        label: 'The draft referral',
        publisher: 'Associated Press',
        url: 'https://apnews.com/article/5c475d08b5206ca560ffb33b9f646c4b',
      },
      {
        label: 'Iran’s safeguards agreement',
        publisher: 'International Atomic Energy Agency',
        url: 'https://ola.iaea.org/Applications/FactSheets/Country/Detail?code=IR',
      },
      {
        label: 'Verification and monitoring record',
        publisher: 'United Nations Digital Library',
        url: 'https://digitallibrary.un.org/nanna/record/4107481/files/NPT_CONF.2026_7-EN.pdf?registerDownload=1&version=1&withMetadata=0&withWatermark=0',
      },
      {
        label: 'A past referral in practice',
        publisher: 'United Nations Digital Library',
        url: 'https://digitallibrary.un.org/record/574101',
      },
    ],
    questions: [
      {
        prompt:
          'Which organization’s board would vote on the proposed referral?',
        choices: [
          'NATO',
          'The World Bank',
          'The IAEA',
          'The World Trade Organization',
        ],
        correct: 2,
        explanation:
          'The proposal goes first to the IAEA Board of Governors, the agency’s policymaking body for issues including safeguards.',
        source: 0,
      },
      {
        prompt: 'Where would the resolution report Iran?',
        choices: [
          'The U.N. Security Council',
          'The European Parliament',
          'The International Criminal Court',
          'The G7 secretariat',
        ],
        correct: 0,
        explanation:
          'The proposed destination is the U.N. Security Council, moving the issue from a technical nuclear forum into a central diplomatic and security body.',
        source: 0,
      },
      {
        prompt: 'How many countries sit on the IAEA Board of Governors?',
        choices: ['15', '25', '35', '193'],
        correct: 2,
        explanation:
          'The IAEA Board of Governors has 35 member states. That is distinct from the 15-member U.N. Security Council.',
        source: 0,
      },
      {
        prompt: 'What is the core purpose of IAEA safeguards?',
        choices: [
          'To set global electricity prices',
          'To verify nuclear material is not diverted',
          'To command national nuclear plants',
          'To negotiate all peace treaties',
        ],
        correct: 1,
        explanation:
          'Safeguards are verification measures designed to detect diversion of nuclear material from peaceful activities and build confidence in states’ commitments.',
        source: 1,
      },
      {
        prompt: 'What would a referral do automatically?',
        choices: [
          'Authorize military action',
          'Impose a global oil embargo',
          'Open Security Council consideration',
          'Remove Iran from the United Nations',
        ],
        correct: 2,
        explanation:
          'A referral puts the matter before the Security Council. Sanctions, force, or other consequences would require additional decisions; they do not spring automatically from the referral.',
        source: 3,
      },
    ],
    conversation: {
      facts: [
        'The IAEA Board has 35 members; the U.N. Security Council has 15.',
        '“Continuity of knowledge” means inspectors can account for material and equipment across time, not merely during one visit.',
        'Referral is procedural escalation: it changes the forum and political stakes without dictating the outcome.',
      ],
      summary:
        'Four countries want the IAEA’s board to refer Iran’s nuclear safeguards dispute to the U.N. Security Council. That would elevate the issue diplomatically because inspectors say their ability to verify the program has weakened, but it would not automatically trigger sanctions or war.',
      nuance:
        'Safeguards reporting is about what inspectors can verify. An inability to provide assurance is not identical to proof of a specific undeclared weapon.',
      question:
        'When inspectors lose visibility, how should governments balance uncertainty against the risk of overreacting?',
    },
  },
];
