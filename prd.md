# 🎡 Spin the Wheel — Prize Giveaway Web App

## Product Requirements Document

---

## 1. Overview

An interactive "Spin the Wheel" web app for live event swag giveaways. Attendees spin a prize wheel, win an item, and the app tracks remaining inventory in real time — automatically adjusting probabilities and removing depleted prizes. An admin panel lets organizers manage prizes, quantities, and odds on the fly.

---

## 2. Goals

- **Engagement**: Create a memorable, delightful moment at the booth — spinning should feel exciting, and winning should feel rewarding.
- **Operational accuracy**: Never award a prize that's out of stock; always reflect real-time inventory.
- **Organizer flexibility**: Allow adding, editing, and removing prizes mid-event without restarting the app.
- **Legibility**: Prize names must be clearly readable on the wheel at all times, regardless of segment count or size.

---

## 3. Users

| Role | Description |
|------|-------------|
| **Attendee** | Walks up, taps "Spin," wins a prize. No login required. |
| **Organizer / Admin** | Manages prize list, quantities, and probability weights via a built-in admin panel. |

---

## 4. Core Features

### 4.1 The Wheel

- **Dynamic segments**: The wheel renders one segment per active prize (quantity > 0). Segments resize proportionally based on probability weight.
- **Visual design**: White divider lines between segments, small dot accents at segment boundaries, and a palette of distinguishable segment colours (avoiding adjacent repeats).
- **Text legibility**: Prize names render along or inside segments using a size that scales with segment arc. Long names truncate with an ellipsis and show full text in the legend. Funnel Sans throughout.
- **Spin mechanic**: A prominent centre spin button (blue → purple gradient, pill shape) triggers a CSS/JS eased rotation with randomised stopping position weighted by probability.
- **Pointer / indicator**: A fixed pointer at 12-o'clock marks the winning segment.

### 4.2 Spin Flow

