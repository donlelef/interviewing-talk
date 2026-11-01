# Architecture

## Structure

- **Server**: one Bun HTTP server that serves the page and a JSON API; it
  reaches data only through the store.
- **Store**: owns the SQLite database (`bun:sqlite`) and every rule about
  Questions and Upvotes; nothing else touches the database.
- **Page**: renders what the API returns and polls it; it decides nothing on
  its own.

## Tests

- **Store tests**: prove the domain rules against an in-memory database.
- **API tests**: prove the HTTP contract against a real server on a random
  port.

## Principles

- The server recognises the Attendee from the `attendee` cookie it issues;
  no request body or URL ever carries an Attendee identity, so one browser
  cannot act as another
  ([decision](decisions/0001-attendees-are-anonymous-browsers.md)).
- Every rule in [PRODUCT.md](PRODUCT.md) is enforced by the store, even when
  the page also reflects it.
