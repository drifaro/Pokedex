import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Card, CardContent, CardMedia,  Typography, Box}  from '@mui/material';
import { PokemonDetail } from '../../pokemon/interface/pokemonDetail';
import Chip from '@mui/material/Chip/Chip';


interface PokedexCardProps {
  pokemon: PokemonDetail;
}

export const PokedexCard: React.FC<PokedexCardProps> = ({ pokemon }) => {

  let navigate = useNavigate();
  function handleClick() {
    navigate(`/pokemon/${pokemon.name}`);
  }

  return (
    <Box>
      <Card onClick={handleClick} sx={{ display: 'flex' }} >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>

            <Typography component="div" variant="h5">
              {pokemon.name}
            </Typography>

            {pokemon.types.map((type) => (
              <Box display='flex' flexDirection='row' mt={1}>
                <Chip label={type.type.name} variant="outlined" />
              </Box>
            ))}

          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          </Box>
        </Box>

        <CardMedia component="img"
          sx={{ width: 150, height: 150}}
          image={pokemon.sprites.front_default}
          alt="Live from space album cover" />
      </Card>
    </Box>
  );
};

export default PokedexCard;