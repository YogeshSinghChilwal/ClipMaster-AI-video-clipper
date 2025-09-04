"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { Clip } from "@prisma/client";
import Dropzone, { type DropzoneState } from "shadcn-dropzone";
import {
  Loader2,
  UploadCloud,
  RefreshCw,
  Video,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Play,
  FileVideo,
  Calendar,
} from "lucide-react";
import { generateUploadUrl } from "~/actions/s3";
import { processVideo } from "~/actions/generation";
import { ClipDisplay } from "./clip-display";

interface DashboardClientProps {
  uploadedFiles: {
    id: string;
    s3Key: string;
    filename: string;
    status: string;
    clipsCount: number;
    createdAt: Date;
  }[];
  clips: Clip[];
}

export function DashboardClient({
  uploadedFiles,
  clips,
}: DashboardClientProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; delay: number }>
  >([]);
  const router = useRouter();

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
    }));
    setParticles(newParticles);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    router.refresh();
    setTimeout(() => setRefreshing(false), 600);
  };

  const handleDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    const file = files[0]!;
    setUploading(true);

    try {
      const { success, signedUrl, uploadedFileId } = await generateUploadUrl({
        filename: file.name,
        contentType: file.type,
      });

      if (!success) throw new Error("Failed to get upload URL");

      const uploadResponse = await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadResponse.ok)
        throw new Error(`Upload filed with status: ${uploadResponse.status}`);

      await processVideo(uploadedFileId);

      setFiles([]);

      toast.success("Video uploaded successfully", {
        description:
          "Your video has been scheduled for processing. Check the status below.",
        duration: 5000,
      });
    } catch {
      toast.error("Upload failed", {
        description:
          "There was a problem uploading your video. Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "queued":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "processing":
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
      case "processed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "no credits":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "queued":
        return "from-yellow-100 to-yellow-200 text-yellow-700 border-yellow-300";
      case "processing":
        return "from-blue-100 to-blue-200 text-blue-700 border-blue-300";
      case "processed":
        return "from-green-100 to-green-200 text-green-700 border-green-300";
      case "failed":
        return "from-red-100 to-red-200 text-red-700 border-red-300";
      case "no credits":
        return "from-orange-100 to-orange-200 text-orange-700 border-orange-300";
      default:
        return "from-gray-100 to-gray-200 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute h-1 w-1 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-gradient-to-r from-cyan-200/20 to-purple-200/20 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -25, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-2">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        ></motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex rounded-full border border-gray-200/50 bg-white/80 p-2 shadow-lg backdrop-blur-sm">
            {[
              { id: "upload", label: "Upload", icon: UploadCloud },
              { id: "my-clips", label: "My Clips", icon: Play },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="rounded-2xl border border-gray-200/50 bg-white/80 shadow-xl backdrop-blur-sm">
                <div className="p-8">
                  <div className="mb-6">
                    <h2 className="mb-2 text-2xl font-bold text-gray-800">
                      Upload Video
                    </h2>
                    <p className="text-gray-600">
                      Upload your video file to generate clips
                    </p>
                  </div>

                  {/* Dropzone */}
                  <motion.div
                    className="mb-6"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Dropzone
                      onDrop={handleDrop}
                      accept={{ "video/mp4": [".mp4"] }}
                      maxSize={500 * 1024 * 1024}
                      disabled={uploading}
                      maxFiles={1}
                      dropZoneClassName="border-none hover:bg-white h-fit"
                    >
                      {(_dropzone: DropzoneState) => (
                        <div className="w-full rounded-xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-white p-12 text-center transition-all hover:border-cyan-400 hover:bg-gradient-to-br hover:from-cyan-50 hover:to-purple-50">
                          {/* Background decoration */}

                          <motion.div
                            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-cyan-100 to-purple-100"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <UploadCloud className="h-8 w-8 text-cyan-600" />
                          </motion.div>

                          <h3 className="mb-2 text-xl font-semibold text-gray-800">
                            Drag and drop your file
                          </h3>
                          <p className="mb-4 text-gray-600">
                            or click to browse (MP4 up to 500MB)
                          </p>

                          <motion.button
                            className="rounded-full bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-2 font-medium text-gray-700 hover:from-gray-200 hover:to-gray-300 disabled:opacity-50"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={uploading}
                          >
                            Select File
                          </motion.button>
                        </div>
                      )}
                    </Dropzone>
                  </motion.div>

                  {/* File Info and Upload Button */}
                  <div className="flex items-end justify-between">
                    <div className="flex-1">
                      {files.length > 0 && (
                        <motion.div
                          className="space-y-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <p className="font-medium text-gray-800">
                            Selected file:
                          </p>
                          {files.map((file) => (
                            <div
                              key={file.name}
                              className="flex items-center gap-2 text-gray-600"
                            >
                              <FileVideo className="h-4 w-4 text-cyan-500" />
                              <span className="truncate">{file.name}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>

                    <motion.button
                      onClick={handleUpload}
                      disabled={files.length === 0 || uploading}
                      className="flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                      whileHover={{
                        scale: files.length > 0 && !uploading ? 1.05 : 1,
                      }}
                      whileTap={{
                        scale: files.length > 0 && !uploading ? 0.95 : 1,
                      }}
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>Upload and Generate Clips</>
                      )}
                    </motion.button>
                  </div>
                </div>

                {/* Queue Status */}
                {uploadedFiles.length > 0 && (
                  <motion.div
                    className="border-t border-gray-200/50 p-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-gray-800">
                        Queue Status
                      </h3>
                      <motion.button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50 disabled:opacity-50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <RefreshCw
                          className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
                        />
                        Refresh
                      </motion.button>
                    </div>

                    <div className="max-h-80 space-y-4 overflow-auto">
                      {[...uploadedFiles].reverse().map((item, index) => (
                        <motion.div
                          key={item.id}
                          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ y: -2 }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="mb-2 flex items-center gap-3">
                                <Video className="h-5 w-5 text-gray-500" />
                                <h4 className="max-w-xs truncate font-semibold text-gray-900">
                                  {item.filename}
                                </h4>
                              </div>

                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {new Date(item.createdAt).toLocaleDateString(
                                    "en-US",
                                    {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    },
                                  )}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Play className="h-4 w-4" />
                                  {item.clipsCount > 0 ? (
                                    <span className="font-medium text-green-600">
                                      {item.clipsCount} clip
                                      {item.clipsCount !== 1 ? "s" : ""}
                                    </span>
                                  ) : (
                                    <span>No clips yet</span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <motion.div
                              className={`flex items-center gap-2 rounded-full border bg-gradient-to-r px-4 py-2 text-sm font-medium ${getStatusColor(item.status)}`}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.1 + 0.2 }}
                            >
                              {getStatusIcon(item.status)}
                              <span className="capitalize">{item.status}</span>
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "my-clips" && (
            <motion.div
              key="my-clips"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="rounded-2xl border border-gray-200/50 bg-white/80 p-8 shadow-xl backdrop-blur-sm">
                <div className="mb-6">
                  <h2 className="mb-2 text-2xl font-bold text-gray-800">
                    My Clips
                  </h2>
                  <p className="text-gray-600">
                    View and manage your generated clips here. Processing may
                    take a few minutes.
                  </p>
                </div>
                <ClipDisplay clips={clips} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
