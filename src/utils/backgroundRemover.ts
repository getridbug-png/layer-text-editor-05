import { removeBackground as removeBg } from '@imgly/background-removal';

export const removeBackground = async (imageElement: HTMLImageElement): Promise<Blob> => {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    canvas.width = imageElement.naturalWidth;
    canvas.height = imageElement.naturalHeight;
    ctx.drawImage(imageElement, 0, 0);

    // Convert canvas to blob
    const blob = await new Promise<Blob>((resolve) => 
      canvas.toBlob(blob => resolve(blob!), 'image/png')
    );

    // Convert blob to base64
    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });

    // Remove background using @imgly/background-removal
    const resultBlob = await removeBg(base64);
    return resultBlob;

  } catch (error) {
    console.error('Error removing background:', error);
    throw error;
  }
};

export const loadImage = (file: Blob): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};