# Q&A Board

A live board where the audience of a talk asks the [Speaker](GLOSSARY.md)
questions and sees which ones the room wants answered most.

## Who uses it

- **Attendee**: asks Questions and Upvotes the ones they want answered.
- **Speaker**: reads the board to pick the next Question.

## Features

### Questions

- An Attendee can ask a Question without signing in or giving a name.
- Everyone sees every Question, and the board refreshes on its own.

### Upvotes

- An Attendee can Upvote any Question they did not ask, once.
- An Attendee can take back their Upvote by pressing it again.
- Everyone sees each Question's Upvote count, and each Attendee sees which
  Questions they Upvoted.
- The board shows the most Upvoted Questions first; between Questions with
  the same count, the one asked earlier comes first.

## How it works

An Attendee is a browser, not a person
([decision](decisions/0001-attendees-are-anonymous-browsers.md)): someone who
switches browser or clears its data counts as a new Attendee.

## Out of scope

- **Downvotes**: the board ranks what the room wants answered, not what it
  dislikes.
- **Answering, hiding, or merging Questions**: the Speaker answers out loud and
  the board does not track it yet, so Upvotes never need to move or reset.
