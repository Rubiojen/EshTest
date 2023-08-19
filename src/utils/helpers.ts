// Async
export const wait = (delay: number): Promise<void> =>
  new Promise(res => setTimeout(res, delay));

export const LogColors = {
  Red: '\u001b[1;31m',
  Green: '\u001b[1;32m',
  Yellow: '\u001b[1;33m',
  Blue: '\u001b[1;34m',
  Purple: '\u001b[1;35m',
  Cyan: '\u001b[1;36m',
};

export const logWithColor = (
  title: string,
  msg?: any,
  color?: keyof typeof LogColors,
) => {
  'worklet';
  return console.log(
    `${LogColors[color || 'Green']}${title}::: ${
      typeof msg !== 'string' ? JSON.stringify(msg || '') : msg || ''
    }`,
  );
};

export const validateName = (name?: string) =>
  name ? name.trim().length > 1 : false;

export const isValidDate = (dateString: string): boolean => {
  // Check if the string matches the format DD/MM/YYYY
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/;
  if (!regex.test(dateString)) {
    return false;
  }

  // Parse the date parts
  const parts = dateString.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Months are 0-based in JavaScript
  const year = parseInt(parts[2], 10);

  // Check the parsed date
  const date = new Date(year, month, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month &&
    date.getDate() === day
  );
};

export const convertToISOFormat = (dateStr: string): string => {
  const [day, month, year] = dateStr.split('.');
  return `${day}.${month}.${year}`;
};

export const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('.').map(Number);
  return new Date(year, month - 1, day);
};
