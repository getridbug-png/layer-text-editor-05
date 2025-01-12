import { useRef, useEffect } from "react";

interface PreviewPanelProps {
  originalImage: string | null;
  processedImage: string | null;
  text: string;
  font: string;
  fontSize: number;
  color: string;
  textPosition: { x: number; y: number };
  onTextPositionChange: (position: { x: number; y: number }) => void;
}

export const PreviewPanel = ({
  originalImage,
  processedImage,
  text,
  font,
  fontSize,
  color,
  textPosition,
  onTextPositionChange,
}: PreviewPanelProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDragging = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !originalImage || !processedImage) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Enable image smoothing for better quality
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const drawImage = async () => {
      const bgImage = new Image();
      const fgImage = new Image();

      // Set image rendering properties for better quality
      bgImage.setAttribute('rendering', 'crisp-edges');
      fgImage.setAttribute('rendering', 'crisp-edges');

      // Load both images
      bgImage.src = originalImage;
      fgImage.src = processedImage;

      await Promise.all([
        new Promise((resolve) => (bgImage.onload = resolve)),
        new Promise((resolve) => (fgImage.onload = resolve)),
      ]);

      // Set canvas size to match the original image dimensions exactly
      canvas.width = bgImage.naturalWidth;
      canvas.height = bgImage.naturalHeight;

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background image at full resolution
      ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
      
      // Draw text with high quality settings
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'left';
      ctx.font = `${fontSize}px ${font}`;
      ctx.fillStyle = color;
      ctx.fillText(text, textPosition.x, textPosition.y);
      
      // Draw foreground image at full resolution
      ctx.drawImage(fgImage, 0, 0, canvas.width, canvas.height);
    };

    drawImage();
  }, [originalImage, processedImage, text, font, fontSize, color, textPosition]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      lastPosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const dx = x - lastPosition.current.x;
      const dy = y - lastPosition.current.y;

      onTextPositionChange({
        x: textPosition.x + dx,
        y: textPosition.y + dy,
      });

      lastPosition.current = { x, y };
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div className="space-y-4">
      <canvas
        ref={canvasRef}
        className="max-w-full h-auto cursor-move rounded-lg"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      <div className="text-sm text-gray-500">
        Drag to move text
      </div>
    </div>
  );
};