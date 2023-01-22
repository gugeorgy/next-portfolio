/* eslint-disable import/prefer-default-export */
import { RefObject } from 'react';
import { useEventListener } from 'usehooks-ts';

type Handler = (event: KeyboardEvent, keys?: string[]) => void;

export function useOnKeyPress<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  keys?: string[],
  keyboardEvent: 'keydown' | 'keypress' | 'keyup' = 'keydown',
): void {
  useEventListener(keyboardEvent, event => {
    const el = ref?.current;

    // Do nothing if clicking ref's element or descendent elements
    if (!el || document.activeElement !== el) {
      return;
    }

    if (keys) {
      if (keys.length) {
        if (keys.includes(event.key)) {
          // event.preventDefault();
          handler(event, keys);
        }
      }
    } else {
      // event.preventDefault();
      handler(event);
    }
  });
}
