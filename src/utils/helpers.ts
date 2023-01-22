/* eslint-disable no-bitwise */
// eslint-disable-next-line import/prefer-default-export
export const uuid = (): string => {
  let dt = new Date().getTime();

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    (c: string) => {
      const r = (dt + Math.random() * 16) % 16 | 0;

      dt = Math.floor(dt / 16);

      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    },
  );
};

export const emailValidator = (value: string): boolean => {
  const re = /^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w{2,}([-.]\\w+)*$/;

  return re.test(value);
};

export const nameValidator = (value: string): boolean => {
  const re = /^([a-z]+[,.]?[ ]?|[a-z]+['-]?)+$/;

  return re.test(value);
};
