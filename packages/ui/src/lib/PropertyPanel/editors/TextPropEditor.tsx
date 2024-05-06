import React, { useState } from 'react';
import { TextArea } from '@radix-ui/themes';
import { PropertyEditorProps } from './PropertyEditorProps';

export function TextPropEditor(props: PropertyEditorProps) {
  const [value, setValue] = useState(props.value || '');

  const updateValue = (value: string) => {
    setValue(value);
    props.onChanged(value);
  };

  return (
    <TextArea
      size={props.size}
      value={value}
      onChange={(event) => updateValue(event.target.value)}
    />
  );
}
