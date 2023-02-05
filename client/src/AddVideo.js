import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const AddVideoButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#865AC4"),
  backgroundColor: "#865AC4",
  "&:hover": {
    backgroundColor: "#583786",
  },
  width: "25ch",
  height: "3.45rem",
}));

export default function AddVideo({ handleOpen }) {
  return <AddVideoButton onClick={handleOpen}>Add video</AddVideoButton>;
}
