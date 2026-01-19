# Contributing to EduConnect

Thank you for your interest in contributing to EduConnect! We welcome contributions from everyone. By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## Contribution Workflow

1.  **Fork the repository** to your own GitHub account.
2.  **Clone the project** to your local machine.
3.  **Create a new branch** from `development`.
4.  **Make your changes** and commit them.
5.  **Push your branch** to your fork.
6.  **Submit a Pull Request** to the `development` branch of the original repository.
7.  **Await review** and address any feedback.

## Branch Naming Conventions

Please use the following prefixes for your branch names:

- `feature/`: for new features (e.g., `feature/user-auth`)
- `bugfix/`: for bug fixes (e.g., `bugfix/login-error`)
- `hotfix/`: for critical, urgent fixes (e.g., `hotfix/security-patch`)
- `docs/`: for documentation updates (e.g., `docs/api-guide`)
- `refactor/`: for code refactoring without behavior changes

## Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

Format: `<type>(<scope>): <subject>`

Examples:

- `feat(auth): implement login with google`
- `fix(api): handle null pointer in chat controller`
- `docs(readme): update setup instructions`
- `style(css): fix button alignment`

## Pull Request Rules

- Ensure your code passes all linting and local tests.
- Provide a clear description of the changes in the PR template.
- Link to any related issues (e.g., `Fixes #123`).
- Do not merge your own PR without at least one review.

## Coding Standards

- **JavaScript/React**: Follow the existing project structure and style.
- **Linting**: Run `npm run lint` before committing to ensure code quality.
- **Formatting**: Use Prettier to format your code.

Thank you for contributing!
