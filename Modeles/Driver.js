class Driver {
    constructor(id, firstName, lastName, imageUrl, email, password, isDriver, driverInfo = null, bio = '') {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.imageUrl = imageUrl;
        this.email = email;
        this.password = password;
        this.isDriver = isDriver;
        this.driverInfo = driverInfo;
        this.bio = bio;
    }
    getfullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

class DriverInfo {
    constructor(licensePlate, driverLicense, carModel, passengerLimit, zipcode, availableDays = [], carImageUrl = '') {
        this.licensePlate = licensePlate;
        this.driverLicense = driverLicense;
        this.carModel = carModel;
        this.passengerLimit = passengerLimit;
        this.zipcode = zipcode;
        this.availableDays = availableDays;
        this.carImageUrl = carImageUrl;
    }
}
export { Driver, DriverInfo };