import CarCategory from "../Modeles/CarCategory";
import { Driver, DriverInfo } from "../Modeles/Driver";


const findCategoryById=(id)=>CATEGORIES.find(category=>category.id===id)

export const CATEGORIES=[
    new CarCategory('A1','Sedan','#368dff'),
    new CarCategory('A2','van','#41d95d'),
    new CarCategory('A3','Sporty','#f5428d')
]
const Dummy_Drivers=[
    new Driver(
        '1',
        "Ali",
        "kiANI",
        "/Users/ali/CARpoolNew490N/BuddyCarPool/assets/user-4.jpg",
        'Ali@kiani',
        'password',
        true,
        
        
        new DriverInfo('ABCD',
        'D1234',
        'TOYOTA',
        findCategoryById('A1'),
        4,
        '91304',
        ['Monday /','Tuesday/','Wednesday'],
        '/Users/ali/CARpoolNew490N/BuddyCarPool/assets/download.jpeg'


        
        ),
        'I can pick you up form the house and put you back home please let me know '

    ),
    new Driver(
        '2',
        'Emad',
        'esi',
        '/Users/ali/CARpoolNew490N/BuddyCarPool/assets/user-5.jpg',
        'emad@esi',
        'password',
        true,
        new DriverInfo(
            'abcdes',
            'desft',
            'cargo van',
            findCategoryById('A2'),
            5,
            '91304',
            ['Tuesday'],
            '/Users/ali/CARpoolNew490N/BuddyCarPool/assets/download (3).jpeg'


        ),
        'I have cargo van'
    ),
    new Driver(
        '3',
        'Jose',
        'morales',
        '/Users/ali/CARpoolNew490N/BuddyCarPool/assets/Driver4.jpeg',
        'emad@esi',
        'password',
        true,
        new DriverInfo(
            'abcdes',
            'desft',
            'cargo van',
            findCategoryById('A2'),
            5,
            '91304',
            ['Tuesday'],
            '/Users/ali/CARpoolNew490N/BuddyCarPool/assets/download (3).jpeg'


        ),
        'I have cargo van'


    ),

]
export{Dummy_Drivers}
