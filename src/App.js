import React, { useState } from "react";
import chroma from "chroma-js";
import "./App.css";
import MockBarChart from "./MockBarChart"

function generateEndColor(startColor, hueShiftDiviser = 4) {
  const startColorHue = chroma(startColor).get("hsl.h");
  const startColorLightness = chroma(startColor).get("hsl.l");

  const hueShiftVal = 360 / hueShiftDiviser;
  let endHue =
    startColorHue + hueShiftVal > 359
      ? startColorHue - hueShiftVal
      : startColorHue + hueShiftVal;

  let middlingLightness = false;
  let endLightness = 0;

  if (startColorLightness > 0.1 && startColorLightness < 0.9) {
    middlingLightness = true;
  }

  if (middlingLightness && startColorLightness > 0.5) {
    endLightness = 0.05;
  } else if (middlingLightness && startColorLightness < 0.5) {
    endLightness = 0.9;
  } else {
    endLightness = 1 - startColorLightness;
  }

  let endColor = chroma(startColor)
    .set("hsl.h", endHue)
    .hex();

  return chroma(endColor)
    .set("hsl.l", endLightness)
    .hex();
}

function generatePalette(startColor, endColor) {
  return chroma.scale([startColor, endColor]).mode('lab').colors(5);
}

function App() {
  const [inputValue, setInputValue] = useState("#1a73e8");
  const [startColor, setStartColor] = useState("#1a73e8");
  const [endColor, setEndColor] = useState("#16050a");
  const [gradientColors, setGradientColors] = useState([]);

  if (!gradientColors.length) {
    setGradientColors(generatePalette(startColor, endColor));
  }

  const handleInputChange = e => {
    setInputValue(e.target.value);
    if (e.target.value.length > 3) {
      setStartColor(e.target.value);
      setEndColor(generateEndColor(e.target.value));
      setGradientColors(
        generatePalette(e.target.value, generateEndColor(e.target.value))
      );
    }
  };

  const renderGradientColors = () => {
    return (
      gradientColors.length &&
      gradientColors.map(color => {
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
    )
  };

  return (
    <div className="App">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        autoFocus
      />
      <div className="Palette">{renderGradientColors()}</div>
      <MockBarChart colors={gradientColors} />
    </div>
  );
}

export default App;
