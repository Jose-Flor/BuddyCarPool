

import { useState } from "react";
import {  createContext } from "react";

 export const FavoritesContext=createContext({

    ids:[ ], // favorite driver
    addFavorite:(id)=>{},
    removeFavorite:(id)=>{},
    
});
function FavoritesContextProvider({children}){
   const [favoriteCarIds,setFavoriteCarIds]=useState([])
   function addFavorite(id){
    if (!favoriteCarIds.includes(id)){

        setFavoriteCarIds((currentFavIds)=>[...currentFavIds,id])
    }


   }
   function removeFavorite(id){
    setFavoriteCarIds((currentFavIds)=>
    currentFavIds.filter((carIds)=>carIds !== id)
    );
   }
   const value={
    ids:favoriteCarIds,
    addFavorite:addFavorite,
    removeFavorite:removeFavorite,
   }

    return<FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>

}
export default FavoritesContextProvider;