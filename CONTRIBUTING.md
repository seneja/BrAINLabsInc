# Contributing to BrAINLabs Inc. Official Web

Welcome, and thank you for your interest in contributing to the **BrAINLabs Inc.** official website! This document outlines everything you need to know — from reporting issues to submitting code — to ensure a smooth and productive collaboration.

- **Organization Repository:** [https://github.com/BrAINLabs-Inc/official-web](https://github.com/BrAINLabs-Inc/official-web)

---

## 📋 Table of Contents

1. [Reporting an Issue](#-reporting-an-issue)
2. [Recommended Branch Structure](#-recommended-branch-structure)
3. [Contribution Workflow](#-contribution-workflow)
4. [Submitting a Pull Request](#-submitting-a-pull-request)
5. [Release Process](#-release-process)
6. [Code of Conduct](#-code-of-conduct)

---

## 🐛 Reporting an Issue

Found a bug? Something looks broken or out of place? Please let us know by opening an issue before writing any code.

### Before Opening an Issue

- **Search existing issues first** to avoid duplicates: [View Open Issues](https://github.com/BrAINLabs-Inc/official-web/issues)
- Check if the issue already has an open pull request addressing it.

### How to Open a Good Issue

Go to the [Issues tab](https://github.com/BrAINLabs-Inc/official-web/issues) and click **"New Issue"**. Please include the following information:

- **Title**: A short, clear description (e.g., `Footer links broken on mobile`)
- **Description**: What you expected to happen vs. what actually happened
- **Steps to Reproduce**: A numbered list of steps to reproduce the problem
- **Environment**: Your browser, OS, and screen size (if relevant)
- **Screenshots**: If applicable, attach screenshots or screen recordings

> **Note:** Issues without sufficient detail may be closed or marked as `needs more info`. The more context you provide, the faster it can be resolved.

### Issue Labels

| Label | Description |
|---|---|
| `bug` | Something isn't working correctly |
| `enhancement` | A new feature or improvement |
| `documentation` | Improvements to docs or README |
| `good first issue` | Suitable for first-time contributors |
| `help wanted` | Extra attention is needed |
| `question` | Further information is requested |

---

## 🌿 Recommended Branch Structure

| Branch | Purpose |
|---|---|
| `main` | Stable, production-ready code. **No direct commits.** |
| `development` | Active integration branch. All PRs target here. |
| `feature/*` | Short-lived contributor branches for specific tasks. |

### Branch Purpose Details

#### `main`
- Always reflects the live production site.
- No one merges directly into this branch — not even the maintainer.
- Only updated via a formal PR from `development` at release time.

#### `development`
- The central integration branch where all contributor work is merged.
- All external Pull Requests must target this branch.
- Regularly tested to ensure stability before promotions to `main`.

#### `feature/*` branches
Temporary branches created for individual features, bug fixes, or improvements.

**Examples:**
- `feature/login-system`
- `feature/ai-model`
- `feature/ui-update`
- `bugfix/header-alignment`

---

## 🔄 Contribution Workflow

### Step 1 — Fork the Repository

Click the **"Fork"** button on [the main repo page](https://github.com/BrAINLabs-Inc/official-web) to create your own copy.

### Step 2 — Clone Your Fork

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/official-web.git
cd official-web
```

### Step 3 — Add the Upstream Remote

This keeps your local copy in sync with the main repository.

```bash
git remote add upstream https://github.com/BrAINLabs-Inc/official-web.git
```

### Step 4 — Sync with the Latest Changes

Always sync before starting new work to avoid conflicts.

```bash
git fetch upstream
git checkout development
git merge upstream/development
```

### Step 5 — Create a Feature Branch

Create a new branch from `development`. **Never work directly on `main` or `development`.**

```bash
git checkout -b feature/your-feature-name upstream/development
```

### Step 6 — Make Your Changes

- Write clean, readable code.
- Follow the existing code style and conventions of the project.
- Test your changes locally to make sure they work.

### Step 7 — Commit Your Changes

Write clear, descriptive commit messages using conventional commit style:

```bash
git add .
git commit -m "feat: add responsive navigation bar"
```

**Common prefixes:**
- `feat:` — a new feature
- `fix:` — a bug fix
- `docs:` — documentation changes
- `style:` — formatting, no logic change
- `refactor:` — code change that is neither a fix nor a feature

### Step 8 — Push to Your Fork

```bash
git push origin feature/your-feature-name
```

---

## 🔀 Submitting a Pull Request

1. Go to [the main repository](https://github.com/BrAINLabs-Inc/official-web).
2. You'll see a **"Compare & pull request"** banner for your branch. Click it.
3. **⚠️ Important:** Set the **base branch** to **`development`** — never `main`.
4. Fill in the **PR template** that appears automatically with all required information.
5. Click **"Create pull request"** and wait for a review.

> A PR template (`.github/PULL_REQUEST_TEMPLATE.md`) is already configured in this repository and will auto-populate when you open a PR.

### PR Review Process

- All PRs are reviewed by the repository maintainer.
- You may be asked to make changes before the PR is merged.
- Once approved, the maintainer will merge the PR into `development`.
- **Only the maintainer has permission to merge Pull Requests.**

---

## 🚀 Release Process

When `development` is stable and ready for production:

1. The maintainer opens a PR from `development` → `main`.
2. A final review is conducted.
3. The PR is merged into `main`.
4. A new **GitHub Release** is created with a version tag (e.g., `v1.2.0`) on `main`.

---

## 🤝 Code of Conduct

We are committed to maintaining a welcoming, inclusive, and respectful community. By contributing, you agree to treat all participants with respect and professionalism.

Unacceptable behavior includes (but is not limited to): harassment, discrimination, personal attacks, or publishing others' private information.

Violations may result in your contributions being rejected and access to the repository being revoked.

---

*Thank you for contributing to BrAINLabs Inc. — every contribution, no matter how small, makes a difference!* 🧠🚀
