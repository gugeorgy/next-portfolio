import React from 'react';

import { CommandProps } from '@/commands';

import Text from '@/components/text';
import Input from '@/components/input';

import { useOnKeyPress } from '@/hooks';

import { emailValidator, nameValidator } from '@/utils';

export interface ContactProps extends CommandProps {}

export default function Contact({ showInput, hideInput }: ContactProps) {
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>('');
  const [msgError, setMsgError] = React.useState<string>('');
  const [info, setInfo] = React.useState<string>('Enter your Name...\n');

  const [IsReset, setReset] = React.useState<boolean>(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const reset = React.useCallback(
    (value?: string) => {
      setReset(true);
      setInfo(value ?? '');
      setMsgError('');
      if (showInput) showInput();
    },
    [setInfo, setMsgError, showInput],
  );

  const handleSubmit = (value: string) => {
    if (inputRef.current) {
      if (!name) {
        if (nameValidator(value)) {
          setName(value);
          setInfo('Enter Your Email...');
          setMsgError('');
        } else {
          setMsgError(`'${value}' - is not a valid name.\n`);
        }
      } else if (!email) {
        if (emailValidator(value)) {
          setEmail(value);
          setInfo('Enter Your Message...');
          setMsgError('');
        } else {
          setMsgError(`'${value}' - is not a valid email.\n`);
        }
      } else if (!message) {
        if (value) {
          setMessage(value);
          reset();
        } else {
          setMsgError('Please write something.\n');
        }
      }
      // reset input value
      inputRef.current.value = '';
    }
  };

  const content = React.useMemo(() => {
    let s = name ? `Name: ${name}\n` : '';

    s += email ? `Email: ${email}\n` : '';
    s += message ? `Message: ${message}\n` : '';

    return s;
  }, [email, message, name]);

  useOnKeyPress(inputRef, event => {
    if (inputRef.current) {
      if (event.key === 'c' && event.ctrlKey) {
        event.preventDefault();
        reset('Process interrupted!');
      }
    }
  });

  React.useEffect(() => {
    // console.log('contact:', args);
    if (hideInput) hideInput();
  }, [hideInput]);

  return (
    <div>
      <Text contentStyle={{ whiteSpace: 'pre-line' }}>
        {content}
        {msgError}
        {info}
      </Text>
      {!IsReset ? (
        <Input inputRef={inputRef} onSubmit={handleSubmit} />
      ) : null}
    </div>
  );
}
