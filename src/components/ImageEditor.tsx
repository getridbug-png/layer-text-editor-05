import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { removeBackground, loadImage } from "@/utils/backgroundRemover";
import { useToast } from "./ui/use-toast";

interface ImageEditorProps {
  onImageProcess: (original: string, processed: string) => void;
}

export const ImageEditor = ({ onImageProcess }: ImageEditorProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      const imageElement = await loadImage(file);
      setUploadedImage(URL.createObjectURL(file));
      
      const processedBlob = await removeBackground(imageElement);
      const processedUrl = URL.createObjectURL(processedBlob);
      
      onImageProcess(URL.createObjectURL(file), processedUrl);
      toast({
        title: "Success!",
        description: "Image processed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process image",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="space-y-4">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer"
             onClick={() => fileInputRef.current?.click()}>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {isProcessing ? (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          ) : uploadedImage ? (
            <img src={uploadedImage} alt="Uploaded" className="max-h-64 object-contain" />
          ) : (
            <div className="text-center">
              <p className="text-gray-500">Click or drag to upload an image</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};