/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

'use client';

import React from 'react';

import PS1 from '@/components/ps1';
import Input from '@/components/input';

import { Banner } from '@/commands';

import History, { HistoryRef } from '@/containers/history';

import { shell, tabCompletion } from '@/utils';

import { useOnKeyPress } from '@/hooks';

import styles from './Home.module.css';

export default function Home() {
  const [isVisible, setVisible] = React.useState<boolean>(true);
  const [lastCommandIndex, setLastCommandIndex] =
    React.useState<number>(0);

  const historyRef = React.useRef<HistoryRef>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const init = React.useCallback(() => Banner(), []);

  const showInput = React.useCallback(
    () => setVisible(true),
    [setVisible],
  );

  const hideInput = React.useCallback(
    () => setVisible(false),
    [setVisible],
  );

  const focusInput = (value?: string) => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: 'smooth' });
      inputRef.current.focus({ preventScroll: true });
      inputRef.current.value += value ?? '';
    }
  };

  const onSubmit = (command: string) => {
    if (historyRef.current) {
      shell(
        historyRef.current.addNewHistory,
        historyRef.current.clearHistory,
        command,
        showInput,
        hideInput,
      );
      focusInput();
    }
  };

  /**
   * * Focus Input on key press on Term.
   */
  useOnKeyPress(
    wrapperRef,
    event => {
      event.preventDefault();
      if (event.key === 'Enter') return;
      focusInput(event.key);
    },
    undefined,
    'keypress',
  );

  /**
   * * Tab auto completion on input
   */
  useOnKeyPress(
    inputRef,
    event => {
      event.preventDefault();
      if (inputRef.current) {
        const tabValue = tabCompletion(inputRef.current.value);

        if (tabValue) inputRef.current.value = tabValue;
      }
    },
    ['Tab'],
  );

  /**
   * * Handle Arrow key press [up|Down] on input
   */
  useOnKeyPress(
    inputRef,
    (event, keys) => {
      if (inputRef.current && historyRef.current && keys) {
        event.preventDefault();
        const commands = historyRef.current.historyCommands;

        switch (event.key) {
          case keys[0]:
            if (commands.length) {
              const index: number = lastCommandIndex - 1;

              if (index > 0) {
                setLastCommandIndex(index);
                inputRef.current.value = commands[commands.length - index];
              } else {
                setLastCommandIndex(0);
                if (commands.includes(inputRef.current.value))
                  inputRef.current.value = '';
              }
            }
            break;

          case keys[1]:
            if (commands.length) {
              const index: number = lastCommandIndex + 1;

              if (index <= commands.length) {
                setLastCommandIndex(index);
                inputRef.current.value = commands[commands.length - index];
              }
            }
            break;

          case keys[2]:
            setLastCommandIndex(0);
            break;

          default:
            break;
        }
      }
    },
    ['ArrowDown', 'ArrowUp', 'Enter'],
  );

  return (
    <div className={styles.home}>
      <div ref={wrapperRef} className={styles.wrapper} tabIndex={0}>
        <History ref={historyRef} init={init} onChange={focusInput} />
        {isVisible ? (
          <div className={styles.prompt}>
            <PS1 />
            <Input inputRef={inputRef} onSubmit={onSubmit} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
