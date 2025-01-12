import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { ChromePicker } from "react-color";
import { ScrollArea } from "./ui/scroll-area";

interface TextControlsProps {
  onTextChange: (text: string) => void;
  onFontChange: (font: string) => void;
  onSizeChange: (size: number) => void;
  onColorChange: (color: string) => void;
}

export const TextControls = ({
  onTextChange,
  onFontChange,
  onSizeChange,
  onColorChange,
}: TextControlsProps) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState("#000000");
  const [previewText, setPreviewText] = useState("Preview Text");

  const fonts = [
    "Abril Fatface", "Alegreya", "Archivo", "Bitter", "Cabin",
    "Crimson Text", "Dancing Script", "DM Sans", "Fira Sans",
    "IBM Plex Sans", "Inter", "Josefin Sans", "Lato",
    "Libre Baskerville", "Lora", "Merriweather", "Montserrat",
    "Mulish", "Noto Sans", "Nunito", "Open Sans", "Oswald",
    "PT Sans", "PT Serif", "Playfair Display", "Poppins",
    "Quicksand", "Raleway", "Roboto", "Roboto Condensed",
    "Roboto Mono", "Roboto Slab", "Source Sans Pro",
    "Source Serif Pro", "Space Grotesk", "Ubuntu", "Work Sans"
  ];

  const handleColorChange = (color: any) => {
    setColor(color.hex);
    onColorChange(color.hex);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div>
        <Label htmlFor="text" className="text-sm font-medium text-gray-700 mb-2">
          Your Text
        </Label>
        <Input
          id="text"
          placeholder="Enter your text"
          className="w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
          onChange={(e) => {
            onTextChange(e.target.value);
            setPreviewText(e.target.value || "Preview Text");
          }}
        />
      </div>

      <div>
        <Label htmlFor="font" className="text-sm font-medium text-gray-700 mb-2">
          Font Style
        </Label>
        <ScrollArea className="h-48 rounded-md border">
          <div className="p-4">
            {fonts.map((font) => (
              <div
                key={font}
                onClick={() => onFontChange(font)}
                className="p-2 hover:bg-gray-100 cursor-pointer rounded-md transition-colors"
              >
                <p style={{ fontFamily: font }} className="text-lg">
                  {previewText}
                </p>
                <p className="text-xs text-gray-500 mt-1">{font}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2">Font Size</Label>
        <div className="px-2">
          <Slider
            defaultValue={[24]}
            max={200}
            min={12}
            step={1}
            className="my-4"
            onValueChange={(value) => onSizeChange(value[0])}
          />
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2">Text Color</Label>
        <div
          className="w-full h-10 rounded-lg cursor-pointer border border-gray-300 transition-all hover:border-primary"
          style={{ backgroundColor: color }}
          onClick={() => setShowColorPicker(!showColorPicker)}
        />
        {showColorPicker && (
          <div className="absolute z-10 mt-2">
            <div
              className="fixed inset-0"
              onClick={() => setShowColorPicker(false)}
            />
            <ChromePicker color={color} onChange={handleColorChange} />
          </div>
        )}
      </div>

      <div className="pt-4">
        <p className="text-sm text-gray-500">
          Tip: Click and drag the text in the preview to reposition it
        </p>
      </div>
    </div>
  );
};