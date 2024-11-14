import { RsaEncryptionAlgorithm } from "../../../domain/algorithms/RsaEncryptionAlgorithm";
import { EncryptionKey } from "../../../domain/models/EncryptionKey";
import * as forge from 'node-forge';

describe('RsaEncryptionAlgorithm', () => {
    let rsaAlgorithm: RsaEncryptionAlgorithm;
    let publicKey: EncryptionKey;
    let privateKey: EncryptionKey;

    beforeAll(() => {
        rsaAlgorithm = new RsaEncryptionAlgorithm();

        // Generate RSA keys dynamically
        const keypair = forge.pki.rsa.generateKeyPair(2048);
        publicKey = new EncryptionKey(forge.pki.publicKeyToPem(keypair.publicKey));
        privateKey = new EncryptionKey(forge.pki.privateKeyToPem(keypair.privateKey));
    });

    test('should encrypt and decrypt data successfully', () => {
        const data = new Uint8Array([5, 10, 15, 20]);
        const encryptedData = rsaAlgorithm.encrypt(data, publicKey);
        const decryptedData = rsaAlgorithm.decrypt(encryptedData, privateKey);

        expect(decryptedData).toEqual(data);
    });
});