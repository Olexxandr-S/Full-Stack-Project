import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Unstable_Grid2";
import AddVideo from "./AddVideo";
import SearchField from "./SearchField";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import { dataContext } from "./App";

const AddTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#865AC4",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#865AC4",
    },
  },
  marginLeft: "0.5rem",
  marginRight: "0.5rem",
});

const AddVideoButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#865AC4"),
  backgroundColor: "#865AC4",
  "&:hover": {
    backgroundColor: "#388e3c",
  },
  marginRight: "0.5rem",
  width: "8rem",
}));

const CloseButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#865AC4"),
  backgroundColor: "#865AC4",
  "&:hover": {
    backgroundColor: "#f44336",
  },
  marginLeft: "0.5rem",
  width: "8rem",
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "1rem",
};

export default function Navigation() {
  let contextData = useContext(dataContext);
  const [videoData, setVideoData] = useState({
    title: "",
    url: "",
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [titleError, setTitleError] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const [invalidUrl, setInvalidUrl] = useState(false);

  const handleSubmit = () => {
    if (!videoData.title) {
      setTitleError(true);
      return;
    } else if (!videoData.url) {
      setUrlError(true);
      return;
    } else if (!videoData.url.includes("www.youtube.com/watch?")) {
      setUrlError(true);
      setInvalidUrl(true);
      return;
    }
    fetch("https://enigmatic-lake-56562.herokuapp.com/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(videoData),
    })
      .then((response) => response.json())
      .then((data) => {
        contextData.setFilteredData([...contextData.filteredData, data]);
      });
    setVideoData({
      title: "",
      url: "",
    });
    handleClose();
  };

  return (
    <Grid container spacing={-8} columns={16}>
      <Grid xs={8} display="flex" justifyContent="center" alignItems="center">
        <AddVideo handleOpen={handleOpen} />
      </Grid>
      <Grid xs={8} display="flex" justifyContent="center" alignItems="center">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Put Title and URL
            </Typography>
            <div>
              <AddTextField
                required
                value={videoData.title}
                helperText={titleError ? "Empty Title." : ""}
                error={titleError}
                name="title"
                type="text"
                label="TITLE"
                onChange={(e) => {
                  setVideoData({
                    ...videoData,
                    title: e.target.value,
                  });
                  setTitleError(false);
                }}
              />
              <AddTextField
                required
                value={videoData.url}
                helperText={
                  urlError ? (invalidUrl ? "Invalid URL." : "Empty URL.") : ""
                }
                error={urlError}
                name="url"
                type="url"
                label="URL"
                onChange={(e) => {
                  setVideoData({ ...videoData, url: e.target.value });
                  setUrlError(false);
                  setInvalidUrl(false);
                }}
              />
            </div>
            <div>
              <AddVideoButton
                variant="contained"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Add Video
              </AddVideoButton>
              <CloseButton
                variant="contained"
                color="error"
                onClick={() => {
                  handleClose();
                }}
              >
                Close
              </CloseButton>
            </div>
          </Box>
        </Modal>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <SearchField />
          </div>
        </Box>
      </Grid>
    </Grid>
  );
}
