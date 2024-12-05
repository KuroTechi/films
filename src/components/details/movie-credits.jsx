import * as React from "react";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getActorImgUrl } from "./utils";

function Credits({ credits }) {
  const [page, setPage] = useState(1);
  const currentFilmActors = credits?.cast || [];
  const ITEMS_PER_PAGE = 4;
  const startElement = (page - 1) * ITEMS_PER_PAGE;
  const endElement = page * ITEMS_PER_PAGE;
  const handleChange = (event, value) => {
    setPage(value);
  };

  if (currentFilmActors.length === 0) {
    return null;
  }

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          paddingTop: "10px",
        }}
      >
        Актёры:
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "15px",
        }}
      >
        <Pagination
          count={Math.ceil(currentFilmActors.length / ITEMS_PER_PAGE)}
          page={page}
          onChange={handleChange}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {currentFilmActors.slice(startElement, endElement).map((actor) => (
          <Card
            key={actor.id}
            sx={{
              minWidth: 200,
              maxWidth: 200,
              marginRight: "20px",
              marginBottom: "15px",
            }}
          >
            <CardMedia
              component="img"
              height={"280px"}
              image={getActorImgUrl(actor.profile_path)}
              alt={actor.name}
            />
            <CardContent>
              <Typography gutterBottom variant="body1" component="div">
                {actor.name}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export { Credits };
