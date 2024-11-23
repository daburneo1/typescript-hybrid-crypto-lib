import { RsaEncryptionAlgorithm } from "../../../domain/algorithms/RsaEncryptionAlgorithm";
import { EncryptionKey } from "../../../domain/models/EncryptionKey";
import * as path from 'path';

describe('RsaEncryptionAlgorithm', () => {
    let rsaAlgorithm: RsaEncryptionAlgorithm;
    let publicKey: EncryptionKey;
    let privateKey: EncryptionKey;

    beforeAll(() => {
        rsaAlgorithm = new RsaEncryptionAlgorithm();

        // Load RSA keys from files
        privateKey = RsaEncryptionAlgorithm.loadPrivateKeyFromFile('C:\\Users\\davb9\\.ssh\\id_rsa_pkcs8.pem');
        publicKey = RsaEncryptionAlgorithm.loadPublicKeyFromFile('C:\\Users\\davb9\\.ssh\\id_rsa_pub.pem');
    });

    test('should encrypt and decrypt data successfully', () => {
        const data = new Uint8Array([5, 10, 15, 20]);
        const encryptedData = rsaAlgorithm.encrypt(data, publicKey);
        const decryptedData = rsaAlgorithm.decrypt(encryptedData, privateKey);

        expect(decryptedData).toEqual(data);
    });
});