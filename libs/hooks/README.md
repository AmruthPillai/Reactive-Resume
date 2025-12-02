# Hooks Library

This library provides custom React hooks for common functionality used throughout Reactive Resume.

## Overview

The hooks library offers reusable logic for:

- **Data fetching** with React Query
- **Form management** with React Hook Form
- **Local storage** persistence
- **Debouncing** user input
- **Breakpoint** detection

## Key Concepts

### Hook Patterns

All hooks follow consistent patterns:

- **Type-safe** with proper TypeScript annotations
- **Well-tested** with comprehensive test coverage
- **Documented** with clear JSDoc comments
- **Composable** and reusable across components

### Data Fetching Hooks

Built on React Query for server state management:

```typescript
export function useResume(id: string) {
  return useQuery({
    queryKey: ['resume', { id }],
    queryFn: () => fetchResume(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

### Mutation Hooks

Handle data mutations with optimistic updates:

```typescript
export function useUpdateResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateResume,
    onSuccess: (data) => {
      queryClient.setQueryData(['resume', { id: data.id }], data);
    },
  });
}
```

## Available Hooks

### Data Fetching

#### `useResume(id: string)`

Fetch a single resume by ID:

```tsx
function ResumeView({ resumeId }: { resumeId: string }) {
  const { data: resume, isLoading, error } = useResume(resumeId);

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorMessage />;

  return <ResumeDisplay resume={resume} />;
}
```

#### `useResumes()`

Fetch all user resumes:

```tsx
function ResumeList() {
  const { data: resumes, isLoading } = useResumes();

  if (isLoading) return <Skeleton />;

  return (
    <div className="grid gap-4">
      {resumes?.map(resume => (
        <ResumeCard key={resume.id} resume={resume} />
      ))}
    </div>
  );
}
```

#### `useUser()`

Fetch current user data:

```tsx
function UserProfile() {
  const { data: user, isLoading } = useUser();

  if (isLoading) return <Skeleton />;

  return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
}
```

### Mutations

#### `useCreateResume()`

Create a new resume:

```tsx
function CreateResumeButton() {
  const { mutate: createResume, isPending } = useCreateResume();

  return (
    <Button
      onClick={() => createResume({ title: 'New Resume' })}
      disabled={isPending}
    >
      {isPending ? 'Creating...' : 'Create Resume'}
    </Button>
  );
}
```

#### `useUpdateResume()`

Update resume data:

```tsx
function ResumeForm({ resume }: { resume: ResumeDto }) {
  const { mutate: updateResume, isPending } = useUpdateResume();

  const onSubmit = (data: UpdateResumeDto) => {
    updateResume({
      id: resume.id,
      ...data
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* form fields */}
      <Button type="submit" disabled={isPending}>
        Save Changes
      </Button>
    </form>
  );
}
```

### Utility Hooks

#### `useDebounce(value, delay)`

Debounce user input:

```tsx
function SearchInput() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  // Use debouncedQuery for API calls
  const { data: results } = useSearch(debouncedQuery);

  return (
    <Input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search resumes..."
    />
  );
}
```

#### `useLocalStorage(key, initialValue)`

Persist state in localStorage:

```tsx
function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle to {theme === 'light' ? 'dark' : 'light'} theme
    </Button>
  );
}
```

#### `useBreakpoint()`

Responsive breakpoint detection:

```tsx
function ResponsiveComponent() {
  const breakpoint = useBreakpoint();

  return (
    <div>
      {breakpoint === 'mobile' && <MobileLayout />}
      {breakpoint === 'tablet' && <TabletLayout />}
      {breakpoint === 'desktop' && <DesktopLayout />}
    </div>
  );
}
```

## Usage Guidelines

### Importing Hooks

Import hooks from the main barrel export:

```typescript
import { useResume, useUpdateResume, useDebounce } from '@reactive-resume/hooks';
```

### Hook Dependencies

Be mindful of hook dependencies:

```typescript
// ✅ Good - proper dependencies
useEffect(() => {
  if (user?.id) {
    fetchUserData(user.id);
  }
}, [user?.id]);

// ❌ Avoid - missing dependencies
useEffect(() => {
  fetchUserData(user.id); // user.id might be undefined
}, []);
```

### Error Handling

Handle errors appropriately:

```typescript
function ResumeEditor({ id }: { id: string }) {
  const { data: resume, error, refetch } = useResume(id);

  if (error) {
    return (
      <ErrorBoundary
        fallback={
          <div>
            <p>Failed to load resume</p>
            <Button onClick={() => refetch()}>Retry</Button>
          </div>
        }
      />
    );
  }

  // ... rest of component
}
```

## Best Practices

### Custom Hook Creation

When creating new hooks:

1. **Follow naming convention**: `use*`
2. **Handle loading and error states**
3. **Provide proper TypeScript types**
4. **Add JSDoc documentation**
5. **Write comprehensive tests**

```typescript
/**
 * Hook for managing resume statistics
 * @param resumeId - The ID of the resume
 * @returns Object with statistics data and loading state
 */
export function useResumeStats(resumeId: string) {
  return useQuery({
    queryKey: ['resume-stats', resumeId],
    queryFn: () => fetchResumeStats(resumeId),
    enabled: !!resumeId,
  });
}
```

### Testing Hooks

Test hooks with React Testing Library:

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useResume', () => {
  it('fetches resume data', async () => {
    const { result } = renderHook(() => useResume('123'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toBeDefined();
  });
});
```

## Migration Guide

When adding new hooks or updating existing ones:

1. **Maintain backward compatibility**
2. **Update all usages** across the codebase
3. **Add tests** for new functionality
4. **Document breaking changes**
5. **Consider performance implications**
