# Finchglow Group Staff Portal

A front-end prototype of a single front door for staff across six businesses: Academy, OTA, B2B platform, TMC, Holidays and Shared facilities. An employee sees a personalised greeting, the apps they can launch, and the alerts and news that matter to them. Critical alerts are impossible to miss.

All data is mock data in local JSON files. There is no backend and no real sign-in.

## Run it

You need Node.js (a current LTS version; I used v24) and npm.

```
npm install
cp .env.example .env     (on Windows PowerShell: Copy-Item .env.example .env)
npm run dev
```

Then open http://localhost:5173/.

| Command | What it does |
|---|---|
| `npm run dev` | Starts the development server |
| `npm test` | Runs the tests once |
| `npm run lint` | Runs ESLint |
| `npm run build` | Type-checks and builds the production version |
| `npm run preview` | Serves the production build locally |

`.env` has one setting, `VITE_FAILURE_RATE`. It is the chance (0 to 1) that the mock API fails a request. Use `0` for a smooth demo and `0.5` or `1` to see the error and retry states. Restart the dev server after changing it.

## What it does

- **Home page:** a personalised greeting, the company and role, and a launcher grid of the apps the user can access. A role's pinned apps appear first as "Quick access".
- **Alerts and news:** three alert severities (information, warning, critical) plus news. Critical alerts show in a non-dismissible banner at the top of every page.
- **Company switcher:** changes the logo and accent colour, and filters the apps, alerts and news. Group-wide alerts and news always stay visible.
- **Search:** one box searches apps and news, with loading, empty and error states.
- **Responsive and accessible:** works from phone to desktop. See the accessibility section.
- **Extras:** dark mode, and a role-based view (four roles with different Quick access shortcuts).

## Extra I chose, and why

**Dark mode.** Late-shift contact-centre and travel desk teams look at screens for long hours in dim rooms, and a bright white page is tiring. I had also built it before, so it was low risk, which left more time for accessibility and tests, which carry more of the marking. Each company has its own dark accent, and the colours are checked for contrast in both themes.

I also built a role-based view: four roles with different "Quick access" shortcuts. It reuses the same config, so it cost little.

I did not build offline support. The part that matters most for a critical alert, reaching someone with the app closed or no signal, needs push notifications and a backend. See "Reaching staff on poor signal" below, and decision 3 in [DECISIONS.md](./DECISIONS.md).

## How it is built

Stack: Vite, React, TypeScript (strict mode), Tailwind CSS v4 and Vitest.

```
src/
  api/          mockApi.ts, the only file that reads the data and fakes a server
  components/
    alerts/     AlertCard, CriticalBanner
    apps/       AppGrid, AppTile
    layout/     AppShell, Header, Footer, SkipLink, CompanySwitcher,
                DemoUserPicker, ThemeToggle, CompanyAnnouncer
    news/       Feed, NewsCard
    search/     SearchBox, SearchResults
    ui/         Dropdown, ErrorCard, Skeleton
  context/      PortalProvider and portalContext: the current user and company
  data/         companies, users, roles, apps, alerts and news as JSON
  hooks/        useFetch (loading, error, retry) and useDebounce
  types/        shared TypeScript types
  utils/        filters, search, format, greeting, contrast (plain functions)
  test/         test setup
public/logos/   one SVG logo per company
```

Choices and why:

- **Vite single-page app, not Next.js.** There is no backend, so a lightweight client app is the right size, and it keeps the bundle small.
- **Data, logic and UI are separate.** Components never import JSON. Only `mockApi.ts` does, so a real API replaces one file.
- **Business rules are plain functions** in `utils/filters.ts` and `utils/search.ts`. They have no React in them, so they are easy to test.
- **One data hook, `useFetch`,** gives every screen the same loading, error and retry behaviour.
- **One app shell** provides the skip link, header, critical banner, main area and footer, so no page repeats them.

The three hardest trade-offs are in [DECISIONS.md](./DECISIONS.md).

## The rules

