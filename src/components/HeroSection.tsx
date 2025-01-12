import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Sparkles, Wand2 } from "lucide-react";

export const HeroSection = () => {
  const scrollToEditor = () => {
    const editorSection = document.querySelector('#editor-section');
    editorSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-[80vh] overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Radiant overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(155,135,245,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,182,255,0.15),transparent_50%)]" />
      
      <div className="relative container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-purple-500" />
              <span className="text-sm font-medium text-purple-500">Powered by AI</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-playfair leading-tight">
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                AI-Powered Text
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent">
                Behind Image Magic
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-lato"
          >
            Transform your photos with our AI-powered text placement technology. Create stunning visuals where text seamlessly integrates behind your subjects.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-6"
          >
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full">
                <Wand2 className="w-5 h-5 text-purple-500" />
                <span className="text-gray-600">AI Background Detection</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full">
                <Sparkles className="w-5 h-5 text-pink-500" />
                <span className="text-gray-600">Smart Text Placement</span>
              </div>
            </div>
            
            <Button
              onClick={scrollToEditor}
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-full transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Try It Now
              <Wand2 className="ml-2 h-5 w-5" />
            </Button>
            
            <p className="text-sm md:text-base text-gray-500 font-light">
              No sign-up required • Free to use • Instant download
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative blurred circles */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
      <div className="absolute top-40 right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
    </div>
  );
};