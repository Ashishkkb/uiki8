
# Contributing to Enchant UI

Thank you for your interest in contributing to Enchant UI! This document provides guidelines and instructions for contributing to make the process smooth and efficient for everyone involved.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
  - [Development Environment Setup](#development-environment-setup)
  - [Project Structure](#project-structure)
- [How to Contribute](#how-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Pull Requests](#pull-requests)
- [Development Guidelines](#development-guidelines)
  - [Coding Standards](#coding-standards)
  - [Component Guidelines](#component-guidelines)
  - [Testing Guidelines](#testing-guidelines)
  - [Documentation Guidelines](#documentation-guidelines)
- [Community](#community)
  - [Communication Channels](#communication-channels)
  - [Mentorship](#mentorship)
- [Release Process](#release-process)

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [conduct@enchantui.com](mailto:conduct@enchantui.com).

## Getting Started

### Development Environment Setup

1. **Fork and Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/enchant-ui.git
   cd enchant-ui
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start the Development Server**

   ```bash
   npm run dev
   ```

4. **Run Tests**

   ```bash
   npm test
   ```

### Project Structure

```
enchant-ui/
├── src/                  # Source files
│   ├── components/       # UI components
│   ├── data/             # Component registry and metadata
│   │   └── components/   # Component definitions by category
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities and helpers
│   ├── pages/            # Page components
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
├── tests/                # Test files
└── docs/                 # Documentation
```

## How to Contribute

### Reporting Bugs

Bugs are tracked as [GitHub issues](https://github.com/yourusername/enchant-ui/issues). Create an issue and provide the following information:

- **Title**: Clear and descriptive title
- **Description**: Detailed description of the bug
- **Steps to Reproduce**: Step-by-step instructions to reproduce the problem
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Screenshots**: If applicable, add screenshots
- **Environment**: Browser, OS, screen resolution, etc.
- **Additional Context**: Any other information that might be relevant

### Suggesting Enhancements

Enhancement suggestions are also tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Title**: Clear and descriptive title
- **Description**: Detailed description of the proposed functionality
- **Use Case**: Why this enhancement would be useful
- **Possible Implementation**: Ideas for how to implement the feature
- **Alternatives Considered**: Any alternative solutions you've considered

### Pull Requests

1. **Create a Branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make Your Changes**

   - Follow the [Coding Standards](#coding-standards)
   - Add or update tests as needed
   - Update documentation if necessary

3. **Commit Your Changes**

   ```bash
   git commit -m 'Add some amazing feature'
   ```

   Follow our [Commit Message Guidelines](#commit-message-guidelines)

4. **Push to Your Fork**

   ```bash
   git push origin feature/amazing-feature
   ```

5. **Submit a Pull Request**

   - Fill in the required template
   - Reference any relevant issues
   - Include screenshots or animated GIFs if applicable

6. **Review Process**

   - Maintainers will review your PR
   - Address any requested changes
   - Once approved, maintainers will merge your PR

## Development Guidelines

### Coding Standards

- **TypeScript**: Use TypeScript for type safety
- **ESLint & Prettier**: Follow the project's ESLint and Prettier configurations
- **Naming Conventions**:
  - Use PascalCase for component files and interfaces (e.g., `Button.tsx`, `ButtonProps`)
  - Use camelCase for utility functions, hooks, and variables
- **Imports**: Group and order imports consistently
  - React imports first
  - External libraries next
  - Internal modules last
  - Sort alphabetically within each group

### Component Guidelines

1. **Accessibility**
   - Follow WAI-ARIA practices
   - Ensure keyboard navigation
   - Use proper ARIA attributes

2. **Responsiveness**
   - All components must work on mobile, tablet, and desktop
   - Use responsive design patterns

3. **Performance**
   - Optimize renders with React.memo when appropriate
   - Be mindful of expensive calculations
   - Consider lazy loading for large components

4. **Props**
   - Define clear prop interfaces with TypeScript
   - Use sensible defaults
   - Provide comprehensive prop documentation

5. **State Management**
   - Keep state as local as possible
   - Use context for truly global state
   - Consider custom hooks for complex state logic

### Testing Guidelines

1. **Unit Tests**
   - Write tests for all components and utilities
   - Test both normal usage and edge cases
   - Focus on behavior, not implementation details

2. **Integration Tests**
   - Test component interactions
   - Ensure accessibility in integration tests

3. **Visual Regression Tests**
   - Use tools like Storybook and Chromatic

### Documentation Guidelines

1. **Component Documentation**
   - Description
   - Props API
   - Usage examples
   - Accessibility considerations
   - Edge cases

2. **Code Comments**
   - Add comments for complex logic
   - JSDoc for exported functions and interfaces

3. **README Updates**
   - Update README.md when adding new features
   - Keep installation instructions current

### Commit Message Guidelines

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

- **Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `revert`
- **Scope**: Component or file affected (e.g., `button`, `dropdown`)
- **Subject**: Short description in present tense, not capitalized, no period at end
- **Body**: More detailed explanation if needed
- **Footer**: Reference issues being closed, breaking changes

Example:
```
feat(button): add loading state

Add a loading spinner option to the Button component that shows when isLoading prop is true.

Closes #42
```

## Community

### Communication Channels

- **GitHub Discussions**: For feature discussions and community help
- **Discord**: For real-time chat and collaboration
- **Monthly Community Calls**: Updates and demos

### Mentorship

We offer mentorship for new contributors. Reach out on Discord or through GitHub discussions if you'd like to be paired with a mentor.

## Release Process

1. **Version Bumping**
   - We follow [Semantic Versioning](https://semver.org/)
   - Major: Breaking changes
   - Minor: New features, no breaking changes
   - Patch: Bug fixes, no breaking changes

2. **Release Candidates**
   - Before major releases, we create release candidates
   - Testing period for community feedback

3. **Changelog**
   - Automated from conventional commit messages
   - Manually reviewed before release

4. **Release Schedule**
   - Regular releases every two weeks
   - Patch releases as needed

---

Thank you for contributing to Enchant UI! 🎉
