import { PropertyGroup } from '../PropertyGroup';
import { PropertyEditor } from './PropertyEditor';

export function MarginEditor() {
  return (
    <PropertyGroup title="Margin">
      <PropertyEditor propKey="margin" index={0} type="slider" label="Top" />
      <PropertyEditor propKey="margin" index={1} type="slider" label="Right" />
      <PropertyEditor propKey="margin" index={2} type="slider" label="Bottom" />
      <PropertyEditor propKey="margin" index={3} type="slider" label="Left" />
    </PropertyGroup>
  );
}
