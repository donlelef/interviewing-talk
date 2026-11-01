# Attendees are anonymous browsers

## Context

Upvotes need "one per Attendee" to mean something, and Attendees must not be
able to Upvote their own Question. The board is used live in a room, where any
sign-in step would cost most of the audience before the first Question.

## Solution

An Attendee is a browser. The server gives each browser a random,
long-lived `attendee` cookie on its first request and links every Question and
Upvote to it. The room is friendly, so the limits only need to stop accidents
and casual double-clicking, not someone set on cheating.

## Considered Alternatives

- **Sign-in**: makes limits real, but kills participation in a live room.
  Worth revisiting if the board is used for anything with stakes, such as
  polls that decide something.
- **Nickname per Attendee**: adds a step without making limits any stronger,
  and invites names nobody wants on a projected screen.
- **IP address**: a whole venue often shares one, so it would merge the room
  into a single Attendee.

## Consequences

- A new browser, a private window, or cleared site data is a new Attendee, who
  can Upvote again.
- Nothing about a person is stored, so there is no personal data to protect.
