import { Element, useNode } from '@webstencils/core';

import { Container } from '../Container';
import { Video } from '../Video';

export const Custom2VideoDrop = ({ children }) => {
  const {
    connectors: { connect }
  } = useNode();
  return (
    <div
      ref={connect}
      style={{ flex: '1 1 0%', marginLeft: '1.25rem', height: '100%' }}
    >
      {children}
    </div>
  );
};
Custom2VideoDrop.craft = {
  rules: {
    canMoveIn: (nodes, self, helper) => {
      return (
        nodes.every((node) => node.data.type === Video) &&
        helper(self.id).descendants().length === 0
      );
    }
  }
};
export const Custom2 = (props: any) => {
  return (
    <Container {...props} style={{ overflow: 'hidden' }}>
      <div style={{ width: '6rem' }}>
        <h2 className="app-text-xs app-text-white">
          You can only drop
          <br />
          one video here.
        </h2>
      </div>
      <Element canvas is={Custom2VideoDrop} id="wow">
        <Video />
      </Element>
    </Container>
  );
};

Custom2.craft = {
  ...Container.craft,
  displayName: 'Custom 2'
};
