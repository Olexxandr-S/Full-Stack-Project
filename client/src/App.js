import { createContext, useState } from "react";
import data from ".//data/exampleResponse.json";
import Header from "./Header";
import CardGrid from "./CardGrid";
import Navigation from "./Navigation";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import GitHubIcon from "@mui/icons-material/GitHub";
import signature from "./assets/images/signature.png";

let dataContext = createContext();

const GitIcon = styled(GitHubIcon)(() => ({
  color: "#865AC4",
  "&:hover": {
    color: "#633F97",
  },
  position: "fixed",
  right: 28,
  bottom: 11,
}));

const CustomPaper = styled(Paper)(() => ({
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  height: "3rem",
}));

function App() {
  let [filteredData, setFilteredData] = useState(data);
  const videoData = [...data];
  return (
    <dataContext.Provider value={{ videoData, filteredData, setFilteredData }}>
      <Header />
      <main>
        <Navigation />
        <CardGrid />
      </main>
      <CustomPaper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <Typography variant="h5" component="div" color="#633F97">
          Developed by:{" "}
          <a href="https://0lexxandr-s-portfolio.vercel.app/">
            <img src={signature} alt="signature" height="50" />
          </a>
          <a href="https://github.com/OlexxandrS/Full-Stack-Project">
            <GitIcon />
          </a>
        </Typography>
      </CustomPaper>
    </dataContext.Provider>
  );
}

export { dataContext };
export default App;
