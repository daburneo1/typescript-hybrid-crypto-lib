import {AesEncryptionAlgorithm} from "../../../domain/algorithms/AesEncryptionAlgorithm";
import {EncryptionKey} from "../../../domain/models/EncryptionKey";

describe('AesEncryptionAlgorithm', () => {
    let aesAlgorithm: AesEncryptionAlgorithm;
    let aesKey: EncryptionKey;

    beforeAll(() => {
        aesAlgorithm = new AesEncryptionAlgorithm();
        aesKey = new EncryptionKey('my_secure_aes_key_123'); // Ejemplo de clave AES
    });

    test('should encrypt and decrypt data successfully', () => {
        const data = new Uint8Array([10, 20, 30, 40]);
        const encryptedData = aesAlgorithm.encrypt(data, aesKey);
        const decryptedData = aesAlgorithm.decrypt(encryptedData, aesKey);

        expect(decryptedData).toEqual(data);
    });
});