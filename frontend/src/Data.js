import General_physician from '../src/assets/images/specialitymenu/General_physician.svg'
import Gynecologist from '../src/assets/images/specialitymenu/Gynecologist.svg'
import Dermatologist from '../src/assets/images/specialitymenu/Dermatologist.svg'
import Pediatricians from '../src/assets/images/specialitymenu/Pediatricians.svg'
import Neurologist from '../src/assets/images/specialitymenu/Neurologist.svg'

import doc1 from '../src/assets/images/Doctors/doc1.png'
import doc2 from '../src/assets/images/Doctors/doc2.png'
import doc3 from '../src/assets/images/Doctors/doc3.png'
import doc4 from '../src/assets/images/Doctors/doc4.png'
import doc5 from '../src/assets/images/Doctors/doc5.png'
import doc6 from '../src/assets/images/Doctors/doc6.png'
import doc7 from '../src/assets/images/Doctors/doc7.png'
import doc8 from '../src/assets/images/Doctors/doc8.png'
import doc9 from '../src/assets/images/Doctors/doc9.png'
import doc10 from '../src/assets/images/Doctors/doc10.png'
import doc11 from '../src/assets/images/Doctors/doc11.png'
import doc12 from '../src/assets/images/Doctors/doc12.png'
import doc13 from '../src/assets/images/Doctors/doc13.png'
import doc14 from '../src/assets/images/Doctors/doc14.png'
import doc15 from '../src/assets/images/Doctors/doc15.png'

// Updated specialityData with shortened specialities
export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Corona Specialist',
        image: General_physician
    },
    {
        speciality: 'Alzheimer Specialist',
        image: General_physician
    }
    ,{
        speciality: 'Radiologist',
        image: General_physician
    }
];

// Updated doctors data with new specialties
export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Richard James',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Richard James is committed to preventive care and treating general health concerns with a patient-first approach.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Emily Larson',
        image: doc2,
        speciality: 'Corona Specialist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Emily Larson specializes in the treatment and prevention of COVID-19 and other viral infections.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Sarah Patel',
        image: doc3,
        speciality: 'Alzheimer Specialist',
        degree: 'MBBS',
        experience: '1 Year',
        about: 'Dr. Sarah Patel focuses on early detection and treatment of Alzheimer\'s disease to improve quality of life for patients.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Christopher Lee',
        image: doc4,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Christopher Lee offers a broad range of general health services, focusing on preventive medicine and wellness.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Jennifer Garcia',
        image: doc5,
        speciality: 'Corona Specialist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Jennifer Garcia specializes in managing COVID-19 patients and post-recovery care.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Andrew Williams',
        image: doc6,
        speciality: 'Alzheimer Specialist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Andrew Williams offers personalized care plans for Alzheimer\'s patients, focusing on mental health and cognitive functions.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Christopher Davis',
        image: doc7,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Christopher Davis offers holistic health care, focusing on both acute and chronic conditions.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Timothy White',
        image: doc8,
        speciality: 'Corona Specialist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Timothy White provides specialized care for patients with COVID-19, ensuring proper treatment and recovery plans.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Ava Mitchell',
        image: doc9,
        speciality: 'Alzheimer Specialist',
        degree: 'MBBS',
        experience: '1 Year',
        about: 'Dr. Ava Mitchell is dedicated to improving the lives of Alzheimer\'s patients through early diagnosis and therapy.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Jeffrey King',
        image: doc10,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Jeffrey King practices general medicine with a focus on wellness and preventive care.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Zoe Kelly',
        image: doc11,
        speciality: 'Corona Specialist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Zoe Kelly provides top-tier care for COVID-19 patients and their families.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Patrick Harris',
        image: doc12,
        speciality: 'Corona Specialist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Patrick Harris specializes in the treatment and care of patients with COVID-19.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Chloe Evans',
        image: doc13,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Chloe Evans offers thorough examinations and treatment plans for general health concerns.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Ryan Martinez',
        image: doc14,
        speciality: 'Corona Specialist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Ryan Martinez specializes in COVID-19 management and helping patients recover safely.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Amelia Hill',
        image: doc15,
        speciality: 'Alzheimer Specialist',
        degree: 'MBBS',
        experience: '1 Year',
        about: 'Dr. Amelia Hill works with Alzheimer\'s patients, providing cognitive support and rehabilitation therapies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
];
