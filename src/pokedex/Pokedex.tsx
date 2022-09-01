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
  Paper,
  InputBase,
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
import SearchIcon from "@mui/icons-material/Search";

interface PokedexProps {}

export const Pokedex: React.FC<PokedexProps> = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const { favorites } = useContext(FavoriteContext);
  const navigate = useNavigate();
  const { data, isLoading, isRefetching, refetch, isStale } = useQuery(
    ["listPokemon", page],
    () => listPokemons(page),
    { keepPreviousData: true }
  );
  const dataCount = data?.count || 0;
  const pageCount = Math.ceil(dataCount / 12);
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

              {isStale && (
                <IconButton
                  aria-label="refetch"
                  disabled={isRefetching}
                  onClick={() => refetch()}
                  color="inherit"
                >
                  <CachedIcon />
                </IconButton>
              )}

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
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            width: 400,
            borderRadius: "100px",
          }}
        >
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Pesquisar"
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value)
              setData(data?.results.filter((item) => item.name === event.target.value))
            }}
          />
        </Paper>

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
