import { Element, useNode } from '@webstencils/core';

import { Button } from '../Button';
import { Container } from '../Container';

export const Custom3BtnDrop = ({ children }) => {
  const {
    connectors: { connect }
  } = useNode();
  return (
    <div ref={connect} style={{ width: '100%', height: '100%' }}>
      {children}
    </div>
  );
};

Custom3BtnDrop.craft = {
  rules: {
    canMoveOut: (outgoingNodes, self, helpers) => {
      const {
        data: { nodes }
      } = self;
      const btnNodes = nodes.filter(
        (id) => helpers(id).get().data.type === Button
      );

      const outgoingButtonNodes = outgoingNodes.filter(
        (node) => node.data.type === Button
      );

      if (outgoingButtonNodes.length < btnNodes.length) {
        return true;
      }

      return false;
    }
  }
};
export const Custom3 = (props: any) => {
  return (
    <Container {...props} style={{ overflow: 'hidden' }}>
      <div style={{ width: '100%', marginBottom: '1rem' }}>
        <h2
          style={{ textAlign: 'center' }}
          className="app-text-xs app-text-white"
        >
          I must have at least 1 button
        </h2>
      </div>
      <Element canvas is={Custom3BtnDrop} id="wow">
        <Button background={{ r: 184, g: 247, b: 247, a: 1 }} />
      </Element>
    </Container>
  );
};

Custom3.craft = {
  ...Container.craft,
  displayName: 'Custom 3'
};
