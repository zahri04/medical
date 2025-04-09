import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doctors } from '../Data'; // Assuming you import your doctors data here

function DoctorProfile() {
  const { id } = useParams(); // Get the doctor ID from URL
  const [doctor, setDoctor] = useState({
    name: 'Dr. Richard James',
    image: 'path_to_default_image',  // Add a path to your default image
    speciality: 'General physician',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Richard James is committed to preventive care and treating general health concerns with a patient-first approach.',
    fees: 50,
    address: {
        line1: '17th Cross, Richmond',
        line2: 'Circle, Ring Road, London'
    }
    });
  useEffect(() => {
    const foundDoctor = doctors.find(doc => doc._id === id);
    setDoctor(foundDoctor);
  }, [id]);

  if (!doctor) {
    return <div>Doctor not found</div>;
  }

  return (
    <section className="container py-5">
      <div className="doctor-profile">
        <div className="row">
          <div className="col-12 col-md-4">
            <img src={doctor.image} alt={doctor.name} className="img-fluid" />
          </div>
          <div className="col-12 col-md-8">
            <h2>{doctor.name}</h2>
            <p><strong>Speciality:</strong> {doctor.speciality}</p>
            <p><strong>Degree:</strong> {doctor.degree}</p>
            <p><strong>Experience:</strong> {doctor.experience}</p>
            <p><strong>Fees:</strong> ${doctor.fees}</p>
            <p><strong>Address:</strong> {doctor.address.line1}, {doctor.address.line2}</p>
            <p><strong>About:</strong> {doctor.about}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DoctorProfile;
