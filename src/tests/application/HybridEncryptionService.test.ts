import { HybridEncryptionService } from "../../application/services/HybridEncryptionService";
import { EncryptionKey } from "../../domain/models/EncryptionKey";
import { AesEncryptionAlgorithm } from "../../domain/algorithms/AesEncryptionAlgorithm";
import { RsaEncryptionAlgorithm } from "../../domain/algorithms/RsaEncryptionAlgorithm";
import { EncryptedData } from "../../domain/models/EncryptedData";
import * as forge from 'node-forge';

describe('HybridEncryptionService', () => {
    let service: HybridEncryptionService;
    let publicKey: EncryptionKey;
    let privateKey: EncryptionKey;

    beforeAll(() => {
        service = new HybridEncryptionService(new AesEncryptionAlgorithm(), new RsaEncryptionAlgorithm());

        // Generate RSA keys dynamically
        const keypair = forge.pki.rsa.generateKeyPair(2048);
        publicKey = new EncryptionKey(forge.pki.publicKeyToPem(keypair.publicKey));
        privateKey = new EncryptionKey(forge.pki.privateKeyToPem(keypair.privateKey));
    });

    test('encryptData should encrypt data successfully', () => {
        const data = new Uint8Array([1, 2, 3, 4]);
        const encryptedData = service.encryptData(data, publicKey);

        expect(encryptedData).toBeInstanceOf(EncryptedData);
        expect(encryptedData.isEncrypted).toBe(true);
        expect(typeof encryptedData.data).toBe('string');
    });

    test('decryptData should decrypt encrypted data successfully', () => {
        const data = new Uint8Array([1, 2, 3, 4]);
        const encryptedData = service.encryptData(data, publicKey);
        const decryptedData = service.decryptData(encryptedData, privateKey);

        expect(decryptedData).toEqual(data);
    });

    test('decryptData should not decrypt if data is not encrypted', () => {
        const nonEncryptedData = new EncryptedData('plaintext-data', false);
        const decryptedData = service.decryptData(nonEncryptedData, privateKey);

        expect(decryptedData).toEqual(Uint8Array.from(Buffer.from('plaintext-data', 'utf8')));
    });
});