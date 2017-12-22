import * as svg2ttf from 'svg2ttf';
import * as ttf2woff from 'ttf2woff';
import * as ttf2woff2 from 'ttf2woff2';

export function convertSvgToTtf(buf : Buffer) : Uint8Array {
    return svg2ttf(buf.toString()).buffer;
}

export function convertTtf2Woff(arr : Uint8Array) : Uint8Array {
    return ttf2woff(arr).buffer;
}

export function convertTtf2Woff2(arr : Uint8Array) : Uint8Array {
    return ttf2woff2(Buffer.from(arr as any));
}
