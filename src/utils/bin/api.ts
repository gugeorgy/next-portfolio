/* eslint-disable import/prefer-default-export */
import bin from '.';

export const getCommands = async (): Promise<string> => {
  const commands = Object.keys(bin).sort();
  let c = '';

  for (let i = 1; i <= commands.length; i += 1) {
    if (i % commands.length === 0) {
      c += `${commands[i - 1]}\n`;
    } else {
      c += `${commands[i - 1]} `;
    }
  }

  return c.toLowerCase();
};
