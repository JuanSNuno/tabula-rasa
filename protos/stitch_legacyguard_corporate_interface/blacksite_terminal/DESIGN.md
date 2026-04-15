# Design System Document: The Kinetic Dossier

## 1. Overview & Creative North Star
The visual direction of this design system is defined by the **"Kinetic Dossier"**—a Creative North Star that prioritizes cold, functional utility over aesthetic ornamentation. This is a system for a clandestine extraction portal where information is high-stakes and time-sensitive. 

The aesthetic is **Hyper-Brutalist Terminal**. We are moving away from the "approachable" web. There are no soft corners, no comforting shadows, and no decorative fluff. We achieve a premium, high-end editorial feel through extreme precision, intentional asymmetry, and a dense "data-first" hierarchy. By rejecting standard UI patterns like rounded corners and depth-giving shadows, we create a sense of urgent, unvarnished truth. The UI doesn't just display data; it *is* the mission.

## 2. Colors
Our palette is rooted in absolute darkness. We utilize the contrast between the void and sharp, technical highlights to guide the user's eye.

### Surface Hierarchy & Nesting
Instead of using lines to separate thoughts, we use the **Surface Tiering** method. This creates a "nested" technical depth that mimics stacked hardware modules.
- **Base Layer:** `surface` (#131315) or `surface_container_lowest` (#0e0e10). This is the foundation of the portal.
- **Information Blocks:** Use `surface_container_low` (#1c1b1d) to define primary content areas. 
- **Active Modules:** Nest a `surface_container_high` (#2a2a2c) element within a lower tier to indicate a higher level of "system focus."

### The "No-Line" Rule (Refined)
While the prompt allows for zinc-800 borders, use them sparingly as "structural cages" rather than separators. Prohibit 1px solid borders for sectioning. Boundaries must be defined through background color shifts. For example, a data grid sits on `surface_container_low` against a `surface` background. The change in tone is the boundary.

### Signature Textures
To add "soul" to the brutalist layout, main action areas (like the primary extraction trigger) should utilize a subtle vertical gradient transitioning from `primary` (#ffffff) to `primary_container` (#d4d3dd). This creates a "light-bar" effect reminiscent of high-end hardware displays.

## 3. Typography
Typography is our primary tool for storytelling. Per the technical requirements, we use a **Strictly Monospace** font (JetBrains Mono or Fira Code) across all scales to maintain the terminal integrity, mapped to the following hierarchy:

- **Display (3.5rem - 2.25rem):** Used for critical status codes or "Target Acquired" alerts. These should be set in `on_background` (#e5e1e4) with tight letter-spacing.
- **Headlines (2rem - 1.5rem):** Sector identifiers. Use these to anchor the corners of the viewport, often utilizing asymmetrical placement.
- **Title (1.375rem - 1rem):** Used for data category headers.
- **Body (1rem - 0.75rem):** The workhorse for technical readouts. Use `on_surface_variant` (#c6c6c6) for general logs and `on_background` (#e5e1e4) for active mission parameters.
- **Labels (0.75rem - 0.6875rem):** Used for metadata, timestamps, and "last seen" indicators. These should be dimmed using `on_surface_variant` at 70% opacity.

The hierarchy communicates authority: the larger and brighter the text, the more critical it is to the extraction.

## 4. Elevation & Depth
In the Kinetic Dossier, "Elevation" does not exist in 3D space—it exists in **Tonal Layering**.

### The Layering Principle
Depth is achieved by stacking. A floating tactical map shouldn't have a shadow; it should be rendered on `surface_container_highest` (#353437) to physically "lift" it out of the background void. 

### The "Ghost Border" Fallback
If a visual container requires a border for accessibility, use a **Ghost Border**. Apply `outline_variant` (#474747) at 20% opacity. This maintains the brutalist edge without introducing the "clutter" of high-contrast lines.

### Glassmorphism & Terminal Glow
For floating "System Overlays" (e.g., emergency overrides), use a semi-transparent `surface_container` with a `backdrop-blur` of 8px. This creates a "frosted terminal" effect, allowing the dense data beneath to bleed through, maintaining the user's situational awareness.

## 5. Components

### Buttons (Action Triggers)
- **Primary:** `on_primary_container` (#000000) text on `primary` (#ffffff) background. 0px radius. Hover state: swap to `tertiary` (#ffdeac) for a low-glow amber warning.
- **Secondary:** Transparent background with a `primary` 1px ghost border. 
- **Tertiary (Danger/Emergency):** `on_error_container` (#ffdad6) text on `error_container` (#93000a) background.

### Chips (Status Indicators)
- **Selection Chips:** No rounded corners. Use a `surface_container_high` background.
- **Status Alerts:** Use `tertiary` (#ffdeac) for low-glow amber (Warning) or `tertiary_container` (#c08600) for "Operational" terminal green. Text is always uppercase.

### Input Fields
- **Style:** Underline only (using `outline_variant`) or a full box with 0px radius.
- **Focus State:** Background shifts to `surface_container_highest`. No glow. The cursor should be a solid block, mimicking a terminal prompt.

### Cards & Lists
Forbid divider lines. Use vertical white space (8px, 16px, or 32px increments) to separate log entries. In dense technical lists, alternate the background between `surface` and `surface_container_low` for readability.

### Custom Component: The "Data Scrubber"
A horizontal scroll component used for timeline extractions. Use `outline` (#919191) for the axis and `primary` (#ffffff) for the "playhead."

## 6. Do's and Don'ts

### Do:
- **Embrace Density:** Fill the screen with technical readouts. If there is empty space, fill it with a timestamp or a non-interactive "System Heartbeat" log.
- **Use Intentional Asymmetry:** Align headings to the far left and metadata to the far right. Break the "centered" layout pattern.
- **Prioritize Readability:** Ensure all monospace text meets WCAG AA contrast ratios against the absolute black background.

### Don't:
- **No Border Radius:** If it's not a square or a rectangle, it doesn't belong in this system.
- **No Icons:** Use text-based icons (e.g., `[X]` instead of a close icon, `->` instead of an arrow) to maintain the "clandestine terminal" feel.
- **No Shadows:** Shadows imply a light source. This portal exists in the dark. Use tonal shifts for hierarchy only.
- **No Decorations:** If a pixel doesn't convey data, delete it.