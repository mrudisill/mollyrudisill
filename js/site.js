/* ============================================================
   SITE ENGINE — builds header, footer and page content from
   content.js so every page stays on-brand automatically.
   ============================================================ */
(function () {
  const S = window.SITE;
  const $ = (sel, root = document) => root.querySelector(sel);
  const v = (name) => `var(--${name})`;
  const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- the puzzle piece shape (matches the MR mark) ---------- */
  const PIECE_PATH =
    "M0 22 H31 Q34 22 33 18 A11 11 0 1 1 47 18 Q46 22 49 22 H78 V51 Q78 54 82 53 A11 11 0 1 1 82 67 Q78 66 78 69 V100 H0 Z";
  const piece = (fill, extra = "") =>
    `<svg class="piece-svg" viewBox="-2 -4 106 106" aria-hidden="true" ${extra}><path d="${PIECE_PATH}" fill="${fill}"/></svg>`;

  /* ---------- header ---------- */
  const header = $("#site-header");
  if (header) {
    header.innerHTML = `
      <a class="brand" href="index.html" aria-label="molly rudisill — home">
        <img src="assets/mark-mr.png" alt="MR" />
      </a>
      <button class="nav-toggle" aria-expanded="false" aria-controls="nav">menu</button>
      <nav id="nav" class="nav">
        ${S.sections
          .map(
            (s) =>
              `<a href="${s.href}" data-section="${s.id}" style="--c:${v(s.color)};--i:${v(s.ink)}">${esc(s.title)}</a>`
          )
          .join("")}
        <a class="nav-say-hi" href="#contact">say hi</a>
      </nav>`;
    const btn = $(".nav-toggle", header);
    btn.addEventListener("click", () => {
      const open = header.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
    });
  }

  /* ---------- puzzle logo (inlined so each piece can move) ---------- */
  const logoSvg = fetch("assets/logo-puzzle.svg").then((r) => (r.ok ? r.text() : Promise.reject()));
  const fillLogos = () => {
    const logos = document.querySelectorAll("[data-logo]");
    logoSvg
      .then((svg) => logos.forEach((el) => (el.innerHTML = svg)))
      .catch(() => logos.forEach((el) => (el.innerHTML = '<img src="assets/logo-puzzle.svg" alt="molly rudisill" />')));
  };

  /* ---------- marquee ---------- */
  const fillMarquees = () =>
    document.querySelectorAll("main [data-marquee]").forEach((el) => {
      const run = S.marquee.map((w) => `<span>${esc(w)}</span><i>✦</i>`).join("");
      el.innerHTML = `<div class="marquee-track">${run}${run}</div>`;
    });

  /* ---------- footer + contact ticket ---------- */
  const footer = $("#site-footer");
  if (footer) {
    footer.innerHTML = `
      <section id="contact" class="contact">
        <div class="stamp" aria-hidden="true">
          <svg viewBox="0 0 200 140"><path d="${wavyRect(200, 140, 10)}" fill="${v("blush")}"/></svg>
          <span>make<br/>something<br/>weird</span>
        </div>
        <div class="ticket">
          <p class="ticket-kicker">got a project, a question or a cool puzzle?</p>
          <h2>let's keep <em>in touch</em></h2>
          <a class="btn btn-cream" href="mailto:${esc(S.email)}">${esc(S.email)}</a>
        </div>
        ${badge("seal", "tech + creative ✦ art + code ✦ ", "sky")}
        <button class="smiski" aria-label="psst… a tiny glowing friend">
          <svg viewBox="0 0 64 64" aria-hidden="true">
            <ellipse cx="32" cy="60" rx="17" ry="14" fill="#e4f1cc"/>
            <ellipse cx="32" cy="30" rx="21" ry="19" fill="#e4f1cc"/>
            <ellipse cx="25" cy="19" rx="6" ry="3.5" fill="#fff" opacity=".55"/>
            <ellipse cx="24.5" cy="31" rx="2.3" ry="2.8" fill="#2b2822"/>
            <ellipse cx="39.5" cy="31" rx="2.3" ry="2.8" fill="#2b2822"/>
            <ellipse cx="13" cy="46" rx="5" ry="4" fill="#d6e8bb"/>
            <ellipse cx="51" cy="46" rx="5" ry="4" fill="#d6e8bb"/>
          </svg>
          <span class="smiski-bubble">you found me! ✿</span>
        </button>
      </section>
      <div class="stripes stripes-tomato"></div>
      <div class="footer-inner">
        <img class="footer-mark" src="assets/mark-mr.png" alt="MR" />
        <div>
          <p class="footer-big">putting the pieces together<br/>since forever.</p>
          <ul class="footer-links">
            ${S.sections.map((s) => `<li><a href="${s.href}">${esc(s.title)}</a></li>`).join("")}
            ${S.socials.map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener">${esc(s.label)} ↗</a></li>`).join("")}
          </ul>
        </div>
        <p class="footer-copy">© ${new Date().getFullYear()} molly rudisill · made with love & a lot of color</p>
      </div>`;
  }

  /* ---------- the hidden smiski: click it and the lights go out ---------- */
  const smiski = $(".smiski");
  if (smiski) {
    const dark = document.createElement("div");
    dark.className = "lights-out-overlay";
    document.body.appendChild(dark);
    smiski.addEventListener("click", () => {
      if (document.body.classList.contains("lights-out")) return;
      document.body.classList.add("lights-out");
      setTimeout(() => document.body.classList.remove("lights-out"), 3400);
    });
  }

  /* ---------- record player (spotify) ---------- */
  const playlistId = ((S.music && S.music.playlist) || "").match(/playlist\/([A-Za-z0-9]+)/);
  if (playlistId) {
    const tt = document.createElement("aside");
    tt.className = "turntable";
    tt.setAttribute("aria-label", "molly's playlist");
    tt.innerHTML = `
      <div class="tt-panel is-closed" id="tt-panel" aria-hidden="true">
        <div class="tt-head">
          <div>
            <p class="tt-kicker">now spinning</p>
            <h3>${esc(S.music.title)}</h3>
          </div>
          <button class="tt-close" aria-label="close player">×</button>
        </div>
        <div class="tt-embed"><div id="tt-embed"></div></div>
      </div>
      <button class="tt-deck" aria-expanded="false" aria-controls="tt-panel" aria-label="open molly's playlist">
        <span class="tt-record"><span class="tt-label"><img src="assets/mark-mr.png" alt="" /></span></span>
        <span class="tt-arm" aria-hidden="true"></span>
      </button>`;
    document.body.appendChild(tt);

    const panel = $(".tt-panel", tt), deck = $(".tt-deck", tt);
    let loaded = false, controller = null, wantPlay = false;
    const plainEmbed = () => {
      $("#tt-embed", tt).outerHTML = `<iframe src="https://open.spotify.com/embed/playlist/${playlistId[1]}?theme=0" width="100%" height="352" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="spotify playlist"></iframe>`;
    };
    const load = () => {
      if (loaded) return;
      loaded = true;
      // spotify's embed api tells us when music is playing, so the record can spin
      const fallback = setTimeout(plainEmbed, 6000);
      window.onSpotifyIframeApiReady = (api) => {
        clearTimeout(fallback);
        api.createController($("#tt-embed", tt), { uri: `spotify:playlist:${playlistId[1]}`, width: "100%", height: 352 }, (ctrl) => {
          controller = ctrl;
          ctrl.addListener("ready", () => wantPlay && ctrl.play());
          ctrl.addListener("playback_update", (e) => {
            const playing = !e.data.isPaused;
            tt.classList.toggle("playing", playing);
            if (playing) try { sessionStorage.setItem("music-started", "1"); } catch (_) {}
          });
        });
      };
      const script = document.createElement("script");
      script.src = "https://open.spotify.com/embed/iframe-api/v1";
      script.async = true;
      script.onerror = () => (clearTimeout(fallback), plainEmbed());
      document.body.appendChild(script);
    };
    const setOpen = (open) => {
      load();
      // the panel stays loaded while closed, so spotify can get ready in the background
      panel.classList.toggle("is-closed", !open);
      panel.setAttribute("aria-hidden", !open);
      tt.classList.toggle("open", open);
      deck.setAttribute("aria-expanded", open);
      deck.setAttribute("aria-label", open ? "close molly's playlist" : "open molly's playlist");
    };
    const isOpen = () => !panel.classList.contains("is-closed");
    deck.addEventListener("click", () => setOpen(!isOpen()));
    $(".tt-close", tt).addEventListener("click", () => setOpen(false));
    document.addEventListener("keydown", (e) => e.key === "Escape" && isOpen() && setOpen(false));

    // browsers block sound until someone interacts with the page, so the music
    // starts on the visitor's first click, tap or key press (once per visit)
    let started = null;
    try { started = sessionStorage.getItem("music-started"); } catch (_) {}
    if (S.music.autoplay && !started) {
      load();
      const events = ["pointerdown", "keydown", "touchstart"];
      const start = () => {
        events.forEach((t) => document.removeEventListener(t, start, true));
        wantPlay = true;
        if (controller) controller.play();
      };
      events.forEach((t) => document.addEventListener(t, start, true));
    }
  }

  /* ---------- helpers that draw brand shapes ---------- */
  function wavyRect(w, h, a) {
    // a rectangle with a scalloped / wavy edge, like a stamp
    const n = 10, pts = [];
    const edge = (x1, y1, x2, y2, nx, ny) => {
      for (let i = 0; i < n; i++) {
        const t1 = (i + 0.5) / n, t2 = (i + 1) / n;
        const cx = x1 + (x2 - x1) * t1 + nx * a, cy = y1 + (y2 - y1) * t1 + ny * a;
        pts.push(`Q${cx.toFixed(1)} ${cy.toFixed(1)} ${(x1 + (x2 - x1) * t2).toFixed(1)} ${(y1 + (y2 - y1) * t2).toFixed(1)}`);
      }
    };
    const p = a;
    edge(p, p, w - p, p, 0, -1);
    edge(w - p, p, w - p, h - p, 1, 0);
    edge(w - p, h - p, p, h - p, 0, 1);
    edge(p, h - p, p, p, -1, 0);
    return `M${p} ${p} ${pts.join(" ")} Z`;
  }

  function badge(cls, text, color) {
    const id = "c" + Math.random().toString(36).slice(2, 7);
    return `<div class="badge ${cls}" aria-hidden="true">
      <svg viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="96" fill="${v(color)}"/>
        <circle cx="100" cy="100" r="80" fill="none" stroke="${v("cream")}" stroke-width="1.5" stroke-dasharray="3 5"/>
        <defs><path id="${id}" d="M100 100 m-66 0 a66 66 0 1 1 132 0 a66 66 0 1 1 -132 0"/></defs>
        <text><textPath href="#${id}" textLength="408" lengthAdjust="spacing">${esc(text)}</textPath></text>
      </svg>
      <img src="assets/mark-mr.png" alt="" />
    </div>`;
  }

  // deterministic random from a string, so each item always gets the same art
  function rng(seed) {
    let h = 2166136261;
    for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
    return () => {
      h += 0x6d2b79f5;
      let t = h;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* auto-generated cover art in brand colors for items without an image */
  const PALETTE = ["cream", "olive", "chartreuse", "tomato", "bubblegum", "sky", "cherry", "blush", "cocoa", "ink"];
  function cover(seed) {
    const r = rng(seed);
    const pick = (arr) => arr[Math.floor(r() * arr.length)];
    const bg = pick(PALETTE);
    const others = PALETTE.filter((c) => c !== bg);
    const c1 = pick(others), c2 = pick(others.filter((c) => c !== c1)), c3 = pick(others.filter((c) => c !== c1 && c !== c2));
    const shapes = [];
    const style = Math.floor(r() * 4);
    if (style === 0) {
      // stripes + sun
      for (let x = 0; x < 400; x += 40) shapes.push(`<rect x="${x}" y="0" width="20" height="300" fill="${v(c1)}" opacity=".9"/>`);
      shapes.push(`<circle cx="${120 + r() * 160}" cy="${100 + r() * 100}" r="${70 + r() * 30}" fill="${v(c2)}"/>`);
    } else if (style === 1) {
      // stacked arches
      for (let i = 0; i < 4; i++) shapes.push(`<path d="M${60 + i * 20} 300 V200 A${140 - i * 20} ${140 - i * 20} 0 0 1 ${340 - i * 20} 200 V300 Z" fill="${v([c1, c2, c3, bg][i])}"/>`);
      shapes.push(`<circle cx="${80 + r() * 240}" cy="60" r="26" fill="${v(c3)}"/>`);
    } else if (style === 2) {
      // puzzle pieces tumbling
      for (let i = 0; i < 3; i++) {
        const x = 30 + i * 120 + r() * 20, y = 60 + r() * 80, rot = -25 + r() * 50;
        shapes.push(`<g transform="translate(${x} ${y}) rotate(${rot} 50 50) scale(1.05)"><path d="${PIECE_PATH}" fill="${v([c1, c2, c3][i])}"/></g>`);
      }
    } else {
      // squiggle + dots
      let d = "M-10 150";
      for (let x = 0; x <= 420; x += 50) d += ` Q${x + 25} ${r() > 0.5 ? 60 : 240} ${x + 50} 150`;
      shapes.push(`<path d="${d}" fill="none" stroke="${v(c1)}" stroke-width="28" stroke-linecap="round"/>`);
      for (let i = 0; i < 14; i++) shapes.push(`<circle cx="${r() * 400}" cy="${r() * 300}" r="${4 + r() * 10}" fill="${v(i % 2 ? c2 : c3)}"/>`);
    }
    return `<svg class="cover" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="400" height="300" fill="${v(bg)}"/>${shapes.join("")}</svg>`;
  }

  /* ---------- reveal on scroll ---------- */
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { threshold: 0.12 })
    : null;

  /* the home page's folder stack re-measures itself when the window resizes */
  let layStack = null;
  addEventListener("resize", () => layStack && layStack());
  let rotateTimer = null;

  /* ================= PAGE CONTENT (re-runs on every page change) ================= */
  function renderPage() {
  const page = document.body.dataset.page;
  layStack = null;
  clearInterval(rotateTimer);
  document.querySelectorAll("#nav [data-section]").forEach((a) =>
    a.dataset.section === page ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current")
  );
  fillLogos();

  /* ================= HOME ================= */
  if (page === "home") {
    // hero badge
    $("#hero-badge").innerHTML = badge("hero-seal", "hi there ✦ welcome in ✦ ", "tomato");

    // "i make ___": swap the word every couple of seconds
    const rot = $("#rotator");
    if (rot) {
      const words = S.rotator.map((r) => r.word);
      rot.setAttribute("aria-hidden", "true"); // screen readers hear the whole list once instead
      rot.parentElement.setAttribute("aria-label", `i make ${words.slice(0, -1).join(", ")} and ${words.at(-1)}`);
      let w = 0;
      const showWord = (first) => {
        const { word, hl } = S.rotator[w];
        const old = rot.querySelector("span:not(.out)");
        const next = document.createElement("span");
        next.textContent = word;
        next.style.setProperty("--hl", v(hl));
        if (first) next.style.animation = "none";
        rot.appendChild(next);
        rot.style.width = `${next.offsetWidth}px`;
        if (old) {
          old.classList.add("out");
          setTimeout(() => old.remove(), 400);
        }
        w = (w + 1) % S.rotator.length;
      };
      showWord(true);
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches) rotateTimer = setInterval(showWord, 2200);
    }

    // puzzle-piece navigation
    $("#pieces").innerHTML = S.sections
      .map(
        (s, i) => `
        <a class="piece" href="${s.href}" style="--c:${v(s.color)};--i:${v(s.ink)};--r:${[-5, 4, -3][i % 3]}deg">
          ${piece(v(s.color))}
          <span class="piece-num">0${i + 1}</span>
          <span class="piece-title">${esc(s.title)}</span>
          <span class="piece-blurb">${esc(s.blurb)}</span>
          <span class="piece-go" aria-hidden="true">→</span>
        </a>`
      )
      .join("");

    // creative + tech: the pieces slide together when they scroll into view, then click
    const tc = $(".tc-heading");
    const snap = () => {
      // jump apart instantly, then slide back together
      tc.classList.add("resetting");
      tc.classList.remove("joined", "snapped");
      void tc.offsetWidth;
      tc.classList.remove("resetting");
      requestAnimationFrame(() => setTimeout(() => tc.classList.add("joined"), 120));
      setTimeout(() => tc.classList.add("snapped"), 1050);
    };
    if ("IntersectionObserver" in window) {
      const seen = new IntersectionObserver(([e]) => e.isIntersecting && (snap(), seen.disconnect()), { threshold: 0.5 });
      seen.observe(tc);
    } else snap();
    tc.addEventListener("click", snap);

    // a box of file dividers: click a tab and that folder slides to the front
    const box = $("#folders");
    if (box) {
      const n = S.offerings.length;
      box.innerHTML = `
        <div class="stack-note" aria-hidden="true">
          <svg class="clip" viewBox="0 0 26 64"><path d="M8 20 V50 a6 6 0 0 0 12 0 V10 a8 8 0 0 0 -16 0 V46" fill="none" stroke="#7d8c7a" stroke-width="2.6" stroke-linecap="round"/></svg>
          <small>all my thoughts:</small>
          <p>flip through my files ✿</p>
        </div>
        <div role="tablist" aria-label="what i make">
        ${S.offerings
          .map(
            (o, i) => `
            <section class="folder felt" id="file-${i}" role="tabpanel" aria-labelledby="file-tab-${i}" style="--c:${v(o.color)};--i:${v(o.ink)}">
              <button class="folder-tab felt" id="file-tab-${i}" role="tab" aria-controls="file-${i}"><span>0${i + 1}</span><span>${esc(o.tab)}</span></button>
              <div class="folder-inner">
                <div class="folder-text">
                  <h3>${esc(o.tab)}</h3>
                  <p>${esc(o.body)}</p>
                  <a class="btn" href="#contact">let's make something →</a>
                </div>
                <figure class="folder-photo">
                  ${o.image
                    ? `<img src="${esc(o.image)}" alt="${esc(o.tab)}" />`
                    : `<div class="folder-photo-empty"><span>(${esc(o.tab)} photo<br/>goes here!)</span></div>`}
                </figure>
              </div>
            </section>`
          )
          .join("")}
        </div>`;

      const folders = [...box.querySelectorAll(".folder")];
      let order = folders.map((_, i) => n - 1 - i); // back → front; the first folder starts in front

      layStack = () => {
        const narrow = innerWidth < 640;
        const step = narrow ? 44 : 50, tabH = narrow ? 40 : 46;
        const tw = narrow ? 44 : 100 / n - 1.5; // tab width, in %
        folders.forEach((f, i) => {
          // tabs sit in a staircase across the top so every one stays visible
          f.style.setProperty("--tw", `${tw}%`);
          f.style.setProperty("--tx", `${narrow ? (i * (100 - tw)) / (n - 1) : i * (tw + 1.5) + 0.75}%`);
        });
        folders.forEach((f) => (f.style.height = "auto"));
        const h = Math.max(...folders.map((f) => f.offsetHeight));
        order.forEach((fi, slot) => {
          const f = folders[fi];
          f.style.height = `${h}px`;
          f.style.top = `${tabH + slot * step}px`;
          f.style.zIndex = slot + 1;
          const front = slot === n - 1;
          f.classList.toggle("is-front", front);
          f.querySelector(".folder-tab").setAttribute("aria-selected", front);
          f.querySelector(".folder-tab").tabIndex = front ? 0 : -1;
        });
        box.style.height = `${tabH + (n - 1) * step + h}px`;
      };
      layStack();
      box.querySelectorAll("img").forEach((img) => img.addEventListener("load", () => layStack && layStack()));

      const bringForward = (i) => {
        order = [...order.filter((x) => x !== i), i];
        layStack();
      };
      folders.forEach((f, i) => {
        const tab = f.querySelector(".folder-tab");
        tab.addEventListener("click", () => bringForward(i));
        tab.addEventListener("keydown", (e) => {
          const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
          if (!d) return;
          const next = (i + d + n) % n;
          bringForward(next);
          folders[next].querySelector(".folder-tab").focus();
        });
      });
    }
  }

  /* ================= COLLECTION PAGES ================= */
  const P = S.pages[page];
  if (P) {
    document.title = `${P.title} — molly rudisill`;
    document.body.style.setProperty("--theme", v(P.color));
    document.body.style.setProperty("--theme-ink", v(P.ink));
    const tags = ["all", ...new Set(P.items.map((it) => it.tag))];

    $("#page").innerHTML = `
      <section class="page-hero">
        <div class="page-hero-text">
          <p class="kicker">${esc(P.kicker)}</p>
          <h1>${esc(P.title)}</h1>
          <p class="lede">${esc(P.intro)}</p>
          ${P.cta ? `<a class="btn btn-ink" href="${P.cta.href}">${esc(P.cta.label)} →</a>` : ""}
        </div>
        <div class="page-hero-pieces" aria-hidden="true">
          ${piece(v("cream"), 'style="--r:-12deg"')}${piece(v(P.ink), 'style="--r:9deg"')}
        </div>
      </section>
      <div data-marquee class="marquee marquee-ink"></div>
      <section class="collection wrap">
        <div class="chips" role="group" aria-label="filter">
          ${tags.map((t, i) => `<button class="chip" aria-pressed="${i === 0}" data-tag="${esc(t)}">${esc(t)}</button>`).join("")}
        </div>
        <div class="grid">
          ${P.items
            .map(
              (it, i) => `
              <article class="card" data-tag="${esc(it.tag)}" style="--r:${[-1.5, 1, -0.5, 1.5][i % 4]}deg" tabindex="0" data-i="${i}">
                <div class="card-art">${it.image ? `<img src="${esc(it.image)}" alt="${esc(it.title)}" loading="lazy"/>` : cover(it.title)}</div>
                <p class="card-tag">${esc(it.tag)} · ${esc(it.year)}</p>
                <h3>${esc(it.title)}</h3>
              </article>`
            )
            .join("")}
        </div>
      </section>
      <dialog class="lightbox"><div class="lightbox-inner"></div></dialog>`;

    // filters
    const chips = document.querySelectorAll(".chip");
    chips.forEach((c) =>
      c.addEventListener("click", () => {
        chips.forEach((x) => x.setAttribute("aria-pressed", x === c));
        document.querySelectorAll(".card").forEach((card) => {
          card.hidden = c.dataset.tag !== "all" && card.dataset.tag !== c.dataset.tag;
        });
      })
    );

    // lightbox
    const dlg = $(".lightbox");
    const open = (i) => {
      const it = P.items[i];
      $(".lightbox-inner").innerHTML = `
        <button class="lightbox-close" aria-label="close">×</button>
        <div class="lightbox-art">${it.image ? `<img src="${esc(it.image)}" alt="${esc(it.title)}"/>` : cover(it.title)}</div>
        <div class="lightbox-text">
          <p class="card-tag">${esc(it.tag)} · ${esc(it.year)}</p>
          <h2>${esc(it.title)}</h2>
          <p>${esc(it.desc || "")}</p>
          ${it.link ? `<a class="btn btn-ink" href="${esc(it.link)}">take a look →</a>` : ""}
        </div>`;
      $(".lightbox-close").addEventListener("click", () => dlg.close());
      dlg.showModal();
    };
    dlg.addEventListener("click", (e) => e.target === dlg && dlg.close());
    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("click", () => open(+card.dataset.i));
      card.addEventListener("keydown", (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), open(+card.dataset.i)));
    });
  } else {
    document.body.style.removeProperty("--theme");
    document.body.style.removeProperty("--theme-ink");
  }

  fillMarquees();
  document.querySelectorAll(".reveal, .card, .piece").forEach((el) => (io ? io.observe(el) : el.classList.add("in")));
  }

  /* ================= MOVING BETWEEN PAGES =================
     links swap in the new page's <main> instead of reloading,
     so the header, footer and record player (and the music!) stay put */
  async function go(url, push) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(res.status);
      const doc = new DOMParser().parseFromString(await res.text(), "text/html");
      const next = doc.querySelector("main");
      if (!next) throw new Error("no main");
      document.querySelector("main").replaceWith(document.importNode(next, true));
      document.body.dataset.page = doc.body.dataset.page;
      document.title = doc.title;
      if (push) history.pushState({}, "", url);
      header && header.classList.remove("open");
      renderPage();
      const target = url.hash && document.querySelector(url.hash);
      target ? target.scrollIntoView() : window.scrollTo({ top: 0, behavior: "instant" });
    } catch (err) {
      console.warn("page swap failed, loading normally", err);
      location.href = url.href; // if anything goes wrong, just load the page normally
    }
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || !/(\.html|\/)$/.test(url.pathname)) return;
    if (url.pathname === location.pathname) return; // same page (e.g. #contact): let the browser scroll
    e.preventDefault();
    go(url, true);
  });
  window.addEventListener("popstate", () => go(new URL(location.href), false));

  renderPage();
})();
