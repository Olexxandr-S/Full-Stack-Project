import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import { dataContext } from "./App";

const SearchTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#865AC4",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#865AC4",
    },
  },
});

export default function SearchField() {
  let contextData = useContext(dataContext);
  const allVideo = [...contextData.videos];
  const [query, setQuery] = useState("");
  const [searchError, setSearchError] = useState(false);
  const handleChange = (e) => {
    let searchValue = e.target.value.toLowerCase();
    setQuery(searchValue);
    const newData = allVideo.filter(
      (video) =>
        video.title.toLowerCase().includes(searchValue) ||
        video.rating >= searchValue
    );
    if (newData.length === 0) {
      setSearchError(true);
      contextData.setFilteredData(newData);
    } else {
      setSearchError(false);
      contextData.setFilteredData(newData);
    }
  };

  return (
    <SearchTextField
      id="outlined-search"
      label="Search"
      type="search"
      placeholder="Search by title or rating"
      multiline
      error={searchError}
      helperText={searchError ? "No match videos." : ""}
      value={query}
      onChange={(e) => {
        handleChange(e);
      }}
    />
  );
}