- **Alerts and news have a scope:** `group` or a company id. An item is shown when its scope is `group` or the selected company. This is how group-wide alerts survive a company switch.
- **An app is shown only when both are true:** it belongs to the selected company, and the user is allowed to use it.
- **Pinned apps** (from the user's role) only change where an app appears. They never grant access.
- **Two pieces of state:** the current user (who is signed in) and the active company (which brand is being viewed). Choosing a company does not change the user.

## Theming and adding a seventh company

All colours are CSS variables (design tokens) in `src/index.css`. The company switcher sets `--accent-light` and `--accent-dark`, and the stylesheet picks one depending on light or dark mode. Components use token names such as `bg-surface` and `text-accent`, never raw colours.

To add a company:

1. Add an entry to `src/data/companies.json` with its id, name, `accent`, `accentDark` and logo path.
2. Put its logo in `public/logos/`.
3. Add its id to the `companies` list of each app it should see in `src/data/apps.json`.
4. Add users for it in `src/data/users.json` if needed.

No component changes are needed. The contrast test reads `companies.json`, so the new colours are checked automatically.

## Mock data and API

`mockApi.ts` wraps the JSON in a function that waits 700 ms and fails at the rate in `.env`. That lets the loading, error and retry states be shown honestly. Companies, users and roles are read directly as configuration. Apps, alerts and news go through the mock API, because in a real system they would come from a server.

## Sign-in (described, not built)

The prototype fakes the signed-in user with a "Demo user" dropdown. In production:

1. The user is redirected to the company's identity provider (for example Microsoft Entra ID or Okta) using single sign-on over OpenID Connect or SAML.
2. The provider returns a token with the user's name, email, company and role.
3. A backend keeps the session in a secure, httpOnly cookie.
4. On load the app calls an endpoint such as `/me` and puts the result into the same user context.

Only the source of the user object changes. `DemoUserPicker` is deleted, and every other component stays the same.

Hiding apps in the interface is a convenience, not security. The backend must enforce which apps, alerts and news each person can see.

## Secrets

There are none in the code. `.env` is ignored by Git, and `.env.example` is committed. Anything with the `VITE_` prefix is shipped to the browser, so it can never hold a secret. Real secrets would live on a backend.

## Reaching staff on poor signal (design, not built)

For a critical alert, such as a payment failure, reaching phones with weak signal:

- Keep the alert payload tiny, so it loads on a weak connection.
- Cache the last alerts on the device and show when they were last updated.
- Send push notifications to phones, with SMS as a fallback for staff with no data.
- Poll with increasing delays, and show a clear offline state.

The prototype does not do this. It needs backend work.

## Accessibility

The target is WCAG 2.1 AA. This is what the portal does, followed by how it was tested.

### Keyboard

- Every control is a real button or link, so Tab, Shift + Tab, Enter and Space work with no extra code.
- A "Skip to main content" link is the first thing keyboard users reach. It appears when focused and jumps past the header.
- A visible focus ring (a thick outline in the company's accent colour) shows on whatever has keyboard focus, in light and dark mode.
- The company and demo user dropdowns open with Enter, Space or Down Arrow. Up and Down move through the options. Nothing is chosen until Enter, Space or a click, and Esc closes the list without changing anything and returns focus to the button.
- News titles are links, so the keyboard can reach every story.

### Screen readers

- Landmarks (header, main, footer and a named footer navigation) and a clear heading outline: one `h1` (the greeting), then `h2` sections, `h3` groups and `h4` card titles.
- The page has a title and a language (`lang="en"`).
- Critical alerts use `role="alert"`, so they are announced as soon as they appear.
- Quieter messages use polite live regions (`role="status"`): company and user changes ("Showing Academy", "Signed in as Mary. Showing Academy"), the search result count, "No results", loading, and load errors. Nothing is announced on first page load.
- Every control has a name. The search box has a label, the theme button has an `aria-label`, and the company logo has alt text. Decorative icons are hidden from screen readers.
- Links that open a new tab say so in hidden text.
- On narrow screens the dropdowns show only their value, but screen readers still hear the full label, for example "Company: OTA".

### Not relying on colour

- Alert severity uses an icon, a text label ("Critical", "Warning", "Information") and a heavier border, as well as colour.
- Pinned "Quick access" apps use a thicker border, not just a different colour.
- News links are underlined.

### Contrast

- Text, labels and alert colours were checked against their backgrounds in light and dark mode, and all pass 4.5:1. Form controls use a darker border so their edges are visible.
- Every company colour is checked by an automated test, so a bad colour in the config fails the build.

### Layout and touch

- The layout is mobile-first and reflows to one column. Nothing was cut off, and there was no sideways scrolling, at zoom up to 200% and at widths from 371px to 1100px.
- Buttons, dropdown options and form controls are at least 44px high for touch.
- Zooming is not blocked.

### Dark mode

- A theme button switches between light and dark. It starts from the computer's setting and remembers the choice.
- Each company has a separate dark accent, so contrast holds in both themes.
- Native controls draw in dark too (`color-scheme`).

### Testing

Testing, findings and fixes are in [ACCESSIBILITY.md](./ACCESSIBILITY.md):

- Lighthouse reported no failing items in any state I scanned (light, dark, other companies, search results, empty search).
- Manual keyboard and NVDA testing found real problems that Lighthouse missed. Dropdowns changed the portal while browsing the options. Company and user changes were silent. News could not be reached by keyboard. The header layout broke on narrow screens, and one logo was clipped. All were fixed and re-checked.

### Not done

- Not tested: zoom to 400%, a 320px width, Lighthouse in mobile mode, and a real phone or tablet with TalkBack or VoiceOver.
- The loading placeholders pulse, and the "reduce motion" setting is not handled.
- The dropdown has no type-ahead.
- Light grey card borders are low contrast (about 1.4:1). The text inside each card identifies it, and controls use darker borders.

## Tests

`npm test` runs unit tests for the parts where a mistake would be costly:

- The filter rules: group-wide content surviving a company switch, the two-list rule for apps, and pinned apps never adding access.
- Search matching, including empty and no-match searches.
- An automated contrast check for every company colour.

I confirmed the tests can fail by breaking a rule on purpose, then restoring it.

## Performance

The runtime dependencies are React and React DOM only. There is no router, state library, UI library or date library. Icons are inline SVG, the logos are small SVG files, and Tailwind generates only the classes used.

Production build size (`npm run build`): 245.18 kB of JavaScript (76.07 kB gzipped), 16.11 kB of CSS (4.11 kB gzipped) and 0.47 kB of HTML (0.30 kB gzipped). The first load downloads about 80.5 kB over the network, plus one small logo (under 1 kB).

I did not split the code by route, because the app is a single page. Almost all of the JavaScript is React itself. Lazy-loading the search results would save only a few kB, which is not worth an extra request.

## Assumptions

- Anyone can switch to any company. In production the server would decide which companies a person may see.
- A user's allowed apps are listed on the user. In production they would come from the identity token or a permissions service.
- App links and news links go to placeholder addresses (`example.com`).
- Times are shown in the viewer's own time zone.
- The search box is on the home page, not in the header.

## What I cut

- A real backend and real sign-in.
- Offline support and push notifications (described above, not built).
- Real company logos (placeholder SVGs).
- Type-ahead in the dropdown.
- Component tests and an automated axe check.
- Routing. It is a single page.

## Known limitations

- The alert banner and the feed each fetch alerts, so there are two requests. A shared data layer would remove one.
- Search is a simple "contains" match, with no typo tolerance or ranking.
- A brief flash of the light theme on first load for dark-mode users.
- Footer and news links are placeholders.

## With another week

1. Replace the mock layer with a real API, and fetch each data set once through a shared data library.
2. Add real offline support with a service worker, and push notifications for critical alerts.
3. Add component tests for the critical banner and dropdown, and an axe check.
4. Set the theme before first paint to remove the flash.
5. Add type-ahead to the dropdown and test with VoiceOver and TalkBack.
6. Test with real users on shared tablets.

## How I would measure success

- Time for staff to reach a tool, compared with separate bookmarks.
- How many separate logins staff stop using.
- How quickly critical alerts are acknowledged.
- Support tickets about finding things.
- Load time on slow connections, and accessibility issues reported.