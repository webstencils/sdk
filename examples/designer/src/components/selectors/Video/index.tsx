import styled from '@emotion/styled';
import { useNode, useEditor } from '@webstencils/core';
import YouTube from 'react-youtube';

import { VideoSettings } from './VideoSettings';

const YoutubeDiv = styled.div<any>`
  width: 100%;
  height: 100%;
  > div {
    height: 100%;
  }
  iframe {
    pointer-events: ${(props) => (props.enabled ? 'none' : 'auto')};
    // width:100%!important;
    // height:100%!important;
  }
`;

export const Video = (props: any) => {
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled
  }));
  const {
    connectors: { connect }
  } = useNode((node) => ({
    selected: node.events.selected
  }));

  const { videoId } = props;

  return (
    <YoutubeDiv ref={connect} enabled={enabled}>
      <YouTube
        videoId={videoId}
        opts={{
          width: '100%',
          height: '100%'
        }}
      />
    </YoutubeDiv>
  );
};

Video.craft = {
  displayName: 'Video',
  props: {
    videoId: '1Z0iA9K1o8M'
  },
  related: {
    toolbar: VideoSettings
  }
};
