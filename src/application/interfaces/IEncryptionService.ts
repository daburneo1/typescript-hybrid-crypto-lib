import { EncryptedData } from '../../domain/models/EncryptedData';
import { EncryptionKey } from '../../domain/models/EncryptionKey';

export interface IEncryptionService {
    encryptData(data: string, publicKey: EncryptionKey): EncryptedData;
    decryptData(data: string, privateKey: EncryptionKey): Uint8Array;
}