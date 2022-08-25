import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Grid,
  LinearProgress,
  CircularProgress,
  IconButton,
  Badge,
  Stack,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CachedIcon from "@mui/icons-material/Cached";
import PokedexCard from "./components/PokedexCard";
import { listPokemons } from "../pokemon/services/ListPokemons";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FavoriteContext } from "../favorites/context/FavoriteContext";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface PokedexProps {}

export const Pokedex: React.FC<PokedexProps> = () => {
  const [page, setPage] = useState(1);
  const { favorites } = useContext(FavoriteContext);
  const navigate = useNavigate();
  const { data, isLoading, isRefetching, refetch, isStale } = useQuery(
    ["listPokemon", page],
    () => listPokemons(page),
    { keepPreviousData: true }
    );
    const dataCount = data?.count || 0;
    const pageCount = Math.ceil(dataCount/12);
 
  const favoritesCount = favorites.length;

  
  function handleFavorite() {
    navigate("/favoritos");
  }

  return (
    <>
      <Box m={1}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Pokedex
              </Typography>
              <IconButton
                size="large"
                aria-label="show more"
                aria-haspopup="true"
                color="inherit"
                onClick={handleFavorite}
              >
                <Badge badgeContent={favoritesCount} color="error">
                  <FavoriteIcon />
                </Badge>
              </IconButton>
            </Toolbar>

            {isRefetching && <LinearProgress color="secondary" />}
          </AppBar>
        </Box>
      </Box>

      <Container maxWidth="lg">
        <Box style={{ marginTop: `1em` }}>
          {isStale && (
            <IconButton
              aria-label="refetch"
              disabled={isRefetching}
              onClick={() => refetch()}
              color="secondary"
            >
              <CachedIcon />
            </IconButton>
          )}
        </Box>
        {!isLoading ? (
          <Box
            mt={2}
            maxWidth="100%"
            sx={{ display: `flex`, flexDirection: `column` }}
          >
            <Grid container spacing={2}>
              {data?.results.map((pokemon) => (
                <Grid item xs={12} sm={3} key={pokemon.id}>
                  <PokedexCard pokemon={pokemon} />
                </Grid>
              ))}
            </Grid>
            <Stack
              spacing={2}
              mt={2}
              style={{
                display: `flex`,
                flexDirection: `row`,
                alignSelf: `flex-end`,
              }}
            >
              <Pagination 
                color="primary"
                count={pageCount}
                onChange={(_e, currentPage) => setPage(currentPage)}
                renderItem={(item) => (
                  <PaginationItem
                    components={{
                      previous: ArrowBackIcon,
                      next: ArrowForwardIcon,
                    }}
                    {...item}
                  />
                )}
              />
            </Stack>
          </Box>
        ) : (
          <Box m={1} sx={{ width: "100%" }}>
            <CircularProgress />
          </Box>
        )}
      </Container>
    </>
  );
};

export default Pokedex;
