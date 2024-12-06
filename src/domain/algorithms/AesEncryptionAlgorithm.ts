import { EncryptionAlgorithm } from './EncryptionAlgorithm';
import { EncryptionKey } from '../models/EncryptionKey';
import * as CryptoJS from 'crypto-js';

export class AesEncryptionAlgorithm implements EncryptionAlgorithm {
    encrypt(data: Uint8Array, key: EncryptionKey): string {
        const keyBytes = CryptoJS.SHA512(key.key);
        const aesKey = CryptoJS.lib.WordArray.create(keyBytes.words.slice(0, 8)); // Use the first 32 bytes of the SHA-512 hash
        const iv = CryptoJS.lib.WordArray.random(16);
        const wordArray = CryptoJS.lib.WordArray.create(data);
        const encrypted = CryptoJS.AES.encrypt(wordArray, aesKey, { iv: iv, padding: CryptoJS.pad.Pkcs7 }).ciphertext;
        const result = iv.concat(encrypted);
        return CryptoJS.enc.Base64.stringify(result);
    }

    decrypt(data: string, key: EncryptionKey): Uint8Array {
        const keyBytes = CryptoJS.SHA512(key.key);
        const aesKey = CryptoJS.lib.WordArray.create(keyBytes.words.slice(0, 8)); // Use the first 32 bytes of the SHA-512 hash
        const dataBytes = CryptoJS.enc.Base64.parse(data);
        const iv = CryptoJS.lib.WordArray.create(dataBytes.words.slice(0, 4)); // First 16 bytes for IV
        const encrypted = CryptoJS.lib.WordArray.create(dataBytes.words.slice(4)); // Remaining bytes for encrypted data
        const cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext: encrypted });
        const decrypted = CryptoJS.AES.decrypt(cipherParams, aesKey, { iv: iv, padding: CryptoJS.pad.Pkcs7 });
        const decryptedWordArray = CryptoJS.enc.Utf8.stringify(decrypted);
        return new Uint8Array(decryptedWordArray.split('').map(char => char.charCodeAt(0)));
    }
}