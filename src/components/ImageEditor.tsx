import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
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
    <div className="w-full max-w-[800px] mx-auto px-4 sm:px-6"> {/* Updated for better mobile responsiveness */}
      <div
        className="min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-8 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {isProcessing ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-gray-600">Processing your image...</p>
          </div>
        ) : uploadedImage ? (
          <img src={uploadedImage} alt="Uploaded" className="max-h-[400px] w-full object-contain rounded-lg" />
        ) : (
          <div className="text-center">
            <div className="text-primary mb-4">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Upload an Image</h3>
            <p className="text-gray-500 mb-4">Click or drag and drop your image here</p>
            <p className="text-sm text-gray-400">Supports: JPG, PNG (Max 10MB)</p>
          </div>
        )}
      </div>
    </div>
  );
};