import React, { useState } from 'react';
import { Checkbox } from '@radix-ui/themes';
import { PropertyEditorProps } from './PropertyEditorProps';

export function BoolPropEditor(props: PropertyEditorProps<boolean>) {
  const [value, setValue] = useState(props.value === true);

  const updateValue = (value: boolean) => {
    setValue(value);
    props.onChanged(value);
  };

  return (
    <Checkbox
      size={props.size}
      checked={value}
      onCheckedChange={(checked: boolean) => updateValue(checked)}
    />
  );
}
