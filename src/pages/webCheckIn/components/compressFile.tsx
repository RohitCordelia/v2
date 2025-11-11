import imageCompression from 'browser-image-compression';

const compressFile = async (file: File): Promise<File | null> => {
    if (!file) return null;

    try {
            const options = {
                maxSizeMB: 3,
                useWebWorker: true,
            };

            const compressedBlob = await imageCompression(file, options);
            return new File([compressedBlob], `compressed_${file.name}`, { type: file.type });
    } catch (error) {
        console.error('File compression error:', error);
        return null;
    }
};

export default compressFile;