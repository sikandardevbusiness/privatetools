import { saveAs } from "file-saver";
import JSZip from "jszip";

export interface ZipFile {
    name: string;
    content: string | Blob;
}

export async function createAndDownloadZip(files: ZipFile[], zipName: string) {
    const zip = new JSZip();

    files.forEach((file) => {
        zip.file(file.name, file.content);
    });

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, zipName);
}
