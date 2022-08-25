import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Grid, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { FavoriteContext } from './context/FavoriteContext';
import PokedexCard from '../pokedex/components/PokedexCard';

interface FavoriteScreenProps {
}


export const FavoriteScreen: React.FC<FavoriteScreenProps> = () => {
  const { favorites } = useContext(FavoriteContext);

  const navigate = useNavigate();

  function handleHome() {
    navigate('/')
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }} m={1}>

        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleHome}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Pokemons Favoritos
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {favorites.map((pokemon) => (
            <Grid item xs={6} lg={3} key={pokemon.id}>
              <PokedexCard pokemon={pokemon} />
            </Grid>
          ))}
        </Grid>
      </Container >
    </>
  );
};

export default FavoriteScreen;

