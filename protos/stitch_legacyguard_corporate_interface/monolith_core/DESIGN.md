# Design System Strategy: Institutional Elegance

## 1. Overview & Creative North Star
**Creative North Star: "The Sovereign Ledger"**

This design system moves away from the "startup-friendly" aesthetic of rounded bubbles and vibrant gradients. Instead, it embraces the weight of institutional authority. It is designed to feel like a high-end digital white paper or a sovereign financial report—immovable, precise, and meticulously organized.

The "Sovereign Ledger" breaks the generic grid through **intentional asymmetry** and **editorial pacing**. We utilize expansive white space (the "buffer of trust") to separate complex audit data, ensuring that "bureaucratic" never means "cluttered." By leveraging extreme typographic scale—pairing oversized, authoritative headlines with tiny, precise labels—we create a sense of hierarchy that feels both modern and deeply established.

---

## 2. Colors
Our palette is rooted in the reliability of the "Slate" and "Navy" spectrums. It is designed to be high-contrast for accessibility while maintaining a sophisticated, tonal depth.

*   **Primary (`#565e74`) & Secondary (`#526074`):** These muted navies provide the institutional anchor. Use them for primary actions and structural emphasis.
*   **The "No-Line" Rule:** To achieve a premium, editorial feel, designers are **prohibited from using 1px solid borders** to define sections. Layout boundaries must be established through background shifts. For example, a `surface-container-low` (`#f0f4f7`) sidebar should sit flush against a `surface` (`#f7f9fb`) main content area.
*   **Surface Hierarchy & Nesting:** Use the `surface-container` tiers (Lowest to Highest) to create structural meaning. 
    *   *Base:* `surface` (`#f7f9fb`)
    *   *Content Areas:* `surface-container-lowest` (`#ffffff`)
    *   *Inset Elements:* `surface-container-high` (`#e1e9ee`)
*   **The "Glass & Gradient" Rule:** While the brand is "boring," it must not feel "flat." Use Glassmorphism for floating navigation or modal overlays using `surface` colors at 80% opacity with a `20px` backdrop blur. For primary CTAs, a subtle linear gradient from `primary` (`#565e74`) to `primary_dim` (`#4a5268`) adds a "pressed-ink" quality that feels expensive and permanent.

---

## 3. Typography
We utilize **Inter** across the entire system. Its neutral, technical DNA reinforces the feeling of an automated, highly reliable audit system.

*   **Display (lg/md/sm):** Used for high-level data summaries or section headers. These should be set with tight letter spacing (-0.02em) to feel like a monolithic block of text.
*   **Headline & Title:** Use `headline-lg` (`2rem`) for page titles to establish immediate authority.
*   **Body (lg/md/sm):** Set in `on-surface` (`#2a3439`). Ensure line heights are generous (1.6x) to maintain the editorial "breathing room."
*   **Labels (md/sm):** These are the "bureaucratic" workhorses. Use `label-md` in `outline` (`#717c82`) for metadata, audit timestamps, and field captions. This high-contrast difference between Display and Label typography conveys professional precision.

---

## 4. Elevation & Depth
Depth is achieved through **Tonal Layering**, mimicking the stacking of physical archival folders rather than digital "objects."

*   **The Layering Principle:** Place a `surface-container-lowest` (#ffffff) card on a `surface-container-low` (#f0f4f7) background. This creates a "soft lift" that guides the eye without the visual noise of shadows.
*   **Ambient Shadows:** If an element must float (e.g., a dropdown or modal), use an ultra-diffused shadow: `box-shadow: 0 12px 40px rgba(42, 52, 57, 0.06);`. The shadow color is a 6% tint of our `on-surface` token, ensuring it feels like natural ambient light in a sterile environment.
*   **The "Ghost Border" Fallback:** Where accessibility requires a container boundary, use a "Ghost Border." Apply the `outline-variant` (`#a9b4b9`) at **15% opacity**. This provides a guide for the eye without breaking the "No-Line" Rule.

---

## 5. Components

### Buttons
*   **Primary:** Background: `primary` (#565e74); Text: `on-primary` (#f7f7ff). Use `md` (0.375rem) roundedness for a slightly softened but still architectural feel.
*   **Secondary:** Background: `surface-container-high` (#e1e9ee); Text: `on-surface` (#2a3439).
*   **Tertiary:** No background. `label-md` styling with `on-primary-fixed` (#373f54) color.

### Input Fields
*   **Standard:** A background of `surface-container-lowest` (#ffffff) with a 1px "Ghost Border" (15% `outline-variant`). On focus, the border opacity increases to 100% using the `primary` token.
*   **Error State:** Use the `error` token (#9f403d) for text and a `error_container` (#fe8983) background at 10% opacity for the input field.

### Cards & Lists
*   **The No-Divider Rule:** Never use horizontal rules to separate list items. Use vertical white space (16px–24px) or a subtle hover state shift to `surface-container-highest` (#d9e4ea).
*   **Audit Cards:** Use a `surface-container-lowest` base. Headers should be `title-sm` with a background of `surface-container-low` to create a "tabbed document" look.

### Specialist Component: The "Audit Status Ribbon"
For risk mitigation levels, use vertical ribbons (4px wide) on the left edge of cards rather than icons. 
*   Critical: `error` (#9f403d)
*   Stable: `primary` (#565e74)
*   Pending: `secondary_fixed_dim` (#c7d5ed)

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical layouts (e.g., a wide 8-column main area paired with a 3-column metadata sidebar) to create an editorial feel.
*   **Do** favor "Over-Communication": Use `label-sm` text to explain *why* a risk is flagged, maintaining the bureaucratic persona.
*   **Do** use `surface-dim` (#cfdce3) for large, non-interactive background areas to reduce eye strain during long audit sessions.

### Don't
*   **Don't** use "vibrant" colors. If a status isn't an error, it should be a shade of navy or slate.
*   **Don't** use `full` roundedness (pills) for anything other than high-priority notification badges. It breaks the institutional rigidity.
*   **Don't** use standard "drop shadows" on cards. Rely on the Tonal Layering Principle to define the layout.
*   **Don't** use flashy transitions. If an element appears, it should settle into place with a simple, short "fade-in" (200ms) or no animation at all.