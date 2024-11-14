import {EncryptionKey} from "../models/EncryptionKey";

export interface EncryptionAlgorithm {
    encrypt(data: Uint8Array, key: EncryptionKey): string;
    decrypt(data: string, key: EncryptionKey): Uint8Array;
}