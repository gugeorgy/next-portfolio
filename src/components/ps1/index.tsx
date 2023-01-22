import React from 'react';

import config from '~/config.json';

import Text from '@/components/text';

import styles from './PS1.module.css';

export default function PS1() {
  return (
    <Text className={styles.PS1}>
      <Text className={styles.username}>{config.ps1_username}</Text>
      <Text>@</Text>
      <Text className={styles.hostname}>{config.ps1_hostname}</Text>
      <Text>:$&nbsp;~&nbsp;</Text>
    </Text>
  );
}
