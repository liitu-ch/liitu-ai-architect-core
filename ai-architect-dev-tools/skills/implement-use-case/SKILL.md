---
name: implement-use-case
description: >
  Creates a structured implementation plan for a use case by scanning the
  codebase, cross-referencing requirements and business rules, collecting user
  input, and writing a living plan document with traceability and ordered tasks.
  Use when the user asks to "implement a use case", "plan the implementation of
  UC-XXX", "help me implement UC-XXX", "what's missing for UC-XXX", "create an
  implementation plan", or references a use case ID (UC-*) and asks about
  implementation, missing pieces, or next steps.
---

# Implement Use Case

Create a structured implementation plan for the use case specified in $ARGUMENTS. The plan lives at `docs/implementation/$ARGUMENTS/plan.md` and serves as a living progress document — checkboxes in the plan are updated as work proceeds.

## DO NOT

- Skip reading the use case spec or requirements before asking the user questions
- Skip the codebase scan — do not rely solely on what the user tells you
- Omit the NFR check — non-functional requirements are as binding as functional ones
- Write implementation code during this skill — the output is a plan document only
- Mark plan checkboxes as done during planning — they start unchecked
- Proceed if `docs/use_cases/$ARGUMENTS.md` does not exist — stop and report the missing file

## Workflow

### Step 1: Set up progress tracking

Use TodoWrite to create tasks for each remaining step:

- Read source artifacts
- Scan codebase for existing implementation
- Ask user about current state and gaps
- Cross-reference FRs, BRs, and NFRs
- Perform gap analysis
- Write plan to `docs/implementation/$ARGUMENTS/plan.md`
- Quality check

### Step 2: Read source artifacts

Read these four documents. If any is missing, note it — the plan will flag it, but do not stop unless the use case spec itself is absent.

1. `docs/use_cases/$ARGUMENTS.md` — **required.** UC ID, primary actor, goal, preconditions, main success scenario, alternative flows, postconditions, business rules (BR-XXX). If this file does not exist, stop and tell the user: "`docs/use_cases/$ARGUMENTS.md` not found. Please create the use case spec first using the `use-case-spec` skill."
2. `docs/requirements.md` — requirements catalog (FR-XXX, NFR-XXX, C-XXX tables). Note if absent.
3. `docs/use_cases.md` — use case diagram (to see related UCs and actor relationships). Note if absent.
4. `docs/entity_model.md` — entity model (to understand the data structures involved). Note if absent.

Mark this todo done.

### Step 3: Scan the codebase

Search the codebase for evidence of existing implementation related to this use case. Derive search terms from the use case name, goal, primary actor, and key nouns in the main success scenario steps. Do not just search for the UC ID string.

Apply these search strategies:

- **API routes / endpoint handlers** — search for HTTP method + noun from the use case goal (e.g., `POST.*reservation`, `createReservation`)
- **Components or views** — search for component names derived from the use case name
- **Service or function names** — match the use case's main action (e.g., `processPayment`, `submitOrder`)
- **Data model references** — search for entity names named in the use case steps
- **Business rule enforcement** — search for BR identifiers or the rule's key condition expressed in code

For each finding, record:

- File path
- What was found (route, function, component, validation, etc.)
- Which step(s) of the main success scenario it appears to cover

Note which main success scenario steps have no matching code.

Mark this todo done.

### Step 4: Ask the user two questions

Present your codebase scan findings briefly, then ask:

> Based on my scan of the codebase, I found the following already implemented:
>
> [list findings from Step 3, or "Nothing found matching this use case."]
>
> Before I write the plan, I have two questions:
>
> **1. What do you see as already implemented?**
> You may have seen something in a screenshot, know about recent work, or have context I can't see in the code.
>
> **2. What have you already identified as missing?**
> List any gaps, broken flows, or unimplemented pieces you're aware of.

Wait for the user's answers before continuing. If the user says "nothing" or skips a question, continue with what you have.

Mark this todo done.

### Step 5: Cross-reference requirements and business rules

Using `docs/requirements.md` and the use case spec, build a traceability mapping.

**Functional Requirements:**
For each FR in `docs/requirements.md`, decide if it is addressed by this use case — include it if its user story goal or role matches the use case goal or actor. For each matched FR, assess coverage using findings from Steps 3 and 4:

- Evidence of complete implementation → `Implemented`
- Partially covered or inconsistent → `Partial`
- No evidence of implementation → `Missing`

**Business Rules:**
For each BR listed in the use case spec, assess:

