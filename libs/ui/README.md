# UI Library

This library provides a comprehensive set of reusable UI components built with [Radix UI](https://www.radix-ui.com/) and styled with [Tailwind CSS](https://tailwindcss.com/).

## Overview

The UI library offers a design system for consistent user interfaces across Reactive Resume. All components are:

- **Accessible** (WCAG compliant)
- **Customizable** (CSS variables and variants)
- **Type-safe** (TypeScript support)
- **Tree-shakable** (optimized bundle sizes)

## Key Concepts

### Component Architecture

Components follow a consistent structure:

```typescript
// Component definition
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

// Variants using class-variance-authority
export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
```

### Design Tokens

Components use CSS custom properties for theming:

```css
/* CSS variables for theming */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --secondary: 210 40% 98%;
  /* ... more variables */
}
```

### Variants and Composition

Components support multiple variants and can be composed:

```tsx
// Using button variants
<Button variant="destructive" size="lg">
  Delete
</Button>

// Composing components
<Card>
  <CardHeader>
    <CardTitle>Resume Title</CardTitle>
  </CardHeader>
  <CardContent>
    <Button>Edit</Button>
  </CardContent>
</Card>
```

## Component Categories

### Form Components

- **Button**: Action buttons with variants
- **Input**: Text input fields
- **Label**: Form labels
- **Select**: Dropdown selections
- **Checkbox**: Boolean inputs
- **Radio**: Single selection inputs
- **Switch**: Toggle switches

### Layout Components

- **Card**: Content containers
- **Dialog**: Modal dialogs
- **Sheet**: Slide-out panels
- **Tabs**: Tabbed interfaces
- **Accordion**: Collapsible content

### Feedback Components

- **Alert**: Status messages
- **Toast**: Notification messages
- **Skeleton**: Loading states
- **Progress**: Progress indicators

### Navigation Components

- **Dropdown Menu**: Context menus
- **Context Menu**: Right-click menus
- **Navigation Menu**: Site navigation

## Usage

### Importing Components

```tsx
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Label
} from '@reactive-resume/ui';
```

### Basic Usage

```tsx
function ResumeForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="Software Engineer" />
        </div>
        <Button>Save Resume</Button>
      </CardContent>
    </Card>
  );
}
```

### Advanced Usage

```tsx
function ResumeBuilder() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Resume Sections</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basics">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basics">Basics</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>
            <TabsContent value="basics">
              <BasicsForm />
            </TabsContent>
            <TabsContent value="experience">
              <ExperienceForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
```

## Theming

### CSS Variables

Components use CSS custom properties for consistent theming:

```css
/* Light theme */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
}

/* Dark theme */
[data-theme="dark"] {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 210 40% 98%;
}
```

### Custom Variants

Extend components with custom variants:

```typescript
import { cva } from 'class-variance-authority';

export const customButtonVariants = cva(
  'inline-flex items-center justify-center',
  {
    variants: {
      variant: {
        success: 'bg-green-600 text-white hover:bg-green-700',
        warning: 'bg-yellow-600 text-white hover:bg-yellow-700',
      }
    }
  }
);
```

## Best Practices

### Component Composition

Prefer composition over complex props:

```tsx
// ✅ Good - composable
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>

// ❌ Avoid - prop overload
<Card
  title="Title"
  description="Description"
  content="Content"
  footer="Footer"
/>
```

### Accessibility

Always include proper ARIA attributes:

```tsx
// ✅ Good - accessible
<Button aria-label="Save resume">
  <SaveIcon />
</Button>

// ❌ Avoid - missing labels
<Button>
  <SaveIcon />
</Button>
```

### Responsive Design

Use responsive utilities:

```tsx
<Button className="w-full sm:w-auto">
  Save Changes
</Button>
```

## Migration Guide

When adding new components or updating existing ones:

1. **Follow the established patterns** (variants, composition)
2. **Ensure accessibility** compliance
3. **Add comprehensive stories** for Storybook
4. **Document usage examples** in component comments
5. **Test across all themes** and screen sizes
6. **Consider bundle size** impact
