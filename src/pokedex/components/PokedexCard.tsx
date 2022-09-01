import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Box, CardActions, IconButton } from '@mui/material';
import { PokemonDetail } from '../../pokemon/interface/pokemonDetail';
import Chip from '@mui/material/Chip/Chip';
import { FavoriteContext } from '../../favorites/context/FavoriteContext';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface PokedexCardProps {
  pokemon: PokemonDetail;
}

export const PokedexCard: React.FC<PokedexCardProps> = ({ pokemon }) => {
  const { favorites, setFavorites } = useContext(FavoriteContext);
  let navigate = useNavigate();

  function handleClick() {
    navigate(`/pokemon/${pokemon.name}`);
  }

  const addPokemonToFavorite = () => {
    setFavorites([...favorites, pokemon]);
  }

  const removePokemonFromFavorites = () => {
    setFavorites(favorites.filter((pokemonFavorite) => pokemonFavorite.name !== pokemon.name))
  }

  const isFavorite = favorites.some((pokemonFavorite) => pokemonFavorite.name === pokemon.name);

  return (
    <Box>
      <Card sx={{ display: 'flex', height: 180 }} style={{ paddingBottom: `1em` }}>

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>

          <CardContent onClick={handleClick} >
            <Typography component="div" variant="h6">
              {pokemon.name}
            </Typography>

          <Box sx={{ height: '75px'}}>
            {pokemon.types.map((type) => (
              <Box display='flex' flexDirection='row' mt={1} key={type.slot}>
                <Chip label={type.type.name} variant="outlined" />
              </Box>
            ))}
          </Box>
          </CardContent>

          <CardActions disableSpacing>
            <IconButton onClick={() => isFavorite ? removePokemonFromFavorites() : addPokemonToFavorite()}  aria-label="add to favorites" >
              <FavoriteIcon color={isFavorite ? `error` : `inherit` } />
            </IconButton>
          </CardActions> 
        </Box>

        <CardMedia component="img"
          sx={{ width: 150, height: 180 }}
          image={pokemon.sprites.front_default}
          alt="Live from space album cover"
          onClick={handleClick} />

      </Card>
   
    </Box>
  );
};

export default PokedexCard;