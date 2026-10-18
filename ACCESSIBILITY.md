# Accessibility testing

Target: WCAG 2.1 AA. Tested on 17 October 2026 in Chrome on Windows, with NVDA as the screen reader.

## How I tested

1. Automated: Lighthouse accessibility audit, in page-load mode and in snapshot mode for several states.
2. Keyboard only: skip link, tab order, visible focus, dropdowns, search, news links, footer and theme button.
3. Screen reader: NVDA on Windows.
4. Contrast: calculated ratios for every company accent and alert colour, in light and dark.
5. Zoom to 200% and a small phone width: [fill in, or write "not yet tested"].

## Results

- Lighthouse, desktop, light mode, page load: 100, no failing items.
- Lighthouse snapshots, no failing items in any state: dark mode 28/28, Academy 28/28, TMC 28/28, search results 26/26, empty search 26/26.
- Keyboard test, light mode, before the fixes below: all ten checks passed. The skip link works, controls are reachable in a logical order with a visible focus ring, search and Clear work, and the theme button works.
- Keyboard test after the dropdown fix: Enter or Space opens the list, the arrow keys move through the options without changing anything, Esc closes the list and keeps the original choice, and Enter or a click chooses an option.
- Keyboard test, dark mode: [fill in, or write "not yet tested"].
- Screen reader test (NVDA): the page title, headings, landmarks, control labels, alerts and search results were read out. Three problems were found, listed below.
- In NVDA browse mode the browser's focus ring does not draw, because NVDA reads with its own virtual cursor and does not move browser focus. This is expected. The focus ring shows correctly with Tab. [Keep the last sentence only if you saw the ring on Tab.]
- Contrast, light: all six accents pass 4.5:1 on white. TMC orange is lowest at 5.02:1 (4.67:1 on the page background).
- Contrast, dark: all pass. Academy is lowest at 6.63:1. Critical label 7.10:1, warning text 11.05:1.
- Lighthouse scans one page state at a time and cannot judge tab order, focus or screen reader announcements. All three issues below were found by manual testing, and Lighthouse had scored 100.

## Issues found

1. Native select dropdowns changed the selected company or user as the arrow keys moved through the options, and Esc did not cancel. Browsing the list could switch the whole portal by accident. Fixed: a shared dropdown where nothing is chosen until Enter, Space or a click, and Esc closes the list without changing anything.
2. Switching company or demo user changed the apps, alerts and news, but NVDA said nothing, so a screen reader user was not told the content had changed. Fixed: a hidden polite live region announces "Showing [company]" and "Signed in as [name]".
3. News items were plain text, so the keyboard could not stop on them and screen reader users had no way to jump between stories. Fixed: each title is now a link inside its heading.

## Known limitations

- The shared dropdown supports Tab, the arrow keys, Enter, Space and Esc, but not type-ahead or Home and End. Tested with NVDA in Chrome only.
- Light grey card borders are about 1.4:1 in light mode and 1.6:1 in dark mode. The text inside each card identifies it, and controls use darker borders.
- A brief flash of the light theme on first load for dark-mode users.
- Footer links and news links point to placeholder addresses.

## What I would do next

- Add type-ahead to the dropdown, and test it with NVDA and VoiceOver.
- Set the theme before first paint to remove the flash.
- Announce the number of apps and alerts after a company change.
- Test with real users on shared tablets.