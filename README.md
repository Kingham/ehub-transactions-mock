# ehub-transactions-mock

Static SvelteKit mockup of the openECX eHub "All Transactions" list and a transaction detail view. Intended as a visual replica to tweak as a design prototype.

## Routes

- `/transactions` — All Transactions list page
- `/transactions/[id]` — Sales invoice detail page (click any transaction number)
- `/fraud` — Placeholder for the new **Fraud** menu item

## Run

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually <http://localhost:5173>).

## Notes

- All data is static — see `src/lib/data.js`.
- The new **Fraud** menu item sits under the **Transactions** header in the sidebar (tagged "NEW" so it stands out).
- Component entry points:
  - `src/lib/components/Sidebar.svelte` — left navigation
  - `src/routes/+layout.svelte` — shell
  - `src/routes/transactions/+page.svelte` — list page
  - `src/routes/transactions/[id]/+page.svelte` — detail page
