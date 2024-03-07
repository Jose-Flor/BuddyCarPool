import axios from 'axios';


 const API_KEY ='AIzaSyBpC3rN7lB0UtI-pWfN69kOsA4qEhoVI7E'
export const signIn = async (email, password) => {
    try {
        const response = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
            {
                email: email,
                password: password,
                returnSecureToken: true,
            }
        );
        console.log('Firebase Authentication Response:', response.data); // Log the data

        return response.data; // Contains idToken, email, refreshToken, expiresIn, localId
    } catch (error) {
        console.error('SignIn failed:', error);
        throw error;
    }
};
export const signUp= async (email, password) =>{
    try{
        const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        {
            email: email,
            password: password,
            returnSecureToken: true,
        }
        );
        return response.data; // Contains idToken, email, refreshToken, expires
    }catch (error) {
        console.log('SignUp failed:', error);
        throw error;
    }
};
export const fetchUserData1=async(idToken)=>{
    try{
        const response= await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
        {idToken}
        );
        return response.data.users[0];
    }catch(error){
        console.log('fetching failed ',error);
        throw error;
    }
}
const DATABASE_URL = 'https://carpoolbuddy-d054e-default-rtdb.firebaseio.com/';
export const saveUserData = async (userId, userData) => {
    try {
        const response = await axios.post(`${DATABASE_URL}/users/${userId}.json`, userData);
        return response.data; // Contains the saved user data
    } catch (error) {
        console.error('Save user data failed:', error);
        throw error;
    }
};
export async function fetchAllData() {
    try {
      const response = await axios.get(`${DATABASE_URL}/users.json`);
      const usersData = response.data;
      let students = [];
      let drivers=[];
  
      if (usersData) {
        Object.keys(usersData).forEach(userId => {
            const userEntries = Object.values(usersData[userId])[0];
          Object.keys(userEntries).forEach(entryKey => {
            const userEntry = userEntries[entryKey];
            if (!userEntry.isDriver) {
              students.push({
                id: entryKey,
                ...userEntry,
              });
            }else{
                drivers.push({
                    id: entryKey,
                    ...userEntry,
                });
            }
          });
        });
      }
  
      return {drivers,students}; // Return the array of student objects
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  }
  // Function to fetch data based on user role (driver or student)

  export const fetchDataBasedOnRole = async (role, userData) => {
    try {
        if (role === 'driver') {
            // Fetch data for all students
            const { students } = await fetchAllData();
            return students;
        } else if (role === 'student') {
            // Fetch data for individual student
            const student = await fetchStudentDataById(userData.studentId);
            return [student];
        }
    } catch (error) {
        console.error('Error fetching data based on role:', error);
        throw error;
    }
};
export async function fetchUserData(userId) {
    try {
        const response = await axios.get(`${DATABASE_URL}/users/${userId}.json`);
        const userData = response.data;

        // Assuming the latest entry is the most relevant
        const latestEntry = Object.keys(userData).map(key => userData[key]).reverse()[0];

        return latestEntry; // This will return the latest user entry with isDriver information
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}
