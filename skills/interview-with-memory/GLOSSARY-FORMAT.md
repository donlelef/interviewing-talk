# glossary.md Format

`glossary.md` contains domain language only.

Use it to define the product's domain terms so future agents and contributors use the same words consistently.

Do not store technical vocabulary or architecture notes here.

## Structure

```md
# Glossary

One or two sentences describing the domain language covered by this glossary.

## Terms

**Preferred Term**:
A one or two sentence definition of what the term means in this product.
_Avoid_: Ambiguous term, misleading synonym, overloaded word
```

Group terms under subheadings when useful.

## Rules

- Be opinionated. Pick one preferred term when multiple words could describe the same concept.
- Keep definitions tight: one or two sentences.
- Define what the term is, not how it is implemented.
- Include only product and domain terms.
- Exclude programming concepts, database terms, API terms, infrastructure terms, and architecture patterns.
- Use `_Avoid_` to prevent ambiguous or misleading language from spreading.

Before adding a term, ask:

> Is this a concept specific to this product domain, or a general technical concept?

Only domain concepts belong here.

## Example

```md
# Glossary

Shared domain language for an employee psychological support desk product.

## People And Roles

**Employee**:
A person working for a company who can request psychological support through the product.
_Avoid_: Patient, user, worker

**HR Admin**:
A company-side user who manages access and views permitted operational or aggregate information.
_Avoid_: Employer, manager, supervisor

**Therapist**:
A qualified professional who provides psychological support sessions.
_Avoid_: Coach, operator, consultant

**Case Manager**:
A role that coordinates support pathways, triage, or escalation when the product includes that workflow.
_Avoid_: Admin, therapist assistant

## Support Concepts

**Psychological Support Desk**:
The product-supported service through which employees request and receive access to psychological support.
_Avoid_: Helpdesk, clinic, therapy app

**Session**:
A scheduled meeting between an employee and a therapist.
_Avoid_: Appointment, ticket, consultation

**Consent**:
The employee's explicit agreement for a specific use of their personal or support-related information.
_Avoid_: Acceptance, approval

**Aggregate Metric**:
A measurement reported across a group large enough to avoid identifying a specific employee.
_Avoid_: HR insight, employee metric, usage detail

**Urgent Case**:
A support request or situation that may require immediate attention or escalation outside the normal booking flow.
_Avoid_: Emergency, incident, critical ticket
```
