# Decision log

The three hardest trade-offs in this build.

## 1. One shared interface for six companies, driven by configuration

**Options:** (a) a separate theme or component set per company, (b) one interface where company details live in config and colours are tokens.

**Decision:** (b). Each company is an entry in `companies.json`: name, light and dark accent, logo. The switcher sets two CSS variables, and components use token names, never raw colours. An app is shown when it lists the company and the user is allowed it.

**Why:** a seventh company becomes one config entry and a logo file, with no copied code, as the brief asks. An automated test checks every company colour for contrast, so adding one cannot silently break accessibility.

**Cost:** companies share one layout and navigation. A company that wants its own navigation would need a layout slot added to the shared shell. I would push back on one-off exceptions, and offer a configurable option if several companies need it.

## 2. A custom dropdown instead of the browser's native select

**Options:** (a) keep the native `<select>`, (b) build a custom dropdown.

**Decision:** I started with (a) because the browser already handles keyboard and screen readers. Keyboard testing showed a real problem: the arrow keys changed the company or user while I was only browsing, and Esc did not cancel, so browsing could switch the whole portal by accident. I replaced it with (b), a button that opens a list of buttons, where nothing is chosen until Enter, Space or a click.

**Why:** I kept it deliberately small, with no effects or timers, and avoided ARIA listbox roles, which promise keyboard behaviour that is easy to get wrong.

**Cost:** more code that I own and must test. It has no type-ahead, and I tested it only with NVDA in Chrome.

## 3. Simulating poor-signal alert delivery instead of building it

**Options:** (a) build offline caching, a service worker and push notifications, (b) build the front end only and describe the rest.

**Decision:** (b). The critical banner is non-dismissible and announced to screen readers. The README describes the rest: a tiny alert payload, cached last alerts with a "last updated" time, push notifications, and SMS as a fallback.

**Why:** push and SMS need a backend and private keys, which the brief says are not needed, and a day of work does not fit a six to eight hour budget. I put the time into accessibility and tests, which carry more of the marking.

**Cost:** the prototype does not help a technician with the app closed or no signal. Given another week, this is the first thing I would build.