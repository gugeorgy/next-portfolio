/* eslint-disable jsx-a11y/no-autofocus */

'use client';

import React from 'react';

import styles from './Input.module.css';

interface InputProps {
  inputRef?: React.MutableRefObject<HTMLInputElement | null>;
  onSubmit?: (value: string) => void;
}

export default function Input(props: InputProps) {
  const { inputRef, onSubmit } = props;

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (inputRef?.current && onSubmit) {
        onSubmit(inputRef.current.value);
        inputRef.current.value = '';
      }
    }
  };

  return (
    <form className={styles.form}>
      <input
        ref={inputRef}
        type="text"
        onKeyDown={handleKeyPress}
        autoFocus
      />
    </form>
  );
}
