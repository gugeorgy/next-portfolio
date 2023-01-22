import React from 'react';

import PS1 from '@/components/ps1';
import Text from '@/components/text';

import { useHistory } from '@/hooks';

import styles from './History.module.css';

export interface HistoryRef {
  addNewHistory: (command: string, output: React.ReactNode) => void;
  clearHistory: () => void;
  historyCommands: ReadonlyArray<string>;
}

interface HistoryProps {
  onChange?: () => void;
  init?: () => Promise<React.ReactNode>;
}

const History = React.forwardRef<HistoryRef, HistoryProps>(
  (props, ref) => {
    const { init, onChange } = props;
    const { history, addNewHistory, clearHistory, historyCommands } =
      useHistory();

    React.useImperativeHandle(ref, () => ({
      addNewHistory,
      clearHistory,
      historyCommands,
    }));

    React.useEffect(() => {
      const callAsync = async () => {
        if (init) {
          const output = await init();

          addNewHistory('', output);
        }
      };

      callAsync();
    }, [addNewHistory, init]);

    React.useEffect(() => {
      if (onChange) onChange();
    }, [onChange, history]);

    return (
      <ul className={styles.history}>
        {history.map(item => (
          <li key={item.id} id={item.id}>
            <div>
              <PS1 />
              <Text className={styles.command}>{item.command}</Text>
            </div>
            {item.output}
          </li>
        ))}
      </ul>
    );
  },
);

History.displayName = 'History';

History.defaultProps = {
  onChange: undefined,
  init: undefined,
};

export default History;
