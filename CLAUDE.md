# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Claude Code plugin marketplace** called `liitu-ai-architect-marketplace`. It distributes two plugins:

- **`ai-architect-core`** — a stack-agnostic requirements engineering and system modeling toolkit with skills for
  creating requirements catalogs, entity models, use case diagrams, and use case specifications.
- **`ai-architect-testing`** — a testing toolkit with skills for creating Playwright E2E tests, Vitest unit tests,
  and manual test plans.

## Repository Structure

The repo has three layers:

- **Root level** — marketplace configuration (`.claude-plugin/marketplace.json`)
- **`ai-architect-core/`** — the core plugin, containing its own `.claude-plugin/plugin.json`, `.mcp.json`, and
  `skills/` directory
- **`ai-architect-testing/`** — the testing plugin, containing its own `.claude-plugin/plugin.json` and `skills/`
  directory

Skills live in `<plugin>/skills/<skill-name>/SKILL.md`. Some skills have supporting files:

- `ai-architect-core/skills/requirements/REFERENCE.md` — ID prefixes, priority levels, status values, NFR/constraint categories
- `ai-architect-core/skills/use-case-spec/templates/use-case.md` — template for use case specification documents
- `ai-architect-testing/skills/playwright-test/templates/example-view.spec.ts` — Playwright E2E test template
- `ai-architect-testing/skills/vitest/templates/` — Vitest unit test templates (domain logic, components, mappers)
- `ai-architect-testing/skills/manual-test/templates/manual-test-plan.md` — manual test plan template

## Skill Authoring Conventions

All skills follow these patterns:

- **Frontmatter**: YAML between `---` markers with `name` and multiline `description` (using `>` syntax). The
  description includes trigger phrases ("Use when the user asks to...") so Claude knows when to auto-invoke.
- **Workflow**: Skills use TodoWrite for task tracking and follow numbered step-by-step workflows.
- **Output**: Each skill writes to a specific file in `docs/` (e.g., `docs/requirements.md`,
  `docs/entity_model.md`, `docs/use_cases.puml`, `docs/use_cases/{name}.md`).
- **Quality checks**: Skills include validation checklists at the end of their workflows.
- **$ARGUMENTS**: Used for user-provided input (e.g., the hello skill greets `$ARGUMENTS` by name).

## ID Conventions

- Functional Requirements: `FR-XXX`
- Non-Functional Requirements: `NFR-XXX`
- Constraints: `C-XXX`
- Use Cases: `UC-XXX` (3-digit, e.g., UC-001)
- Business Rules: `BR-XXX`
- Test Cases (manual): `TC-XXX` (3-digit, e.g., TC-001)

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification:

```
<type>[optional scope][!]: <description>

[optional body]

[optional footer(s)]
```

Common types: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `ci`, `style`, `perf`, `build`.
Append `!` after the type/scope for breaking changes (also add a `BREAKING CHANGE:` footer).

## Hooks

The project uses Claude Code hooks (`.claude/settings.json`):

- **PreToolUse** (`Edit|Write`): runs `.claude/hooks/protect-files.sh` to block writes to `.env`,
  `package-lock.json`, and `.git/`
- **PostToolUse** (`Edit|Write`): auto-formats changed files with Prettier (`npx prettier --write`)

## Testing Plugins Locally

```shell
claude --plugin-dir ./ai-architect-core
claude --plugin-dir ./ai-architect-testing
```

After changes, run `/reload-plugins` inside Claude Code to pick up updates without restarting.
