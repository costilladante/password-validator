# React Password Validator

[![npm version](https://img.shields.io/npm/v/@costilladante/password-validator.svg)](https://www.npmjs.com/package/@costilladante/password-validator)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@costilladante/password-validator)](https://bundlephobia.com/package/@costilladante/password-validator)
[![npm downloads](https://img.shields.io/npm/dm/@costilladante/password-validator)](https://www.npmjs.com/package/@costilladante/password-validator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)](https://reactjs.org/)

> See this project in action in this [Live Demo](https://password-validator-demo.vercel.app/)!

A customizable React password validator component with accessibility features.

## ✨ Features

- 🎯 **Flexible Rules**: Create your own password rules or use our pre-built ones
- ♿ **Accessibility First**: Works with screen readers and keyboard navigation
- 🎨 **Style It Your Way**: Customize the look and feel to match your app
- 📱 **Mobile Friendly**: Looks great on any device
- 🧪 **Well Tested**: We've got your back with comprehensive tests

### Tech Stack

- Build Tool: Vite
- Language: TypeScript
- UI Library: React
- Styling: Sass (SCSS), CSS Modules, CSS variables
- Testing: Vitest, React Testing Library
- Linting/Formatting: ESLint (Airbnb base, Prettier), Stylelint (SCSS)
- Git Hooks: Husky, lint-staged
- Commit Conventions: (Optional) Conventional Commits

### Accessibility

The component includes:

- Screen reader support with ARIA attributes
- Live updates for validation changes
- Full keyboard navigation
- Semantic HTML structure

## 🚀 Quick Start

First, install it:

```bash
npm install @costilladante/password-validator
# or
yarn add @costilladante/password-validator
# or
pnpm add @costilladante/password-validator
```

> ℹ You will need to import the styles in your main file (usually at the root of your project, like `main.tsx`).

```tsx
import { PasswordValidator, defaultRules, FunctionRule } from '@costilladante/password-validator'
import '@costilladante/password-validator/style.css'

const customRule = new FunctionRule(
  'customRule', // name of your rule
  'Password must be longer than 10 characters', // a message of the requirements
  (password: string) => password.length > 10, // the validator function. Can also be a RegEx!
)

const customRuleSet: RuleSet = new RuleSet([...defaultRules.rules, customRule])

function App() {
  return (
    <PasswordValidator
      ruleSet={customRuleSet}
      // Optional props
      indicators={{
        valid: '✓',
        invalid: '✗',
      }}
      className="custom-container"
      inputClassName="custom-input"
      indicatorClassName="custom-indicator"
    />
  )
}
```

## 🎮 Examples

### Basic Usage

Use the pre-built rules by default.

```tsx
<PasswordValidator ruleSet={defaultRules} />
```

### Custom Rules

You can create rules that validate a function or RegEx and show a message.

```tsx
import { RuleSet } from '@costilladante/password-validator'

const myRules: RuleSet = {
  rules: [
    {
      name: 'length',
      message: 'At least 8 characters please!',
      validate: (password) => (password.length >= 8 ? null : 'Too short!'),
    },
    {
      name: 'uppercase',
      message: 'Need at least one BIG letter',
      validate: (password) => (/[A-Z]/.test(password) ? null : 'No uppercase found!'),
    },
    {
      name: 'special',
      message: 'Add a special character (!@#$%)',
      validate: (password) => (/[!@#$%]/.test(password) ? null : 'Missing special character!'),
    },
  ],
}

function App() {
  return <PasswordValidator ruleSet={myRules} />
}
```

### Custom Styling

You can easily customize the component.

```tsx
<PasswordValidator
  ruleSet={defaultRules}
  className="my-container"
  inputClassName="my-input"
  indicatorsClassName="my-indicators"
  indicatorItemClassName="my-indicator-item"
/>
```

### Advanced Usage

```tsx
<PasswordValidator
  ruleSet={defaultRules}
  showToggle={true}
  indicators={{
    valid: '✓',
    invalid: '✗',
  }}
  onValidationChange={(isValid, results) => {
    console.log('Password is valid:', isValid)
    console.log('Validation results:', results)
  }}
  onValueChange={(value) => {
    console.log('Password value:', value)
  }}
  className="my-container"
  inputClassName="my-input"
  indicatorClassName="my-indicator"
/>
```

## 🛠️ Props

| Prop                   | Type                                                    | Required | Default                        | Description                                    |
| ---------------------- | ------------------------------------------------------- | -------- | ------------------------------ | ---------------------------------------------- |
| **ruleSet**            | RuleSet                                                 | No       | defaultRules                   | Your password rules                            |
| **showToggle**         | boolean                                                 | No       | true                           | Whether to show the password visibility toggle |
| **indicators**         | { valid?: React.ReactNode, invalid?: React.ReactNode }  | No       | { valid: '✅', invalid: '❌' } | Custom checkmarks                              |
| **onValidationChange** | (isValid: boolean, results: ValidationResult[]) => void | No       | -                              | Callback when validation state changes         |
| **onValueChange**      | (value: string) => void                                 | No       | -                              | Callback when password value changes           |
| **className**          | string                                                  | No       | -                              | Container class                                |
| **inputClassName**     | string                                                  | No       | -                              | Input field class                              |
| **indicatorClassName** | string                                                  | No       | -                              | Class for validation indicator items           |

## 🎨 Styling

The component uses CSS modules, so you can easily override the default styles.

```scss
.my-container {
  max-width: 400px;
  margin: 20px auto;
}

.my-input {
  width: 100%;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 4px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
}

.my-indicators {
  margin-top: 10px;
  padding: 0;
  list-style: none;
}

.my-indicator-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 5px 0;
  color: #666;

  &.valid {
    color: #4e28a7;
  }

  &.invalid {
    color: #c48322;
  }
}
```

## 💻 Development

Want to play around with the code? Here's how to get started:

```bash
# Clone the repo
git clone https://github.com/yourusername/password-validator.git
cd password-validator

# Install dependencies
pnpm install

# Start the development server
pnpm dev

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Check test coverage
pnpm test:coverage

# Build the library
pnpm build

# Lint your code
pnpm lint

# Lint your styles
pnpm stylelint

# Format your code
pnpm format
```

## 📝 License

MIT - Feel free to use this in your projects!
