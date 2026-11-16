import type { JournalEntry, TravelerStory } from "@/types/trip";

/** Fictional stories for the demo. They are not real customer quotes. */
export const travelerStories: TravelerStory[] = [
  {
    id: "story-kyoto-pottery",
    name: "Demo traveller: Amara",
    home: "Toronto (fictional)",
    experienceId: "kyoto-pottery-studio-session",
    quote:
      "I came in with no skill at all. The instructor kept the lesson loose enough that I left with a wonky bowl I still use every morning.",
  },
  {
    id: "story-chiang-mai-cooking",
    name: "Demo traveller: Luca",
    home: "Montreal (fictional)",
    experienceId: "chiang-mai-thai-cooking-class",
    quote:
      "The market visit made the rest of the class make sense. Knowing what each herb was for changed how I cook at home.",
  },
  {
    id: "story-udaipur-cycling",
    name: "Demo traveller: Priya",
    home: "Vancouver (fictional)",
    experienceId: "udaipur-sunrise-cycling-tour",
    quote:
      "Flat, quiet roads and a lake that looked unreal at sunrise. The chai stop was the best part of the morning.",
  },
];

export const journalEntries: JournalEntry[] = [
  {
    id: "journal-night-markets",
    kicker: "Field notes",
    title: "How to eat well at a night market without a plan",
    excerpt:
      "Look for the queue that moves, order what the cook is already making, and keep a little cash in small notes.",
    image: "/images/journal-1.jpg",
    imageAlt: "Vendor filling crispy pancakes at a Thai night market stall",
    body: [
      "Night markets reward people who arrive hungry and a little curious. Start at the end of the row where the stalls are busiest with locals rather than tourists.",
      "Ask what the cook is making today. Most stalls have two or three dishes they are known for, and the answer is usually the best thing on the menu.",
      "Carry small notes and a pocket tissue. Many stalls are cash only, and nobody wants to queue twice.",
    ],
    readMinutes: 4,
  },
  {
    id: "journal-slow-lanes",
    kicker: "Guide notes",
    title: "Why a workshop beats a souvenir shop",
    excerpt:
      "A shop shows you what was made. A workshop shows you how it was made, and by whom.",
    image: "/images/journal-2.jpg",
    imageAlt: "Artisan potter shaping clay at a wheel in a workshop",
    body: [
      "Our workshops are chosen because the maker is there, not just the product. You will watch someone do the same motion they have repeated for years.",
      "The pace is slower on purpose. A session that takes two hours instead of one usually gives you more to remember.",
    ],
    readMinutes: 3,
  },
  {
    id: "journal-first-cooking-class",
    kicker: "Before you go",
    title: "What to pack for a half-day paddle",
    excerpt:
      "Water shoes, a dry bag and sunscreen you can reapply. Small choices make a long morning on the water much easier.",
    image: "/images/journal-3.jpg",
    imageAlt: "Kayaker paddling into a limestone cave in Thailand",
    body: [
      "Pack light and keep a dry bag for phones and cards. Most operators provide life vests, but not dry storage.",
      "Wear shoes you can get wet, and bring a hat. Shade on the water is limited, and the glare is stronger than it looks.",
    ],
    readMinutes: 3,
  },
];
