# PageLayout Component

## Overview

The `PageLayout` component provides a standardized layout pattern for all Intelligence Engine (and potentially Design Engine) pages, following MUI best practices.

## Features

- **Container**: Uses MUI `Container` with `maxWidth="xl"` for consistent width and centering
- **Centered Header**: Icon, title, and optional badge are centered
- **Consistent Spacing**: Uses `py: 4` for vertical padding and `mb: 4` for header margin
- **Responsive**: Automatically adapts to different screen sizes

## Usage

### Basic Example

```tsx
import { PageLayout } from '@shared/ui/layout'
import { ControlCamera } from '@mui/icons-material'

export default function MyPage() {
  return (
    <PageLayout
      title="My Page"
      icon={<ControlCamera sx={{ fontSize: 32, color: 'primary.main' }} />}
    >
      {/* Your page content here */}
    </PageLayout>
  )
}
```

### With Badge

```tsx
import { PageLayout } from '@shared/ui/layout'
import { Psychology, Chip } from '@mui/material'

export default function MyPage() {
  return (
    <PageLayout
      title="AI Insights"
      icon={<Psychology sx={{ fontSize: 32, color: 'primary.main' }} />}
      badge={<Chip label="Beta" color="info" size="small" />}
    >
      {/* Your page content here */}
    </PageLayout>
  )
}
```

## MUI Best Practices Applied

### 1. Container Component
- Always wrap page content in `Container` with `maxWidth="xl"`
- Use `py: 4` for consistent vertical padding

### 2. Card Components
- Use `Card` and `CardContent` instead of `Paper` for better semantic structure
- Set `height: '100%'` on cards in Grid rows for equal heights
- Use `elevation={1}` for subtle shadows

### 3. Grid System (v2)
- Use Grid v2 API with `size` prop instead of legacy `item` prop
- Example: `<Grid size={{ xs: 12, sm: 6, md: 3 }}>`
- Use `spacing={3}` for consistent gaps

### 4. Centered Content
- Headers: `justifyContent: 'center'`
- Card content: `textAlign: 'center'` for metrics
- Section titles: `textAlign: 'center'`

### 5. Consistent Card Sizing
- All cards in a row should have `height: '100%'`
- Use flexbox (`display: 'flex', flexDirection: 'column'`) for card content
- Use `flex: 1` for content that should fill available space

### 6. Typography
- Page titles: `variant="h4"` with `fontWeight: 600`
- Section titles: `variant="h6"` with `fontWeight: 600`
- Use `component="h1"` for page titles for accessibility

## Example: Complete Page Structure

```tsx
import { PageLayout } from '@shared/ui/layout'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import { ControlCamera } from '@mui/icons-material'

export default function ExamplePage() {
  return (
    <PageLayout
      title="Example Page"
      icon={<ControlCamera sx={{ fontSize: 32, color: 'primary.main' }} />}
    >
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={1} sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Metric Label
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                1,234
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Subtitle
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Card elevation={1}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
            Section Title
          </Typography>
          {/* Content here */}
        </CardContent>
      </Card>
    </PageLayout>
  )
}
```

## Migration Guide

When updating existing pages:

1. **Replace outer Box with Container**:
   ```tsx
   // Before
   <Box sx={{ p: 3 }}>
   
   // After
   <Container maxWidth="xl" sx={{ py: 4 }}>
   ```

2. **Update Header**:
   ```tsx
   // Before
   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
   
   // After
   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 4 }}>
   ```

3. **Replace Paper with Card**:
   ```tsx
   // Before
   <Paper sx={{ p: 2.5 }}>
   
   // After
   <Card elevation={1}>
     <CardContent sx={{ p: 3 }}>
   ```

4. **Update Grid to v2 API**:
   ```tsx
   // Before
   <Grid item xs={12} sm={6} md={3}>
   
   // After
   <Grid size={{ xs: 12, sm: 6, md: 3 }}>
   ```

5. **Add consistent card heights**:
   ```tsx
   <Card elevation={1} sx={{ height: '100%' }}>
   ```

6. **Center content**:
   ```tsx
   <CardContent sx={{ p: 3, textAlign: 'center' }}>
   ```

## Benefits

- **Consistency**: All pages follow the same layout pattern
- **Maintainability**: Changes to layout standards can be made in one place
- **Accessibility**: Proper semantic HTML with Container and headings
- **Responsive**: Works well on all screen sizes
- **MUI Best Practices**: Follows official MUI recommendations




