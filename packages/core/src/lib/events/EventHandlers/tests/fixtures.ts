import { vi } from 'vitest';
import { DerivedEventHandlers } from '../DerivedEventHandlers';
import { EventHandlers } from '../EventHandlers';

export function triggerMouseEvent(node: HTMLElement, eventType: string) {
  const clickEvent = new MouseEvent(eventType, {
    bubbles: true,
    cancelable: true
  });
  node.dispatchEvent(clickEvent);
}

export const createTestHandlers = (): any => {
  vi.clearAllMocks();

  const testHandlers = [
    'connect',
    'select',
    'hover',
    'drag',
    'drop',
    'create'
  ].reduce((accum: any, key) => {
    const cleanup = vi.fn();
    const init = vi.fn().mockImplementation(() => {
      return cleanup;
    });
    accum[key] = {
      init,
      cleanup,
      events: {
        mousedown: vi.fn().mockImplementation((e) => {
          e.craft.stopPropagation();
        }),
        mouseover: vi.fn()
      }
    };

    return accum;
  }, {});

  class CoreHandlers extends EventHandlers {
    handlers() {
      return Object.keys(testHandlers).reduce((accum: any, key) => {
        accum[key] = (el: any, ...args: any[]) => {
          const cleanup = testHandlers[key].init(el, ...args);
          const listenersToRemove = Object.keys(testHandlers[key].events).map(
            (eventName: any) => {
              const removeCraftListener = this.addCraftEventListener(
                el,
                eventName,
                testHandlers[key].events[eventName]
              );
              return () => removeCraftListener();
            }
          );

          return () => {
            cleanup();
            listenersToRemove.forEach((r) => r());
          };
        };
        return accum;
      }, {});
    }
  }

  const instance = new CoreHandlers();

  return {
    instance,
    handlers: testHandlers
  };
};

export const createTestDerivedHandlers = (core: any): any => {
  vi.clearAllMocks();

  const testHandlers = ['connect', 'drag'].reduce((accum: any, key) => {
    const cleanup = vi.fn();
    const init = vi.fn().mockImplementation(() => cleanup);
    accum[key] = {
      init,
      cleanup,
      events: {
        mousedown: vi.fn(),
        mouseover: vi.fn()
      }
    };

    return accum;
  }, {});

  class TestDerivedHandlers extends DerivedEventHandlers<any> {
    handlers() {
      return Object.keys(testHandlers).reduce((accum: any, key) => {
        accum[key] = (el: any, ...args: any[]) => {
          const cleanup = testHandlers[key].init(el, ...args);
          const listenersToRemove = Object.keys(testHandlers[key].events).map(
            (eventName: any) => {
              const removeCraftListener = this.addCraftEventListener(
                el,
                eventName,
                testHandlers[key].events[eventName]
              );

              return () => removeCraftListener();
            }
          );

          const cleanupParent = this.inherit((connectors) => {
            connectors[key](el, ...args);
          });

          return () => {
            cleanup();
            listenersToRemove.forEach((r) => r());
            cleanupParent();
          };
        };

        return accum;
      }, {});
    }
  }

  const instance = new TestDerivedHandlers(core);

  return {
    instance,
    handlers: testHandlers
  };
};
