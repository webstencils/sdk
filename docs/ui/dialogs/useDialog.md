# useDialog

`Hook`, `@webstencils/ui`

A hook that provides access to dialog-related functions and state.

```jsx
const [openDialog, closeDialog] = useDialog();
```

The `openDialog` functions allows creating dialog instance with your custom layout,
and the `closeDialog` function closes the dialog you have created.

You can propagate the `closeDialog` function to your components, to control the closing behavior.

```jsx
const [openDialog, closeDialog] = useDialog();

const handleButtonClick = () => {
  openDialog({
    children: (
      <>
        {/* custom dialog content that controls close behavior */}
        <SomeComponent onClose={closeDialog} />
      </>
    )
  })
};
```

See also:

- [ConfirmDialog](./ConfirmDialog.md)
- [InputDialog](./InputDialog.md)
