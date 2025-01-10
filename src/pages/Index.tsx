import { useState } from "react";
import { ImageEditor } from "@/components/ImageEditor";
import { TextControls } from "@/components/TextControls";
import { PreviewPanel } from "@/components/PreviewPanel";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const Index = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [text, setText] = useState("Your Text Here");
  const [font, setFont] = useState("Arial");
  const [fontSize, setFontSize] = useState(24);
  const [color, setColor] = useState("#000000");
  const [textPosition, setTextPosition] = useState({ x: 100, y: 100 });
  const { toast } = useToast();

  const handleImageProcess = (original: string, processed: string) => {
    setOriginalImage(original);
    setProcessedImage(processed);
  };

  const handleExport = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;

    try {
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "text-behind-image.png";
      link.href = dataUrl;
      link.click();
      
      toast({
        title: "Success!",
        description: "Image exported successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export image",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-6">
          <h1 className="text-3xl font-bold text-primary">Text Behind Image Editor</h1>
          <p className="text-gray-600 mt-2">Create stunning visuals with text behind objects</p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-800 mb-6"
          >
            Place Text Behind Objects
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Upload an image, add your text, and our AI will automatically detect and place your text behind the main object.
          </motion.p>
        </div>
      </section>

      {/* Main Editor Section */}
      <main className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ImageEditor onImageProcess={handleImageProcess} />
            <TextControls
              onTextChange={setText}
              onFontChange={setFont}
              onSizeChange={setFontSize}
              onColorChange={setColor}
            />
            {originalImage && processedImage && (
              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={handleExport}
              >
                Export Image
              </Button>
            )}
          </div>
          
          <div>
            {originalImage && processedImage ? (
              <PreviewPanel
                originalImage={originalImage}
                processedImage={processedImage}
                text={text}
                font={font}
                fontSize={fontSize}
                color={color}
                textPosition={textPosition}
                onTextPositionChange={setTextPosition}
              />
            ) : (
              <div className="h-full flex items-center justify-center bg-white rounded-lg shadow-lg p-6">
                <p className="text-gray-500 text-center">
                  Upload an image to see the preview here
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4">1. Upload Image</h3>
              <p className="text-gray-600">Upload any image with a clear subject. Our AI will automatically detect and process it.</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4">2. Add Text</h3>
              <p className="text-gray-600">Customize your text with different fonts, sizes, and colors. Position it exactly where you want.</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4">3. Export</h3>
              <p className="text-gray-600">Download your creation in high quality, ready to share or use in your projects.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">Text Behind Image Editor - Create Amazing Visual Content</p>
          <p className="text-gray-400">© 2024 All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;