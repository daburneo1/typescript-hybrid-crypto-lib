import { IEncryptionService } from '../interfaces/IEncryptionService';
import { AesEncryptionAlgorithm } from '../../domain/algorithms/AesEncryptionAlgorithm';
import { RsaEncryptionAlgorithm } from '../../domain/algorithms/RsaEncryptionAlgorithm';
import { EncryptedData } from '../../domain/models/EncryptedData';
import { EncryptionKey } from '../../domain/models/EncryptionKey';
import * as CryptoJS from 'crypto-js';

export class HybridEncryptionService implements IEncryptionService {
    constructor(
        private aesAlgorithm = new AesEncryptionAlgorithm(),
        private rsaAlgorithm = new RsaEncryptionAlgorithm()
    ) {}

    encryptData(data: Uint8Array, publicKey: EncryptionKey): EncryptedData {
        const aesKey = new EncryptionKey(CryptoJS.lib.WordArray.random(16).toString());
        const aesEncryptedData = this.aesAlgorithm.encrypt(data, aesKey);
        const rsaEncryptedKey = this.rsaAlgorithm.encrypt(new TextEncoder().encode(aesKey.key), publicKey);
        const hybridEncryptedData = `${rsaEncryptedKey}:${aesEncryptedData}`;
        return new EncryptedData(hybridEncryptedData, true);
    }

    decryptData(data: EncryptedData, privateKey: EncryptionKey): Uint8Array {
        if (!data.isEncrypted) return Uint8Array.from(Buffer.from(data.data, 'utf8'));

        const [rsaEncryptedKey, aesEncryptedData] = data.data.split(':');
        const decryptedAesKey = this.rsaAlgorithm.decrypt(rsaEncryptedKey, privateKey);
        const aesKey = new EncryptionKey(new TextDecoder().decode(decryptedAesKey));
        return this.aesAlgorithm.decrypt(aesEncryptedData, aesKey);
    }
}