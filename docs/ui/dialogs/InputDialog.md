# <InputDialog \/>

`@webstencils/ui`

Provides a minimal implementation of an input dialog with customizable options.

## Reference

### Props

- `title` **string** - optional, dialog title, defaults to `Confirm`
- `hideCancelButton` **boolean** - optional, hides `Cancel` button
- `cancelText` **string** - optional, custom text for `Cancel` button, defaults to `Cancel`
- `submitText` **string** - optional, custom text for `Submit` button, defaults to `OK`
- `defaultValue` **string** - optional, default value
- `minWidth` **string** - optional, minimal content with, defaults to `400px`
- `labelText` **string** - optional, input label text, defaults to `Value`
- `onCancel` **() => void** - optional, cancel click handler
- `onSubmit` **(value: string): void** - optional, submit click handler
- `...props` **Object** - the props of the element

## Example

```jsx
import { useEditor } from '@webstencils/core';
import { InputDialog, useDialog } from '@webstencils/ui';

function MyComponent() {
  const [openDialog, closeDialog] = useDialog();
  
  const onHandleButtonClick = () => {
    openDialog({
      children: (
        <InputDialog
          title={'Some input'}
          submitText="Submit"
          labelText="Name"
          defaultValue="Hello world"
          onCancel={closeDialog}
          onSubmit={(value) => {
            closeDialog();
            console.log(value);
          }}
        />
      )
    });
  };
  
  return (
    <>
      <button onClick={onHandleButtonClick}>
        Show input dialog
      </button>
    </>
  )
}
```
