import { RsaEncryptionAlgorithm } from "../../../domain/algorithms/RsaEncryptionAlgorithm";
import { EncryptionKey } from "../../../domain/models/EncryptionKey";
import * as path from 'path';

describe('RsaEncryptionAlgorithm', () => {
    let rsaAlgorithm: RsaEncryptionAlgorithm;
    let publicKey: EncryptionKey;
    let privateKey: EncryptionKey;

    beforeAll(() => {
        rsaAlgorithm = new RsaEncryptionAlgorithm();

        // Generate RSA keys dynamically
        publicKey = RsaEncryptionAlgorithm.loadPublicKeyFromString('-----BEGIN RSA PUBLIC KEY-----\n' +
            'MIIBCgKCAQEAxaocCfh7ur0HgZGXTirMOAHdVxTTYENMk+hDZJWSqHTbslMRakBM\n' +
            'TbeuvcrlG+U4UI9CnG43L1bD0ibmU42rdxT6/Ux0lrNFCjbFmi/IzpLUtdJzeF4H\n' +
            'cOU/DQlsZiilTXXHVqoPeZz8DeE/1EtfHCb9CSOGLJLa8lHcJVGQsgnaKwWezeX0\n' +
            'M+W3GH1I+WeN/4uqfSz/2Leud9rq58+Sv1pW9dxw3+4CdZlKx931NBJCyOJHIuRb\n' +
            'B0zKu8kmQdxMZuPrCYWP8UacICR44K9jhi14ropILHQYDdokeufLLmPhkXh1NoGr\n' +
            'i532In4Uu9VXQB2xxZI2V9KEMRGuZLRoPQIDAQAB\n' +
            '-----END RSA PUBLIC KEY-----');
        privateKey = RsaEncryptionAlgorithm.loadPrivateKeyFromString('-----BEGIN PRIVATE KEY-----\n' +
            'MIIEwAIBADANBgkqhkiG9w0BAQEFAASCBKowggSmAgEAAoIBAQDFqhwJ+Hu6vQeB\n' +
            'kZdOKsw4Ad1XFNNgQ0yT6ENklZKodNuyUxFqQExNt669yuUb5ThQj0KcbjcvVsPS\n' +
            'JuZTjat3FPr9THSWs0UKNsWaL8jOktS10nN4Xgdw5T8NCWxmKKVNdcdWqg95nPwN\n' +
            '4T/US18cJv0JI4YsktryUdwlUZCyCdorBZ7N5fQz5bcYfUj5Z43/i6p9LP/Yt653\n' +
            '2urnz5K/Wlb13HDf7gJ1mUrH3fU0EkLI4kci5FsHTMq7ySZB3Exm4+sJhY/xRpwg\n' +
            'JHjgr2OGLXiuikgsdBgN2iR658suY+GReHU2gauLnfYifhS71VdAHbHFkjZX0oQx\n' +
            'Ea5ktGg9AgMBAAECggEBAKM8ak9pn3SFqu87tsJc4a3XDF1f23gB2/nBs/Ya97Sa\n' +
            'XNyVcSpX0yvTZ0Fhj3dMAwe0Z4QcGQLFGo4whcG2m0WKVARe4WGaxoc62FEO6Tx/\n' +
            'UZ6eH7HlpSt8hmdTwutS4cBoZaiSZJlAJX+o5zeAzxjGseycI7AnzxySscU36NC9\n' +
            'kOGuzfRZ6Zqmg4LH0GqE6xgI4Ir3FCNwnhWDGnkAOhkAW04g5JAOcGNJh1Bcl7/j\n' +
            'J+nK+xIPyPOCULW2V8fH36wKsX+6B+ejIBbgx+HU50uiiiv/skDUcDcEOfe7eNVJ\n' +
            'z4Hn/+R/tjmBn4cidMGRriHDvLOWoTn0UXWP2pAdpEECgYEA98Cp3lriVBVebu+h\n' +
            '81wxzI1p5N+qfHgUun/0PdNWsdbhoehdtIbga85oPD9MG4o9gIoL92qM+4FpdJTF\n' +
            'VaTxapexhuHvt51Z9TrNEeGJXtpJoqjWdzPqEBYSJqasDnN4hnDZB9Ab2zljvdcp\n' +
            'boRx8V2XbBVyHXvmv9zSMosxxdUCgYEAzD6Y8QMSxXSkrHWBegZEg+c/ikg/ZeDf\n' +
            'yw/vAEWMRD4tjf/Ee1o4rVvQWkphIVJK3BYDNua6yN1ZpzAEFQmPHLVZn91mwR1C\n' +
            'UIP+Ju4PUXALzk9LEDWNuZ8x1gVmcmra/HiOisCaCiK4L5GGVZQJ3AZ7pXSzPFwu\n' +
            '6uOZqpoFxMkCgYEA3kEQIlEVyKiC1rJSbqa+ZepWnOOpZY+zyLsQuIXmuBM0xrJV\n' +
            'naWBnjTEfYerFumk0rMEmSgU4Wru146+mF4n1J/QulflXKrkEIJ3hRr2yQi6Fhmw\n' +
            'i68ewt+J2PKcVzpvXOvPRpsC4l9RgvSKToKyVPzI4kU64ghMsMHAL2d/dyECgYEA\n' +
            'lDg5NW5NiQ4FE0KTG8LAphiDfA7CM2TmA68kesX97OhSluIt7Hak+unOYjfoFQ5r\n' +
            'VRyEaKs4kdxQ24t06u9s9CCHUgSSNULOhS/EmOvaIfd2GdphVvoGR9bHi9GPbyks\n' +
            'klvK1da/8usPTzYEjsZIAWyS/peaGwuq4LsbITt1REECgYEA8qH4qtAyLcTHeAQz\n' +
            '07Eo8HAomKQE9hiSQyJLDC1EYbRH5WtAmhHTzo3LjteZ7yXyw61mtPcOXd2K2bt5\n' +
            't6rVyPZCvCLmnfCz5lAw5pq+yTcQQcT+LgjJf9JUjGNr826q8Mlh5T0SNqx6ycnB\n' +
            'GcMWMOAKPhmmwAsFHvco6hTM3wg=\n' +
            '-----END PRIVATE KEY-----\n');
    });

    test('should encrypt and decrypt data successfully', () => {
        const data = new TextEncoder().encode("ae9d46271f78f817e59cbb1d0b0568ee");
        const encryptedData = rsaAlgorithm.encrypt(data, publicKey);
        console.log(encryptedData)
        console.log(encryptedData.length)
        const decryptedData = rsaAlgorithm.decrypt(encryptedData, privateKey);

        expect(decryptedData).toEqual(data);
    });
});