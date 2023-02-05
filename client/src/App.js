import { createContext, useState } from "react";
import data from ".//data/exampleResponse.json";
import Header from "./Header";
import CardGrid from "./CardGrid";
import Navigation from "./Navigation";

let dataContext = createContext();

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
    </dataContext.Provider>
  );
}

export { dataContext };
export default App;
