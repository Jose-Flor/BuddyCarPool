import CarCategory from "./CarCategory";

class Driver{
    constructor(id,firstName,LastName,imageUrl,email,password,isDriver,driverInfo=null,bio=''){
        this.id=id;
       this.firstName = firstName;
       this.LastName = LastName;
       this.imageUrl = imageUrl;
       this.email = email;
       this.password = password;
       this.isDriver = isDriver;
       this.driverInfo = driverInfo;
       this.bio=bio
       
    }
    getfullName(){
        return`${this.firstName} ${this.LastName}`
    }
}
    class DriverInfo{
        constructor(licensePlate,driverLicense,carModel,CarCategory,passengerLimit,zipcode,availableDays=[],carImageUrl=''){
            this.licensePlate = licensePlate;
            this.driverLicense = driverLicense;
            this.carModel = carModel;
            this.CarCategory=CarCategory;
            this.passengerLimit = passengerLimit;
            this.zipcode = zipcode;
            this.availableDays=availableDays,
            this.carImageUrl=carImageUrl




        }
    }
    export {Driver,DriverInfo,CarCategory}
