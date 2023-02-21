// A simple component that renders the app header and accepts a title prop
import React from "react";

export const NavBar = (props) => {
  return (
    <header className="App-header">
      <h2>{props.text}</h2>
    </header>
  )
}
