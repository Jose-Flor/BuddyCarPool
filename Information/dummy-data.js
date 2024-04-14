import { Driver, DriverInfo } from "../Modeles/Driver";

const Dummy_Drivers = [
    new Driver(
        '1', //id
        "Ali", //firstName
        "Kiani", //lastName
        require('../assets/user-4.jpg'), //imageUrl
        'Ali@kiani', //email
        'password', //password
        true,
        new DriverInfo(
            'ABCD',  //licensePlate
            'D1234', //driverLicense
            'TOYOTA',//carModel
            4,       //passangerLimit
            '91304', //zipcode
            ['Monday'], //availableDays
            require('../assets/download.jpeg') //carImageUrl
        ),
        'I can pick you up from the house and put you back home, please let me know.' //bio
    ),

    new Driver(
        '2',
        'Emad',
        'esi',
        require('../assets/user-5.jpg'),
        'emad@esi',
        'password',
        true,
        new DriverInfo(
            'abcdes',
            'desft',
            'cargo van',
            5,
            '91304',
            ['Tuesday'],
            require('../assets/download (3).jpeg')
        ),
        'I have cargo van'
    ),

    new Driver(
        '3',
        'David',
        'Johnson',
        require('../assets/Driver4.jpeg'),
        'david@johnson',
        'password',
        true,
        new DriverInfo(
            'GHI789',  
            'DL54321', 
            'Chevrolet',  
            5,
            '91304',
            ['Wednesday'],
            require('../assets/download (3).jpeg')
        ),
        'Hey there, I’m David. I drive a Chevrolet and can give you a ride on Wednesdays.'
    ),

    new Driver(
        '4', 
        'Samantha', 
        'Miller',
        require('../assets/samantha_miller_image.jpg'),
        'samantha@miller',
        'password',
        true,
        new DriverInfo(
            'JKL012',  
            'DL13579', 
            'Tesla',   
            4,         
            '90210',   
            ['Wednesday', 'Friday'], 
            require('../assets/tesla_car_image.jpg') 
        ),
        'Hi, I’m Samantha. I have a Tesla and can drive you on Wednesdays and Fridays.'
    ),

    new Driver(
        '5', 
        'Emily', 
        'Anderson',
        require('../assets/emily_anderson_image.jpg'),
        'emily@anderson',
        'password',
        true,
        new DriverInfo(
            'PQR678',  
            'DL97531', 
            'BMW',   
            4,         
            '90210',   
            ['Tuesday', 'Thursday'], 
            require('../assets/bmw_car_image.jpg') 
        ),
        'Hi there, I’m Emily. I drive a BMW and can pick you up on Tuesdays and Thursdays.'
    ),

    new Driver(
        '6', 
        'John', 
        'Smith',
        require('../assets/john_smith_image.jpg'),
        'john@smith',
        'password',
        true,
        new DriverInfo(
            'ABC123',  
            'DL12345', 
            'Honda',   
            4,         
            '91304',   
            ['Monday', 'Tuesday', 'Wednesday'], 
            require('../assets/honda_car_image.jpg') 
        ),
        'I am John Smith, ready to provide rides on Mondays, Tuesdays, and Wednesdays.'
    )

];

export { Dummy_Drivers };
