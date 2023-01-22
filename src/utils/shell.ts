/* eslint-disable import/prefer-default-export */

import { CommandProps } from '@/commands/CommandProps';
import NotFound from '@/commands/not-found';

import bin from './bin';

type CommandT = {
  [key: string]: (props: CommandProps) => Promise<React.ReactNode>;
};

const commands: CommandT = bin;

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const shell = async (
  addNewHistory: (command: string, output: React.ReactNode) => void,
  clearHistory: () => void,
  command: string,
  showInput: () => void,
  hideInput: () => void,
) => {
  const args: string[] = command.split(' ');

  const arg = capitalize(args[0].toLowerCase());

  if (arg === 'Clear') {
    clearHistory();
  } else if (arg === '') {
    addNewHistory(command, '');
  } else if (Object.keys(commands).indexOf(arg) === -1) {
    const output = await NotFound({ args });

    addNewHistory(command, output);
  } else {
    const output = await commands[arg]({
      args: args.slice(1),
      hideInput,
      showInput,
    });

    addNewHistory(command, output);
  }
};
