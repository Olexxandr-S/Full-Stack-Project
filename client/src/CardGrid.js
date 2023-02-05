import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import VideoCard from "./VideoCard";
import { useContext } from "react";
import { dataContext } from "./App";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const CustomPagination = styled(Pagination)(() => ({
  display: "flex",
  justifyContent: "center",
  margin: "3rem",
  marginBottom: "6rem",
}));

const Item = styled(Grid)(() => ({
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
}));

export default function CardGrid() {
  let data = useContext(dataContext);
  const [page, setPage] = React.useState(1);
  const handlePageChange = (e, value) => {
    setPage(value);
  };
  let pages = data.filteredData.length > 12 ? data.filteredData.length / 12 : 1;

  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {data.filteredData.map((v, id) =>
          id >= 12 * page - 12 && id <= 12 * page - 1 ? (
            <Item key={v.id} xs={2} sm={4} md={4}>
              <VideoCard video={v} />
            </Item>
          ) : (
            ""
          )
        )}
      </Grid>
      <Stack spacing={2}>
        <CustomPagination
          count={pages}
          shape="rounded"
          onChange={handlePageChange}
        />
      </Stack>
    </>
  );
}
