import bcrypt from "bcrypt";
var CryptoJS = require("crypto-js");
import sha256 from "crypto-js/sha256";
var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");

console.log();

export function hashPasse(mdpClaire: string) {
  return SHA256(mdpClaire);
  //   console.log("encrypted text", ciphertext.toString());
}
