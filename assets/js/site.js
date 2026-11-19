// site.js: builds the shared header and footer and fills each page from data.js.
// You normally don't need to edit this file; change data.js instead.

(function () {
  "use strict";

  var S = window.SITE;
  var body = document.body;
  var base = body.getAttribute("data-base") || ""; // "" on top-level pages, "../" inside projects/
  var page = body.getAttribute("data-page") || "";

  // ---------- small helpers ----------
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "text") node.textContent = attrs[k];
        else if (attrs[k] !== null && attrs[k] !== undefined) node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) {
      if (c) node.appendChild(c);
    });
    return node;
  }

  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Turns "2025-03" / "2025" / "present" into a number for sorting.
  function dateValue(d, edge) {
    if (!d) return null;
    if (d === "present") return Infinity;
    var parts = d.split("-");
    var y = Number(parts[0]);
    var m = parts[1] ? Number(parts[1]) - 1 : edge === "end" ? 11 : 0;
    return y * 12 + m;
  }

  function formatDate(d) {
    if (d === "present") return "Present";
    var parts = d.split("-");
    return parts[1] ? MONTHS[Number(parts[1]) - 1] + " " + parts[0] : parts[0];
  }

  function formatRange(start, end) {
    if (!end || end === start) return formatDate(start);
    if (end.length === 4 && start.slice(0, 4) === end) return end; // e.g. "2025-01" to "2025" shows "2025"
    return formatDate(start) + " – " + formatDate(end);
  }

  // Ongoing first, then by end date (newest first), then by start date.
  function newestFirst(a, b) {
    var byEnd = dateValue(b.end || b.start, "end") - dateValue(a.end || a.start, "end");
    if (byEnd) return byEnd; // NaN (both ongoing) falls through
    return dateValue(b.start, "start") - dateValue(a.start, "start");
  }

  function projectUrl(p) {
    return base + "projects/" + p.slug + ".html";
  }

  function meta(item) {
    var bits = [formatRange(item.start, item.end)];
    if (item.org) bits.push(item.org);
    return bits.join(" · ");
  }

  function isTodo(text) {
    return /^TODO/.test(text);
  }

  // ---------- header and footer ----------
  function buildHeader() {
    var links = [
      { id: "home", label: "About", href: base + "index.html" },
      { id: "projects", label: "Projects", href: base + "projects/index.html" },
      { id: "experience", label: "Experience", href: base + "experience.html" },
    ];
    var list = el("ul", null, links.map(function (l) {
      var a = el("a", { href: l.href, text: l.label, "aria-current": l.id === page ? "page" : null });
      return el("li", null, [a]);
    }));
    var header = document.getElementById("site-header");
    if (!header) return;
    header.className = "site-header";
    header.appendChild(el("div", { class: "wrap header-inner" }, [
      el("a", { class: "brand", href: base + "index.html", text: S.name }),
      el("nav", { "aria-label": "Main" }, [list]),
    ]));
  }

  function socialLinks(className) {
    var items = S.socials.filter(function (s) { return s.url; }).map(function (s) {
      var external = /^https?:/.test(s.url);
      return el("li", null, [el("a", {
        href: s.url,
        text: s.label,
        target: external ? "_blank" : null,
        rel: external ? "noopener" : null,
      })]);
    });
    return el("ul", { class: className }, items);
  }

  function buildFooter() {
    var footer = document.getElementById("site-footer");
    if (!footer) return;
    footer.className = "site-footer";
    footer.appendChild(el("div", { class: "wrap footer-inner" }, [
      socialLinks("social-links"),
      el("p", { text: "© " + new Date().getFullYear() + " " + S.name }),
    ]));
  }

  // ---------- page fillers ----------
  function projectCard(p) {
    var text = el("div", { class: "card-text" }, [
      el("h3", null, [el("a", { href: projectUrl(p), text: p.title })]),
      el("p", { class: "meta", text: meta(p) }),
      p.summary ? el("p", { text: p.summary }) : null,
    ]);
    if (!p.image) return el("li", { class: "card" }, [text]);
    var thumb = el("a", { class: "card-thumb", href: projectUrl(p), tabindex: "-1", "aria-hidden": "true" }, [
      el("img", { src: base + p.image, alt: "", loading: "lazy" }),
    ]);
    return el("li", { class: "card has-thumb" }, [thumb, text]);
  }

  function linkButtons(links) {
    return el("ul", { class: "social-buttons project-links" }, links.map(function (l) {
      var external = /^https?:/.test(l.url);
      return el("li", null, [el("a", {
        href: l.url,
        text: l.label,
        target: external ? "_blank" : null,
        rel: external ? "noopener" : null,
      })]);
    }));
  }

  function fillHome() {
    var photoBox = document.getElementById("profile-photo");
    if (photoBox) {
      if (S.photo) {
        photoBox.appendChild(el("img", { src: base + S.photo, alt: "Photo of " + S.name }));
      } else {
        var initials = S.name.split(" ").map(function (w) { return w[0]; }).join("").slice(0, 2);
        photoBox.appendChild(el("span", { class: "initials", "aria-hidden": "true", text: initials }));
      }
    }
    var name = document.getElementById("profile-name");
    if (name) name.textContent = S.name;
    var tagline = document.getElementById("profile-tagline");
    if (tagline) tagline.textContent = S.tagline;

    var bio = document.getElementById("bio");
    if (bio) S.bio.forEach(function (p) { bio.appendChild(el("p", { class: isTodo(p) ? "todo" : null, text: p })); });

    var socials = document.getElementById("profile-socials");
    if (socials) socials.appendChild(socialLinks("social-buttons"));

    var recent = document.getElementById("recent-projects");
    if (recent) S.projects.slice().sort(newestFirst).slice(0, 3).forEach(function (p) { recent.appendChild(projectCard(p)); });
  }

  function fillProjectList() {
    var list = document.getElementById("project-list");
    if (!list) return;
    S.projects.slice().sort(newestFirst).forEach(function (p) { list.appendChild(projectCard(p)); });
  }

  function fillProjectPage() {
    var slug = body.getAttribute("data-project");
    if (!slug) return;
    var p = S.projects.filter(function (x) { return x.slug === slug; })[0];
    var head = document.getElementById("project-header");
    if (!head) return;
    if (!p) {
      head.appendChild(el("p", { class: "todo", text: "TODO: add an entry with slug \"" + slug + "\" to projects in assets/js/data.js." }));
      return;
    }
    document.title = p.title + " · " + S.name;
    head.appendChild(el("p", { class: "back" }, [el("a", { href: base + "projects/index.html", text: "← All projects" })]));
    head.appendChild(el("h1", { text: p.title }));
    head.appendChild(el("p", { class: "meta", text: meta(p) }));
    if (p.links && p.links.length) head.appendChild(linkButtons(p.links));
  }

  function fillExperience() {
    var list = document.getElementById("experience-list");
    if (!list) return;
    S.experience.slice().sort(newestFirst).forEach(function (x) {
      list.appendChild(el("li", { class: "card" }, [
        el("h3", { text: x.role }),
        el("p", { class: "meta", text: meta(x) }),
        x.description ? el("p", { class: isTodo(x.description) ? "todo" : null, text: x.description }) : null,
        x.links && x.links.length ? linkButtons(x.links.map(function (l) {
          // Links inside the site are written from the site root; add the page's base path.
          return { label: l.label, url: /^(https?:|mailto:|\/)/.test(l.url) ? l.url : base + l.url };
        })) : null,
      ]));
    });
  }

  // Gallery pictures open full size in a new tab when clicked.
  function linkGalleryImages() {
    Array.prototype.forEach.call(document.querySelectorAll(".gallery img"), function (img) {
      if (img.parentNode.tagName === "A") return;
      var a = el("a", { href: img.getAttribute("src"), target: "_blank", rel: "noopener", title: "Open full size" });
      img.parentNode.insertBefore(a, img);
      a.appendChild(img);
    });
  }

  buildHeader();
  buildFooter();
  linkGalleryImages();
  fillHome();
  fillProjectList();
  fillProjectPage();
  fillExperience();
})();
