import { EncryptionAlgorithm } from './EncryptionAlgorithm';
import { EncryptionKey } from '../models/EncryptionKey';
import * as forge from 'node-forge';
import * as fs from 'fs';
import * as path from 'path';

export class RsaEncryptionAlgorithm implements EncryptionAlgorithm {
    encrypt(data: Uint8Array, key: EncryptionKey): string {
        const publicKey = forge.pki.publicKeyFromPem(key.key);
        const encrypted = publicKey.encrypt(Buffer.from(data).toString('binary'), 'RSA-OAEP');
        return forge.util.encode64(encrypted);
    }

    decrypt(data: string, key: EncryptionKey): Uint8Array {
        const privateKey = forge.pki.privateKeyFromPem(key.key);
        const decoded = forge.util.decode64(data);
        const decrypted = privateKey.decrypt(decoded, 'RSA-OAEP');
        return new Uint8Array(Buffer.from(decrypted, 'binary'));
    }

    static loadPublicKeyFromFile(filePath: string): EncryptionKey {
        const absolutePath = path.resolve(filePath);
        const publicKeyPem = fs.readFileSync(absolutePath, 'utf16le').trim();
        return new EncryptionKey(publicKeyPem);
    }

    static loadPrivateKeyFromFile(filePath: string): EncryptionKey {
        const absolutePath = path.resolve(filePath);
        const privateKeyPem = fs.readFileSync(absolutePath, 'utf8').trim();
        return new EncryptionKey(privateKeyPem);
    }
}