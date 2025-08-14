export const Genders = ['male','female','others']

export const Doctors = [
  {
    image: "/dr-green.png",
    name: "John Green",
  },
  {
    image: "/dr-cameron.png",
    name: "Leila Cameron",
  },
  {
    image: "/dr-livingston.png",
    name: "David Livingston",
  },
  {
    image: "/dr-peter.png",
    name: "Evan Peter",
  },
  {
    image: "/dr-powell.png",
    name: "Jane Powell",
  },
  {
    image: "/dr-remirez.png",
    name: "Alex Ramirez",
  },
  {
    image: "/dr-lee.png",
    name: "Jasmine Lee",
  },
  {
    image: "/dr-cruz.png",
    name: "Alyana Cruz",
  },
  {
    image: "/dr-sharma.png",
    name: "Hardik Sharma",
  },
];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Student ID Card",
  "Voter ID Card",
];

export const StatusIcon = {
  scheduled:"/icons/check.svg",
  pending:"/icons/pending.svg",
  cancelled:"/icons/cancelled.svg"
}