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
        privateKey = RsaEncryptionAlgorithm.loadPrivateKeyFromFile('C:\\Users\\davb9\\.ssh\\id_rsa_pkcs8.pem');
        publicKey = RsaEncryptionAlgorithm.loadPublicKeyFromFile('C:\\Users\\davb9\\.ssh\\id_rsa_pub.pem');
    });

    test('encryptData should encrypt data successfully', () => {
        const data = 'test data';
        const encryptedData = service.encryptData(data, publicKey);

        expect(encryptedData).toBeInstanceOf(EncryptedData);
        expect(encryptedData.isEncrypted).toBe(true);
        console.log(data)
        console.log(encryptedData.data);
        expect(typeof encryptedData.data).toBe('string');
    });

    test('decryptData should decrypt encrypted data successfully', () => {
        const data = 'test data';
        const encryptedData = service.encryptData(data, publicKey);
        const decryptedData = service.decryptData(encryptedData.data, privateKey);

        expect(new TextDecoder().decode(decryptedData)).toEqual(data);
    });

    test('decryptData should not decrypt if data is not encrypted', () => {
        const nonEncryptedData = 'plaintext-data';
        const decryptedData = service.decryptData(nonEncryptedData, privateKey);

        expect(new TextDecoder().decode(decryptedData)).toEqual(nonEncryptedData);
    });
});