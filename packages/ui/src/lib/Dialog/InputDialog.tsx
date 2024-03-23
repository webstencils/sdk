import { useState, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import { ConfirmDialog, ConfirmDialogProps } from './ConfirmDialog';

export type InputDialogProps = Omit<
  ConfirmDialogProps,
  'content' | 'onSubmit'
> & {
  minWidth?: string;
  labelText?: string;
  defaultValue?: string;
  onSubmit(value: string): void;
};

export function InputDialog({
  defaultValue = '',
  minWidth = '400px',
  labelText = 'Value',
  onSubmit,
  ...props
}: InputDialogProps) {
  const [value, setValue] = useState<string>(defaultValue);

  return (
    <ConfirmDialog
      {...props}
      onSubmit={() => onSubmit(value)}
      content={
        <div style={{ minWidth }}>
          <TextField
            fullWidth
            label={labelText}
            id="label1"
            value={value}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setValue(event.target.value);
            }}
          />
        </div>
      }
    ></ConfirmDialog>
  );
}
