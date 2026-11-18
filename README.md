# emily-lozano.github.io

Personal website of Emily Lozano: about me, socials, projects and experience. Live at https://emily-lozano.github.io/.

Plain HTML, CSS and JavaScript, with no build step. GitHub Pages serves these files exactly as they are.

## Preview while editing
Open the folder in VS Code and click **Go Live** in the status bar (Live Server extension). The page reloads every time you save.

## What to edit
| To change | Edit |
|---|---|
| Name, tagline, photo, bio, social links | `assets/js/data.js` (top) |
| Project list: title, dates, organization, summary | `assets/js/data.js`, `projects` |
| One project's write-up | `projects/<slug>.html` |
| Experience entries | `assets/js/data.js`, `experience` |
| Colors and layout | `assets/css/style.css` (colors are at the top) |

Lists sort themselves: ongoing items first, then newest to oldest. Dates are `"YYYY-MM"`, `"YYYY"`, or `"present"`. Text starting with `TODO` shows as a dashed placeholder until you replace it.

## Add a project
1. Copy `projects/_template.html` to `projects/<slug>.html`, for example `projects/solar-car.html`.
2. In the copy, set `data-project="solar-car"`, then write the project description.
3. Add `{ slug: "solar-car", title: ..., org: ..., start: ..., end: ..., summary: ... }` to `projects` in `assets/js/data.js`.

## Publish
In VS Code's Source Control panel, write a message, click **Commit**, then **Sync Changes** (push). GitHub Pages updates the live site within about a minute.
