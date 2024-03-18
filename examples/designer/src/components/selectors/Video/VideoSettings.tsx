import { ToolbarSection, ToolbarItem } from '../../editor';

export const VideoSettings = () => {
  return (
    <ToolbarSection title="Youtube">
      <ToolbarItem full={true} propKey="videoId" type="text" label="Video ID" />
    </ToolbarSection>
  );
};
