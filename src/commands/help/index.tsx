import React from 'react';

import Text from '@/components/text';

import { getCommands } from '@/utils/bin/api';

export default async function Help() {
  const data = await getCommands();

  const content = `Welcome! Here are all the available commands:\n
  ${data}
  [tab]: trigger completion.
  [ctrl+l]/clear: clear terminal.\n
  Type 'sumfetch' to display summary.
  `;

  return <Text contentStyle={{ whiteSpace: 'pre-line' }}>{content}</Text>;
}
