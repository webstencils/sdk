import { ComponentTemplateProperty } from '@webstencils/core';

export interface PropertyEditorProps<T = any> {
  propertyDef: ComponentTemplateProperty;
  value?: T;
  size?: '1' | '2' | '3';

  onChanged: (value: T) => void;
}
