import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native/types";
import { useAuth } from "./AuthContext";


export const DriverContext=createContext({
    drivers: [],
    addDriver: () => {},
    updateDriver: () => {},
    deleteDriver: () => {},
    fetchDrivers: () => {}

})

export const DriverProvider=({children})=>{
    const [drivers,setDrivers]=useState([]);
    const {user}=useAuth();
    useEffect(()=>{
        const fetchDrivers =async()=>{
            if (user && user.idToken) {
                try {
                    const result = await axios.get(`https://carpoolbuddy-d054e-default-rtdb.firebaseio.com/drivers.json?auth=${user.idToken}`);
                    const fetchedDrivers = result.data ? Object.keys(result.data).map(key => ({
                        id: key,
                        ...result.data[key]
                    })) : [];
                    setDrivers(fetchedDrivers);
                } catch (error) {
                    console.error("Failed to fetch drivers:", error);
                }
            }
        }
        fetchDrivers();
    },[user]);
    const addDriver = async (driverData) => {
        if (user && user.idToken) {
            try {
                const result = await axios.post(`https://carpoolbuddy-d054e-default-rtdb.firebaseio.com/drivers.json?auth=${user.idToken}`, driverData);
                setDrivers([...drivers, { id: result.data.name, ...driverData }]);
            } catch (error) {
                console.error("Failed to add driver:", error);
            }
        }
    };
    const updateDriver = async (id, driverData) => {
        if (user && user.idToken) {
            try {
                await axios.put(`https://carpoolbuddy-d054e-default-rtdb.firebaseio.com/drivers/${id}.json?auth=${user.idToken}`, driverData);
                setDrivers(drivers.map(driver => driver.id === id ? { ...driver, ...driverData } : driver));
            } catch (error) {
                console.error("Failed to update driver:", error);
            }
        }
    };
    const deleteDriver = async (id) => {
        if (user && user.idToken) {
            try {
                await axios.delete(`https://carpoolbuddy-d054e-default-rtdb.firebaseio.com/drivers/${id}.json?auth=${user.idToken}`);
                setDrivers(drivers.filter(driver => driver.id !== id));
            } catch (error) {
                console.error("Failed to delete driver:", error);
            }
        }
    };
    return(
        <DriverContext.Provider value={{ drivers, addDriver, updateDriver, deleteDriver }}>
            {children}

        </DriverContext.Provider>
    )

}