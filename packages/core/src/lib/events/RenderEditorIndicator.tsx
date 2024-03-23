import React, { useEffect } from 'react';
import { useInternalEditor } from '../editor/useInternalEditor';
import { getDOMInfo } from '../utils/getDOMInfo';
import { DropPosition, DOMInfo } from '../interfaces';
import { useEventHandler } from './EventContext';
import { RenderIndicator } from './RenderIndicator';

function movePlaceholder(
  pos: DropPosition,
  canvasDOMInfo: DOMInfo, // which canvas is cursor at
  bestTargetDomInfo: DOMInfo | null, // closest element in canvas (null if canvas is empty)
  thickness = 2
) {
  let t = 0,
    l = 0,
    w = 0,
    h = 0;
  const where = pos.where;
  const elDim = bestTargetDomInfo;

  if (elDim) {
    // If it's not in flow (like 'float' element)
    if (!elDim.inFlow) {
      w = thickness;
      h = elDim.outerHeight;
      t = elDim.top;
      l = where === 'before' ? elDim.left : elDim.left + elDim.outerWidth;
    } else {
      w = elDim.outerWidth;
      h = thickness;
      t = where === 'before' ? elDim.top : elDim.bottom;
      l = elDim.left;
    }
  } else {
    if (canvasDOMInfo) {
      t = canvasDOMInfo.top + canvasDOMInfo.padding.top;
      l = canvasDOMInfo.left + canvasDOMInfo.padding.left;
      w =
        canvasDOMInfo.outerWidth -
        canvasDOMInfo.padding.right -
        canvasDOMInfo.padding.left -
        canvasDOMInfo.margin.left -
        canvasDOMInfo.margin.right;
      h = thickness;
    }
  }
  return {
    top: `${t}px`,
    left: `${l}px`,
    width: `${w}px`,
    height: `${h}px`
  };
}

export const RenderEditorIndicator = () => {
  const { indicator, indicatorOptions, enabled } = useInternalEditor(
    (state) => ({
      indicator: state.indicator,
      indicatorOptions: state.options.indicator,
      enabled: state.options.enabled
    })
  );

  const handler = useEventHandler();

  useEffect(() => {
    if (!handler) {
      return;
    }

    if (!enabled) {
      handler.disable();
      return;
    }

    handler.enable();
  }, [enabled, handler]);

  if (!indicator) {
    return null;
  }

  return React.createElement(RenderIndicator, {
    style: {
      ...movePlaceholder(
        indicator.placement,
        getDOMInfo(indicator.placement.parent.dom),
        indicator.placement.currentNode &&
          getDOMInfo(indicator.placement.currentNode.dom),
        indicatorOptions.thickness
      ),
      backgroundColor: indicator.error
        ? indicatorOptions.error
        : indicatorOptions.success,
      transition: indicatorOptions.transition || '0.2s ease-in'
    },
    parentDom: indicator.placement.parent.dom
  });
};
