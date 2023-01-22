/* eslint-disable import/prefer-default-export */
import bin from '@/utils/bin';

export const tabCompletion = (command: string): string | undefined => {
  if (command) {
    const commands = Object.keys(bin)
      .map(entry => entry.toLowerCase())
      .filter(entry => entry.startsWith(command.toLowerCase().trim()));

    return commands[0];
  }

  return 'help';
};
