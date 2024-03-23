# <DialogProvider \/>

`@webstencils/ui`

Wrap your application with the `DialogProvider` to enable support for dialogs:

```jsx
import { DialogProvider } from '@webstencils/ui';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <DialogProvider>
        {/* application */}
      </DialogProvider>
      
    </ThemeProvider>
  );
}
```
