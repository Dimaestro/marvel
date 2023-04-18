import md5 from "md5";

export function getHash(ts, privatKey, publicKey) {
  return md5(ts + privatKey + publicKey);
}