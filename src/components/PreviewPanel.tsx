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

  const handleStart = (x: number, y: number) => {
    isDragging.current = true;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      lastPosition.current = {
        x: x - rect.left,
        y: y - rect.top,
      };
    }
  };

  const handleMove = (x: number, y: number) => {
    if (!isDragging.current || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    if (rect) {
      const currentX = x - rect.left;
      const currentY = y - rect.top;
      
      const dx = currentX - lastPosition.current.x;
      const dy = currentY - lastPosition.current.y;

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

      lastPosition.current = { x: currentX, y: currentY };
    }
  };

  const handleEnd = () => {
    isDragging.current = false;
  };

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent scrolling while dragging
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent scrolling while dragging
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-full">
      <canvas
        ref={canvasRef}
        className="max-w-full h-auto cursor-move rounded-lg shadow-lg touch-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
      <div className="text-sm text-gray-500">
        Drag or touch to move text
      </div>
    </div>
  );
};