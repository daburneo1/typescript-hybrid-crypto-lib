import { EncryptionAlgorithm } from './EncryptionAlgorithm';
import { EncryptionKey } from '../models/EncryptionKey';
import * as CryptoJS from 'crypto-js';

export class AesEncryptionAlgorithm implements EncryptionAlgorithm {
    // encrypt(data: Uint8Array, key: EncryptionKey): string {
    //     const wordArray = CryptoJS.lib.WordArray.create(data);
    //     const iv = CryptoJS.lib.WordArray.random(16);
    //     const encrypted = CryptoJS.AES.encrypt(wordArray, key.key, { padding: CryptoJS.pad.Pkcs7 }).toString();
    //     return encrypted;
    // }

    encrypt(data: Uint8Array, key: EncryptionKey): string {
        const wordArray = CryptoJS.lib.WordArray.create(data);
        const iv = CryptoJS.lib.WordArray.random(16);

        // Cifra los datos
        const encrypted = CryptoJS.AES.encrypt(wordArray, key.key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
        });

        // Codifica en Base64 el IV y los datos cifrados
        const ivBase64 = CryptoJS.enc.Base64.stringify(iv);
        const encryptedBase64 = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

        console.log('IV Base64:', ivBase64);
        console.log('Encrypted Data Base64:', encryptedBase64);

        // Retorna la concatenación en formato Base64 separado por ';'
        return `${ivBase64};${encryptedBase64}`;
    }

    decrypt(data: string, key: EncryptionKey): Uint8Array {
        const decrypted = CryptoJS.AES.decrypt(data, key.key, { padding: CryptoJS.pad.Pkcs7 });
        const decryptedWordArray = CryptoJS.enc.Utf8.stringify(decrypted);
        return new Uint8Array(decryptedWordArray.split('').map(char => char.charCodeAt(0)));
    }
}