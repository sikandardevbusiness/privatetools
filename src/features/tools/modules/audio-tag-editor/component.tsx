"use client";

import { Music, Upload, X, Save, Image as ImageIcon } from "lucide-react";
import React, { useState, useRef } from "react";
import Image from "next/image";

import { useAudioTagEditor } from "@sikandardevbusiness/audio-toolkit";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToolHeader } from "@/features/tools/shared/components/layouts/tool-header";
import { ToolShell } from "@/features/tools/shared/components/layouts/tool-shell";
import { FileUpload } from "@/features/tools/shared/components/uploads/file-upload";

import type { BaseTool } from "@/features/tools/shared/types";

export default function AudioTagEditorClient({ tool }: { tool: BaseTool }) {
    const [file, setFile] = useState<File | null>(null);
    const [coverPreview, setCoverPreview] = useState<string>("");
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const coverInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        title: "",
        artist: "",
        album: "",
        genre: "",
        year: "",
        track: "",
    });

    const { loadTags, saveTags, isProcessing, progress, error } = useAudioTagEditor();

    const handleFilesSelected = async (files: File[]) => {
        if (files[0]) {
            setFile(files[0]);
            setCoverPreview("");
            setCoverFile(null);
            setFormData({ title: "", artist: "", album: "", genre: "", year: "", track: "" });

            // Now 'tags' is correctly typed as ExistingTags | null
            const tags = await loadTags(files[0]);
            if (tags) {
                setFormData({
                    title: tags.title,
                    artist: tags.artist,
                    album: tags.album,
                    genre: tags.genre,
                    year: tags.year,
                    track: tags.track,
                });
                if (tags.coverArtUrl) {
                    setCoverPreview(tags.coverArtUrl);
                }
            }
        }
    };

    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setCoverFile(selectedFile);
            setCoverPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleSave = async () => {
        if (!file) return;
        await saveTags(file, {
            ...formData,
            coverArtFile: coverFile,
            autoDownload: true,
        });
    };

    const handleReset = () => {
        setFile(null);
        setCoverPreview("");
        setCoverFile(null);
        setFormData({ title: "", artist: "", album: "", genre: "", year: "", track: "" });
    };

    return (
        <ToolShell>
            <ToolHeader tool={tool}>
                {!file ? (
                    <div className="max-w-4xl mx-auto w-full">
                        <FileUpload
                            multiple={false}
                            allowedFormats={["mp3"]}
                            accept="audio/mpeg, audio/mp3"
                            onFilesSelected={handleFilesSelected}
                        />
                        <p className="text-center text-xs text-muted-foreground mt-4">
                            Tip: Currently supports MP3 files for ID3v2 tag editing.
                        </p>
                    </div>
                ) : (
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xl font-medium flex items-center gap-2">
                                <Music className="h-5 w-5 text-primary" />
                                Edit MP3 Metadata
                            </CardTitle>
                            <Button type="button" variant="outline" size="sm" onClick={handleReset}>
                                <X />
                                New File
                            </Button>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {/* Cover Art Upload */}
                            <div className="flex flex-col sm:flex-row gap-6 items-start">
                                <div
                                    onClick={() => coverInputRef.current?.click()}
                                    className="w-40 h-40 rounded-lg border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 cursor-pointer flex flex-col items-center justify-center bg-muted/30 transition-colors overflow-hidden relative group shrink-0"
                                >
                                    <input
                                        ref={coverInputRef}
                                        type="file"
                                        accept="image/jpeg, image/png"
                                        className="hidden"
                                        onChange={handleCoverChange}
                                    />
                                    {coverPreview ? (
                                        <>
                                            <Image
                                                src={coverPreview}
                                                alt="Cover"
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                                <Upload className="h-6 w-6 text-white" />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                                            <span className="text-xs text-muted-foreground text-center px-2">
                                                Click to upload cover art
                                            </span>
                                        </>
                                    )}
                                </div>

                                {/* Metadata Form */}
                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                    <div className="space-y-2">
                                        <Label htmlFor="tag-title">Title</Label>
                                        <Input
                                            id="tag-title"
                                            value={formData.title}
                                            onChange={(e) =>
                                                setFormData({ ...formData, title: e.target.value })
                                            }
                                            placeholder="Song Title"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="tag-artist">Artist</Label>
                                        <Input
                                            id="tag-artist"
                                            value={formData.artist}
                                            onChange={(e) =>
                                                setFormData({ ...formData, artist: e.target.value })
                                            }
                                            placeholder="Artist Name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="tag-album">Album</Label>
                                        <Input
                                            id="tag-album"
                                            value={formData.album}
                                            onChange={(e) =>
                                                setFormData({ ...formData, album: e.target.value })
                                            }
                                            placeholder="Album Name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="tag-genre">Genre</Label>
                                        <Input
                                            id="tag-genre"
                                            value={formData.genre}
                                            onChange={(e) =>
                                                setFormData({ ...formData, genre: e.target.value })
                                            }
                                            placeholder="e.g., Electronic"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="tag-year">Year</Label>
                                        <Input
                                            id="tag-year"
                                            value={formData.year}
                                            onChange={(e) =>
                                                setFormData({ ...formData, year: e.target.value })
                                            }
                                            placeholder="2024"
                                            maxLength={4}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="tag-track">Track Number</Label>
                                        <Input
                                            id="tag-track"
                                            value={formData.track}
                                            onChange={(e) =>
                                                setFormData({ ...formData, track: e.target.value })
                                            }
                                            placeholder="1"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <Button
                                onClick={handleSave}
                                disabled={isProcessing}
                                className="w-full gap-2"
                                size="lg"
                            >
                                {isProcessing ? (
                                    <>Processing... {progress}%</>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4" /> Save Tags & Download MP3
                                    </>
                                )}
                            </Button>

                            {error && (
                                <div className="bg-destructive/10 border border-destructive/20 text-destructive p-3 rounded-lg text-sm text-center">
                                    {error}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </ToolHeader>
        </ToolShell>
    );
}
