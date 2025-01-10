import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 py-20">
      <div className="absolute inset-0 bg-grid-white/10" />
      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-6">
            Text Behind Image Editor
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create stunning visuals by placing text behind objects in your images.
            Upload, edit, and export with ease.
          </p>
        </motion.div>
      </div>
    </div>
  );
};