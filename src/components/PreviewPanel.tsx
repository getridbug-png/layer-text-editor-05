import { useRef, useEffect } from "react";

interface PreviewPanelProps {
  originalImage: string | null;
  processedImage: string | null;
  text: string;
  font: string;
  fontSize: number;
  fontWeight: number;
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
  fontWeight,
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

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const drawImage = async () => {
      const bgImage = new Image();
      const fgImage = new Image();

      bgImage.setAttribute('rendering', 'crisp-edges');
      fgImage.setAttribute('rendering', 'crisp-edges');

      bgImage.src = originalImage;
      fgImage.src = processedImage;

      await Promise.all([
        new Promise((resolve) => (bgImage.onload = resolve)),
        new Promise((resolve) => (fgImage.onload = resolve)),
      ]);

      canvas.width = bgImage.naturalWidth;
      canvas.height = bgImage.naturalHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
      
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'left';
      ctx.font = `${fontWeight} ${fontSize}px ${font}`;
      ctx.fillStyle = color;
      ctx.fillText(text, textPosition.x, textPosition.y);
      
      ctx.drawImage(fgImage, 0, 0, canvas.width, canvas.height);
    };

    drawImage();
  }, [originalImage, processedImage, text, font, fontSize, fontWeight, color, textPosition]);

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
    if (!isDragging.current || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const dx = x - lastPosition.current.x;
      const dy = y - lastPosition.current.y;

      // Calculate new position
      const newX = textPosition.x + dx;
      const newY = textPosition.y + dy;

      // Get canvas context for text measurements
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.font = `${fontWeight} ${fontSize}px ${font}`;
        const textWidth = ctx.measureText(text).width;

        // Constrain text position within canvas boundaries
        const constrainedX = Math.max(0, Math.min(newX, canvasRef.current.width - textWidth));
        const constrainedY = Math.max(fontSize / 2, Math.min(newY, canvasRef.current.height - fontSize / 2));

        onTextPositionChange({
          x: constrainedX,
          y: constrainedY,
        });
      }

      lastPosition.current = { x, y };
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-full">
      <canvas
        ref={canvasRef}
        className="max-w-full h-auto cursor-move rounded-lg shadow-lg"
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