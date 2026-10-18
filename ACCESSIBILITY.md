# Accessibility testing

Target: WCAG 2.1 AA. Tested on 17 October 2026 in Chrome on Windows, with NVDA as the screen reader.

## How I tested

1. Automated: Lighthouse accessibility audit (desktop emulation), in page-load mode and in snapshot mode for several states.
2. Keyboard only: skip link, tab order, visible focus, dropdowns, search, news links, footer and theme button, in light and dark mode.
3. Screen reader: NVDA on Windows.
4. Contrast: calculated ratios for every company accent and alert colour, in light and dark.
5. Zoom and responsive layout: zoom up to 200%, and browser device mode at widths from 371px to 1100px.

## Results

- Lighthouse, desktop, light mode, page load: 100, no failing items.
- Lighthouse snapshots, no failing items in any state: dark mode 28/28, Academy 28/28, TMC 28/28, search results 26/26, empty search 26/26. The touch target size audit passed.
- Keyboard test, light mode, before the fixes below: all ten checks passed. The skip link works, controls are reachable in a logical order with a visible focus ring, search and Clear work, and the theme button works.
- Keyboard test after the dropdown fix: Enter or Space opens the list, the arrow keys move through the options without changing anything, Esc closes the list and keeps the original choice, and Enter or a click chooses an option.
- Keyboard test, dark mode: all controls reachable, focus ring clearly visible on the dark background.
- Screen reader test (NVDA): the page title, headings, landmarks, control labels, alerts and search results were read out. Three problems were found, listed below.
- In NVDA browse mode the browser's focus ring does not draw, because NVDA reads with its own virtual cursor and does not move browser focus. This is expected. The focus ring shows correctly with Tab.
- Contrast, light: all six accents pass 4.5:1 on white. TMC orange is lowest at 5.02:1 (4.67:1 on the page background).
- Contrast, dark: all pass. Academy is lowest at 6.63:1. Critical label 7.10:1, warning text 11.05:1.
- Zoom to 200%: no sideways scrolling and nothing cut off.
- Responsive widths (371px, 411px, 558px down to 402px, 798px, 989px and 1100px): no sideways scrolling and nothing cut off. The header had layout problems at some widths, listed below, and all are fixed.
- Lighthouse scans one page state at a time and cannot judge tab order, focus, layout or screen reader announcements. All the issues below were found by manual testing, and Lighthouse had scored 100.

## Issues found

1. Native select dropdowns changed the selected company or user as the arrow keys moved through the options, and Esc did not cancel. Browsing the list could switch the whole portal by accident. Fixed: a shared dropdown where nothing is chosen until Enter, Space or a click, and Esc closes the list without changing anything.
2. Switching company or demo user changed the apps, alerts and news, but NVDA said nothing, so a screen reader user was not told the content had changed. Fixed: a hidden polite live region announces "Showing [company]" and "Signed in as [name]".
3. News items were plain text, so the keyboard could not stop on them and screen reader users had no way to jump between stories. Fixed: each title is now a link inside its heading.
4. The header controls wrapped badly on narrow screens and at high zoom. Between 150% and 200% zoom and at about 798px, they sat at the far right of a second line with a gap on the left. At 411px the theme button fell onto a third line. At 371px "Group Portal" split into two stacked words. Between about 640px and 1023px the controls sat in the middle of the row. Nothing was cut off, so this was a layout and readability problem. Fixed: below 1024px each dropdown shows only its value (the full label stays available to screen readers), the header text is smaller on phones and no longer splits, and the row uses space-between, so the controls are on the right when they share a line and on the left when they wrap.
5. The Shared facilities logo was clipped. Its file was drawn 320 units wide but its text needs about 348, so the last letters were cut off. The other logos had blank space after their text, which made "Group Portal" look as if it floated in the middle. Fixed: each logo file is now sized to its text.

## Known limitations

- The shared dropdown supports Tab, the arrow keys, Enter, Space and Esc, but not type-ahead or Home and End. Tested with NVDA in Chrome only.
- Not tested: zoom to 400%, a 320px width, Lighthouse in mobile mode, and a real phone or tablet with TalkBack or VoiceOver. Mobile layout was checked only with browser device mode.
- Light grey card borders are about 1.4:1 in light mode and 1.6:1 in dark mode. The text inside each card identifies it, and controls use darker borders.
- A brief flash of the light theme on first load for dark-mode users.
- Footer links and news links point to placeholder addresses.
- The placeholder logos use light-mode colours, so in dark mode they sit on a white chip.

## What I would do next

- Test 400% zoom and a 320px width, including whether the dropdown lists stay on screen.
- Run Lighthouse in mobile mode, and test on a real phone and tablet with TalkBack and VoiceOver.
- Add type-ahead to the dropdown, and test it with NVDA and VoiceOver.
- Set the theme before first paint to remove the flash.
- Announce the number of apps and alerts after a company change.
- Test with real users on shared tablets.