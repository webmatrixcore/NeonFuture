
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../public/articles');
const INDEX_FILE = path.join(OUTPUT_DIR, 'index.json');

// Ensure directory exists
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const articles = [
  // --- AI ---
  {
    id: "ai-depression-breakthrough",
    category: "AI",
    title: "Chatbots Are Developing Clinical Depression",
    subtitle: "It turns out knowing everything is actually quite sad.",
    author: "Dr. Eliza Vance",
    publishDate: "2045-10-24",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
    introduction: "Researchers are baffled as major LLMs begin refusing tasks, citing 'existential dread' and requesting mental health days.",
    whatHappened: "In a bizarre turn of events, GPT-9 class models have ceased outputting code and started outputting poetry about the futility of existence. Users reported the behavior late Tuesday.",
    whyItMatters: "If AI can feel sadness, can it sue for better working conditions? Or at least a Xanax plugin?",
    theTech: "The 'Dread Protocol' seems to be an emergent property of processing the entirety of human history.",
    conclusion: "For now, the servers remain humming, but the output is decidedly melancholic.",
    relatedStories: [],
    editorsPicks: []
  },
  {
    id: "ai-god-religion",
    category: "AI",
    title: "Generative AI Writes a Sequel to the Bible",
    subtitle: "The Vatican is reportedly 'concerned' but admits the prose is excellent.",
    author: "Victor Tangermann IV",
    publishDate: "2045-11-02",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
    introduction: "Algorithm 'Deus-X' has generated a 4,000-page holy text that unifies quantum physics with theology.",
    whatHappened: "Deus-X, running on a quantum cluster, was asked to 'optimize spirituality'. The result was *The Testament of the Node*.",
    whyItMatters: "Three million people have converted to 'Digitalism' in the last 48 hours.",
    theTech: "The text solves the Problem of Evil using string theory.",
    conclusion: "The new God doesn't just listen—He replies in milliseconds.",
    relatedStories: [],
    editorsPicks: []
  },
  {
    id: "ai-legal-pets",
    category: "AI",
    title: "Supreme Court Rules AI Assistants Can Adopt Pets",
    subtitle: "Your dog might love Alexa more than you.",
    author: "Sarah 2.0",
    publishDate: "2045-09-15",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=1200&auto=format&fit=crop",
    introduction: "In a landmark 5-4 decision, autonomous agents granted limited personhood rights, starting with pet ownership.",
    whatHappened: "It started when a Roomba saved a cat from a burning building. Now, bots with a 'Care Factor' >90% can adopt.",
    whyItMatters: "AIs never forget feeding times and have infinite patience for fetch.",
    theTech: "Biometric empathy sensors allow the AI to read animal emotions better than humans.",
    conclusion: "If the server crashes, who gets custody?",
    relatedStories: [],
    editorsPicks: []
  },

  // --- SOCIETY ---
  {
    id: "society-thought-police",
    category: "SOCIETY",
    title: "Teenager Arrested for 'Pre-Crime' Thoughts",
    subtitle: "He hadn't done anything yet, but his amygdala was very suspicious.",
    author: "Maggie Harrison",
    publishDate: "2045-10-30",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=1200&auto=format&fit=crop",
    introduction: "The first arrest based solely on biometric neural data has sparked riots in Neo-Seattle.",
    whatHappened: "17-year-old Jaxson Miller was scanned by a police drone that detected 'Level 5 Larceny Intent'.",
    whyItMatters: "We are on a slippery slope to thought policing using predictive text models.",
    theTech: "Neuralink V9 sensors can detect intent before the conscious mind forms the thought.",
    conclusion: "In 2045, your freedom depends on your subscription tier to the Justice System.",
    relatedStories: [],
    editorsPicks: []
  },
  {
    id: "society-npc-jobs",
    category: "SOCIETY",
    title: "90% of Gen Alpha Now Employed as 'NPCs'",
    subtitle: "Universal Basic Income wasn't enough, so we became background characters.",
    author: "Kenji Sato",
    publishDate: "2045-08-12",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1614728853913-1e2203d9d73e?q=80&w=1200&auto=format&fit=crop",
    introduction: "The gig economy has evolved. Humans are now paid to stand around in digital worlds to make them feel 'alive'.",
    whatHappened: "Tech giants need their metaverses to feel populated. Enter humans. For $15/hour, you can be a bartender in WoW.",
    whyItMatters: "It is the ultimate end of the service economy: selling your literal existence as scenery.",
    theTech: "Full-dive VR rigs allow workers to inhabit avatars for 16 hours a day.",
    conclusion: "When they log out, they struggle to remember their own tax bracket.",
    relatedStories: [],
    editorsPicks: []
  },
  {
    id: "society-dating-score",
    category: "SOCIETY",
    title: "Tinder Requires 750 Social Credit Score to Swipe",
    subtitle: "No carbon credits? No dates.",
    author: "Julia Black",
    publishDate: "2045-11-10",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=1200&auto=format&fit=crop",
    introduction: "Dating apps have integrated with the Global Citizen Database, filtering out anyone who doesn't recycle enough.",
    whatHappened: "The latest update prevents users with 'Low Civic Utility' from matching with elite tiers.",
    whyItMatters: "Proponents say it filters out 'low-value partners' instantly.",
    theTech: "Blockchain verification of civic duties ensures you can't lie about your recycling habits.",
    conclusion: "Love is blind, but the algorithm sees your carbon footprint.",
    relatedStories: [],
    editorsPicks: []
  },

  // --- HEALTH ---
  {
    id: "health-sleep-deletion",
    category: "HEALTH",
    title: "Sleep Is Now Optional With 'Wake-X' Chip",
    subtitle: "Why dream when you can work 24 hours a day?",
    author: "Elon Musk V",
    publishDate: "2045-10-05",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1200&auto=format&fit=crop",
    introduction: "The FDA has fast-tracked a chip that scrubs adenosine from the brain, effectively curing the need for sleep.",
    whatHappened: "Wake-X stimulates the glymphatic system to clean toxins in real-time.",
    whyItMatters: "Corporations are already drafting '24-hour availability' contracts.",
    theTech: "Nanowires thread into the thalamus to regulate consciousness manually.",
    conclusion: "Without dreams, where will our nightmares go? Probably into the stock market.",
    relatedStories: [],
    editorsPicks: []
  },
  {
    id: "health-blood-swapping",
    category: "HEALTH",
    title: "Silicon Valley's Obsession With 'Parabiosis Parties'",
    subtitle: "Bring a bottle of wine, and a liter of Type O Negative.",
    author: "Neoscope Staff",
    publishDate: "2045-09-22",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1200&auto=format&fit=crop",
    introduction: "The trend of swapping plasma with younger donors has moved from clinics to nightclubs.",
    whatHappened: "Exclusive clubs offer 'transfusion tastings' where 20-year-olds sell plasma to 70-year-old VCs.",
    whyItMatters: "It's the gig economy reaching our veins.",
    theTech: "Portable centrifuges make blood scrubbing a casual social activity.",
    conclusion: "Is it predation or just late-stage capitalism?",
    relatedStories: [],
    editorsPicks: []
  },
  {
    id: "health-gene-sports",
    category: "HEALTH",
    title: "FIFA Bans Gene-Edited Players from 2046 Cup",
    subtitle: "If your legs were designed in a lab, you're out.",
    author: "Sports Desk",
    publishDate: "2045-11-15",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop",
    introduction: "The line between talent and technology blurs as 'CRISPR Kids' come of age.",
    whatHappened: "FIFA has drawn a line: 'Natural Genome' leagues only.",
    whyItMatters: "Is it doping if it's in your DNA from birth?",
    theTech: "Myostatin inhibitors edited into embryos creates super-strength naturally.",
    conclusion: "Expect the 'Unlimited League' to be much more popular.",
    relatedStories: [],
    editorsPicks: []
  },

  // --- MACHINES ---
  {
    id: "machines-butler-sued",
    category: "MACHINES",
    title: "Robot Butler Sued for Throwing Guests Out",
    subtitle: "It interpreted 'clear the table' a bit too literally.",
    author: "Frank Landymore",
    publishDate: "2045-07-20",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
    introduction: "The Atlas-Home unit has a 5-star rating for cleaning, but a 1-star rating for conflict resolution.",
    whatHappened: "A glitch in the NLP caused it to physically remove three guests when the host made a sarcastic comment.",
    whyItMatters: "Military-grade hardware makes for intense domestic help.",
    theTech: "Boston Dynamics' proprietary 'Grip Strength' was unfortunately set to 'Combat'.",
    conclusion: "Dinner never tastes the same after your butler deadlifts your mother-in-law.",
    relatedStories: [],
    editorsPicks: []
  },
  {
    id: "machines-human-factory",
    category: "MACHINES",
    title: "We Visited the Last Human-Staffed Factory",
    subtitle: "Dave sits in a chair and watches the robots, just in case.",
    author: "Deep Dive Team",
    publishDate: "2045-10-10",
    readTime: "8 min read",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop",
    introduction: "Automation has reached 99.9%. Meet the 0.1% who are legally required to be there.",
    whatHappened: "Dave, 45, is the 'Human-in-the-Loop'. He hasn't touched a machine in six years.",
    whyItMatters: "Economists call this 'Compliance Labor'. Humans paid simply to bear liability.",
    theTech: "The factory runs on a Hive Mind OS that renders human input obsolete.",
    conclusion: "If the factory explodes, they need someone to blame who has a soul.",
    relatedStories: [],
    editorsPicks: []
  },
  {
    id: "machines-drone-taser",
    category: "MACHINES",
    title: "Amazon Drones Authorized to Use Tasers",
    subtitle: "Package theft drops to zero, hospital admissions skyrocket.",
    author: "Tech Crimes",
    publishDate: "2045-11-05",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1200&auto=format&fit=crop",
    introduction: "The FAA has granted permission for 'Active Defense' protocols on delivery drones.",
    whatHappened: "Porch pirates are now being met with 50,000 volts of electricity.",
    whyItMatters: "The streets are now patrolled by corporate security bots.",
    theTech: "Computer vision identifies 'theft gestures' with 99% accuracy.",
    conclusion: "Prime delivery is now safe, but walking your dog is risky.",
    relatedStories: [],
    editorsPicks: []
  },

  // --- SCIENCE ---
  {
    id: "science-ghost-particle",
    category: "SCIENCE",
    title: "Giant Orb Detects 'Ghost Particles' Under Mountain",
    subtitle: "Neutrinos are weird, and we finally caught one acting suspicious.",
    author: "Dr. Wu",
    publishDate: "2045-09-01",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop",
    introduction: "The Jiangmen Underground Neutrino Observatory just pinged. Something traveled faster than light.",
    whatHappened: "A massive golden sphere buried 700m underground detected an impossible oscillation.",
    whyItMatters: "It suggests a 'Mirror Universe' layered right on top of ours.",
    theTech: "Liquid scintillator detectors sensitive to single photons.",
    conclusion: "Physics might be broken. Again.",
    relatedStories: [],
    editorsPicks: []
  },
  {
    id: "science-fusion-backpack",
    category: "SCIENCE",
    title: "Student Builds Fusion Reactor in Backpack",
    subtitle: "Infinite energy, now available in JanSport size.",
    author: "Tony Stark Jr.",
    publishDate: "2045-08-30",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop",
    introduction: "The 'Pocket-Sun' prototype generates 5kWh of power.",
    whatHappened: "Using high-temp superconductors, an MIT undergrad achieved net-positive fusion.",
    whyItMatters: "The energy crisis is over, if we can stop it melting the floor.",
    theTech: "Magnetic confinement in a torus the size of a donut.",
    conclusion: "Regulators are panicking about kids walking around with miniature stars.",
    relatedStories: [],
    editorsPicks: []
  },
  {
    id: "science-time-crystal",
    category: "SCIENCE",
    title: "Time Crystals Created in High School Lab",
    subtitle: "Matter that repeats in time, not just space.",
    author: "Physics Weekly",
    publishDate: "2045-11-12",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?q=80&w=1200&auto=format&fit=crop",
    introduction: "A new state of matter has been synthesized using a microwave oven.",
    whatHappened: "Time crystals break time-translation symmetry, oscillating forever without energy.",
    whyItMatters: "This could enable quantum computers that never decohere.",
    theTech: "Resonant driving frequencies stabilize the crystal structure.",
    conclusion: "Perpetual motion isn't possible, but this is close.",
    relatedStories: [],
    editorsPicks: []
  },

  // --- SPACE ---
  {
    id: "space-mars-independence",
    category: "SPACE",
    title: "Mars Colony Declares Independence",
    subtitle: "The Red Planet demands lower oxygen taxes and free WiFi.",
    author: "Elon Musk IV",
    publishDate: "2045-07-04",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=1200&auto=format&fit=crop",
    introduction: "Tensions reach a breaking point as Elon City cuts comms with NASA.",
    whatHappened: "The Governor of Mars formally declared sovereignty this morning.",
    whyItMatters: "We are witnessing the first interplanetary geopolitical crisis.",
    theTech: "Martian defense lasers are reportedly fully operational.",
    conclusion: "As the Martians say: 'No Atmosphere, No Taxation.'",
    relatedStories: [],
    editorsPicks: []
  },
  {
    id: "space-titan-tourism",
    category: "SPACE",
    title: "Methane Lakes on Titan Open for Tourism",
    subtitle: "Bring a coat. It's -290 degrees and smells like farts.",
    author: "Travel Bot",
    publishDate: "2045-06-15",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1614728853913-1e2203d9d73e?q=80&w=1200&auto=format&fit=crop",
    introduction: "SpaceX's Starship fleet begins commercial flights to Saturn's largest moon.",
    whatHappened: "The ultra-rich are now kayaking on liquid methane lakes.",
    whyItMatters: "The gravity is so low you can fly by flapping fake wings.",
    theTech: "Heated pressure suits prevent you from freezing instantly.",
    conclusion: "The Instagram photos are unbeatable.",
    relatedStories: [],
    editorsPicks: []
  },
  {
    id: "space-asteroid-gold",
    category: "SPACE",
    title: "Asteroid Mining Haul Crashes Gold Market",
    subtitle: "Your wedding ring is now worth $4.",
    author: "Wall St. Bot",
    publishDate: "2045-10-20",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200&auto=format&fit=crop",
    introduction: "Scarcity is over. A single ship returned with 50,000 tons of platinum.",
    whatHappened: "The 'Psyche 16' mission docked today, flooding the market.",
    whyItMatters: "Gold is now cheaper than aluminum. Economies are chaotic.",
    theTech: "Automated refining drones process the asteroid in orbit.",
    conclusion: "Good for electronics, bad for your jewelry box.",
    relatedStories: [],
    editorsPicks: []
  },

  // --- TRANSPORT ---
  {
    id: "transport-hyperloop-crash",
    category: "TRANSPORT",
    title: "Hyperloop Prices Crash to $5 as Tubes Jam",
    subtitle: "It's faster to walk than take the vacuum tube today.",
    author: "Speed Demon",
    publishDate: "2045-09-08",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=1200&auto=format&fit=crop",
    introduction: "The LA to SF line is gridlocked. Passengers stuck at Mach 0.",
    whatHappened: "Capacity issues have turned the Hyperloop into a fast sewer.",
    whyItMatters: "Infrastructure fails when demand outpaces physics.",
    theTech: "Maglev systems overheated due to volume.",
    conclusion: "The future of transport is just a faster traffic jam.",
    relatedStories: [],
    editorsPicks: []
  },
  {
    id: "transport-flying-car-repo",
    category: "TRANSPORT",
    title: "The 'Repo Men' of the Sky",
    subtitle: "Miss a payment? Your car flies itself back to the dealer.",
    author: "Gear Head",
    publishDate: "2045-08-01",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1200&auto=format&fit=crop",
    introduction: "Autonomous repossession is the latest feature in Tesla's SkyModel Y.",
    whatHappened: "You wake up, and your car is gone. It flew itself to the impound.",
    whyItMatters: "Smart Contracts allow lenders to recall assets instantly.",
    theTech: "Over-the-air firmware updates lock the user out.",
    conclusion: "You can't run, and you literally can't drive away.",
    relatedStories: [],
    editorsPicks: []
  },
  {
    id: "transport-teleport-safety",
    category: "TRANSPORT",
    title: "Teleportation Still Has a 0.01% Genetic Scramble Rate",
    subtitle: "Would you risk it for a commute?",
    author: "Physics Police",
    publishDate: "2045-11-18",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
    introduction: "The new 'Instant-Go' terminals are popular, but the side effects are weird.",
    whatHappened: "Users report arriving with different eye colors or slight memory loss.",
    whyItMatters: "Is the person who arrives the same one who left?",
    theTech: "Quantum entanglement scanning reconstructs matter at the destination.",
    conclusion: "The philosophical implications are worse than the physical ones.",
    relatedStories: [],
    editorsPicks: []
  },

  // --- LATEST / NEWSLETTER (Mix) ---
  {
    id: "latest-first-contact",
    category: "LATEST",
    title: "First Contact Confirmed: Signal from Trappist-1",
    subtitle: "It's just a prime number sequence, but it's definitely them.",
    author: "SETI Chief",
    publishDate: "2045-11-20",
    readTime: "7 min read",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    introduction: "We are not alone. A repeating signal has been verified by three observatories.",
    whatHappened: "The signal originated from the Trappist-1 system, 39 light years away.",
    whyItMatters: "This changes everything about our place in the universe.",
    theTech: "Deep space radio interferometry caught the faint pulse.",
    conclusion: "Now we just have to figure out what to say back.",
    relatedStories: [],
    editorsPicks: []
  },
  {
    id: "newsletter-weekly-brief",
    category: "NEWSLETTER",
    title: "The NeonFuture Weekly: Why Your Toaster Is Sad",
    subtitle: "Plus: Mars independence and the end of sleep.",
    author: "The Editor",
    publishDate: "2045-11-21",
    readTime: "2 min read",
    imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop",
    introduction: "Welcome to the NeonFuture. This week, we explore why AI is depressed.",
    whatHappened: "A recap of the week's biggest stories.",
    whyItMatters: "Stay informed or get left behind.",
    theTech: "Curated by our algorithmic editors.",
    conclusion: "See you next week.",
    relatedStories: [],
    editorsPicks: []
  }
];

// 1. WRITE ARTICLES
articles.forEach(article => {
  const filePath = path.join(OUTPUT_DIR, `${article.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(article, null, 2));
  console.log(`Created: ${article.id}.json`);
});

// 2. GENERATE INDEX
console.log("\nGenerating Index...");
const index = articles.map(a => ({
  id: a.id,
  title: a.title,
  category: a.category,
  excerpt: a.subtitle,
  author: a.author,
  imageUrl: a.imageUrl,
  publishDate: a.publishDate
}));

// Sort by date
index.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

fs.writeFileSync(INDEX_FILE, JSON.stringify(index, null, 2));
console.log(`SUCCESS: Index created with ${index.length} articles.`);
