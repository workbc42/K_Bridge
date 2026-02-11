# Stitch Handoff: Frontend Dashboard Design Spec

Last updated: 2026-02-11
Project: K-Meal Bridge Internal Dashboard
Target: http://stitch.withgoogle.com/

## 1. Goal
- Redesign the internal operations dashboard UI/UX while keeping implementation feasible in current Next.js app.
- Focus on production-ready visual system and screen specs that can be mapped to existing routes/components.

## 2. Product Context
- Product: Delivery-assistant operations tool for foreigner food order handling.
- Primary users: Internal operators/admins handling inbound orders from chat channels.
- Current frontend state: Functional prototype with mock data and partial API wiring.
- Core workflow to optimize: Receive order -> inspect details -> move status -> monitor pipeline.

## 3. Tech Constraints (Must Respect)
- Framework: Next.js App Router (`frontend/app`)
- UI stack: React + Tailwind (global CSS classes already heavily used)
- i18n: custom dictionary utility in `frontend/lib/i18n.js` with locales `ko`, `en`
- Existing routing must remain compatible:
  - `/{locale}/dashboard`
  - `/{locale}/dashboard/orders`
  - `/{locale}/dashboard/orders/{id}`
  - `/{locale}/dashboard/customers`
  - `/{locale}/dashboard/payments`
  - `/{locale}/dashboard/analytics`
  - `/{locale}/dashboard/settings`
  - `/{locale}/(auth)/login`
- Existing global theme switch system uses `data-theme='light|dark'` on `html`.
- Existing sidebar collapsed state uses `data-sidebar='collapsed|expanded'` on `html`.

## 4. Information Architecture
- Navigation level 1:
  - Dashboard
  - Orders
  - Customers
  - Payments
  - Analytics
  - Settings
- Mobile bottom nav:
  - Dashboard
  - Orders
  - Customers
  - More (Settings)
- Utility controls in header:
  - Notifications
  - Language switcher
  - Theme toggle
  - Profile menu

## 5. Screen Inventory and Design Requirements

### 5.1 Dashboard Home (`/dashboard`)
- Purpose: Daily operations overview.
- Required blocks:
  - Header: title, subtitle, primary CTA, secondary CTA
  - Metrics row: at least 4 KPI cards
  - 4 analytical panels (chart/table placeholders now)
- Desired UX:
  - Fast scan hierarchy for "today" performance
  - Clear CTA priority

### 5.2 Orders Kanban (`/dashboard/orders`)
- Purpose: Main operational board.
- Required blocks:
  - Filter bar: search, status filter, channel filter
  - KPI strip (3 cards)
  - Channel distribution strip
  - 3 status columns: Received, Processing, Completed
  - Order cards with summary data
  - Detail modal overlay (rich context + status actions)
  - Toast notification with undo
- Critical interactions:
  - Card click opens modal
  - Status change moves card between columns
  - Undo last status change
  - ESC closes modal

### 5.3 Order Detail (`/dashboard/orders/{id}`)
- Purpose: Deep inspection of one order.
- Required blocks:
  - Summary panel (status, total, received time)
  - Customer panel (name, messenger id, channel)
  - Delivery panel (address, request)
  - Items panel
  - History panel
  - Recommendation chips

### 5.4 Customers (`/dashboard/customers`)
- Current state: Placeholder table page.
- Needed design output:
  - List/table layout template
  - Filter/search toolbar
  - Row-level quick actions
  - Empty/loading/error states

### 5.5 Payments (`/dashboard/payments`)
- Current state: Placeholder table page.
- Needed design output:
  - Settlement list/table template
  - Date range and status filter UI
  - Export/report action placement

### 5.6 Analytics (`/dashboard/analytics`)
- Current state: Placeholder chart page.
- Needed design output:
  - Chart card system for trend, cohort, category views
  - Time-range tabs and compare toggle
  - Download/report action hierarchy

### 5.7 Settings (`/dashboard/settings`)
- Current state: 3 static cards.
- Needed design output:
  - Sectioned settings layout (Profile, Notifications, Integrations, Security)
  - Inline edit patterns and save feedback patterns

### 5.8 Login (`/(auth)/login`)
- Purpose: Internal dashboard login.
- Needed design output:
  - Clear auth card with email/password
  - Error/help states
  - Optional SSO button zone (future)

## 6. Component Inventory (Reuse/Redesign)
- Layout shell:
  - `Sidebar`
  - `Header`
  - `MobileDrawer`
  - `MobileBottomNav`
- Header controls:
  - `NotificationDropdown`
  - `LanguageSwitcher`
  - `ThemeToggle`
  - `ProfileDropdown`
- Orders domain:
  - Order card
  - Status pill
  - Filter bar
  - Modal dialog
  - Toast
  - Detail list/cards/chips

## 7. Data Model Needed for UI Design

### 7.1 Order card/detail fields (already used)
- `id`
- `status` (`received|processing|completed`)
- `customer`
- `messenger`
- `address`
- `request`
- `orderDetail`
- `total`
- `time`
- `thumbTone`
- `intentTag`
- `recentSummary[]`
- `topItems[]`
- `suggestedRequests[]`
- `items[]` with `name`, `quantity`, `price`, `options?`
- `history[]` with `id`, `date`, `summary`, `total`

