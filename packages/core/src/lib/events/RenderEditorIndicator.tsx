import React, { useEffect } from 'react';

import { useInternalEditor } from '../editor/useInternalEditor';
import { getDOMInfo } from '../utils/getDOMInfo';
import { useEventHandler } from './EventContext';
import { RenderIndicator } from './RenderIndicator';
import movePlaceholder from './movePlaceholder';

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
