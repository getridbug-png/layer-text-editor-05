import { useState } from "react";
import { ImageEditor } from "@/components/ImageEditor";
import { TextControls } from "@/components/TextControls";
import { PreviewPanel } from "@/components/PreviewPanel";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/HeroSection";

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
      <header className="bg-white border-b">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Text Behind Photos
            </h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#how-it-works" className="text-gray-600 hover:text-primary transition-colors">
                How It Works
              </a>
              <a href="#examples" className="text-gray-600 hover:text-primary transition-colors">
                Examples
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Main Editor Section */}
      <main id="editor-section" className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {originalImage && processedImage ? (
              <>
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
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-white mt-4 py-6 text-lg font-medium"
                  onClick={handleExport}
                >
                  Download Image
                </Button>
              </>
            ) : (
              <ImageEditor onImageProcess={handleImageProcess} />
            )}
          </div>
          
          <div className="space-y-6">
            <TextControls
              onTextChange={setText}
              onFontChange={setFont}
              onSizeChange={setFontSize}
              onColorChange={setColor}
            />
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="how-it-works" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="text-primary text-2xl mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Upload Your Image</h3>
              <p className="text-gray-600">Choose any image with a clear subject. Our AI will automatically detect and process it.</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="text-primary text-2xl mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Add Your Text</h3>
              <p className="text-gray-600">Customize your text with different fonts, sizes, and colors. Position it exactly where you want.</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="text-primary text-2xl mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Download & Share</h3>
              <p className="text-gray-600">Export your creation in high quality, ready to share on social media or use in your projects.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Text Behind Photos</h3>
              <p className="text-gray-400">
                Create stunning visuals by placing text behind objects in your images.
                Perfect for social media, marketing, and creative projects.
              </p>
            </div>
            <div className="md:text-right">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <nav className="space-y-2">
                <a href="#how-it-works" className="block text-gray-400 hover:text-white transition-colors">
                  How It Works
                </a>
                <a href="#examples" className="block text-gray-400 hover:text-white transition-colors">
                  Examples
                </a>
              </nav>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 Text Behind Photos. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
