/* eslint-disable import/prefer-default-export */
import React from 'react';

import { uuid } from '@/utils';

interface History {
  command: string;
  createdAt: Date;
  id: string;
  output: React.ReactNode;
}

interface UseHistoryOutput {
  history: ReadonlyArray<History>;
  addNewHistory: (command: string, output: React.ReactNode) => void;
  clearHistory: () => void;
  historyCommands: ReadonlyArray<string>;
}

export function useHistory(): UseHistoryOutput {
  const [history, setHistory] = React.useState<History[]>([]);

  const historyCommands = React.useMemo(
    () =>
      history.map(({ command }) => command!).filter(command => command),
    [history],
  );

  const addNewHistory = React.useCallback(
    (command: string, output: React.ReactNode) => {
      setHistory(current =>
        current.concat({
          command,
          createdAt: new Date(),
          id: uuid(),
          output,
        }),
      );
      // console.log('[useHistory](addNewHistory): rendering...', output);
    },
    [],
  );

  const clearHistory = React.useCallback(() => {
    setHistory([]);
    // console.log('[useHistory](clearHistory): rendering...');
  }, []);

  return { history, addNewHistory, clearHistory, historyCommands };
}
