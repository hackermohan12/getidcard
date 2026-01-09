
export interface IDTheme {
  primaryColor: string;
  secondaryColor: string;
  labelColor: string;
  valueColor: string;
}

export interface IDCardState {
  // Front Side
  collegeName: string;
  collegeAddress: string;
  collegePhone: string;
  affiliation: string;
  logoUrl: string | null;
  principalSignatureUrl: string | null;
  studentId: string;
  studentName: string;
  rollNo: string;
  program: string;
  dob: string;
  bloodGroup: string;
  address: string;
  mobile: string;
  expiryDate: string;
  photoUrl: string | null;
  
  // Back Side
  instructions: string;
  emergencyContact: string;
  cardSerial: string;
  website: string;
  
  theme: IDTheme;
}

export const INITIAL_STATE: IDCardState = {
  collegeName: "",
  collegeAddress: "",
  collegePhone: "",
  affiliation: "",
  logoUrl: null,
  principalSignatureUrl: null,
  studentId: "",
  studentName: "",
  rollNo: "",
  program: "",
  dob: "",
  bloodGroup: "",
  address: "",
  mobile: "",
  expiryDate: "",
  photoUrl: null,
  
  instructions: "1. This card is non-transferable.\n2. In case of loss, report to the college office immediately.\n3. Misuse of this card is a punishable offense.",
  emergencyContact: "",
  cardSerial: "SN-" + Math.floor(100000 + Math.random() * 900000),
  website: "",
  
  theme: {
    primaryColor: "#1e3a8a", // blue-900
    secondaryColor: "#3b82f6", // blue-500
    labelColor: "#4b5563", // gray-600
    valueColor: "#111827", // gray-900
  }
};
