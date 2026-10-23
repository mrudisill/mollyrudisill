/* ============================================================
   CONTENT — the only file you need to edit to update the site.
   Add an item to any list below and every page re-builds itself:
   nav, puzzle pieces, marquee, cards, filters & auto-generated
   brand-colored cover art (when an item has no image).

   colors available: cream, ink, olive, chartreuse, tomato,
                     bubblegum, sky, cherry, blush, cocoa
   ============================================================ */

window.SITE = {
  name: "molly rudisill",
  email: "hello@mollyrudisill.com", // ← swap for your real email
  socials: [
    { label: "instagram @mrcreative", url: "https://instagram.com/mrcreative" }, // ← check the exact handle
    { label: "github", url: "https://github.com/" },
    { label: "linkedin", url: "https://linkedin.com/" },
  ],

  // the record player in the bottom-right corner.
  // in spotify: playlist → ••• → share → copy link to playlist, then paste it here
  music: {
    title: "songs for making things",
    autoplay: true, // starts on the visitor's first click or tap (browsers don't allow sooner)
    playlist: "https://open.spotify.com/playlist/1EiwPq5GrqSMdlGjnOcil7",
  },

  // scrolling ticker text
  marquee: ["tech + creative", "art", "code", "design", "color", "creative coding", "web", "good weirdness"],

  // the puzzle pieces on the home page (and the top nav)
  sections: [
    { id: "art", title: "art", href: "art.html", color: "tomato", ink: "cream", blurb: "paintings, prints & things made by hand" },
    { id: "tech", title: "tech", href: "tech.html", color: "sky", ink: "ink", blurb: "code, apps & experiments that (mostly) work" },
    { id: "life", title: "& what not", href: "life.html", color: "bubblegum", ink: "cherry", blurb: "notes, favorite things & the in-between" },
  ],

  // the folder tabs ("what i make") on the home page.
  // add a photo to any tab with  image: "assets/needlepoint.jpg"  (otherwise it shows a placeholder)
  offerings: [
    { tab: "needlepoint", color: "chartreuse", ink: "olive", body: "hand-stitched canvases, one tiny stitch at a time. colorful, a little cheeky and made to last." },
    { tab: "websites", color: "blush", ink: "cherry", body: "websites that are fun to click and easy to update. like this one!" },
    { tab: "jewelry", color: "bubblegum", ink: "ink", body: "one-of-a-kind pieces made by hand: bright, playful and meant to be worn every day." },
    { tab: "technical + ai solutions", color: "cherry", ink: "cream", body: "smart tools, automations and ai-powered helpers that take the boring stuff off your plate." },
    { tab: "art", color: "olive", ink: "chartreuse", body: "paintings, prints and drawings that start in my sketchbook and end up on your wall." },
  ],

  // one entry per inner page
  pages: {
    art: {
      color: "tomato", ink: "cream",
      kicker: "made by hand",
      title: "art",
      intro: "paint on my sleeves, ink on my desk. a running collection of paintings, prints, sketchbook pages and whatever else i couldn't stop making.",
      items: [
        { title: "snack still lifes", tag: "painting", year: "2026", desc: "gouache on paper. a dozen tiny portraits of beloved snacks." },
        { title: "puzzle self portrait", tag: "painting", year: "2026", desc: "acrylic on panel, cut into actual puzzle pieces." },
        { title: "kitchen table prints", tag: "print", year: "2025", desc: "two-color risograph prints of everyday objects." },
        { title: "sketchbook no. 7", tag: "sketchbook", year: "2025", desc: "a whole year of doodles, lists and coffee rings." },
        { title: "color study series", tag: "painting", year: "2025", desc: "ten small studies built from my brand palette." },
        { title: "sticker sheet vol. 1", tag: "print", year: "2024", desc: "die-cut stickers — puzzle pieces, plants & tiny suns." },
      ],
    },
    tech: {
      color: "sky", ink: "ink",
      kicker: "code + curiosity",
      title: "tech",
      intro: "i like making computers do delightful things. here are the apps, tools and little experiments i've built along the way.",
      items: [
        { title: "this website", tag: "web", year: "2026", desc: "a hand-built site where one content file automatically builds every page in my brand.", link: "index.html" },
        { title: "palette picker", tag: "tool", year: "2026", desc: "drop in an image, get a brand palette with accessible pairings." },
        { title: "plant water bot", tag: "hardware", year: "2025", desc: "a tiny microcontroller that texts me when my pothos is thirsty." },
        { title: "recipe box app", tag: "app", year: "2025", desc: "a cozy little app for saving family recipes." },
        { title: "generative quilts", tag: "experiment", year: "2024", desc: "code that makes quilt patterns from a single word." },
      ],
    },
    life: {
      color: "bubblegum", ink: "cherry",
      kicker: "& what not",
      title: "the in-between",
      intro: "everything that doesn't fit neatly in a box: notes, lists, favorite things and little bits of life.",
      items: [
        { title: "things i'm loving", tag: "list", year: "2026", desc: "a rotating list of books, songs and small joys." },
        { title: "my studio setup", tag: "notes", year: "2026", desc: "the tools, apps and snacks that keep me going." },
        { title: "on loving color", tag: "essay", year: "2025", desc: "why i'll never own a beige couch." },
        { title: "summer reading", tag: "list", year: "2025", desc: "twelve books, ranked very unscientifically." },
      ],
    },
  },
};
