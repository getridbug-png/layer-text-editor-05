import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { ImageEditor } from "@/components/ImageEditor";
import { TextControls } from "@/components/TextControls";
import { PreviewPanel } from "@/components/PreviewPanel";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

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
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      
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
                className="w-full"
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
    </div>
  );
};

export default Index;