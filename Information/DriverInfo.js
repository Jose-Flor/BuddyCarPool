function DriverInfo(){
 
/*
    Profile Information:
        Full Name
        Profile Picture
        Contact Information - Phone number
    Driver's Licence Details:
        Driver's License Number
        License Expiration Date
    Vehicle Information:
        Vehicle Make and Model
        Vehicle Year
        License Plate Number
        Vehicle Color
    Insurance Information:
        Proof of Vehicle Insurance
    Ride Preference:
        Availability days and times
    Emergency Contact:
        Name and Phone Number of Emergency Contact
     */

return {
    /* Profile Information */
    fullName: "",
    profilePicture: "",
    contactInformation: {
        phoneNumber: ""
    },
    /* Driver's License Details */
    driversLicenseDetails: {
        licenseNumber: "",
        expirationDate: ""
    },
    /* Vehicle Information */
    vehicleInformation: {
        makeAndModel: "",
        year: "",
        licensePlateNumber: "",
        color: ""
    },
    /* Insurance Information */
    proofOfInsurance: "",
    /* Ride Preference */
    availability: "",
    /* Emergency Contact */
    emergencyContact: {
        name: "",
        phoneNumber: ""
    }
    }; 
}
export default DriverInfo;