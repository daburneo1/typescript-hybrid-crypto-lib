import { EncryptionAlgorithm } from './EncryptionAlgorithm';
import { EncryptionKey } from '../models/EncryptionKey';
import * as CryptoJS from 'crypto-js';

export class AesEncryptionAlgorithm implements EncryptionAlgorithm {
    encrypt(data: Uint8Array, key: EncryptionKey): string {
        const wordArray = CryptoJS.lib.WordArray.create(data);
        const encrypted = CryptoJS.AES.encrypt(wordArray, key.key, { padding: CryptoJS.pad.Pkcs7 }).toString();
        return encrypted;
    }

    decrypt(data: string, key: EncryptionKey): Uint8Array {
        const decrypted = CryptoJS.AES.decrypt(data, key.key, { padding: CryptoJS.pad.Pkcs7 });
        const decryptedWordArray = CryptoJS.enc.Utf8.stringify(decrypted);
        return new Uint8Array(decryptedWordArray.split('').map(char => char.charCodeAt(0)));
    }
}