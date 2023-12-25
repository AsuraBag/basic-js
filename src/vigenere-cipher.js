const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  encrypt(message, key) {
    if (!message || !key) throw new Error('Incorrect arguments!');

    const messageUpper = message.toUpperCase();
    const keyUpper = key.toUpperCase();
    let encryptedMessage = '';

    for (let i = 0, j = 0; i < messageUpper.length; i++) {
      const char = messageUpper.charCodeAt(i);

      if (char >= 65 && char <= 90) {
        const shift = keyUpper.charCodeAt(j % keyUpper.length) - 65;
        const encryptedChar = String.fromCharCode(((char - 65 + shift) % 26) + 65);
        encryptedMessage += encryptedChar;
        j++;
      } else {
        encryptedMessage += messageUpper[i];
      }
    }

    return this.isDirect ? encryptedMessage : encryptedMessage.split('').reverse().join('');
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) throw new Error('Incorrect arguments!');

    const encryptedMessageUpper = encryptedMessage.toUpperCase();
    const keyUpper = key.toUpperCase();
    let decryptedMessage = '';

    for (let i = 0, j = 0; i < encryptedMessageUpper.length; i++) {
      const char = encryptedMessageUpper.charCodeAt(i);

      if (char >= 65 && char <= 90) {
        const shift = keyUpper.charCodeAt(j % keyUpper.length) - 65;
        const decryptedChar = String.fromCharCode(((char - 65 - shift + 26) % 26) + 65);
        decryptedMessage += decryptedChar;
        j++;
      } else {
        decryptedMessage += encryptedMessageUpper[i];
      }
    }

    return this.isDirect ? decryptedMessage : decryptedMessage.split('').reverse().join('');
  }
  }

module.exports = {
  VigenereCipheringMachine
};
