import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { ChromePicker } from "react-color";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface TextControlsProps {
  onTextChange: (text: string) => void;
  onFontChange: (font: string) => void;
  onSizeChange: (size: number) => void;
  onColorChange: (color: string) => void;
  onFontWeightChange?: (weight: number) => void;
  show: boolean;
}

export const TextControls = ({
  onTextChange,
  onFontChange,
  onSizeChange,
  onColorChange,
  onFontWeightChange = () => {},
  show
}: TextControlsProps) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState("#000000");

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

  if (!show) return null;

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
          onChange={(e) => onTextChange(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="font" className="text-sm font-medium text-gray-700">
          Font Style
        </Label>
        <Select onValueChange={onFontChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a font" />
          </SelectTrigger>
          <SelectContent>
            {fonts.map((font) => (
              <SelectItem
                key={font}
                value={font}
                style={{ fontFamily: font }}
              >
                {font}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <Label className="text-sm font-medium text-gray-700">Font Size</Label>
        <div className="px-2">
          <Slider
            defaultValue={[24]}
            max={200}
            min={12}
            step={1}
            className="my-4"
            onValueChange={(value) => onSizeChange(value[0])}
            style={{
              "--slider-track-background": "linear-gradient(to right, #6366F1, #EC4899)",
              "--slider-range-background": "#6366F1",
              "--slider-thumb-background": "#ffffff",
              "--slider-thumb-border": "2px solid #6366F1",
            } as React.CSSProperties}
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-sm font-medium text-gray-700">Font Weight</Label>
        <div className="px-2">
          <Slider
            defaultValue={[400]}
            max={900}
            min={100}
            step={100}
            className="my-4"
            onValueChange={(value) => onFontWeightChange(value[0])}
            style={{
              "--slider-track-background": "linear-gradient(to right, #6366F1, #EC4899)",
              "--slider-range-background": "#6366F1",
              "--slider-thumb-background": "#ffffff",
              "--slider-thumb-border": "2px solid #6366F1",
            } as React.CSSProperties}
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
    </div>
  );
};