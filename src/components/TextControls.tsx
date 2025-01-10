import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { ChromePicker } from "react-color";

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

  const fonts = [
    "Arial",
    "Times New Roman",
    "Helvetica",
    "Georgia",
    "Verdana",
  ];

  const handleColorChange = (color: any) => {
    setColor(color.hex);
    onColorChange(color.hex);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg space-y-4">
      <div>
        <Label htmlFor="text">Text</Label>
        <Input
          id="text"
          placeholder="Enter your text"
          onChange={(e) => onTextChange(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="font">Font</Label>
        <select
          id="font"
          className="w-full p-2 border rounded"
          onChange={(e) => onFontChange(e.target.value)}
        >
          {fonts.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label>Font Size</Label>
        <Slider
          defaultValue={[24]}
          max={72}
          min={12}
          step={1}
          onValueChange={(value) => onSizeChange(value[0])}
        />
      </div>

      <div>
        <Label>Color</Label>
        <div
          className="w-full h-10 rounded cursor-pointer border"
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