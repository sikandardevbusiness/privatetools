import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

export interface ProcessSilenceResult {
    blob: Blob;
    timeSaved: number;
    newDuration: number;
    originalDuration: number;
}

let ffmpegInstance: FFmpeg | null = null;

async function getAudioDuration(fileOrBlob: Blob): Promise<number> {
    const arrayBuffer = await fileOrBlob.arrayBuffer();
    const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const audioCtx = new AudioContextClass();

    try {
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
        return audioBuffer.duration;
    } catch {
        return 0;
    } finally {
        await audioCtx.close();
    }
}

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

export async function removeSilenceFromAudio(
    file: File,
    thresholdDb: number = -40,
    minSilenceDurationSec: number = 0.35,
    outputFormat: "mp3" | "wav" = "mp3",
    onProgress?: (percent: number) => void,
): Promise<ProcessSilenceResult> {
    onProgress?.(10);

    const originalDuration = await getAudioDuration(file);
    const ffmpeg = await getFFmpeg();
    onProgress?.(30);

    const ext = file.name.split(".").pop() || "mp3";
    const inputName = `input_${Date.now()}.${ext}`;
    const outputName = `output_${Date.now()}.${outputFormat}`;

    await ffmpeg.writeFile(inputName, await fetchFile(file));
    onProgress?.(50);

    const filterComplex = `silenceremove=start_periods=1:start_duration=0.02:start_threshold=${thresholdDb}dB:stop_periods=-1:stop_duration=${minSilenceDurationSec}:stop_threshold=${thresholdDb}dB,aresample=async=1`;

    const ffmpegArgs = [
        "-hide_banner",
        "-loglevel",
        "error",
        "-i",
        inputName,
        "-af",
        filterComplex,
    ];

    if (outputFormat === "mp3") {
        ffmpegArgs.push(
            "-c:a",
            "libmp3lame",
            "-b:a",
            "128k",
            "-ar",
            "44100",
            "-ac",
            "2",
            "-f",
            "mp3",
        );
    } else {
        ffmpegArgs.push("-c:a", "pcm_s16le", "-ar", "44100", "-ac", "2", "-f", "wav");
    }

    ffmpegArgs.push("-y", outputName);

    await ffmpeg.exec(ffmpegArgs);
    onProgress?.(80);

    const data = await ffmpeg.readFile(outputName);
    await ffmpeg.deleteFile(inputName).catch(() => {});
    await ffmpeg.deleteFile(outputName).catch(() => {});

    const uint8Data = data as Uint8Array;
    const blob = new Blob([uint8Data.buffer as ArrayBuffer], {
        type: outputFormat === "mp3" ? "audio/mpeg" : "audio/wav",
    });

    const newDuration = await getAudioDuration(blob);
    const timeSaved = Math.max(0, originalDuration - newDuration);

    onProgress?.(100);
    return {
        blob,
        timeSaved,
        newDuration,
        originalDuration,
    };
}
