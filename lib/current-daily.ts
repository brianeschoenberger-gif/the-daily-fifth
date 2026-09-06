import type { DailyEdition } from './daily';

export const currentSystemsEdition: DailyEdition = {
  id: 'current-systems-001',
  date: 'Current-systems edition · Sep 4, 2026',
  eyebrow: 'The machinery beneath the headline',
  title: 'What happens after the obvious thing happens?',
  deck: 'Five questions about courts, fuel, inspections, and the consequences hiding one step downstream.',
  discoveries: [
    {
      id: 'injunction-not-verdict',
      category: 'Law in motion',
      collection: 'Hidden Systems',
      difficulty: 'Medium',
      prompt:
        'When a judge issues a preliminary injunction, what has the court usually done?',
      choices: [
        'Paused conduct while the case continues',
        'Permanently ended the case',
        'Rewritten the disputed law',
        'Sent the dispute directly to Congress',
      ],
      correct: 0,
      reveal:
        'A preliminary injunction can stop a policy without finally deciding whether it is lawful.',
      surprise:
        'The immediate practical effect can look final—the rule stops—but the legal posture is temporary. The court is preserving conditions while litigation continues.',
      mechanism:
        'Courts weigh factors including likely success, irreparable harm, competing equities, and the public interest before granting extraordinary early relief.',
      origins:
        'Injunctions descend from courts of equity, which could order a party to act or refrain from acting when money damages would not adequately repair the harm.',
      ripples:
        'A temporary order can shape elections, markets, and institutional planning before an appellate court or final judgment arrives. Procedure can therefore produce substantive real-world effects.',
      namedConcept: {
        term: 'Interim relief',
        definition:
          'A temporary judicial remedy intended to protect the parties or status quo before the merits are finally resolved.',
      },
      sources: [
        {
          label: 'Court filing and appended order',
          publisher: 'U.S. Supreme Court docket',
          url: 'https://www.supremecourt.gov/DocketPDF/26/26A297/422948/20260903154027877_USPS%20Final%20Rule%20Stay%20and%20Appx.pdf',
        },
        {
          label: 'The injunction and appeal',
          publisher: 'Associated Press',
          url: 'https://apnews.com/article/ce207ff2d0533de05cc2d299e91a0198',
        },
      ],
      verificationNote:
        'This describes the procedural effect of the reported preliminary injunction, not a prediction about the eventual merits or appeal.',
      surpriseScore: 4,
      tellabilityScore: 4,
      evergreen: false,
      callback: {
        prompt:
          'Why can a temporary injunction have lasting practical consequences?',
        answer:
          'It changes what institutions may do during a time-sensitive period, even before the final legal decision.',
      },
      rabbitHole:
        'How American injunctions developed from the separate tradition of courts of equity.',
      icon: '⚖️',
    },
    {
      id: 'election-timing',
      category: 'Election administration',
      collection: 'Deep History',
      difficulty: 'Hard',
      prompt:
        'Why can the same election rule become harder for a court to change as Election Day approaches?',
      choices: [
        'Late changes can disrupt an election already underway',
        'All election laws expire near voting day',
        'Postal rules automatically override courts',
        'Appeals are forbidden during campaigns',
      ],
      correct: 0,
      reveal:
        'In election law, timing can change the remedy even when the legal question stays the same.',
      surprise:
        'Ballots, envelopes, voter instructions, databases, staff training, and deadlines form a live operational system. A modest legal change can become disruptive once that system is moving.',
      mechanism:
        'Courts may weigh confusion and administrative burden more heavily close to an election, particularly when ballots have already been printed or mailed.',
      origins:
        'This judicial caution is commonly associated with the Purcell principle, named after a 2006 Supreme Court case warning that late court orders can themselves confuse voters.',
      ripples:
        'The principle can protect election stability, but it can also leave a disputed rule operating because the challenge arrived—or was decided—too late for a clean remedy.',
      namedConcept: {
        term: 'Purcell principle',
        definition:
          'The idea that federal courts should be especially cautious about changing election rules close to an election.',
      },
      sources: [
        {
          label: 'Reported timing and mailed ballots',
          publisher: 'Associated Press',
          url: 'https://apnews.com/article/ce207ff2d0533de05cc2d299e91a0198',
        },
        {
          label: 'The court’s stated reasoning',
          publisher: 'U.S. Supreme Court docket',
          url: 'https://www.supremecourt.gov/DocketPDF/26/26A297/422948/20260903154027877_USPS%20Final%20Rule%20Stay%20and%20Appx.pdf',
        },
      ],
      verificationNote:
        '“Purcell principle” is a shorthand used by courts and scholars; its precise scope and application remain contested.',
      surpriseScore: 5,
      tellabilityScore: 5,
      evergreen: false,
      callback: {
        prompt:
          'What does the Purcell principle ask courts to consider beyond a rule’s legality?',
        answer:
          'Whether changing the rule close to voting would create confusion or operational disruption.',
      },
      rabbitHole:
        'Why “preserving the status quo” can mean different things to voters, officials, and courts.',
      icon: '🗳️',
    },
    {
      id: 'diesel-pass-through',
      category: 'Pocketbook economics',
      collection: 'Hidden Systems',
      difficulty: 'Medium',
      prompt:
        'Which grocery item can encounter diesel costs during harvesting, refrigeration, and store delivery?',
      choices: [
        'A head of lettuce',
        'A software download',
        'A streaming subscription',
        'A gift card',
      ],
      correct: 0,
      reveal:
        'A head of lettuce can accumulate diesel exposure at several different links in its journey.',
      surprise:
        'Fuel can power farm machinery, refrigerated hauling, and frequent restocking. A single price shock therefore enters the same product more than once.',
      mechanism:
        'Carriers may add fuel surcharges quickly, while farms, processors, distributors, and retailers absorb or pass on costs on different schedules.',
      origins:
        'Modern food systems traded local seasonality for specialized production and long-distance cold chains. That increased variety and reliability while embedding transport energy in food prices.',
      ripples:
        'Price effects arrive unevenly and with delays. Perishable, low-margin goods may react differently from durable products, so the pump price is not a one-for-one forecast of grocery inflation.',
      namedConcept: {
        term: 'Cost pass-through',
        definition:
          'The extent and timing with which a business transfers a change in its input costs to customers.',
      },
      sources: [
        {
          label: 'Diesel record and supply-chain effects',
          publisher: 'Associated Press',
          url: 'https://apnews.com/article/ebd01b9773365ee40550dcfd7d3ebf87',
        },
        {
          label: 'Petroleum inventories and supply',
          publisher: 'U.S. Energy Information Administration',
          url: 'https://www.eia.gov/petroleum/data.php',
        },
      ],
      verificationNote:
        'Higher diesel costs do not translate one-for-one into retail prices; contracts, margins, competition, inventories, and time lags all matter.',
      surpriseScore: 4,
      tellabilityScore: 5,
      evergreen: false,
      callback: {
        prompt:
          'Why might a diesel shock reach one grocery product through several channels?',
        answer:
          'Diesel can be used in production, refrigeration, long-haul transport, and final delivery.',
      },
      rabbitHole:
        'Why fuel surcharges can move faster than the shelf prices consumers eventually see.',
      icon: '🥬',
    },
    {
      id: 'inventory-buffer',
      category: 'Energy systems',
      collection: 'Hidden Systems',
      difficulty: 'Hard',
      prompt:
        'In U.S. energy data, diesel and heating oil belong to which shared inventory category?',
      choices: [
        'Distillate fuel oil',
        'Motor gasoline',
        'Natural gas liquids',
        'Aviation gasoline',
      ],
      correct: 0,
      reveal:
        'Diesel shares an inventory family with heating oil: distillate fuel oil.',
      surprise:
        'A statistic that sounds like a trucking number can also reflect winter heating demand and refinery output. Category boundaries reveal which uses compete for related molecules.',
      mechanism:
        'Refineries produce a slate of products rather than one fuel in isolation. Stocks provide a buffer when production or trade is disrupted, but low inventories reduce that cushion.',
      origins:
        'Energy statistics group fuels by physical production streams so supply, refining, storage, and demand can be compared across time.',
      ripples:
        'A disruption can connect freight bills, farm costs, industrial operations, and home heating. Shared inventories transmit pressure between sectors that consumers experience separately.',
      namedConcept: {
        term: 'Buffer stock',
        definition:
          'Stored supply that absorbs short-term mismatches between production and demand, reducing volatility until the cushion runs low.',
      },
      sources: [
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
      verificationNote:
        'Distillate fuel oil contains multiple products and grades; shared classification does not mean every barrel is interchangeable in every use or jurisdiction.',
      surpriseScore: 4,
      tellabilityScore: 4,
      evergreen: false,
      callback: {
        prompt:
          'Why do low inventories magnify the effect of a supply disruption?',
        answer:
          'There is less stored buffer available while production, trade, or demand adjusts.',
      },
      rabbitHole:
        'How a refinery’s product mix links gasoline, jet fuel, diesel, and heating oil markets.',
      icon: '🛢️',
    },
    {
      id: 'iaea-referral',
      category: 'Global security',
      collection: 'Hidden Systems',
      difficulty: 'Medium',
      prompt: 'What would an IAEA referral of Iran automatically do?',
      choices: [
        'Open U.N. Security Council consideration',
        'Authorize military force',
        'Impose a worldwide oil embargo',
        'Expel Iran from the United Nations',
      ],
      correct: 0,
      reveal:
        'A nuclear referral changes the forum—not automatically the punishment.',
      surprise:
        'Moving a dispute to the Security Council raises its diplomatic profile, but sanctions or force would require separate decisions under separate authorities.',
      mechanism:
        'The IAEA’s safeguards system reports what inspectors can verify. Its Board of Governors can report a compliance problem; the Security Council then decides whether and how to respond.',
      origins:
        'The postwar nuclear order separated technical verification from political enforcement. The IAEA gathers and evaluates safeguards evidence, while states retain coercive authority through political bodies.',
      ripples:
        'Referral can alter negotiations, markets, alliances, and domestic politics even without immediate sanctions. Procedural escalation changes expectations before it changes formal legal obligations.',
      namedConcept: {
        term: 'Procedural escalation',
        definition:
          'Raising an issue to a more powerful forum, increasing political stakes without predetermining the final action.',
      },
      sources: [
        {
          label: 'The draft referral',
          publisher: 'Associated Press',
          url: 'https://apnews.com/article/5c475d08b5206ca560ffb33b9f646c4b',
        },
        {
          label: 'Iran safeguards agreement',
          publisher: 'International Atomic Energy Agency',
          url: 'https://ola.iaea.org/Applications/FactSheets/Country/Detail?code=IR',
        },
      ],
      verificationNote:
        'A reported draft referral is developing information. Referral, sanctions, and authorization of force are distinct actions and should not be conflated.',
      surpriseScore: 4,
      tellabilityScore: 5,
      evergreen: false,
      callback: {
        prompt:
          'What changes immediately when an IAEA dispute is referred to the Security Council?',
        answer:
          'The forum and political stakes change; a specific punishment does not happen automatically.',
      },
      rabbitHole:
        'Why an inspector’s inability to verify something is not the same as proof of a specific hidden weapon.',
      icon: '☢️',
    },
  ],
};
