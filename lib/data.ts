export const ASSET = "https://sfstartuplabs.com";

export type Mentor = { name: string; role: string; img: string };
const m = (name: string, role: string, file: string): Mentor => ({ name, role, img: `${ASSET}/mentors/${file}.jpeg` });

export const mentors: Mentor[] = [
  m("Harrison Rolfes", "Chair of Venture Partners, TCA", "harrison_rolfes"),
  m("Armando Osuna", "Meadow Ventures", "armando_osuna"),
  m("Li Ma", "Rogue Women's Fund", "li_ma"),
  m("Guillaume Roux-Romestaing", "Scout, a16z", "guillaume_roux_romestaing"),
  m("Milian-Erik Retkowski", "Decile Group", "milian_erik_retkowski"),
  m("Hazal Ece Ozturk", "Plug and Play", "hazal_ece_ozturk"),
  m("Mike Ball", "Operator, Y Combinator", "mike_ball"),
  m("Arash Bidgoli", "xAI", "arash_bidgoli"),
  m("Mary Kosakowska", "HockeyStack", "mary_kosakowska"),
  m("Diogo Assumpção", "Meta", "diogo_assumpcao"),
  m("Mujahed Aghbar", "Formerly Apple", "mujahed_aghbar"),
  m("Dmytro Goliy", "Formerly DoorDash", "dmytro_goliy"),
  m("Omar Antila", "FreeWill", "omar_antila"),
  m("Agata Braja", "Stanford d.school", "agata_braja"),
  m("Tomasz Pawlikowski", "BDO USA", "tomasz_pawlikowski"),
  m("Tim Santos", "Founder mentor", "tim_santos"),
];

const P = (f: string) => `${ASSET}/program-photos/${f}.webp`;
export const photos = {
  demo: P("demo-night"),
  panel: P("founder-panel"),
  sf: P("founders-in-san-francisco"),
  talk: P("founder-conversations"),
  campus: P("founders-on-campus"),
  aggie: `${ASSET}/founder/aggie_krajewska.jpeg`,
};

export const faq = [
  { q: "What do I get out of it?", a: "A pitch that has been through real investor questions, a working grasp of the legal side of fundraising, and introductions to people in the Bay Area. We don't promise a term sheet." },
  { q: "Do you take equity?", a: "No. The $2,900 fee covers the cost of running the program, and that is all we take." },
  { q: "What does the fee cover?", a: "Both online weeks and the week in San Francisco, for your whole team. Flights and accommodation are on you." },
  { q: "Is legal and visa help included?", a: "Yes. A Harvard Law attorney covers incorporation and fundraising, and an immigration lawyer covers O-1, EB-1 and EB-2 routes, with a one-on-one consultation." },
  { q: "Can my cofounders join?", a: "Yes. The fee covers the whole team, so bring everyone who is building with you." },
  { q: "What if I miss a session?", a: "Talks are recorded. Simulations and labs are mandatory, because they only work live." },
];

export const weeks = [
  { n: "01", tag: "Online · Week 1", title: "Pitch panels", body: "Investors take your story apart, then help you rebuild it.", img: photos.panel },
  { n: "02", tag: "Online · Week 1", title: "Fundraising law", body: "A Harvard Law expert on Delaware C-Corp vs. Flip, SAFEs, convertibles and founder agreements." },
  { n: "03", tag: "Online · Week 2", title: "Product workshops", body: "Stanford-led sessions on turning customer signal into roadmap decisions.", img: photos.campus },
  { n: "04", tag: "Online · Week 2", title: "Communication Lab", body: "Work with actors on presence, pacing and the first ninety seconds of any pitch." },
  { n: "05", tag: "San Francisco", title: "Investor feedback", body: "In-person sessions with Bay Area investors, followed by demo days.", img: photos.demo },
  { n: "06", tag: "San Francisco", title: "Big Tech and VC offices", body: "Walk through Big Tech campuses and sit in VC meeting rooms.", img: photos.sf },
  { n: "07", tag: "San Francisco", title: "YC fireside chats", body: "Founders and operators on what they would redo and what they would repeat.", img: photos.talk },
  { n: "08", tag: "San Francisco", title: "Stanford and Palo Alto", body: "A day on campus, a Palo Alto visit, and a pool party to close." },
];
