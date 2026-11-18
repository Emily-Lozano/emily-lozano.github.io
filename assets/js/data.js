// data.js: the content you will edit most often lives here.
//
// Dates use "YYYY-MM" (for example "2025-01"), "YYYY" when you only know the year,
// or "present" for something you are still doing.
// Lists are sorted automatically: ongoing items first, then newest to oldest.
// To show a social link, fill in its url. Links with an empty url are hidden.

window.SITE = {
  name: "Emily Lozano",
  tagline: "Electrical Engineering student at Stony Brook University",

  // Put a photo in assets/img/ and write its path here, e.g. "assets/img/profile.jpg".
  // Leave it empty to show your initials instead.
  photo: "",

  // About Me: one string per paragraph. Lines marked TODO are placeholders to replace.
  bio: [
    "I'm an Electrical Engineering student at Stony Brook University and a Simons STEM Scholar.",
    "TODO: add a few sentences about what you're interested in, what you're working on, and what you want to do next.",
  ],

  socials: [
    { label: "GitHub", url: "https://github.com/Emily-Lozano" },
    { label: "LinkedIn", url: "" }, // TODO: paste your LinkedIn profile URL
    { label: "Email", url: "" }, // TODO: for example "mailto:you@example.com"
  ],

  // Projects: each one needs its own page at projects/<slug>.html (copy projects/_template.html).
  // org is optional: the club, team, company, class or lab the project was for.
  projects: [
    {
      slug: "frc-2025-reefscape",
      title: "FRC 2025 Reefscape robot design",
      org: "FRC robotics team, Bronx High School of Science",
      start: "2025-01",
      end: "2025",
      summary: "Early KrayonCAD design of our 2025 robot: a three-stage cascade elevator, a coral reorienting mechanism and two game-piece intakes.",
    },
  ],

  // Experiences: jobs, research, programs, clubs, leadership.
  experience: [
    {
      role: "B.E. student, Electrical Engineering",
      org: "Stony Brook University",
      start: "2026-08",
      end: "present",
      description: "TODO: add coursework, labs or highlights you want to mention.",
    },
    {
      role: "Simons STEM Scholar",
      org: "Simons STEM Scholars Honors Program, Stony Brook University",
      start: "2026",
      end: "present",
      description: "TODO: describe the program and what you do in it.",
    },
  ],
};
