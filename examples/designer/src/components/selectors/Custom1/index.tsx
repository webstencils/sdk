import { Element, useNode } from '@webstencils/core';

import { Button } from '../Button';
import { Container } from '../Container';

export const OnlyButtons = ({ children, ...props }) => {
  const {
    connectors: { connect }
  } = useNode();
  return (
    <div
      title="only-buttons"
      ref={connect}
      style={{ width: '100%', marginTop: '1.25rem' }}
      {...props}
    >
      {children}
    </div>
  );
};

OnlyButtons.craft = {
  rules: {
    canMoveIn: (nodes) => nodes.every((node) => node.data.type === Button)
  }
};

export const Custom1 = (props: any) => {
  return (
    <Container {...props}>
      <h2
        style={{
          paddingLeft: '2.5rem',
          paddingRight: '2.5rem',
          paddingTop: '1.25rem',
          paddingBottom: '1.25rem'
        }}
        className="app-text-lg app-text-white"
      >
        I'm a component that only accepts
        <br /> buttons.
      </h2>
      <Element canvas id="wow" is={OnlyButtons}>
        <Button />
        <Button
          buttonStyle="outline"
          color={{ r: 255, g: 255, b: 255, a: 1 }}
        />
      </Element>
    </Container>
  );
};

Custom1.craft = {
  ...Container.craft,
  displayName: 'Custom 1'
};
