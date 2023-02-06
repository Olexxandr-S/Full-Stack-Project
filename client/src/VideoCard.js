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
    const allVideo = [...contextData.filteredData];
    const newData = allVideo.filter((video) => video.id !== id);
    contextData.setFilteredData(newData);
  };

  return (
    <Card sx={{ width: 345 }}>
      <CardHeader title={video.title} />
      <Video video={video} />
      <CardContent>
        <Typography variant="h6">Rating: {rating}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <LikeButton
          aria-label="like"
          disabled={disableButton}
          iconcolor={like}
          onClick={() => {
            setRating(rating + 1);
            setDisableButton(true);
            setLike(true);
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
