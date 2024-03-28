import { useContext } from 'react';
import {View,Text} from'react-native'
import { useSelector } from 'react-redux';
import { FavoritesContext } from '../Store/favorite-context';
import { Dummy_Drivers } from '../dummy-data';
import DList from './DList';

function CarFavoriteScreen(){

    const { ids: favoriteCarIds } = useContext(FavoritesContext);

    // Filter drivers to only include favorites
    const favoriteDrivers = Dummy_Drivers.filter(driver => favoriteCarIds.includes(driver.id));

    return(
      <DList filterDrivers={favoriteDrivers} /> // should get item favoritdriver and savit it here {favoritCars}

    );
}
export default CarFavoriteScreen;