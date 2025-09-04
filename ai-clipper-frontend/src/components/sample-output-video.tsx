/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "motion/react";

export default function SampleOutput() {
  const videos = ["/videos/clip_1.mp4", "/videos/clip_2.mp4", "/videos/clip_3.mp4"];

  return (
    <motion.section
      className="mb-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
          Sample Output
        </h2>
        <p className="text-lg text-zinc-500">
          Here's what your clips will look like
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {videos.map((src, i) => (
          <motion.div
            key={i}
            className="group relative overflow-hidden rounded-2xl shadow-xl"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {/* Vertical Video */}
            <div className="relative aspect-[9/16]">
              <video
                src={src}
                className="h-full w-full object-cover"
                playsInline
                loop
                muted
                controls
              />

              {/* Hover Overlay */}
              
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
