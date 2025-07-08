const { encryptData, decryptData } = require('./utils/encryption');

const userName = encryptData("naval.ravikant");
const email = encryptData("naval@example.com");

console.log("Encrypted UserName:", userName);
console.log("Encrypted Email:", email);

const dname = decryptData(userName);
const demail = decryptData(email); 

console.log("Decrypted UserName:", dname);
console.log("Decrypted Email:", demail);
