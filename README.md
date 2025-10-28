# SWAPI App

A modern Next.js application for browsing Star Wars API (SWAPI) data with comprehensive development tooling.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Testing**: [Jest](https://jestjs.io) + [React Testing Library](https://testing-library.com/react)
- **Linting**: [ESLint](https://eslint.org) + [Prettier](https://prettier.io)
- **Git Hooks**: [Husky](https://typicode.github.io/husky) + [lint-staged](https://github.com/lint-staged/lint-staged)
- **Commit Standards**: [Commitlint](https://commitlint.js.org) + [Commitizen](https://github.com/commitizen/cz-cli)
- **CI/CD**: [GitHub Actions](https://github.com/features/actions)

## 📦 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/glinckio/swapi-app.git
cd swapi-app
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your configuration:

```env
NEXT_PUBLIC_API_URL=https://swapi.dev/api
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📝 Available Scripts

### Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

### Code Quality

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Testing

- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

### Git Workflow

- `npm run commit` - Interactive commit with Commitizen

## 🧪 Testing

This project uses **Jest** and **React Testing Library** for testing.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

Example test structure:

```typescript
import { render, screen } from "@testing-library/react";
import Component from "./component";

describe("Component", () => {
  it("renders correctly", () => {
    render(<Component />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
```

## 🎯 Git Hooks

This project uses **Husky** to run git hooks automatically:

- **pre-commit**: Runs lint-staged to check and format staged files
- **commit-msg**: Validates commit messages with Commitlint

### Conventional Commits

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification. Commit messages must follow this format:

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

**Types**:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Other changes

## 🏗️ Project Structure

```
swapi-app/
├── app/                # Next.js App Router pages
│   ├── page.tsx       # Home page
│   └── layout.tsx     # Root layout
├── config/            # Configuration files
│   └── env.ts         # Environment variables
├── .github/           # GitHub Actions workflows
├── .husky/            # Git hooks
└── public/            # Static assets
```

## 🤖 CI/CD

This project uses GitHub Actions for continuous integration:

### Workflows

- **CI** (`ci.yml`): Runs on push/PR to main/master/develop
  - Lint check
  - Code formatting check
  - Tests with coverage
  - Build verification

- **PR Checks** (`pr-checks.yml`): Runs on pull requests
  - Commit message validation
  - Code quality checks
  - Type checking

## 📄 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Required
NEXT_PUBLIC_API_URL=https://swapi.dev/api
```

## 🛠️ Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Use Prettier for code formatting
- Write meaningful commit messages

### Best Practices

- Write tests for new features
- Keep components small and focused
- Use meaningful variable and function names
- Follow React best practices
- Document complex logic

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 📝 License

This project is private and proprietary.

## 🙏 Acknowledgments

- [SWAPI](https://swapi.dev) - The Star Wars API
- [Next.js](https://nextjs.org) - React framework
- All the amazing open source tools used in this project
