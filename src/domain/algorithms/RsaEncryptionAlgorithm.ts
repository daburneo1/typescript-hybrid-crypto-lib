import { EncryptionAlgorithm } from './EncryptionAlgorithm';
import { EncryptionKey } from '../models/EncryptionKey';
import * as forge from 'node-forge';
import * as fs from 'fs';
import * as path from 'path';

export class RsaEncryptionAlgorithm implements EncryptionAlgorithm {
    encrypt(data: Uint8Array, key: EncryptionKey): string {
        const publicKey = forge.pki.publicKeyFromPem(key.key);
        const binaryData = new TextDecoder().decode(data);
        const encrypted = publicKey.encrypt(binaryData, 'RSAES-PKCS1-V1_5');
        return forge.util.encode64(encrypted);
    }

    decrypt(data: string, key: EncryptionKey): Uint8Array {
        const privateKey = forge.pki.privateKeyFromPem(key.key);
        const decoded = forge.util.decode64(data);
        const decrypted = privateKey.decrypt(decoded, 'RSAES-PKCS1-V1_5');
        return new Uint8Array(Buffer.from(decrypted, 'binary'));
    }

    static loadPublicKeyFromString(keyString: string): EncryptionKey {
        return new EncryptionKey(keyString.trim());
    }

    static loadPrivateKeyFromString(keyString: string): EncryptionKey {
        return new EncryptionKey(keyString.trim());
    }
}