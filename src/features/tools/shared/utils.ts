/* -------------------------------------------------------------------------- */
/*                            SSR-SAFE TYPE GUARDS                            */
/* -------------------------------------------------------------------------- */

export const isFile = (val: unknown): val is File => {
    return typeof File !== "undefined" && val instanceof File;
};

export const isBlob = (val: unknown): val is Blob => {
    return typeof Blob !== "undefined" && val instanceof Blob;
};

export const isAudioFile = (file: File): boolean => {
    return file.type.startsWith("audio/") || /\.(mp3|wav|ogg|m4a|aac|flac|webm)$/i.test(file.name);
};
