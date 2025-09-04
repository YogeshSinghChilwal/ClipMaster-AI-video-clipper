"use client";

import type { Clip } from "@prisma/client";
import { Download, Loader2, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { getClipPlayUrl } from "~/actions/generation";
import {motion} from 'motion/react'

function ClipCard({ clip }: { clip: Clip }) {
  const [playUrl, setPlayUrl] = useState<string | null>(null);
  const [isLoadingUrl, setIsLoadingUrl] = useState(true);

  useEffect(() => {
    async function fetchPlayUrl() {
      try {
        const result = await getClipPlayUrl(clip.id);
        if (result.succes && result.url) {
          setPlayUrl(result.url);
        } else if (result.error) {
          console.error("Failed to get play url: " + result.error);
        }
      } catch {
      } finally {
        setIsLoadingUrl(false);
      }
    }

    void fetchPlayUrl();
  }, [clip.id]);

  const handleDownload = () => {
    if (playUrl) {
      const link = document.createElement("a");
      link.href = playUrl;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex max-w-52 flex-col gap-2">
      <div className="bg-muted">
        {isLoadingUrl ? (
          <div className="flex h-full w-full items-center justify-center">
            <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
          </div>
        ) : playUrl ? (
          <video
            src={playUrl}
            controls
            preload="metadata"
            className="h-full w-full rounded-md object-cover hover:scale-105  transition-transform duration-300"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Play className="text-muted-foreground h-10 w-10 opacity-50" />
          </div>
        )}
      </div>
      <div className="p-4">
          <motion.button
            onClick={handleDownload}
            disabled={!playUrl}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-4 py-2.5 font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: playUrl ? 1.05 : 1 }}
            whileTap={{ scale: playUrl ? 0.95 : 1 }}
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
            
          </motion.button>
        </div>
    </div>
  );
}

export function ClipDisplay({ clips }: { clips: Clip[] }) {
  if (clips.length === 0) {
    return (
      <p className="text-muted-foreground p-4 text-center">
        No clips generated yet.
      </p>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
      {clips.map((clip) => (
        <ClipCard key={clip.id} clip={clip} />
      ))}
    </div>
  );
}
