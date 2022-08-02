import React, { useEffect, useState } from 'react';
import { PokemonDetail } from './interface/pokemonDetail';
import { useNavigate, useParams } from 'react-router-dom';
import { getPokemonDetails } from './services/getPokemonDetails';
import { AppBar, Toolbar, Typography, Container, Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface PokemonDetailsProps {

}


export const PokemonDetails: React.FC<PokemonDetailsProps> = () => {
  const [selectedPokemonDetails, setSelectedPokemonDetails] = useState<PokemonDetail | undefined>(undefined);
  const { name } = useParams();

  let navigate = useNavigate();
  function handleClick() {
    navigate(`/`);
  }

  useEffect(() => {
    if(!name) return;
    getPokemonDetails(name)
      .then((response) => setSelectedPokemonDetails(response));
  }, [name]);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {name}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>

      <Container maxWidth='lg'>
        <Box mt={2}>
          <img width='50%' height='auto' src={selectedPokemonDetails?.sprites.front_default} alt="" />
        </Box>
        <Box display='flex' flexDirection='row'>
          <Typography variant='h2'>
            {selectedPokemonDetails?.name}
          </Typography>
        </Box>

        <Box display='flex' flexDirection='row'>
          <Typography mr={1}>
            Type:
          </Typography>
          {selectedPokemonDetails?.types.map((type) => <Typography>{type.type.name}</Typography>)}
        </Box>

        <Box display='flex' flexDirection='row' >
          <Typography mr={1}>
            Specie:
          </Typography>
          <Typography>
            {selectedPokemonDetails?.species.name}
          </Typography>
        </Box>

        <Box display='flex' flexDirection='row'>
          <Typography mr={1}>
            Height:
          </Typography>
          <Typography>
            {selectedPokemonDetails?.height}
          </Typography>
        </Box>

        <Box display='flex' flexDirection='row'>
          <Typography mr={1}>
            Weight:
          </Typography>
          <Typography>
            {selectedPokemonDetails?.weight}
          </Typography>
        </Box>

        <Box display='flex' flexDirection='row'>
          <Typography mr={1}>
            Abilities:
          </Typography>
          {selectedPokemonDetails?.abilities.map((ability) => <Typography>{ability.ability.name}</Typography>)}
        </Box>




      </Container>
    </div>
  );
};

export default PokemonDetails;