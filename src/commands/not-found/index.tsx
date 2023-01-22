import React from 'react';
import { CommandProps } from '@/commands/CommandProps';
import Text from '@/components/text';

export default async function NotFound(props: CommandProps) {
  const { args } = props;

  return (
    <Text>
      <Text className="text-light-primary">shell:</Text> command not
      found:&nbsp;
      <Text className="text-light-error">{args?.join()}</Text>. Try &apos;
      <Text className="text-light-success">help</Text>&apos; to get
      started.
    </Text>
  );
}
