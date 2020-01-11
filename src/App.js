import React, { useState } from "react";
import chroma from "chroma-js";
import "./App.css";

function generateEndColor(startColor, hueShiftDiviser = 5) {
  const startColorHue = chroma(startColor).get("hsl.h");
  const startColorLightness = chroma(startColor).get("hsl.l");

  const hueShiftVal = 360 / hueShiftDiviser;
  let endHue =
    startColorHue + hueShiftVal > 359
      ? startColorHue - hueShiftVal
      : startColorHue + hueShiftVal;

  let middlingLightness = false;
  let endLightness = 0;

  if (startColorLightness > 0.3 && startColorLightness < 0.7) {
    middlingLightness = true;
  }

  if (middlingLightness && startColorLightness > 0.5) {
    endLightness = 0.25;
  } else if (middlingLightness && startColorLightness < 0.5) {
    endLightness = 0.85;
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
  return chroma.scale([startColor, endColor]).mode('lab').colors(5);;
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
          <div className="ColorBox">
            <div
              key={`gradient-${color}`}
              className="Color GradientColor"
              style={{ backgroundColor: color }}
            ></div>
            <table>
              <tr>
                <td>{color}</td>
              </tr>
              <tr>
                <td>{chroma(color).css('hsl')}</td>
              </tr>
            </table>
          </div>
        );
      })
    );
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

      <div className="MockChart">
        <div className="MockChart__bar1">
          <div
            className="MockChart__series5"
            style={{ backgroundColor: gradientColors[4] }}
          ></div>
          <div
            className="MockChart__series4"
            style={{ backgroundColor: gradientColors[3] }}
          ></div>
          <div
            className="MockChart__series3"
            style={{ backgroundColor: gradientColors[2] }}
          ></div>
          <div
            className="MockChart__series2"
            style={{ backgroundColor: gradientColors[1] }}
          ></div>
          <div
            className="MockChart__series1"
            style={{ backgroundColor: gradientColors[0] }}
          ></div>
        </div>
        <div className="MockChart__bar2">
          <div
            className="MockChart__series5"
            style={{ backgroundColor: gradientColors[4] }}
          ></div>
          <div
            className="MockChart__series4"
            style={{ backgroundColor: gradientColors[3] }}
          ></div>
          <div
            className="MockChart__series3"
            style={{ backgroundColor: gradientColors[2] }}
          ></div>
          <div
            className="MockChart__series2"
            style={{ backgroundColor: gradientColors[1] }}
          ></div>
          <div
            className="MockChart__series1"
            style={{ backgroundColor: gradientColors[0] }}
          ></div>
        </div>
        <div className="MockChart__bar3">
          <div
            className="MockChart__series5"
            style={{ backgroundColor: gradientColors[4] }}
          ></div>
          <div
            className="MockChart__series4"
            style={{ backgroundColor: gradientColors[3] }}
          ></div>
          <div
            className="MockChart__series3"
            style={{ backgroundColor: gradientColors[2] }}
          ></div>
          <div
            className="MockChart__series2"
            style={{ backgroundColor: gradientColors[1] }}
          ></div>
          <div
            className="MockChart__series1"
            style={{ backgroundColor: gradientColors[0] }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;