- Code enforcing this rule found in Steps 3 or 4 → `Implemented`
- Enforcement partial or inconsistent → `Partial`
- No evidence of enforcement → `Missing`

**Non-Functional Requirements:**
Review all NFRs in `docs/requirements.md`. Flag any NFR that plausibly applies to this use case based on what it does (e.g., a payment flow is relevant to Security and Performance NFRs; a search feature is relevant to Performance and Usability NFRs). For each relevant NFR, note whether the implementation evidence suggests it is addressed.

Mark this todo done.

### Step 6: Gap analysis

Merge findings from Step 3, user input from Step 4, and cross-reference results from Step 5 into a unified list of missing pieces. Deduplicate: if the same gap appears in multiple sources, list it once and note all sources.

For each gap, capture:

- What is missing (specific behavior, validation, API route, UI element, etc.)
- Which requirement(s) or business rule(s) it relates to
- Source(s): `Automated` / `User` / `Cross-reference`

Mark this todo done.

### Step 7: Write the plan

Create `docs/implementation/$ARGUMENTS/plan.md` using this exact structure:

```markdown
# Implementation Plan: [UC ID] — [Use Case Name]

|                   |              |
| ----------------- | ------------ |
| **Primary Actor** | [from spec]  |
| **Goal**          | [from spec]  |
| **Plan created**  | [YYYY-MM-DD] |
| **Status**        | In Progress  |

## Overview

[2–4 sentences summarising what this use case covers, what the actor accomplishes, and why it matters. Derived from the use case spec — not invented.]

## Related Use Cases

[List related UCs found in docs/use_cases.md — UC ID and name. If none: "None identified."]

---

## Requirements & Business Rules Traceability

### Functional Requirements

| ID     | Title | User Story (summary) | Status                          | Notes |
| ------ | ----- | -------------------- | ------------------------------- | ----- |
| FR-XXX | ...   | As a ...             | Implemented / Partial / Missing | ...   |

### Business Rules

| ID     | Rule | Status                          | Notes |
| ------ | ---- | ------------------------------- | ----- |
| BR-XXX | ...  | Implemented / Partial / Missing | ...   |

### Non-Functional Requirements

| ID      | Title | Category                     | Applies?       | Notes |
| ------- | ----- | ---------------------------- | -------------- | ----- |
| NFR-XXX | ...   | Performance / Security / ... | Yes / Possibly | ...   |

---

## Current State

What is already implemented (based on codebase scan and user input):

- `[file path]`: [what it covers — which step(s) of the main success scenario]

[If nothing is implemented: "No existing implementation found for this use case."]

---

## Missing Pieces

| #   | What is Missing | Related Requirements | Source                             |
| --- | --------------- | -------------------- | ---------------------------------- |
| 1   | ...             | FR-XXX, BR-XXX       | Automated / User / Cross-reference |

---

## Implementation Tasks

Ordered checklist — work through these in sequence; earlier tasks often unblock later ones.

- [ ] 1. [First task — typically the data layer or foundational piece]
- [ ] 2. [Second task]
- [ ] N. Update use case status in `docs/use_cases/$ARGUMENTS.md` to `Implemented`

> Check off each task as you complete it. Update **Status** above from `In Progress` to `Done` when all tasks are checked.

---

## Open Questions & Risks

| #   | Question / Risk | Impact              | Owner                         |
| --- | --------------- | ------------------- | ----------------------------- |
| 1   | ...             | High / Medium / Low | Dev / Architect / Stakeholder |

[If none: "No open questions identified."]

---

## Progress Log

| Date         | Update       |
| ------------ | ------------ |
| [YYYY-MM-DD] | Plan created |
```

Mark this todo done.

### Step 8: Quality check

Verify before finishing:

- [ ] Overview section accurately reflects the use case spec
- [ ] All BRs from the use case spec appear in the traceability table
- [ ] All FRs that match this use case appear in the traceability table
- [ ] At least one NFR was evaluated (even if the answer is "not applicable")
- [ ] Every missing piece in the Missing Pieces table maps to at least one requirement ID
- [ ] Implementation Tasks are numbered and ordered (foundational work first)
- [ ] No task is vague — each describes a concrete deliverable
- [ ] Plan was written to `docs/implementation/$ARGUMENTS/plan.md`
- [ ] All TodoWrite tasks are marked done

Fix any failing check before finishing.

## Output

`docs/implementation/$ARGUMENTS/plan.md`

The plan is a living document. As implementation proceeds, check off tasks and append entries to the Progress Log. When all tasks are checked, update the use case status in `docs/use_cases/$ARGUMENTS.md` to `Implemented`.
