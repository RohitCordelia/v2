function loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    });
}

function applyConvolution(imageData: ImageData, kernel: number[]) {
    const side = Math.round(Math.sqrt(kernel.length));
    const halfSide = Math.floor(side / 2);
    const src = imageData.data;
    const sw = imageData.width;
    const sh = imageData.height;
    const output = new ImageData(sw, sh);
    const dst = output.data;

    for (let y = 0; y < sh; y++) {
        for (let x = 0; x < sw; x++) {
            for (let c = 0; c < 3; c++) {
                let pixel = 0;
                for (let ky = 0; ky < side; ky++) {
                    for (let kx = 0; kx < side; kx++) {
                        const scy = Math.min(sh - 1, Math.max(0, y + ky - halfSide));
                        const scx = Math.min(sw - 1, Math.max(0, x + kx - halfSide));
                        const srcOffset = (scy * sw + scx) * 4 + c;
                        pixel += src[srcOffset] * kernel[ky * side + kx];
                    }
                }
                const dstOffset = (y * sw + x) * 4 + c;
                dst[dstOffset] = Math.min(255, Math.max(0, pixel));
            }
            dst[(y * sw + x) * 4 + 3] = 255; // Alpha channel
        }
    }
    return output;
}

const enhanceImageQuality = async (file: File) => {
    const img = await loadImage(file);

    // Upscale ×2
    const scale = 2;
    const canvas = document.createElement("canvas");
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");

    // Slight brightness + contrast before drawing
    ctx.filter = "brightness(1.1) contrast(1.1)";
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Sharpening filter
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const sharpenKernel = [
        0, -1, 0,
        -1, 5, -1,
        0, -1, 0
    ];
    const sharpenedData = applyConvolution(imageData, sharpenKernel);
    ctx.putImageData(sharpenedData, 0, 0);

    // Return enhanced blob
    const enhancedBlob = new Promise<Blob>((resolve) => {
        canvas.toBlob(blob => blob && resolve(blob), file.type || "image/jpeg", 0.9);
    });

    // const fileimg = new File([await enhancedBlob], `enhanced_${file.name}`, { type: file.type || "image/jpeg" });

    // const url = URL.createObjectURL(fileimg);
    // const a = document.createElement("a");
    // a.href = url;
    // a.download = `enhanced-${file.name}`;
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
    // URL.revokeObjectURL(url);

    return new File([await enhancedBlob], `enhanced_${file.name}`, { type: file.type || "image/jpeg" });
}
export default enhanceImageQuality;