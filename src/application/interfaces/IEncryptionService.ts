import { EncryptedData } from '../../domain/models/EncryptedData';
import { EncryptionKey } from '../../domain/models/EncryptionKey';

export interface IEncryptionService {
    encryptData(data: Uint8Array, publicKey: EncryptionKey): EncryptedData;
    decryptData(data: EncryptedData, privateKey: EncryptionKey): Uint8Array;
}