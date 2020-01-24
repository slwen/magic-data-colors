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

function generateNextColor(color, huesBeforeLightShift = 12, lightShift = false) {
  const hueShift = 360 / huesBeforeLightShift;

  const startColorHue = chroma(color).get("hsl.h");
  const startColorLightness = chroma(color).get("hsl.l");
  const endHue = startColorHue - hueShift;

  let transformedColor = color

  // Basically, if it's a light color, make it darker, or vice versa
  if (lightShift && startColorLightness < 0.5) {
    transformedColor = chroma(color)
      .set("hsl.l", startColorLightness*1.5)
      .hex();
  } else if (lightShift) {
    transformedColor = chroma(color)
    .set("hsl.l", startColorLightness*0.33)
    .hex();
  }

  return chroma(transformedColor).set("hsl.h", endHue).hex();
}

const generateMultiHues = (seedColor = "#f30") => {
  const arr = Array.from(Array(36).keys()) // How many total colours to generate

  return arr.reduce((acc, cur, i) => {
    /* 
     * How many hues before a light shift is needed
     * 12 is a bit of a magic number since it will ensure analgous colour palette.
     * See https://chromatichq.com/blog/understanding-and-using-hsl-your-css
     */
    const huesBeforeLightShift = 12

    /*
     * Boolean trigger if lightshift required.
     * For example, after 12 hues are generated, hue 13 will be the same as hue 1;
     * To create some differentiation, the lightness value should shift too.
     */ 
    const lightShift = i>1 && i%huesBeforeLightShift === 1

    // console.log(i, i%huesBeforeLightShift)

    if (!acc) return [chroma(seedColor).hex()]
    return [...acc, generateNextColor(acc[i-2], huesBeforeLightShift, lightShift)]
  }) 
}

function App() {
  const [inputValue, setInputValue] = useState("#1a73e8");
  const [startColor, setStartColor] = useState("#1a73e8");
  const [endColor, setEndColor] = useState("#16050a");
  const [gradientColors, setGradientColors] = useState([]);
  const [hueShift, setHueShift] = useState(90);
  const [palette, setPalette] = useState([]);

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
      setPalette(generateMultiHues(e.target.value));
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
      setPalette(generateMultiHues(color));
      setGradientColors(
        generatePalette(color, generateEndColor(color, hueShift))
      );
    }
  }

  const renderMultiHueColorPalette = () => {
    return palette.map((color,i) => {
      return (
        <div className="ColorBox" key={`gradient-${color}-${i}`}>
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
      <div className="Palette">{renderMultiHueColorPalette()}</div>

      <div className="containers">
        <div className="lightContainer">
          <MockBarChart colors={gradientColors} />
        </div>
        <div className="darkContainer">
          <MockBarChart colors={gradientColors} />
        </div>
        { palette && <div className="lightContainer">
          <MockBarChart colors={palette} />
        </div> }
      </div>
      
    </div>
  );
}

export default App;
