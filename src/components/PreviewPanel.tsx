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

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawImage = async () => {
      const bgImage = new Image();
      const fgImage = new Image();

      bgImage.src = originalImage;
      fgImage.src = processedImage;

      await Promise.all([
        new Promise((resolve) => (bgImage.onload = resolve)),
        new Promise((resolve) => (fgImage.onload = resolve)),
      ]);

      canvas.width = bgImage.width;
      canvas.height = bgImage.height;

      ctx.drawImage(bgImage, 0, 0);
      
      ctx.font = `${fontSize}px ${font}`;
      ctx.fillStyle = color;
      ctx.fillText(text, textPosition.x, textPosition.y);
      
      ctx.drawImage(fgImage, 0, 0);
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
    <div className="relative bg-white rounded-lg shadow-lg p-4">
      <canvas
        ref={canvasRef}
        className="max-w-full h-auto"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
};