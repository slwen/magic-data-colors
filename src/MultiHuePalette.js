import React, { useState } from "react";
import chroma from "chroma-js";
import MockBarChart from "./MockBarChart"


function generateNextColor(color, huesBeforeLightShift = 10, lightShift = 0) {
  const hueShift = (360/2) / huesBeforeLightShift;

  const startColorHue = chroma(color).get("hsl.h");
  const startColorLightness = chroma(color).get("hsl.l");
  const endHue = startColorHue - hueShift;

  let transformedColor = color

  // Basically, if it's a light color, make it darker, or vice versa
  if (lightShift && startColorLightness < 0.5) {
    transformedColor = chroma(color)
      .set("hsl.l", startColorLightness+(0.25*lightShift))
      .hex();
  } else if (lightShift) {
    transformedColor = chroma(color)
      .set("hsl.l", startColorLightness-(0.25*lightShift))
      .hex();
  }

  return chroma(transformedColor).set("hsl.h", endHue).hex();
}

function MultiHuePalette() {
  const [inputValue, setInputValue] = useState("#1a73e8");
  const [startColor, setStartColor] = useState("#1a73e8");
  const [palette, setPalette] = useState([]);

  const handleInputChange = e => {
    setInputValue(e.target.value);
    if (e.target.value.length > 3) {
      setStartColor(e.target.value);
      setEndColor(generateEndColor(e.target.value));
      
      setPalette(generateRandomColors(e.target.value))
      setGradientColors(
        generatePalette(e.target.value, generateEndColor(e.target.value))
      );
    }
  };

  const generateRandomColors = (seedColor = startColor) => {
    const arr = Array.from(Array(12).keys())

    return arr.reduce((acc, cur, i) => {
      const huesBeforeLightShift = 5 // How many hues before a light shift is needed
      const lightShift = Math.floor(i/huesBeforeLightShift)
      console.log(seedColor)

      if (!acc) return [chroma(seedColor).hex()]
      return [...acc, generateNextColor(acc[i-2], huesBeforeLightShift, lightShift)]
    }) 
  }

  const renderRandomColors = () => {
    return palette.map(color => {
      return (
        <div className="ColorBox" key={`gradient-${color}`}>
          <div
            className="Color GradientColor"
            style={{ backgroundColor: color }}
          ></div>
          <table>
            <tbody>
              <tr>
                <td>{color}</td>
              </tr>
              <tr>
                <td>{chroma(color).css('hsl')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    })
  }

  return (
    <div className="App">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        autoFocus
      />

      <div className="Palette">{renderGradientColors()}</div>
      <MockBarChart colors={palette} />
    </div>
  );
}

export default MultiHuePalette;
