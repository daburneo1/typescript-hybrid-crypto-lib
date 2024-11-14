export class Base64Utils {
    static toBase64(data: Uint8Array): string {
        return Buffer.from(data).toString('base64');
    }

    static fromBase64(base64String: string): Uint8Array {
        return Uint8Array.from(Buffer.from(base64String, 'base64'));
    }
}