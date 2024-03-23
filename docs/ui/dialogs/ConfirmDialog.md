# <ConfirmDialog \/>

`@webstencils/ui`

Provides a minimal implementation of a confirmation dialog with customizable options.

## Reference

### Props

- `title` **string** - optional, dialog title, defaults to `Confirm`
- `content` **ReactNode | string** - dialog content
- `hideCancelButton` **boolean** - optional, hides `Cancel` button
- `cancelText` **string** - optional, custom text for `Cancel` button, defaults to `Cancel`
- `submitText` **string** - optional, custom text for `Submit` button, defaults to `OK`
- `onCancel` **() => void** - optional, cancel click handler
- `onSubmit` **() => void** - optional, submit click handler
- `...props` **Object** - the props of the element

## Example

```jsx
import { useEditor } from '@webstencils/core';
import { ConfirmDialog, useDialog } from '@webstencils/ui';

function MyComponent() {
  const [openDialog, closeDialog] = useDialog();
  
  const onHandleButtonClick = () => {
    openDialog({
      children: (
        <ConfirmDialog
          title={'Demo dialog title'}
          content={'The dialog content comes here.'}
          hideCancelButton={true}
          onCancel={closeDialog}
          onSubmit={closeDialog}
        />
      )
    });
  };
  
  return (
    <>
      <button>
        Show confirm dialog
      </button>
    </>
  );
}
```
