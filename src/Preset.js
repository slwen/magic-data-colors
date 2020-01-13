import React from "react"

function Preset ({hex, clickHandler}) {
 return (
  <div className="preset" style={{backgroundColor: hex}} onClick={()=>clickHandler(hex)}></div>
 )
}

export default Preset;