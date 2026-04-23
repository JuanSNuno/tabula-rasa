# Coding Conventions

**Analysis Date:** 2026-04-22

## Naming Patterns

**Files:**
- Components: PascalCase `[Name].tsx` (e.g., `Dashboard.tsx`, `Home.tsx`)
- Contexts: PascalCase with Context suffix (e.g., `SecurityModeContext.tsx`)
- App Router: Next.js standard lowercase (e.g., `page.tsx`, `layout.tsx`)

**Functions:**
- React Components: PascalCase for export default functions

**Variables:**
- State: camelCase (e.g., `view`, `isClandestine`)
- Setters: camelCase with `set` prefix (e.g., `setView`)

**Types:**
- TypeScript inline interfaces/types generally used, lacking specific type files currently.

## Code Style

**Formatting:**
- Prettier/ESLint not explicitly configured in root or frontend yet, though `next lint` is present in `package.json`.
- Indentation: 2 spaces.
- Quotes: Single quotes for strings (`'home'`), double quotes for directives (`"use client"`).

## Import Organization

**Order:**
1. React/External modules (`import React, { useState } from 'react';`)
2. Contexts (`import { useSecurityMode } from '../context/SecurityModeContext';`)
3. Components (`import FacadeHome from '../components/facade/Home';`)

**Path Aliases:**
- Relative paths are used (e.g., `../components/...`). No `@/` aliases currently active or consistently used in source files.

## Error Handling

**Patterns:**
- Standard React error boundaries not yet implemented. Simple conditional rendering based on state.

## Function Design

**Size:** Small, focused component functions.

**Parameters:** Props passed directly to components.

**Return Values:** React Fragments `<> ... </>` or JSX elements conditionally returned.

## Module Design

**Exports:** 
- Default exports for Next.js pages (`export default function Page()`)
- Specific exports not yet generalized via barrel files.

---

*Convention analysis: 2026-04-22*
