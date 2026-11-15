# Highlight — TODO / Backlog

_Last updated: 2026-11-14_

## Geolocation / map UX

- [ ] **Ask for / recover location more gracefully (home map + event modal)**
  - `MapComponent.loadMap()` already calls `navigator.geolocation.getCurrentPosition()`, but silently falls back to Dublin (`53.3498, -6.2603`, zoom 12) when permission is denied or location lookup fails.
  - Add a **"Use my location"** control so the user can retry after granting permission.
  - Show a non-blocking notice when the fallback is in use, e.g. "Location unavailable — showing Dublin".
  - Pass `timeout` / `maximumAge` options so a slow GPS fix doesn't leave the map blank.
  - Consider a wider Ireland default (or last-known location) instead of Dublin city centre.
  - Files: `src/app/common/map/map.component.ts`, `src/app/common/map/map.component.html`, `src/app/common/event/event-modal/event-modal.component.ts`.

## Past events / gig history

- [x] **Decide product behaviour:** keep past gigs as a read-only history rather than deleting them.
- [x] **API:** add `scope=upcoming|past|all` (plus pagination) to `GET /busker/getEvents`.
  - Upcoming sorts by `startAt ASC`; past sorts by `startAt DESC`.
  - `GET /open/busker/{id}/upcomingEvents` now uses the same scoped query instead of filtering in memory.
- [x] **UI:** remove finished gigs from the busker and user dashboards. Both now request `scope=upcoming` and filter defensively client-side.
- [x] **Gig archive:** `Settings → Busker → Gig archive` lists all past gigs, grouped by year, newest first, with "Load more" pagination. Visible to buskers only.
- [ ] **API:** user-owned events on the user page should use a user-scoped endpoint, not `/busker/getEvents` (a plain `USER` role currently gets `403`).
- [ ] **DB:** add indexes on `event(user_id, end_at, start_at)` for the scoped archive queries.
- [ ] **Cleanup:** delete `event_follow` rows when an event is deleted (orphan rows today).
- [ ] **Optional:** busker stats derived from history — gigs played, cities played, etc.

## Settings page

- [x] Scaffold `/settings` page (profile, account/password, preferences placeholder, logout).
- [x] Add route with `canActivateLoggedIn` and a Settings link in the nav.
- [x] Rebuild `/settings` as a **list of categories** with a detail view per category.
- [x] Categories: Profile, Account & Security, Events & Calendar, Busker, Notifications, Privacy, Preferences, Admin (admins only), Session & Danger Zone.
- [x] Wire up avatar upload in settings.
- [x] Add "Resend verification email" for unverified accounts.
- [x] Move the busker-role toggle from Profile into the Busker category.
- [x] Add a private **Gig archive** category for buskers (past gigs grouped by year, paginated).
- [ ] Wire up photo positioning (offset/zoom) in settings (currently only in the profile modal).
- [ ] Add real preference controls as features land (notifications, visibility, past-gig history).
- [ ] Add account deletion / data export if required.
- [ ] Consider extracting shared profile/password forms so settings and the profile modal don't duplicate code.

## Auth

- [x] **Remember me:** login page checkbox keeps the session for 30 days (persistent cookie + JWT) and saves the email address on the device so it is prefilled next time. Unchecked keeps the existing 1-day session and clears the saved email.
- [ ] **Session revocation:** long-lived JWTs cannot be revoked before expiry; consider refresh tokens or a token version if "log out everywhere" is needed.

## Smaller fixes

- [ ] **Forgot Password page lies on error:** `forgot-password.component.ts` sets `submitted = true` in its `catch`, so it shows "reset link is on its way" even when the API call fails.
- [ ] **Bootstrap admin role:** `admin@highlight.ie` is created as `USER` only because `registerUser` filters out `ADMIN`; decide how the initial admin should receive the `ADMIN` role.
