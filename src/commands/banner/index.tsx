import Image from 'next/image';

import config from '~/config.json';

import Text from '@/components/text';

import styles from './Banner.module.css';

export default async function Banner() {
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <div className={styles.boxImage}>
          <Image
            src="/assets/images/logo.jpg"
            alt="logo"
            width={100}
            height={100}
          />
        </div>
        <Text className={styles.logo}>{config.name}</Text>
      </div>
      <Text>
        Type &apos;<Text className={styles.command}>help</Text>&apos; to
        see the list of available commands. Type &apos;
        <Text className={styles.command}>sumfetch</Text>&apos; to display
        summary. Type &apos;
        <Text className={styles.command}>repo</Text>&apos; or&nbsp;
        <a href="/" target="_blank" data-title="clickherefor">
          clickherefor
        </a>
        &nbsp; the Github repository.
      </Text>
    </div>
  );
}
