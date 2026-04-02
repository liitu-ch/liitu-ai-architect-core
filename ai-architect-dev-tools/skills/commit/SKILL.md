---
name: commit
description: >
  Creates git commits following the Conventional Commits specification
  (https://www.conventionalcommits.org/en/v1.0.0/). Analyzes staged and
  unstaged changes, interactively asks about commit type, scope, and breaking
  changes, then generates a well-structured commit message with title and body.
  Use when the user asks to "commit", "create a commit", "commit my changes",
  "make a conventional commit", or mentions git commit, commit message, or
  conventional commit.
---

# Conventional Commit

Create a git commit following the Conventional Commits specification based on the current changes
in the working directory.

## Workflow

### Step 1: Analyze the current state

Run these commands to understand what changed:

- `git status` — see staged, unstaged, and untracked files
- `git diff --staged` — see what is already staged
- `git diff` — see unstaged changes
- `git log --oneline -5` — see recent commits for style context

If there are no changes at all (nothing staged, unstaged, or untracked), inform the user and stop.

### Step 2: Ask about staging

If there are unstaged or untracked changes, present them to the user and ask:

> I see these changes:
>
> **Staged:** (list files, or "nothing staged yet")
> **Unstaged:** (list files)
> **Untracked:** (list files)
>
> Which files should I include in this commit? Options:
>
> 1. All changes (stage everything)
> 2. Only already staged changes
> 3. Let me pick specific files

Wait for the user's answer. If they pick option 3, show the file list and let them specify
which files to include. Stage the selected files with `git add`.

If everything is already staged and there are no unstaged/untracked changes, skip this step.

### Step 3: Show the diff and determine commit type

Read the final staged diff (`git diff --staged`) to understand what the changes actually do.

Then ask the user:

> What type of change is this?
>
> - **feat** — a new feature
> - **fix** — a bug fix
> - **refactor** — code restructuring without behavior change
> - **docs** — documentation only
> - **test** — adding or updating tests
> - **chore** — maintenance (dependencies, config, CI)
> - **style** — formatting, whitespace, semicolons
> - **perf** — performance improvement
> - **build** — build system or external dependencies
> - **ci** — CI/CD configuration

Suggest the most likely type based on the diff, but let the user decide.

### Step 4: Ask about scope and breaking changes

Ask two follow-up questions:

> **Scope** (optional): Which area of the codebase does this affect?
> Examples: auth, api, ui, db — or leave empty for no scope.
>
> **Breaking change?** Does this commit introduce a breaking change? (yes/no)

If the user confirms a breaking change, the commit type gets a `!` suffix and a
`BREAKING CHANGE:` footer will be added. Ask for a short description of what breaks.

### Step 5: Generate the commit message

Compose the message following this format:

```
<type>[(<scope>)][!]: <description>

<body>

[BREAKING CHANGE: <explanation>]
```

Rules for the **description** (first line):

- Lowercase, no period at the end
- Imperative mood ("add feature" not "added feature" or "adds feature")
- Maximum 72 characters total (including type and scope prefix)
- Summarize the "what" concisely

Rules for the **body**:

- Explain the "why" behind the change — what motivated it, what problem it solves
- If the diff touches multiple concerns, summarize them as bullet points
- Wrap lines at 80 characters
- Keep it concise but informative — 1-4 lines is usually enough
- Skip the body only if the change is truly trivial (typo fix, version bump)

### Step 6: Confirm and commit

Present the full commit message to the user:

> Here's the commit message I'd suggest:
>
> ```
> feat(auth): add JWT token refresh on session expiry
>
> Users were getting logged out unexpectedly when their token expired
> during active use. The refresh mechanism now silently renews the token
> in the background before expiry.
> ```
>
> Should I go ahead and commit with this message, or would you like to adjust anything?

Wait for the user's confirmation. If they want changes, adjust and confirm again.

Once approved, create the commit using a HEREDOC to preserve formatting:

```bash
git commit -m "$(cat <<'EOF'
<the commit message>
EOF
)"
```

After committing, show a short confirmation with the commit hash.

## Important

- Never stage files without the user's explicit approval
- Never commit without the user's explicit approval of the message
- Never skip the interactive questions — the user's input determines the commit
- Never add a Co-Authored-By footer
- If a pre-commit hook fails, show the error and help the user fix the issue, then retry
