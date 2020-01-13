import React, { useState } from "react";
import chroma from "chroma-js";
import "./App.css";
import MockBarChart from "./MockBarChart"
import Preset from "./Preset"

function generateEndColor(startColor, hueShiftVal) {
  const startColorHue = chroma(startColor).get("hsl.h");
  const startColorLightness = chroma(startColor).get("hsl.l");

  let endHue = startColorHue - hueShiftVal;

  let middlingLightness = startColorLightness > 0.2 && startColorLightness < 0.8;
  let endLightness = 0;

  if (middlingLightness && startColorLightness > 0.51) {
    endLightness = 0.1;
  } else if (middlingLightness && startColorLightness < 0.51) {
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
  return chroma.scale([startColor, endColor]).mode('lab').colors(5);
}

function App() {
  const [inputValue, setInputValue] = useState("#1a73e8");
  const [startColor, setStartColor] = useState("#1a73e8");
  const [endColor, setEndColor] = useState("#16050a");
  const [gradientColors, setGradientColors] = useState([]);
  const [hueShift, setHueShift] = useState(90);

  if (!gradientColors.length) {
    setGradientColors(generatePalette(startColor, endColor));
  }
  
  const handleHueShiftChange = e => {
    setHueShift(e.target.value);
  }

  const handleInputChange = e => {
    setInputValue(e.target.value);
    if (e.target.value.length > 3) {
      setStartColor(e.target.value);
      setEndColor(generateEndColor(e.target.value));
      setGradientColors(
        generatePalette(e.target.value, generateEndColor(e.target.value, hueShift))
      );
    }
  };

  const handlePresetClick = color => {
    setInputValue(color);
    if (color.length > 3) {
      setStartColor(color);
      setEndColor(generateEndColor(color));
      setGradientColors(
        generatePalette(color, generateEndColor(color, hueShift))
      );
    }
  }

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
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          autoFocus
        />
      </div>

      <div style={{margin: "0 auto", width: 600}}>
        <div className="hueShift">
          Hue shift
          <div className="hueGradient"></div>
          <input className="hueShift__slider" type="range" min="1" max="360" step="1" onChange={handleHueShiftChange} value={hueShift} /> {hueShift}
        </div>

        <div className="presets">
          <div className="presets__header">Default colors:</div>
          <Preset hex="#000000" clickHandler={handlePresetClick} />
          <Preset hex="#555555" clickHandler={handlePresetClick} />
          <Preset hex="#727272" clickHandler={handlePresetClick} />
          <Preset hex="#a6a6a6" clickHandler={handlePresetClick} />
          <Preset hex="#d8d8d8" clickHandler={handlePresetClick} />
          <Preset hex="#ffffff" clickHandler={handlePresetClick} />


          <Preset hex="#fe5657" clickHandler={handlePresetClick} />
          <Preset hex="#ff66c4" clickHandler={handlePresetClick} />
          <Preset hex="#ca6be6" clickHandler={handlePresetClick} />
          <Preset hex="#8c50ff" clickHandler={handlePresetClick} />
          <Preset hex="#5271ff" clickHandler={handlePresetClick} />
          <Preset hex="#36b6ff" clickHandler={handlePresetClick} />

          <Preset hex="#5ae2e6" clickHandler={handlePresetClick} />
          <Preset hex="#7dd957" clickHandler={handlePresetClick} />
          <Preset hex="#c9e165" clickHandler={handlePresetClick} />
          <Preset hex="#ffdd59" clickHandler={handlePresetClick} />
          <Preset hex="#ffbd58" clickHandler={handlePresetClick} />
          <Preset hex="#ff914c" clickHandler={handlePresetClick} />
        </div>

        <div className="presets">
          <div className="presets__header">Brand colors:</div>
          <Preset hex="#00c7cf" clickHandler={handlePresetClick} />
          <Preset hex="#00b2b7" clickHandler={handlePresetClick} />
          
          <Preset hex="#00abf4" clickHandler={handlePresetClick} />
          <Preset hex="#0092da" clickHandler={handlePresetClick} />
          
          <Preset hex="#8a00f1" clickHandler={handlePresetClick} />
          <Preset hex="#7300d7" clickHandler={handlePresetClick} />
        </div>
      </div>
      <div className="Palette">{renderGradientColors()}</div>

      <div className="containers">
        <div className="lightContainer">
          <MockBarChart colors={gradientColors} />
        </div>
        <div className="darkContainer">
          <MockBarChart colors={gradientColors} />
        </div>
      </div>
      
    </div>
  );
}

export default App;
