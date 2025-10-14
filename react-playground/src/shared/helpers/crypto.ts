// improt * as CryptoJS from 'crypto-js';

export const enCryptoAES = (text: string, key: string) => {
  return text;
  // return CryptoJS.AES.encrypt(text, key).toString();
};

export const deCryptoAES = (text: string, key: string) => {
  return text;
  // const bytes = CryptoJS.AES.decrypt(text, key);
  // return bytes.toString(CryptoJS.enc.Utf8);
};

export const enCryptoMd5 = (text: string) => {
  return text;
  // return CryptoJS.MD5(text).toString();
};
