import Text from '@/components/text';
import React from 'react';

import styles from './About.module.css';

export default async function About() {
  const content = `Web designer and developer from 
Southampthon, UK. I create custom website to 
help businesses do better online.`;

  return (
    <div className="flex flex-col gap-4">
      <h2>Hey, I&apos;m Seb.</h2>
      <Text className="whitespace-pre-wrap">{content}</Text>
      <Text>
        Type &apos;
        <Text className={styles.command}>project</Text>&apos; to see my
        jobs!
      </Text>
    </div>
  );
}
