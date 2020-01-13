import React from "react";
import "./MockBarChart.css"

function MockBarChart({colors}) {
  if (colors.length < 3) return <div></div>

  return (
    <div className="MockChart">
        <div className="MockChart__bar1">
          <div
            className="MockChart__series5"
            style={{ backgroundColor: colors[4] }}
          ></div>
          <div
            className="MockChart__series4"
            style={{ backgroundColor: colors[3] }}
          ></div>
          <div
            className="MockChart__series3"
            style={{ backgroundColor: colors[2] }}
          ></div>
          <div
            className="MockChart__series2"
            style={{ backgroundColor: colors[1] }}
          ></div>
          <div
            className="MockChart__series1"
            style={{ backgroundColor: colors[0] }}
          ></div>
        </div>
        <div className="MockChart__bar2">
          <div
            className="MockChart__series5"
            style={{ backgroundColor: colors[4] }}
          ></div>
          <div
            className="MockChart__series4"
            style={{ backgroundColor: colors[3] }}
          ></div>
          <div
            className="MockChart__series3"
            style={{ backgroundColor: colors[2] }}
          ></div>
          <div
            className="MockChart__series2"
            style={{ backgroundColor: colors[1] }}
          ></div>
          <div
            className="MockChart__series1"
            style={{ backgroundColor: colors[0] }}
          ></div>
        </div>
        <div className="MockChart__bar3">
          <div
            className="MockChart__series5"
            style={{ backgroundColor: colors[4] }}
          ></div>
          <div
            className="MockChart__series4"
            style={{ backgroundColor: colors[3] }}
          ></div>
          <div
            className="MockChart__series3"
            style={{ backgroundColor: colors[2] }}
          ></div>
          <div
            className="MockChart__series2"
            style={{ backgroundColor: colors[1] }}
          ></div>
          <div
            className="MockChart__series1"
            style={{ backgroundColor: colors[0] }}
          ></div>
        </div>
      </div>
  )
}

export default MockBarChart;