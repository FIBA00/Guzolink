# Guzolink Design Directions

## Three Initial Approaches

### 1. Market Ledger

**Very Brief Intro:** A warm editorial marketplace inspired by a merchant’s product ledger and a well-curated local market. It emphasizes trust, provenance, and practical commerce without looking corporate.

**Probability:** 0.07

### 2. Neighbourhood Noticeboard

**Very Brief Intro:** A friendly community bulletin-board system using paper-like materials, pinned artifacts, and approachable human details. It presents discovery as an exchange between nearby people.

**Probability:** 0.04

### 3. Bazaar Signal

**Very Brief Intro:** A dark, high-contrast digital bazaar with lit product signals and fast-scanning inventory views. The visual energy supports dense catalog browsing and merchant operations.

**Probability:** 0.09

---

# Chosen Direction: Market Ledger

## Design Movement

**Editorial mercantile modernism.** Guzolink takes cues from independent print catalogues, recordkeeping ephemera, and contemporary African retail packaging rather than generic marketplace dashboards. It uses structured type, tactile surfaces, and calibrated warmth to make local commerce feel organised and personal.

## Core Principles

1. **Merchant provenance is visible.** Shops, locations, categories, and fulfilment cues are treated as first-class shopping information rather than metadata hidden below the fold.
2. **Discover by browsing, not only searching.** Pages lead with editorial product groupings, deliberately varied card scales, and recognisable category marks.
3. **Utility keeps the warmth disciplined.** Controls, data tables, forms, prices, and status states remain exceptionally clear and operational.
4. **Responsive hierarchy is not compressed desktop.** Small screens use stacked editorial modules and bottom-aware actions; dashboard tables transform into concise order cards.

## Color Philosophy

The core canvas is **warm parchment** and oat rather than clinical white, communicating familiarity and dependable local trade. Ink-black typography introduces ledger-like clarity. **Guzol Ochre** is the ownable energy color: it marks actions, active selections, price emphasis, and key status signals. Moss green and faded clay appear sparingly to distinguish operational success and rich product categories. Dark photography is never used behind copy without a grounded contrast layer.

## Layout Paradigm

Public pages use a **catalogue spread**: a narrow vertical discovery rail or contextual metadata strip at larger sizes, paired with an asymmetric content field where key product stories receive more space than routine listings. Merchant screens use a left operational spine with content arranged as a practical workspace rather than a tiled dashboard. Mobile converts both structures into a clear linear reading path with a persistent primary action when necessary.

## Signature Elements

1. **Ledger labels:** small all-caps metadata paired with a hairline rule, used for sections, shop provenance, and data labels.
2. **Stamped category discs:** compact, hand-stamp-inspired circular category marks with a simple line icon and a single warm tint.
3. **Corner registration marks:** restrained square or L-shaped marks at hero and dashboard panel corners to imply organised records and selection.

## Interaction Philosophy

Interaction should feel direct and transactional. Buttons use decisive color fills, strong focus outlines, and a compact pressed state. Product cards lift only slightly, reveal a quick-add affordance on hover-capable screens, and remain fully actionable through visible controls on mobile. Filters communicate active state through a colored rule and stamp-like mark, never only color. Toasts are concise, anchored to the lower interface, and explain the next useful action.

## Animation

Motion is quiet and functional. Major route sections may fade and rise by a maximum of 8px over 180–240ms with an ease-out curve; card groups can enter with a 40ms stagger. Hover states use transform and opacity only, with no decorative looping effects. Drawers, dialogs, and toasts appear at 200–280ms and respect `prefers-reduced-motion`. Buttons scale to 0.97 on press and return quickly.

## Typography System

**DM Serif Display** provides the editorial display voice for large public headings and selected merchant metrics. **Manrope** handles all body copy, navigation, controls, tables, and prices because it stays legible at compact operational sizes. Ledger labels use Manrope at 11–12px, 700 weight, uppercase, and tracked letterspacing. Display text is never used for long paragraphs or tables.

## Brand Essence

**Guzolink is the trusted local commerce fieldbook for merchants who want a shopfront that can travel.** Personality: **grounded, capable, connective**.

## Brand Voice

Headlines are specific, commerce-led, and quietly confident. CTAs use direct verbs and name the resulting action. Microcopy explains states without apology or jargon.

> “Find the good stuff, close to home.”

> “Put your shop where your customers already look.”

## Wordmark & Logo

The logo mark is a **linked market tile**: two offset ochre arches/interlocking links that create a compact, recognisable `G`-like loop without text. The accompanying wordmark pairs a precise Manrope letterform with a subtle custom ligature between the final letters when displayed in the interface.

## Signature Brand Color

**Guzol Ochre — `#D68A21`**. This is the brand’s unmistakable connective signal and should never be diluted into a generic yellow or gold gradient.

## Style Decisions

- The linked Guzol Ochre market-tile symbol is the primary recognisable mark in every public header, footer, and merchant workspace entry point, paired with a visibly customised Manrope wordmark.
- Every major route carries at least one non-generic Market Ledger device beyond the standard label system: registration corners, stamped category discs, or a merchant/provenance strip.
- Commerce imagery favours local material texture, merchant making, market surfaces, packaging, and place cues over generic studio lifestyle scenes.
