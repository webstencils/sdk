import React, { useState } from 'react';
import { Flex, IconButton, Select, Tooltip } from '@radix-ui/themes';
import { Cross2Icon } from '@radix-ui/react-icons';
import { PropertyEditorProps } from './PropertyEditorProps';

export function EnumPropEditor(props: PropertyEditorProps) {
  const [value, setValue] = useState(props.value || '');

  const defaultValue = props.propertyDef.default || '';
  const isModified = value !== defaultValue;
  const placeholder = props.propertyDef.placeholder || 'default';

  const updateValue = (value: string) => {
    setValue(value);
    props.onChanged(value);
  };

  const resetValue = () => {
    setValue(defaultValue);
    props.onChanged(defaultValue);
  };

  return (
    <Flex gap="2" align="center">
      <Select.Root
        size={props.size}
        value={value}
        onValueChange={(value) => updateValue(value)}
      >
        <Select.Trigger placeholder={placeholder} />
        <Select.Content>
          {props.propertyDef.values.map((value) => (
            <Select.Item key={value} value={value}>
              {value}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>

      {isModified && (
        <Tooltip content="Reset to default" side="top" align="center">
          <IconButton
            variant="ghost"
            color="gray"
            radius="full"
            size={props.size}
            onClick={resetValue}
          >
            <Cross2Icon />
          </IconButton>
        </Tooltip>
      )}
    </Flex>
  );
}
