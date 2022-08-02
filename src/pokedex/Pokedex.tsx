import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Grid, IconButton}  from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PokedexCard from './components/PokedexCard';
import { listPokemons } from '../pokemon/services/listPokemons';
import { useQuery } from '@tanstack/react-query';


interface PokedexProps {
}

export const Pokedex: React.FC<PokedexProps> = () => {
  const { data } = useQuery(['listPokemons'], listPokemons);

  return (
    <div>
      <Box m={1}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Pokedex
              </Typography>
              <IconButton
                size='large'
                aria-label='show more'
                aria-haspopup='true'
                color='inherit'
              >
                <FavoriteIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Box>
      </Box>

      <Container maxWidth="lg">
        <Box mt={2}>
          <Grid container spacing={2}>
            {data?.results.map((pokemon) => (
              <>
                <Grid item xs={6} lg={3}>
                  <PokedexCard pokemon={pokemon} />
                </Grid>
              </>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Pokedex;

