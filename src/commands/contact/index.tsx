import React from 'react';

import { CommandProps } from '@/commands/CommandProps';

import Main from './Contact';

export default async function Contact(props: CommandProps) {
  return <Main {...props} />;
}
