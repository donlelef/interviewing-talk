# product.md Format

`product.md` contains product memory only.

Use it to preserve what the product is, who it serves, what value it promises, how it behaves, what is in scope, and what is intentionally out of scope.

Do not store technical implementation details here.

## Structure

```md
# Product Memory

One or two sentences describing the product and why it exists.

## Users

- **User type**: What this user needs from the product.

## Value Proposition

What value the product provides, and to whom.

## Usage Modes

- How users enter, use, and return to the product.

## Functional Choices

- Product decision: rationale or implication.

## Scope

### In Scope

- Things the product is expected to support.

### Out Of Scope

- Things the product intentionally does not support.

## Product Constraints

- Privacy, trust, operational, legal, or business constraints that shape the product.

## Open Questions

- Unresolved product questions that need future clarification.
```

## Rules

- Keep this file product-only.
- Include users, value proposition, usage modes, functional behavior, scope, non-goals, constraints, and open questions.
- Do not include database choices, frameworks, API design, infrastructure, schema details, or security implementation mechanisms.
- If a decision explains what the product should do, it belongs here.
- If a decision explains how the system should be built, it belongs in an ADR.
- If a term needs a shared definition, put the definition in `glossary.md` and reference the term here.

## Example

```md
# Product Memory

The product helps companies offer employees access to a confidential psychological support desk while preserving employee trust.

## Users

- **Employee**: Requests support, books sessions, manages consent, and expects privacy from the employer.
- **HR admin**: Monitors adoption and operational availability without seeing individual clinical details.
- **Therapist**: Manages appointments and session context needed to provide care.
- **Case manager**: Coordinates support pathways when the product includes triage or escalation.

## Value Proposition

Employees get a clear, confidential path to psychological support. Companies get enough aggregate insight to understand adoption without turning the product into employee surveillance.

## Usage Modes

- Employees can self-initiate support.
- HR admins can view aggregate usage and operational health.
- Therapists can manage their own appointment workflow.

## Functional Choices

- HR visibility is limited to aggregate metrics and operational status by default.
- Individual session content is never shown to HR.
- Urgent or high-risk cases require a clarified escalation policy before implementation.

## Product Constraints

- Employee trust is a core product requirement.
- The product must not imply that HR has access to therapy content.
- Aggregate metrics should avoid exposing individuals in small groups.

## Open Questions

- Does the product include a case manager role in the first version?
- What minimum group size is required before aggregate metrics are shown?
- Is emergency escalation in scope, or does the product only provide routing to external resources?
```
