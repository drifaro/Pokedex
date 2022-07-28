import React, { useEffect, useState } from 'react';
import { getPokemonDetails } from '../pokemon/services/getPokemonDetails';
import { listPokemons, PokemonListInterface } from '../pokemon/services/listPokemons';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

interface PokedexProps {

}


export const Pokedex: React.FC<PokedexProps> = () => {
  const [pokemons, setPokemons] = useState<PokemonListInterface[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonListInterface | undefined>(undefined);



  useEffect(() => {
    listPokemons().then((response) => setPokemons(response.results));

  }, []);



  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pokedex
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box mt={2}>
          <Grid container spacing={2}>
            {pokemons.map((pokemon) => (
              <>
                <Grid item xs={6} lg={3}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {pokemon.name}
                    </Typography>
                    <CardActions>
                      <Button onClick={() => setSelectedPokemon(pokemon)} size="small">Abrir</Button>
                    </CardActions>
                  </CardContent>
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