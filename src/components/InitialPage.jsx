"use client";

import Image from "next/image";
import { ArrowUpRight, Heart, SwatchBook } from "lucide-react";
import { motion } from "framer-motion";

export default function MinimalLanding({ store }) {
  return (
    <div className="absolute z-20 w-full h-full   bg-neutral-100 overflow-hidden">
      <main className="flex flex-col items-center justify-center min-h-screen px-4 pb-20">
        <motion.div
          className="relative mb-6 group items-center justify-center flex"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <SwatchBook size="50%" strokeWidth={0.7} />
        </motion.div>

        <motion.div
          className="text-center max-w-3xl "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.h1
            className="text-6xl md:text-6xl lg:text-7xl font-medium mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.span
              className="block text-neutral-950 mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Room Decor
            </motion.span>
            <motion.span
              className="block text-neutral-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              VR Experience
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-neutral-600 text-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Transform your space with immersive VR interior design
          </motion.p>

          <motion.button
            onClick={() => store.enterVR()}
            className="group bg-neutral-950 text-white px-6 py-3 rounded-full flex items-center gap-2 mx-auto hover:bg-neutral-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Launch VR
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </motion.div>
      </main>

      <motion.footer
        className="fixed bottom-4 left-0 w-full text-neutral-600 text-xs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <p className="flex items-center justify-center">
          Built with <Heart className="mx-1 text-red-500" size={12} /> using{" "}
          <a
            href="https://github.com/pmndrs/uikit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500  mx-1 transition-colors"
          >
            uikit
          </a>
          and{" "}
          <a
            href="https://github.com/pmndrs/xr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500  mx-1 transition-colors"
          >
            xr
          </a>
        </p>
      </motion.footer>
    </div>
  );
}