1. Attendee taps **Spin**.
2. Wheel accelerates, decelerates with an easing curve (≈ 4–6 seconds).
3. On stop, the winning segment is identified.
4. **Delight moment** — a result modal animates in:
   - Frosted glass card (`backdrop-filter: blur`) with rounded corners and soft shadow.
   - Thin gradient accent stripe (#A3FFA1 → white) across the top of the modal.
   - Prize name displayed large and bold.
   - Confetti burst / particle animation behind the modal.
   - A subtle celebratory sound effect (optional toggle in admin).
5. Inventory for that prize decrements by 1.
6. If a prize hits 0, it is removed from the wheel and segments re-render.
7. Attendee (or organizer) dismisses the modal to reset for the next spin.

### 4.3 Prize Legend

- Sits beside (desktop) or below (mobile) the wheel.
- Each prize shown as a **pill tag** coloured to match its wheel segment.
- Displays: prize name, remaining quantity, probability weight.
- Greyed-out pills for depleted prizes (quantity = 0) so organizers can still see full history.

### 4.4 Inventory & Probability Engine

| Concept | Detail |
|---------|--------|
| **Quantity** | Integer count of remaining units. Decremented on each win. Prize removed from wheel at 0. |
| **Probability weight** | A relative numeric weight per prize. The engine normalises weights across active prizes to compute actual spin probability. E.g., a prize with weight 2 among total weights of 10 has a 20% chance. |
| **Auto-adjustment** | When a prize is depleted, its weight is redistributed proportionally across remaining prizes automatically. |
| **Manual override** | Organiser can set custom weights at any time via the admin panel. |

### 4.5 Admin Panel

Accessed via a toggle button or an expandable drawer (not a separate page — keeps the wheel visible for quick testing).

**Capabilities:**

- **Add a prize**: Name, initial quantity, probability weight, optional segment colour.
- **Edit a prize**: Inline-edit name, quantity, or weight for any existing prize.
- **Remove a prize**: Soft-delete (greyed out) or hard-delete from the list.
- **Bulk import** (nice-to-have): Paste a CSV or JSON blob to populate prizes quickly.
- **Reset all**: Restore quantities to their initial values (useful between event sessions).
- **Sound toggle**: Enable/disable the celebratory sound on win.
- **Spin history log**: Scrollable list of recent wins with timestamp and prize name for audit purposes.

**Design**: Lives inside a white rounded card with soft drop shadow. Form inputs use pill-shaped fields with rounded corners. Action buttons follow the same blue → purple gradient as the spin button.

### 4.6 Persistence

- All prize data (names, quantities, weights, spin history) persisted to `localStorage` so a page refresh doesn't wipe state.
- Export / import JSON snapshot of current state for backup or transfer between devices.

---

## 5. Initial Prize Inventory

| # | Prize | Qty | Default Weight |
|---|-------|-----|----------------|
| 1 | "Meet me in the browser" cap | 5 | 5 |
| 2 | Blue Figma Cap | 5 | 5 |
| 3 | Baggu Bag | 10 | 10 |
| 4 | Washi Tape | 20 | 20 |
| 5 | Mini Pouch | 10 | 10 |
| 6 | Figma Patch | 20 | 20 |
| 7 | FoF Toronto T-shirt | 80 | 80 |
| 8 | 2026 FoF Toronto Tote | 120 | 120 |
| 9 | FoF Toronto Sticker Sheet | 50 | 50 |
| 10 | 2025 FoF Toronto Tote | 106 | 106 |
| 11 | FoF Pin | 25 | 25 |
| 12 | FoF Coloured Pen | 10 | 10 |
| 13 | Config 2026 Tote | 7 | 7 |
| 14 | Config 2026 Hat | 140 | 140 |
| 15 | Config Stickers | 100 | 100 |
| 16 | Config 2026 Pin | 120 | 120 |
| 17 | QT Fidget Toy | 40 | 40 |
| 18 | QT Baseball Cap | 15 | 15 |
| 19 | QT Tumbler | 8 | 8 |
| 20 | QT Water Bottle | 12 | 12 |
| 21 | QT Mug | 15 | 15 |
| 22 | QT Notebook | 25 | 25 |

> Default weights are set equal to quantity so that initial probability is proportional to stock — higher-stock items appear more often. Organizers can override these at any time.

---

## 6. Visual & Interaction Design Spec

### 6.1 Layout & Surface

- **Background**: Subtle linear gradient from `#A3FFA1` (top-left) to white (bottom-right) behind the main content area.
- **Card surfaces**: White, rounded corners (16 px), soft `box-shadow` (no hard borders).
- **Buttons**: Pill-shaped (`border-radius: 999px`), soft shadow on hover.
- **Typography**: **Funnel Sans** (Google Fonts) — all headings, labels, body, and wheel text.

### 6.2 Wheel Detail

- White divider lines (2 px) between segments.
- Small white dot accents (6 px diameter) placed at each segment boundary on the wheel's outer edge.
- Segment fill: A curated palette of 11+ distinguishable colours — muted-to-medium saturation to keep text legible; no adjacent segments share a colour.
- Prize text: White or dark (auto-contrast against segment fill), oriented radially or along arc.

### 6.3 Spin Button

- Centred on the wheel.
- Gradient fill: blue (`#4F8CFF`) → purple (`#A855F7`).
- Text: "SPIN" in Funnel Sans Bold, white.
- Hover: Slight scale-up + glow.
- Disabled state (during spin): Greyed out, no pointer events.

### 6.4 Result Modal

- Frosted glass: `background: rgba(255,255,255,0.75); backdrop-filter: blur(16px)`.
- Rounded corners (20 px), soft shadow.
- **Thin gradient accent stripe** at the top of the modal: `#A3FFA1` → white, ~4 px tall.
- Prize name: Large, bold, centred.
- Subtext: "Congratulations!" or similar.
- Confetti particles: Colourful, gravity-affected, fade after ~3 seconds.
- Dismiss button: Pill-shaped, subtle outline style.

### 6.5 Admin Panel

- White rounded card, soft shadow, collapsible.
- Section headers in Funnel Sans SemiBold.
- Inputs: Pill-shaped with light grey border, focus ring in blue.
- Prize rows: Editable inline with save/cancel icon buttons.
- Spin history: Scrollable list, each row shows timestamp + prize name pill tag.

### 6.6 Prize Legend

- Horizontal or vertical list of pill tags.
- Each pill: Rounded rectangle, filled with segment colour, white text for prize name, small badge showing remaining quantity.
- Depleted prizes: Pill turns light grey, quantity shows "0", strikethrough on name.

---

## 7. Interaction & Motion

| Moment | Animation |
|--------|-----------|
| **Page load** | Wheel fades + scales in (0 → 1) over 600 ms with ease-out. |
| **Spin** | Rotation with cubic-bezier easing; 4–6 full rotations; deceleration in final rotation. |
| **Win reveal** | Modal slides up + fades in (300 ms). Confetti burst fires simultaneously. Optional sound. |
| **Modal dismiss** | Fade out + slight scale down (200 ms). |
| **Prize depleted** | Wheel segments animate re-distribution (smooth resize + colour shift, 400 ms). |
| **Admin add/remove** | New segment slices in; removed segment collapses out. |
| **Hover states** | Buttons: subtle scale (1.03) + shadow lift. Pills: slight brightness increase. |

---

## 8. Technical Considerations

| Area | Approach |
|------|----------|
| **Stack** | Single-page React app (or vanilla HTML/CSS/JS). No backend required. |
| **Rendering** | Wheel drawn via HTML5 Canvas or SVG for crisp scaling. |
| **Randomness** | Weighted random selection computed in JS before spin; animation lands on the pre-determined segment. |
| **Persistence** | `localStorage` for state. JSON export/import for portability. |
| **Responsive** | Works on tablets and laptops (primary use: booth screen). Mobile-friendly but not the primary target. |
| **Performance** | Confetti via lightweight canvas overlay (e.g., `canvas-confetti` or custom). Keep main thread smooth during spin animation. |
| **Accessibility** | Spin button keyboard-accessible. Result announced via `aria-live` region. Sufficient colour contrast on wheel text. |
| **Font loading** | Funnel Sans loaded from Google Fonts with `font-display: swap` fallback. |

---

## 9. Edge Cases

- **All prizes depleted**: Wheel displays a "No prizes remaining" state. Spin button disabled.
- **Single prize remaining**: Wheel shows one full-circle segment. Spin still animates for the experience.
- **Very long prize names**: Truncated on wheel; full name in legend tooltip and result modal.
- **Simultaneous rapid spins**: Spin button disabled during animation; re-enabled only after modal is dismissed.
- **Page refresh mid-spin**: State saved on each decrement, so inventory is accurate. No prize is lost or double-counted.
- **Quantity edited to 0 in admin**: Prize immediately removed from wheel.
- **Weight set to 0**: Prize remains in inventory but is excluded from the wheel (functionally paused).

---

## 10. Nice-to-Have / Future

- **QR code mode**: Attendees scan a QR, spin on their own phone, show the result to claim the prize.
- **Leaderboard / stats dashboard**: Show total spins, most popular prize, time-based charts.
- **Theming**: Multiple colour/branding presets for different events.
- **Multi-device sync**: Firebase or similar for real-time sync across multiple booth screens.
- **Prize tiers**: Visual distinction (gold/silver/bronze glow) for rarity tiers.

---

## 11. Success Metrics

- **Operational**: Zero instances of awarding an out-of-stock prize during the event.
- **Engagement**: Attendees visibly delighted (qualitative). Booth traffic sustained by the interactive draw.
- **Organizer satisfaction**: Prizes can be added/edited/restocked in under 30 seconds without technical help.

---

---

## 12. Proposed Features — Throughput & Scalability

> Sourced from FoF team retrospective (Jun 8, 2026). The merch wheel was a high-demand activation at the last event, generating long queue times that created bottlenecks. These features address throughput at scale (target: 200-person events).

---

### 12.1 Multi-Screen / Multi-Instance Mode

**Problem**: A single wheel running on one screen creates a queue bottleneck at the merch table when demand is high.

**Feature**: Allow the app to run simultaneously across multiple screens or laptops, each operating as an independent spin station. Each instance reads from and writes to a shared inventory source so prize counts stay accurate across all stations.

**Requirements:**
- Each instance displays the full wheel and can accept independent spins simultaneously.
- All instances share a single live inventory state — a win on Screen A decrements the count seen on Screen B in real time.
- Admin panel accessible from any instance; changes propagate to all.
- Graceful fallback if sync is unavailable: instance operates in local mode with a sync-on-reconnect queue.

**Implementation note**: Requires moving persistence from `localStorage` to a lightweight real-time backend (e.g., Firebase Realtime Database or Supabase). Ties into the existing *Multi-device sync* nice-to-have in §10.

---

### 12.2 Multi-Prize Spin (Simultaneous Winners)

**Problem**: Running one spin at a time is slow when there's a crowd. A single attendee transaction takes 4–6 seconds of animation + modal dismissal.

**Feature**: Support a "multi-prize" spin mode where a single spin selects multiple winners at once — up to N prizes simultaneously — and displays all results in a single reveal.

**Requirements:**
- Admin can configure the number of simultaneous winners per spin (e.g., 1–5).
- The wheel animation runs once; N winning segments are highlighted at the end of the spin.
- The result modal lists all N prizes won in a single card, with individual prize rows.
- Each winning prize decrements its inventory individually; if a prize would be over-awarded (e.g., only 1 left but it's selected twice), the second win falls back to the next weighted prize.
- Multi-prize mode is opt-in per session — default remains single-winner.

---

### 12.3 Dual Merch Station Layout

**Problem**: A single physical location for the merch wheel creates a crowd clustering problem in one area of the venue.

**Feature**: Support a **two-station configuration** — two independent wheel instances set up in different areas of the room — each with its own display but drawing from the same shared inventory pool.

**Requirements:**
- Functionally identical to Multi-Screen Mode (§12.1) but with explicit two-station UX affordances.
- Each station displays a station identifier (e.g., "Station A / Station B") so organizers can direct attendees.
- Optional: Admin panel shows a per-station spin count so organizers can see traffic distribution.

**Note**: This feature is dependent on §12.1 (shared inventory sync). If real-time sync is not available, each station can run independently with manual inventory reconciliation by an organizer at end of event.

---

*Last updated: June 23, 2026*
