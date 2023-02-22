import { useState, React } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import Video from "./Video";
import { useContext } from "react";
import { dataContext } from "./App";

const LikeButton = styled(IconButton)(({ iconcolor }) => ({
  color: "#865AC4",
  "&:hover": {
    color: "#1b5e20",
  },
  "&:disabled": {
    color: iconcolor ? "#388e3c" : "#bdbdbd",
  },
}));

const DislikeButton = styled(IconButton)(({ iconcolor }) => ({
  color: "#865AC4",
  "&:hover": {
    color: "#d50000",
  },
  "&:disabled": {
    color: iconcolor ? "#bdbdbd" : "#f44336",
  },
}));

const Delete = styled(IconButton)(() => ({
  color: "#865AC4",
  "&:hover": {
    color: "red",
  },
  marginLeft: "auto",
}));

export default function VideoCard({ video }) {
  let contextData = useContext(dataContext);
  const [rating, setRating] = useState(video.rating);
  const [disableButton, setDisableButton] = useState(false);
  const [like, setLike] = useState(false);

  const deleteVideo = (id) => {
    fetch(`https://enigmatic-lake-56562.herokuapp.com/${id}`, {
      method: "DELETE",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        contextData.setFilteredData((prevState) =>
          prevState.filter((video) => video.id !== data[0].id)
        );
      });
  };

  const updateVideo = (id, action) => {
    fetch(`https://enigmatic-lake-56562.herokuapp.com/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({ id: id, rating: rating, action: action }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRating(data[0].rating);
      });
  };

  return (
    <Card
      sx={{
        width: 370,
        display: "flex",
        flexDirection: "column",
        bgcolor: "#e9e0f7",
        boxShadow: 24,
      }}
    >
      <CardHeader title={video.title} />
      <CardContent>
        <Video video={video} />
        <Typography variant="h6">Rating: {rating}</Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ marginTop: "auto" }}>
        <LikeButton
          aria-label="like"
          disabled={disableButton}
          iconcolor={like}
          onClick={() => {
            // setRating(rating + 1);
            setDisableButton(true);
            setLike(true);
            updateVideo(video.id, "increase");
          }}
        >
          <ThumbUpAltIcon />
        </LikeButton>
        <DislikeButton
          aria-label="dislike"
          disabled={disableButton}
          iconcolor={like}
          onClick={() => {
            setRating(rating - 1);
            setDisableButton(true);
            setLike(false);
            updateVideo(video.id, "decrease");
          }}
        >
          <ThumbDownAltIcon />
        </DislikeButton>
        <Delete
          aria-label="delete"
          onClick={() => {
            deleteVideo(video.id);
          }}
        >
          <DeleteIcon />
        </Delete>
      </CardActions>
    </Card>
  );
}
