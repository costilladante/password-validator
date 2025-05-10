# React Password Validator

A customizable React password validator component with accessibility features.

## Features

- 🎯 Customizable validation rules
- ♿ Accessibility-first design
- 🎨 Customizable styles
- 📱 Responsive design
- 🧪 Comprehensive test coverage

## Installation

```bash
npm install @costilladante/password-validator
# or
yarn add @costilladante/password-validator
# or
pnpm add @costilladante/password-validator
```

## Usage

> ℹ You will need to import the styles in your main file (usually at the root of your project, like `main.tsx`).

```tsx
import { PasswordValidator, defaultRules } from '@costilladante/password-validator'
import '@costilladante/password-validator/style.css'

function App() {
  return (
    <PasswordValidator
      ruleSet={defaultRules}
      // Optional props
      indicators={{
        valid: '✓',
        invalid: '✗',
      }}
      className="custom-container"
      inputClassName="custom-input"
      indicatorsClassName="custom-indicators"
      indicatorItemClassName="custom-indicator-item"
    />
  )
}
```

## Props

| Prop                   | Type                                                   | Required | Default                        | Description                                |
| ---------------------- | ------------------------------------------------------ | -------- | ------------------------------ | ------------------------------------------ |
| ruleSet                | RuleSet                                                | Yes      | -                              | Set of validation rules                    |
| indicators             | { valid?: React.ReactNode, invalid?: React.ReactNode } | No       | { valid: '✅', invalid: '❌' } | Custom indicators for valid/invalid states |
| className              | string                                                 | No       | -                              | Custom class for the container             |
| inputClassName         | string                                                 | No       | -                              | Custom class for the input                 |
| indicatorsClassName    | string                                                 | No       | -                              | Custom class for the indicators list       |
| indicatorItemClassName | string                                                 | No       | -                              | Custom class for each indicator item       |

## Customization

### Custom Rules

```tsx
import { RuleSet } from '@yourusername/password-validator'

const customRules: RuleSet = {
  rules: [
    {
      name: 'length',
      message: 'Password must be at least 8 characters',
      validate: (password) => (password.length >= 8 ? null : 'Too short'),
    },
    // Add more rules...
  ],
}
```

### Custom Styles

The component uses CSS modules for styling. You can override the default styles by providing your own classes through the className props.

## Accessibility

The component is built with accessibility in mind:

- ARIA attributes for screen readers
- Live regions for validation updates
- Keyboard navigation support
- Semantic HTML structure

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Build the library
pnpm run build
```

## License

MIT
