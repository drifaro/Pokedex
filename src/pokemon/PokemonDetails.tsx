import React, { useEffect, useState } from 'react';
import { PokemonDetail } from './interface/pokemonDetail';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

interface PokemonDetailsProps {

}
// const [selectedPokemonDetails, setSelectedPokemonDetails] = useState<PokemonDetail | undefined>(undefined);

const PokemonDetails: React.FC<PokemonDetailsProps> = () => {

  useEffect(() => {
    // if (!selectedPokemon) return;

    // getPokemonDetails(selectedPokemon.name)
    //   .then((response) => setSelectedPokemonDetails(response));
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
            Pokemon Selecionado:
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      {/* <h2>Pokemon selecionado: {selectedPokemon?.name || 'Nenhum pokemon selecionado.'}</h2>
      {JSON.stringify(selectedPokemonDetails, undefined, 2)} */}
    </div>
  );
};

export default PokemonDetails;