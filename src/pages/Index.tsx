import { useState } from "react";
import { ImageEditor } from "@/components/ImageEditor";
import { TextControls } from "@/components/TextControls";
import { PreviewPanel } from "@/components/PreviewPanel";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/HeroSection";
import { Wand2 } from "lucide-react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"; // Import social media icons

const ExampleGallery = () => {
  const examples = [
    {
      image: "/lovable-uploads/93ba5eb2-01dc-419f-9634-453b7bc78e5d.png",
      title: "Desert View",
      description: "Text overlaying desert landscape"
    },
    {
      image: "/lovable-uploads/5ceadf85-70d7-4644-967a-9aee098b27f0.png",
      title: "Motivational",
      description: "Inspiring text with silhouette"
    },
    {
      image: "/lovable-uploads/55c4a985-241b-4b38-a132-315fc08817b4.png",
      title: "Nature Text",
      description: "Text integration with landscape"
    },
    {
      image: "/lovable-uploads/452c938f-4cf1-4dff-86ed-f86ba179f025.png",
      title: "Mountain Text",
      description: "Text overlay on mountain peaks"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 p-4">
      {examples.map((example, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="relative group"
          whileHover={{ scale: 1.05, zIndex: 20 }}
          style={{
            transformStyle: 'preserve-3d',
            transform: 'perspective(1000px)'
          }}
        >
          <div 
            className="relative overflow-hidden rounded-xl shadow-xl"
            style={{
              transform: 'translateZ(20px)',
              transition: 'transform 0.3s ease-out'
            }}
          >
            <img
              src={example.image}
              alt={example.title}
              className="w-full h-[300px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
              <div className="absolute bottom-0 p-6">
                <h3 className="text-white text-xl font-bold mb-2">{example.title}</h3>
                <p className="text-white/80">{example.description}</p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const Index = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [text, setText] = useState("Your Text Here");
  const [font, setFont] = useState("Arial");
  const [fontSize, setFontSize] = useState(40);
  const [fontWeight, setFontWeight] = useState(400);
  const [color, setColor] = useState("#FF5733");
  const [textPosition, setTextPosition] = useState({ x: 300, y: 250 });
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

  const scrollToEditor = () => {
    const editorSection = document.querySelector('#editor-section');
    editorSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-crimson">
              Text Behind Image
            </h1>
            <nav className="flex items-center space-x-6 font-montserrat">
              <a href="#how-it-works" className="text-gray-600 hover:text-primary transition-colors hidden md:block">
                How It Works
              </a>
              <a href="#blog" className="text-gray-600 hover:text-primary transition-colors hidden md:block">
                Blog
              </a>
              <Button
                onClick={scrollToEditor}
                className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-4 py-2 rounded-full"
              >
                Get Started
                <Wand2 className="ml-2 h-4 w-4" />
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Main Editor Section */}
      <main id="editor-section" className="container mx-auto py-12 px-4">
        <div className={`grid grid-cols-1 ${originalImage ? 'lg:grid-cols-2' : ''} gap-8`}>
          {/* Image preview section */}
          <div className={`${originalImage ? 'lg:col-span-1' : 'lg:col-span-2'} order-1 lg:order-1`}>
            <div className="flex flex-col items-center">
              {originalImage && processedImage ? (
                <div className="w-full">
                  <PreviewPanel
                    originalImage={originalImage}
                    processedImage={processedImage}
                    text={text}
                    font={font}
                    fontSize={fontSize}
                    fontWeight={fontWeight}
                    color={color}
                    textPosition={textPosition}
                    onTextPositionChange={setTextPosition}
                  />
                  <Button
                    className="mt-6 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-8 py-4 text-lg rounded-full transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                    onClick={handleExport}
                  >
                    Download Image
                  </Button>
                </div>
              ) : (
                <ImageEditor onImageProcess={handleImageProcess} />
              )}
            </div>
          </div>
          
          {/* Controls section */}
          <div className={`space-y-6 order-2 lg:order-2 ${!originalImage && 'hidden lg:hidden'}`}>
            <TextControls
              onTextChange={setText}
              onFontChange={setFont}
              onSizeChange={setFontSize}
              onFontWeightChange={setFontWeight}
              onColorChange={setColor}
              show={!!originalImage}
            />
          </div>
        </div>
      </main>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-gradient-to-br from-[#F1F0FB] via-[#D3E4FD] to-[#E5DEFF] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 font-abril bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl mb-6 shadow-lg">
                <span className="font-space">1</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 font-quicksand bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Upload Your Image
              </h3>
              <p className="text-gray-600 font-space">
                Our AI-powered system automatically detects the subject and prepares your image for text placement behind objects.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl mb-6 shadow-lg">
                <span className="font-space">2</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 font-quicksand bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Customize Text
              </h3>
              <p className="text-gray-600 font-space">
                Choose from various fonts, sizes, and colors. Position your text exactly where you want it to appear behind the subject.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl mb-6 shadow-lg">
                <span className="font-space">3</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 font-quicksand bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Export & Download
              </h3>
              <p className="text-gray-600 font-space">
                Download your creation in high quality, ready to share on social media or use in your creative projects.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-abril font-bold text-center mb-12 text-white">
            Trending Text Behind Photos Gallery
          </h2>
          <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
            Explore our gallery of creative text behind image designs. Get inspired by these examples and create your own unique compositions.
          </p>
          <ExampleGallery />
        </div>
      </section>

     {/* Blog Section */}
 {/*      <section id="blog" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 font-abril bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Latest from Our Blog
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.article 
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-400"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 font-montserrat">AI-Powered Image Processing: The Future of Design</h3>
                <p className="text-gray-600 mb-4">Discover how artificial intelligence is revolutionizing the way we create and edit images for social media and marketing.</p>
                <a href="#" className="text-primary hover:text-primary/80 font-medium">Read More →</a>
              </div>
            </motion.article>
            
            <motion.article 
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="h-48 bg-gradient-to-br from-pink-400 to-purple-400"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 font-montserrat">Top 10 Creative Ways to Use Text Behind Images</h3>
                <p className="text-gray-600 mb-4">Explore innovative techniques and creative ideas for incorporating text behind images in your designs.</p>
                <a href="#" className="text-primary hover:text-primary/80 font-medium">Read More →</a>
              </div>
            </motion.article>
            
            <motion.article 
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="h-48 bg-gradient-to-br from-indigo-400 to-purple-400"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 font-montserrat">The Psychology of Text Placement in Visual Design</h3>
                <p className="text-gray-600 mb-4">Learn how strategic text placement can enhance the impact of your visual content and engage your audience.</p>
                <a href="#" className="text-primary hover:text-primary/80 font-medium">Read More →</a>
              </div>
            </motion.article>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 font-geist">Text Behind Image</h3>
              <p className="text-gray-400">
                Create stunning visuals by placing text behind objects in your images.
                Perfect for social media, marketing, and creative projects.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
              >
                <Facebook className="w-6 h-6 mb-2" />
                <span className="text-sm">Facebook</span>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
              >
                <Twitter className="w-6 h-6 mb-2" />
                <span className="text-sm">Twitter</span>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
              >
                <Instagram className="w-6 h-6 mb-2" />
                <span className="text-sm">Instagram</span>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
              >
                <Linkedin className="w-6 h-6 mb-2" />
                <span className="text-sm">LinkedIn</span>
              </motion.a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row md:justify-between items-center text-gray-400 text-sm">
            <p>© 2025 Text Behind Image AI</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Disclaimer</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
