import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPokemonDetails } from './services/getPokemonDetails';
import { AppBar, Toolbar, Typography, Container, Box, IconButton, CircularProgress, CardMedia, CardContent, Badge } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useQuery } from '@tanstack/react-query';
import { FavoriteContext } from '../favorites/context/FavoriteContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Card } from '@material-ui/core';


interface PokemonDetailsProps {

}

export const PokemonDetails: React.FC<PokemonDetailsProps> = () => {
  const { name } = useParams() as { name: string };
  const { data, isLoading  } = useQuery([`'pokemon-${name}'`], () => getPokemonDetails(name));
  const selectedPokemonDetails = data;
  const { favorites, setFavorites } = useContext(FavoriteContext);
  const navigate = useNavigate();
  const favoritesCount = favorites.length

  function handleClick() {
    navigate(`/`);
  }
  function handleFavorite() {
    navigate(`/favoritos`);
  }

  const addPokemonToFavorite = () => {
    if (!selectedPokemonDetails) return;
    setFavorites([...favorites, selectedPokemonDetails]);
  }

  const removePokemonFromFavorites = () => {
    if (!selectedPokemonDetails) return;
    setFavorites(favorites.filter((pokemonFavorite) => pokemonFavorite.name !== selectedPokemonDetails.name))
  }

  const isFavorite = favorites.some((pokemonFavorite) =>
    pokemonFavorite.name === selectedPokemonDetails?.name);

  // if (isLoading) {
  //   return (
  //     <Box sx={{ width: '100%' }} color='primary'>
  //       <LinearProgress />
  //     </Box>
  //   )
  // }


  return (
    <>
      <Box sx={{ flexGrow: 1 }} m={1}>
        <AppBar position="static" color='primary'>
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
            <IconButton
              size='large'
              aria-label='show more'
              aria-haspopup='true'
              color='inherit'
              onClick={handleFavorite}
            >
              <Badge badgeContent={favoritesCount} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      <Container maxWidth='xs'>
        {!isLoading ? (
          <Card style={{ maxWidth: 345, padding: `1em`, marginTop: `1em` }} >

            <IconButton onClick={() => isFavorite ? removePokemonFromFavorites() : addPokemonToFavorite()} aria-label="add to favorites">
              <FavoriteIcon color={isFavorite ? `error` : `inherit`} />
            </IconButton>

            <CardMedia
              width='20%'
              height='auto'
              component="img"
              alt={name}
              image={selectedPokemonDetails?.sprites.front_default}
            />

            <CardContent>
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
            </CardContent>
          </Card>
        ) : (
          <Box sx={{ width: '100%' }} color='primary'>
            <CircularProgress />
          </Box>)}
      </Container>
    </>
  );
};

export default PokemonDetails;