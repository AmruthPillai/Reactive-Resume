import md5Hex from 'md5-hex';

const getGravatarUrl = (email: string, size: number) => {
  const hash = md5Hex(email);

  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
};

export default getGravatarUrl;
