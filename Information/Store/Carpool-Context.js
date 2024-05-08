import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import { useAuth } from "./AuthContext";

export const DriverContext = createContext({
  drivers: [],
  addDriver: () => {},
  updateDriver: () => {},
  deleteDriver: () => {},
  fetchDrivers: () => {}
});

export const DriverProvider = ({ children }) => {
  const [drivers, setDrivers] = useState([]);
  const { user } = useAuth();

  const fetchDrivers = async () => {
    if (!user || !user.idToken) return;  // Ensure there is a user and a token
    try {
      const response = await axios.get(`https://carpoolbuddy-d054e-default-rtdb.firebaseio.com/drivers.json?auth=${user.idToken}`);
      const fetchedDrivers = response.data ? Object.keys(response.data).map(key => ({
          id: key,
          ...response.data[key]
      })) : [];
      setDrivers(fetchedDrivers);
    } catch (error) {
      console.error("Failed to fetch drivers:", error);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, [user]);  // Dependency on user to re-fetch when user changes

  const addDriver = async (driverData) => {
    if (!user || !user.idToken) return;
    try {
      const response = await axios.post(`https://carpoolbuddy-d054e-default-rtdb.firebaseio.com/drivers.json?auth=${user.idToken}`, driverData);
      const addedDriverId = response.data.name;  // Get ID from Firebase response
      const newDriver = { ...driverData, id: addedDriverId };  // Create complete new driver object with server-generated ID
      setDrivers(prevDrivers => [...prevDrivers, newDriver]);  // Optimistically add the new driver to the state
    } catch (error) {
      console.error("Failed to add driver:", error);
    }
  };
  
  
  const updateDriver = async (id, driverData) => {
    if (!user || !user.idToken) return;
    try {
      await axios.put(`https://carpoolbuddy-d054e-default-rtdb.firebaseio.com/drivers/${id}.json?auth=${user.idToken}`, driverData);
      fetchDrivers();
    } catch (error) {
      console.error("Failed to update driver:", error);
    }
  };

  const deleteDriver = async (id) => {
    if (!user || !user.idToken) return;
    try {
      await axios.delete(`https://carpoolbuddy-d054e-default-rtdb.firebaseio.com/drivers/${id}.json?auth=${user.idToken}`);
      fetchDrivers();
    } catch (error) {
      console.error("Failed to delete driver:", error);
    }
  };
  const fetchDriverData = async (id) => {
    if (!user || !user.idToken || !id) return null; // Check for necessary parameters
    try {
        const response = await axios.get(`https://carpoolbuddy-d054e-default-rtdb.firebaseio.com/drivers/${id}.json?auth=${user.idToken}`);
        return response.data ? { id, ...response.data } : null;
    } catch (error) {
        console.error("Failed to fetch driver data:", error);
        return null;
    }
};

  return (
    <DriverContext.Provider value={{ drivers, addDriver, updateDriver, deleteDriver, fetchDrivers,fetchDriverData }}>
      {children}
    </DriverContext.Provider>
  );
};
