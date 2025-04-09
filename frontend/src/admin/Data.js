// Data.js (Mock data file to simulate fetching from database later)
const Data = {
    users: [
      { id: 1, name: "John Doe", role: "Admin" },
      { id: 2, name: "Dr. Smith", role: "Doctor" },
      { id: 3, name: "Alice Brown", role: "Patient" },
    ],
    doctors: [
      { id: 1, name: "Dr. Smith", specialty: "Cardiology" },
      { id: 2, name: "Dr. Taylor", specialty: "Dermatology" },
    ],
    patients: [
      { id: 1, name: "Alice Brown", disease: "Flu" },
      { id: 2, name: "Mark Lee", disease: "Diabetes" },
    ],
    appointments: [
      { id: 1, doctor: "Dr. Smith", patient: "Alice Brown", date: "2025-03-05" },
      { id: 2, doctor: "Dr. Taylor", patient: "Mark Lee", date: "2025-03-06" },
    ],
  };
  
  export default Data;
  