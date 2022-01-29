const extractValidationMessage = (error: any): string => {
  const message = error.details.map((i: any) => i.message).join(',');
  return message.replace(/[`~!@#$%^&*()|+\-=?;:'",.<>{}[\]\\/]/gi, '');
};

const generateRandomString = (length: number): string => {
  let result = '';

  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

const slugify = (title: string, appendRandomString = false): string => {
  if (appendRandomString) {
    const randomString: string = generateRandomString(10);
    title = `${title} + ${randomString}`;
  }

  return title
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

export { generateRandomString, extractValidationMessage, slugify };
