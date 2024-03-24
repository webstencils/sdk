import { PropertyGroup } from '../PropertyGroup';
import { PropertyEditor } from './PropertyEditor';

export function PaddingEditor() {
  return (
    <PropertyGroup title="Padding">
      <PropertyEditor propKey="padding" index={0} type="slider" label="Top" />
      <PropertyEditor propKey="padding" index={1} type="slider" label="Right" />
      <PropertyEditor
        propKey="padding"
        index={2}
        type="slider"
        label="Bottom"
      />
      <PropertyEditor propKey="padding" index={3} type="slider" label="Left" />
    </PropertyGroup>
  );
}
