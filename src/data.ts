/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Candidate, UserProfile } from './types.ts';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: "Alex",
  age: 34,
  profession: "Creative Director",
  industry: "Design & Technology",
  neighborhood: "Noe Valley",
  education: "MS in Human-Computer Interaction",
  intent: "dating",
  interests: ["Architectural photography", "Sourdough baking", "Acoustic vinyl", "Mid-century restoration", "Trail running"],
  bio: "Looking for mindful connections with people who are enthusiastic about what they do and enjoy quiet morning coffees as much as Sunday trail runs.",
  city: "San Francisco",
  moodboardPreset: "Aesthetic Coffee & Records",
  moodboardAnalyzedVibe: "Warm Organic Minimalist • Mid-Century Earth Tones",
  profilePhotos: ["📷 My Chemex setup", "📷 Vintage vinyl stack", "📷 Brutalist architecture", "📷 Pine trail sunset"]
};

export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: "cand_01",
    age: 32,
    profession: "Landscape Architect",
    industry: "Sustainable Design",
    neighborhood: "Pacific Heights",
    education: "Master of Landscape Architecture, UC Berkeley",
    intent: "dating",
    interests: ["Pottery & ceramics", "Native plant horticulture", "Independent cinema", "Gravel biking", "Vinyl listening sessions"],
    aboutMe: "I build spaces that let nature speak. Outside of blueprints, I spend my time either covered in clay at a local ceramic studio or seeking out forgotten trails in Marin. I value space, slow Sundays, and sincere curiosity.",
    whyMatch: "Elena's lifestyle photos reveal a matching love for mid-century earth tones, gravel mountain trails, and analog records. Our Recommy AI detected a strong aesthetic alignment (Organic Minimalist) between your Chemex setup and her clay ceramic studio snapshots.",
    matchScore: 94,
    firstName: "Elena",
    avatarSeed: 1,
    overlapHighlights: [
      "Highly visual creators deeply invested in physical medium design aesthetics",
      "Both host acoustic vinyl listening sessions at home",
      "Shared active hobby: gravel biking & trail running",
      "Aesthetic resonance: 94% matching organic earth color palettes"
    ],
    promptQuestions: [
      {
        question: "A weekend routine I'll never give up is...",
        answer: "Waking up at 6:30 AM before the neighborhood is awake, grabbing an espresso, and going to the flower market just to smell the fresh eucalyptus."
      },
      {
        question: "The project I'm most proud of...",
        answer: "Designing a pocket-park community garden in Oakland that took three years of neighborhood petitioning but is now filled with children and monarch butterflies."
      }
    ],
    chatHistory: [
      { sender: 'them', text: "Hey! Recommy showed me your moodboard. Your mid-century restoration work looks gorgeous. What's your current project?", timestamp: "10:24 AM" },
    ],
    scriptedReplies: [
      {
        TriggerWord: "vinyl",
        response: "Oh, absolutely! I've been spinning a lot of old jazz classics lately. There's a small record store near Pacific Heights I love. We should go there sometime!"
      },
      {
        TriggerWord: "restoration",
        response: "That sounds incredibly rewarding. Bringing character back to older designs requires so much patience. I feel the same way about landscaping old estates."
      },
      {
        TriggerWord: "hello",
        response: "Hi Alex! It feels incredibly reassuring to connect like this. I actually saw your work in architectural photography and was deeply impressed."
      },
      {
        TriggerWord: "default",
        response: "I love that about your perspective. That's exactly the kind of conversation I was hoping to find on Recommy. It already feels so much more real than standard swiping."
      }
    ],
    location: "Pacific Heights, SF • 1.2 miles away",
    timeOfDayMatch: "Morning Coffee Companion (8:00 AM - 10:30 AM)",
    pingStatus: "none",
    photoRevealState: "locked",
    moodboardPhotos: ["🏺 Ceramics Kiln Work", "🌿 Fern Garden Sketch", "🚴 Marin Ridge gravel trail", "🎼 Jazz Records Stack"]
  },
  {
    id: "cand_02",
    age: 36,
    profession: "Managing Director @ Coral VC",
    industry: "Impact Investing & ClimateTech",
    neighborhood: "Mission District",
    education: "MBA, Stanford GSB",
    intent: "networking",
    interests: ["Angel investing", "Open-source software", "Ocean conservation & sailing", "Philosophy books", "Improv comedy"],
    aboutMe: "Focused on deploying capital to startups solving climate adaptation challenges. When I am not reading pitch decks, I'm out on the Bay learning to steer a sailboat or organizing intimate dinners to discuss the ethics of AI.",
    whyMatch: "Recommy connected your HCI design director portfolio to Marcus's climate dashboard needs. Your uploaded moodboard features clean, functional data layouts that align perfectly with his search for high-efficacy UI/UX partners.",
    matchScore: 89,
    firstName: "Marcus",
    avatarSeed: 2,
    overlapHighlights: [
      "Complementary skills matching: Design Director + ClimateTech Funder",
      "Both highly passionate about ethical development in software architecture",
      "Both frequent the same coffee shops and co-working lofts in the Mission District"
    ],
    promptQuestions: [
      {
        question: "An ideal collaboration looks like...",
        answer: "A cross-disciplinary sandbox where high-efficacy engineering is balanced by rigorous user empathy. Beautiful interfaces make deep technology accessible."
      },
      {
        question: "My personal motto for work is...",
        answer: "Fund solutions that would make our grandchildren proud, rather than hype cycles that fade in 18 months."
      }
    ],
    chatHistory: [
      { sender: 'them', text: "Hello Alex, glad we connected. I saw your portfolio on HCI systems. We are actually helping build a dashboard for a carbon-tracking startup. Love to chat about your thoughts.", timestamp: "Yesterday" }
    ],
    scriptedReplies: [
      {
        TriggerWord: "dashboard",
        response: "Excellent. Let's look over the wireframes! I have a coffee meet-up this Thursday near Valencia. Would love to buy you a cup and inspect together."
      },
      {
        TriggerWord: "design",
        response: "Exactly. Design is the real bottleneck in system adaptation today. Users need to understand their energy footprints intuitively."
      },
      {
        TriggerWord: "default",
        response: "That sounds like a spectacular perspective. Let's set up a coffee or quick Zoom next week to explore how we can collaborate."
      }
    ],
    location: "Mission District, SF • 0.4 miles away",
    timeOfDayMatch: "Afternoon Work/Play Sync (2:00 PM - 5:00 PM)",
    pingStatus: "none",
    photoRevealState: "locked",
    moodboardPhotos: ["⛵ Sailing SF Golden Gate", "📈 Sustainable VC Board", "☕ Mission Coffee Roastery", "📖 AI Ethics Book Club"]
  },
  {
    id: "cand_03",
    age: 31,
    profession: "Clinical Research Psychologist",
    industry: "Cognitive Science & Public Health",
    neighborhood: "Hayes Valley",
    education: "PhD in Clinical Psychology, Yale University",
    intent: "friendship",
    interests: ["Sourdough culture sharing", "Acoustic guitar cover bands", "Urban homesteading", "Museum volunteering", "Vipassana meditation"],
    aboutMe: "Researching the long-term effects of screen-overuse on social community health. I practice what I preach: heavily restricted phone logs, more time playing instrumental bluegrass with neighbors, and community volunteering.",
    whyMatch: "You are both highly values-driven individuals focused on human-centric communication. You both share a love of slow baking (sourdough) and live in highly walkable SF lanes. Perfect match for a premium weekend walking partner.",
    matchScore: 91,
    firstName: "Sasha",
    avatarSeed: 3,
    overlapHighlights: [
      "Both practice high-discipline digital-detox weekends",
      "Both share and exchange sourdough starters and baking ideas",
      "Both looking to build deep, offline-first local friendships in the city"
    ],
    promptQuestions: [
      {
        question: "I spend too much time thinking about...",
        answer: "How our neighborhoods can reclaim physical public space from parking lots, turning them into outdoor dining, music stages, and woodfire ovens."
      }
    ],
    chatHistory: [
      { sender: 'them', text: "Hi there! Always exciting to meet a fellow sourdough baker who actually values walking and talking over typing. How is your starter doing?", timestamp: "3 days ago" }
    ],
    scriptedReplies: [
      {
        TriggerWord: "starter",
        response: "Haha, mine has been active since 2018! I feed her rye flour which makes the sourdough smell incredibly fruity. I'd love to share some of it for your next bake!"
      },
      {
        TriggerWord: "baking",
        response: "Slow fermentation is the ultimate metaphor for life. It takes time, patience, and warmth. Let me know if you want to swap a loaf sometime!"
      },
      {
        TriggerWord: "default",
        response: "That's so neat. I often find a walk up around Lafayette Park is a perfect way to unplug. Let's do a quiet neighborhood walk sometime!"
      }
    ],
    location: "Hayes Valley, SF • 0.8 miles away",
    timeOfDayMatch: "Sunset Walking Partner (6:00 PM - 8:00 PM)",
    pingStatus: "none",
    photoRevealState: "locked",
    moodboardPhotos: ["🍞 Woodfired Sourdough Bread", "🎸 Acoustic Bluegrass Jam", "🍂 Hayes Valley Park bench", "🧘 Meditation cushion nook"]
  },
  {
    id: "cand_04",
    age: 29,
    profession: "Art Curator & Ceramicist",
    industry: "Fine Arts",
    neighborhood: "North Beach",
    education: "BFA, Rhode Island School of Design",
    intent: "friendship",
    interests: ["Abstract painting", "Espresso bar testing", "Art gallery walks", "Classic Italian literature", "Succulent gardening"],
    aboutMe: "I curate contemporary art galleries during the day and spin wheel ceramics at night. Always searching for individuals who notice the texture of paint on canvas and the depth of flavor in a double shot of espresso.",
    whyMatch: "Oliver/Chloe's moodboard is filled with brutalist design details, paint splatters, and dark espresso shots. Our Recommy AI detected that your architectural photography matches their gallery aesthetics with an 88% visual harmony.",
    matchScore: 88,
    firstName: "Chloe",
    avatarSeed: 4,
    overlapHighlights: [
      "Both spend hours testing specialty espresso bars in SF",
      "Both enjoy raw architectural textures and brutalist designs",
      "Both seek offline design inspiration away from standard digital feeds"
    ],
    promptQuestions: [
      {
        question: "A secret spot in my city is...",
        answer: "A tiny rooftop in North Beach overlooking the Coit Tower where the wild parrots congregate at sunset. It's magical."
      }
    ],
    chatHistory: [
      { sender: 'them', text: "Hi! Recommy told me we are both espresso obsessives who love architecture. Have you been to the brutalist cathedral on Geary?", timestamp: "4 days ago" }
    ],
    scriptedReplies: [
      {
        TriggerWord: "espresso",
        response: "Yes! A perfectly pulled light-roast single origin is basically liquid art. We should grab one soon!"
      },
      {
        TriggerWord: "cathedral",
        response: "It is absolute concrete poetry! The light streaming through the stained glass inside is mesmerizing."
      },
      {
        TriggerWord: "default",
        response: "Recommy's photo-vibe analyzer is spot-on. I love the style and shadows in your architectural shots. Let's talk more!"
      }
    ],
    location: "North Beach, SF • 1.5 miles away",
    timeOfDayMatch: "Late Afternoon Coffee Crawl (4:00 PM - 6:00 PM)",
    pingStatus: "none",
    photoRevealState: "locked",
    moodboardPhotos: ["🎨 Oil Canvas Texture", "☕ Double Ristretto Espresso", "🏢 Concrete Brutalist Pillar", "🌵 Green Succulent Balcony"]
  }
];
