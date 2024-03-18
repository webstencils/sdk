import React, { Fragment } from 'react';
import { Node, NormalizeJsxNodeCallback } from '../interfaces';
import { createNode } from './createNode';

export function parseNodeFromJSX(
  jsx: React.ReactElement | string,
  normalize?: NormalizeJsxNodeCallback
): Node {
  let element = jsx as React.ReactElement;

  if (typeof element === 'string') {
    element = React.createElement(Fragment, {}, element) as React.ReactElement;
  }

  const actualType = element.type;

  return createNode(
    {
      data: {
        type: actualType,
        props: { ...element.props }
      }
    },
    (node) => {
      if (normalize) {
        normalize(node, element);
      }
    }
  );
}
