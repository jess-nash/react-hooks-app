/* Contains:
  - a form with the input element and the search button,
  - functions that handle the input element and resets the field,
  - a function that calls the search function which is passed as props to it.
*/

import React, { useState } from "react";

export const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");

  // calls the state update function with the new value.
  const handleUserInputChanges = (e) => {
    setSearchValue(e.target.value);
  }

  // calls the state update function (setSearchValue) with an empty string in order to clear the input field.
  // const resetInputField = () => {
  //   setSearchValue("");
  // }

  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
    // resetInputField();
    setSearchValue(searchValue)
  }

  return (
    <form className="search">
      <input type="text" value={searchValue} onChange={handleUserInputChanges} />
      <input type="submit" value={"SEARCH"} onClick={callSearchFunction} />
    </form>
  )
}
