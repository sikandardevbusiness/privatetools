import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import {
    ALL_FORMATS,
    BlobSource,
    CanvasSource,
    Input,
    Mp4OutputFormat,
    Output,
    StreamTarget,
    VideoSampleSink,
} from "mediabunny";

export interface WatermarkTextConfig {
    text: string;
    x: number;
    y: number;
    fontSize: number;
    opacity: number;
    color: string;
}

export interface WatermarkImageConfig {
    file: File | null;
    previewUrl: string | null;
    x: number;
    y: number;
    scale: number;
    opacity: number;
}

let ffmpegInstance: FFmpeg | null = null;

async function getFFmpeg(): Promise<FFmpeg> {
    if (ffmpegInstance && ffmpegInstance.loaded) return ffmpegInstance;

    ffmpegInstance = new FFmpeg();
    const baseURL = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd";

    await ffmpegInstance.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
    });

    return ffmpegInstance;
}

export async function processVideoWatermark(
    videoFile: File,
    textConfig: WatermarkTextConfig,
    imageConfig: WatermarkImageConfig,
    watermarkType: "text" | "image",
    onProgress?: (percent: number) => void,
): Promise<File> {
    const input = new Input({
        source: new BlobSource(videoFile),
        formats: ALL_FORMATS,
    });

    const videoTrack = await input.getPrimaryVideoTrack();
    if (!videoTrack) {
        throw new Error("No primary video track found in the input file.");
    }

    const audioTrack = await input.getPrimaryAudioTrack();
    const duration = await input.computeDuration();

    const width = await videoTrack.getDisplayWidth();
    const height = await videoTrack.getDisplayHeight();

    const opfsRoot = await navigator.storage.getDirectory();
    const fileHandle = await opfsRoot.getFileHandle("watermarked_output.mp4", { create: true });
    const writable = await fileHandle.createWritable({ keepExistingData: false });

    const output = new Output({
        format: new Mp4OutputFormat(),
        target: new StreamTarget(writable),
    });

    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) throw new Error("Could not initialize GPU canvas");

    const outVideoTrack = new CanvasSource(canvas, {
        codec: "avc",
        bitrate: 5_000_000,
    });

    output.addVideoTrack(outVideoTrack);
    await output.start();

    let logoBitmap: ImageBitmap | null = null;
    if (watermarkType === "image" && imageConfig.file) {
        logoBitmap = await createImageBitmap(imageConfig.file);
    }

    const sink = new VideoSampleSink(videoTrack);
    let framesProcessed = 0;

    for await (const sample of sink.samples()) {
        try {
            const frame = await sample.toVideoFrame();

            try {
                ctx.drawImage(frame, 0, 0, width, height);

                if (watermarkType === "image" && logoBitmap) {
                    ctx.globalAlpha = imageConfig.opacity;
                    const imgW = logoBitmap.width * imageConfig.scale;
                    const imgH = logoBitmap.height * imageConfig.scale;
                    const imgX = (width * imageConfig.x) / 100;
                    const imgY = (height * imageConfig.y) / 100;
                    // ✅ FIX: Center the image by subtracting half its width/height
                    ctx.drawImage(logoBitmap, imgX - imgW / 2, imgY - imgH / 2, imgW, imgH);
                    ctx.globalAlpha = 1.0;
                } else if (watermarkType === "text" && textConfig.text.trim().length > 0) {
                    ctx.globalAlpha = textConfig.opacity;
                    ctx.fillStyle = textConfig.color;
                    ctx.strokeStyle = "black";
                    ctx.lineWidth = Math.max(2, textConfig.fontSize / 15);
                    ctx.font = `bold ${textConfig.fontSize}px sans-serif`;

                    // ✅ FIX: Measure text and center it properly
                    const textMetrics = ctx.measureText(textConfig.text);
                    const textWidth = textMetrics.width;
                    const textHeight = textConfig.fontSize; // Approximate height

                    const textX = (width * textConfig.x) / 100;
                    const textY = (height * textConfig.y) / 100;

                    // Center the text by subtracting half the width
                    ctx.strokeText(textConfig.text, textX - textWidth / 2, textY + textHeight / 2);
                    ctx.fillText(textConfig.text, textX - textWidth / 2, textY + textHeight / 2);
                    ctx.globalAlpha = 1.0;
                }

                const timestampInSeconds = frame.timestamp / 1_000_000;
                const durationInSeconds = (frame.duration ?? 0) / 1_000_000;

                await outVideoTrack.add(timestampInSeconds, durationInSeconds);
            } finally {
                frame.close();
            }
        } finally {
            sample.close();
        }

        framesProcessed++;
        if (onProgress && framesProcessed % 30 === 0 && duration) {
            onProgress(Math.min(90, Math.round((sample.timestamp / duration) * 100)));
        }
    }

    await output.finalize();
    const videoOnlyFile = await fileHandle.getFile();

    if (audioTrack) {
        if (onProgress) onProgress(91);

        const ffmpeg = await getFFmpeg();

        await ffmpeg.writeFile("original.mp4", await fetchFile(videoFile));
        await ffmpeg.writeFile("video_only.mp4", await fetchFile(videoOnlyFile));

        if (onProgress) onProgress(95);

        await ffmpeg.exec([
            "-i",
            "video_only.mp4",
            "-i",
            "original.mp4",
            "-c:v",
            "copy",
            "-c:a",
            "copy",
            "-map",
            "0:v:0",
            "-map",
            "1:a:0?",
            "-shortest",
            "final_output.mp4",
        ]);

        if (onProgress) onProgress(98);

        const finalData = await ffmpeg.readFile("final_output.mp4");

        // ✅ FIX: Properly convert to ArrayBuffer
        const arrayBuffer = ArrayBuffer.isView(finalData)
            ? finalData.buffer.slice(
                  finalData.byteOffset,
                  finalData.byteOffset + finalData.byteLength,
              )
            : new TextEncoder().encode(finalData as string).buffer;

        await ffmpeg.deleteFile("original.mp4").catch(() => {});
        await ffmpeg.deleteFile("video_only.mp4").catch(() => {});
        await ffmpeg.deleteFile("final_output.mp4").catch(() => {});

        if (onProgress) onProgress(100);

        return new File(
            // @ts-expect-error i don't know why this error so i was ignoring it
            [arrayBuffer],
            videoFile.name.replace(/\.[^/.]+$/, "") + "_watermarked.mp4",
            {
                type: "video/mp4",
            },
        );
    }

    if (onProgress) onProgress(100);
    return videoOnlyFile;
}
