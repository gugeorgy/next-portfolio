import React from 'react';

import styles from './Icon.module.css';

interface IconProps {
  icon: React.ReactNode;
  className?: string;
}

export default function Icon({ className = undefined, icon }: IconProps) {
  return <div className={`${styles.icon} ${className ?? ''}`}>{icon}</div>;
}