### 7.2 Status taxonomy
- Working status set in UI: `received`, `processing`, `completed`
- Backend-compatible extended set exists: `pending`, `processing`, `completed`, `cancelled`
- Design should tolerate optional future statuses.

## 8. Current Design Tokens (Reference)
Defined in `frontend/app/globals.css`.

- Core semantic vars:
  - `--background`, `--foreground`, `--surface`, `--surface-2`, `--surface-3`
  - `--primary`, `--accent`, `--accent-2`, `--muted`, `--border`
- Layout vars:
  - `--sidebar-width: 280px`
  - `--header-height: 64px`
- Typography:
  - Sans: Sora
  - Serif display: Newsreader

Design proposal can replace token values, but should keep semantic token architecture for easy implementation.

## 9. Responsive Behavior to Preserve
- Breakpoints currently used:
  - `>=768px`: multi-column dashboard/kanban sections
  - `>=1024px`: header search visible, detail 2-column
  - `>=1280px`: desktop sidebar visible, mobile bottom nav hidden
  - `<1280px`: mobile bottom nav active
- Required behavior:
  - Desktop: fixed sidebar + sticky top header
  - Tablet/mobile: drawer nav + bottom nav
  - All important order actions accessible on mobile without hover

## 10. Interaction and State Specs Needed from Stitch
Provide design states for each critical component.

- Buttons: default/hover/active/disabled/loading
- Inputs/selects: default/focus/error/disabled
- Dropdowns: closed/open, long content scroll
- Order card: default/hover/selected/moved animation state
- Modal: open/scrollable content/close affordances
- Toast: success/info/error + timed dismiss
- Table/list: empty/loading/error/no-results

## 11. Accessibility and Internationalization Requirements
- Contrast target: WCAG AA minimum for text and controls.
- Keyboard requirements:
  - tab traversal for all controls
  - ESC closes modal/drawer
  - visible focus ring required
- Locale behavior:
  - support Korean and English text expansion
  - avoid fixed-height text containers that clip translated strings
  - keep labels friendly for future Thai/Vietnamese/Chinese expansion

## 12. Known Issues to Consider in Design Handoff
- `frontend/messages/ko.json` currently has encoding corruption; Korean copy should be re-authored.
- Some existing components have lint-level hook/state issues; redesign should not depend on fragile mount-time side effects.
- Several pages are placeholders (customers/payments/analytics/settings), so design can define stronger baseline patterns.

## 13. Deliverables Requested from Stitch
- Global design direction and mood (1 option minimum, 2 options preferred)
- Component library spec for dashboard primitives
- High-fidelity screen specs for all routes in section 5
- Responsive variants: desktop/tablet/mobile for key screens
- State variants for components in section 10
- Handoff notes mapped to implementation classes/tokens

## 14. Implementation Mapping Guide (for engineering)
When generating design output, include mapping hints in this format:
- Screen -> route path
- Section -> existing CSS class or new semantic class name
- Token -> CSS variable name
- Component -> existing file path for replacement

Examples:
- Sidebar shell -> `frontend/components/layout/Sidebar.js`
- Header shell -> `frontend/components/layout/Header.js`
- Orders board -> `frontend/app/dashboard/orders/page.js`
- Global styles/tokens -> `frontend/app/globals.css`

## 15. Ready-to-Paste Prompt for Stitch
Use this as base prompt in stitch.withgoogle.com.

"Design an internal operations dashboard for a food-delivery order handling team. The product is K-Meal Bridge. Create a high-fidelity, implementation-ready design system and screens for desktop/tablet/mobile.

Required screens: Dashboard overview, Orders Kanban, Order detail, Customers list, Payments list, Analytics, Settings, Login.

Navigation: left sidebar on desktop, drawer + bottom nav on mobile. Include top header with search, notifications, language switcher, theme toggle, profile menu.

Orders is the core screen: 3 status columns (Received, Processing, Completed), order cards, filter bar, detail modal, and undo toast.

Need full interaction states (default, hover, active, focus, disabled, loading, empty, error). Ensure WCAG AA contrast and keyboard-friendly behavior.

Style direction: premium operations tool, warm-neutral palette with strong status signaling, clear hierarchy for rapid scanning, not generic SaaS.

Please structure output so engineers can map to Next.js + CSS variables + reusable components."

## 16. Source Files Used for This Spec
- `frontend/app/globals.css`
- `frontend/app/dashboard/layout.js`
- `frontend/app/dashboard/page.js`
- `frontend/app/dashboard/orders/page.js`
- `frontend/app/dashboard/orders/[id]/page.js`
- `frontend/app/dashboard/customers/page.js`
- `frontend/app/dashboard/payments/page.js`
- `frontend/app/dashboard/analytics/page.js`
- `frontend/app/dashboard/settings/page.js`
- `frontend/app/[locale]/(auth)/login/page.js`
- `frontend/components/layout/Sidebar.js`
- `frontend/components/layout/Header.js`
- `frontend/components/layout/MobileDrawer.js`
- `frontend/components/layout/MobileBottomNav.js`
- `frontend/components/layout/LanguageSwitcher.js`
- `frontend/components/layout/ThemeToggle.js`
- `frontend/components/layout/NotificationDropdown.js`
- `frontend/components/layout/ProfileDropdown.js`
- `frontend/lib/i18n.js`
- `frontend/lib/mockOrders.js`
- `frontend/messages/en.json`

