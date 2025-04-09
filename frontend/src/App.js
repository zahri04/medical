import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { BrowserRouter, Routes,Navigate, Route } from 'react-router-dom';


import {PrivateRoutes,RoleBasedRoute} from './components/PrivateRoute.js';
import Unauthorized from './components/Unauthorized.js';
// Import Components
import Home from './Home/Home.js';
import About from './About/About.js';
import AllDoctors from './AllDoctors/AllDoctors.js';
import Contact from './Contact/Contact.js';
import DoctorProfile from './DoctorProfile/DoctorProfile.js';

// Import Admin Components
import AdminLayout from './admin/AdminLayout.js';
import Dashboard from './admin/dashboard/Dashboard.js';
import Users from './admin/pages/users/Users.js';
import UsersForm from './admin/pages/users/UsersForm.js';
import AiAnalysis from './admin/pages/AiAnalysis.js';
import DoctorsForm from './admin/pages/doctor/DoctorsForm.js';
import AppointmentsForm from './admin/pages/appointments/AppointmentsForm.js';
import HomeLayout from "./HomeLayout.js"
import Doctors from './admin/pages/doctor/Doctors.js';
import Appointments from './admin/pages/appointments/Appointments.js';
import Messages from './admin/pages/Messages.js';
import Settings from './admin/pages/Settings.js';
import TodaysPreference from './admin/pages/TodaysPreference.js';
import MyDoctor from './admin/pages/DoctorChat.js';
import Profile from "./admin/pages/Profile.js";
import Patients from "./admin/pages/patients/Patient.js";
import PatientsForm from "./admin/pages/patients/PatientForm.js";
import Login from "./admin/pages/Login.js";
import Register from "./admin/pages/Register.js";
import Assistants from './admin/pages/assistants/Assistants.js';
import AssistantsForm from './admin/pages/assistants/AssistantsForm.js';
// Import App Context
import AppContextProvider from './Context/AppContext.js';


function App() {
  return ( 
  
    <div className="App">
      <BrowserRouter>
        <AppContextProvider>
         
          <Routes>
            {/* Public Routes */}
          <Route path="/" element={<HomeLayout />} >

            <Route  index element={<Home />} />
            <Route  path="/Home" element={<Home />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/About" element={<About />} />
            <Route path="/AllDoctors" element={<AllDoctors />} />
            <Route path="/doctors" element={<AllDoctors />} />
            <Route path="/doctor/:id" element={<DoctorProfile />} />
            <Route path="/doctors/:speciality" element={<AllDoctors />} />
            <Route path="/Contact" element={<Contact />} />
          
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            
            
          </Route>
            {/* Admin Routes with Nested Routing */}
            <Route element={<PrivateRoutes />} > {/* Private Route for Admin */}
            <Route path="/Dashboard" element={<AdminLayout />}>
              <Route index element={<Dashboard />} /> {/* Default child */}


              {                /* General Routes*/}
              <Route path="messages" element={<Messages />} />
              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<Profile />} />



              {/* Doctor & patient & assistant Common Routes */}
            <Route element={<RoleBasedRoute AllowedRole={['doctor','patient','assistant']}/>} >

              <Route path="aianalysis" element={<AiAnalysis />} />
              <Route path="appointments/list" element={<Appointments />} />
              <Route path="appointments/add" element={<AppointmentsForm />} />
              <Route path="appointments/edit/:id" element={<AppointmentsForm />} />

            </Route>



              {/* Doctor * Assistant Common Routes */}
            <Route element={<RoleBasedRoute AllowedRole= {['doctor','assistant']} />} >
              <Route path="todayspreference" element={<TodaysPreference />} />
              <Route path="patients/list" element={<Patients />} />
              <Route path="patients/edit/:id" element={<PatientsForm />} />
            </Route>
              

              

              {/* Doctor & Admin Routes */}
            <Route element={<RoleBasedRoute AllowedRole= {['admin','doctor']} />} >

              <Route path="assistants/list" element={<Assistants />} />
              <Route path="assistants/edit/:id" element={<AssistantsForm />} />

            </Route>

              {/* Patient Routes */}

            <Route element={<RoleBasedRoute AllowedRole= {['patient',]} />} >
              <Route path="mydoctor" element={<MyDoctor />} />
              </Route>

              {/* admin Routes */}


            <Route element={<RoleBasedRoute AllowedRole= {['admin',]} />} >
            
              <Route path="users/list" element={<Users />} />
              <Route path="users/add" element={<UsersForm />} />
              <Route path="doctors/list" element={<Doctors />} />
              <Route path="doctors/edit/:id" element={<DoctorsForm />} />

            </Route>
              {/** <Route path="doctors/delete/:id" element={<DeletePage />} />*/}

              {/*}<Route path="patientss/delete/:id" element={<DeletePage />} />*/}

              {/*}<Route path="assistants/delete/:id" element={<DeletePage />} /> */}

              {/*}<Route path="appointments/delete/:id" element={<DeletePage />} /> */} 
             
            </Route>
            </Route>
             <Route path="*" element={<Navigate  to={"/"}/>} />  
           
          </Routes>
         
          {/* <Footer /> */}
        </AppContextProvider>
      </BrowserRouter>
    </div>
     
  );
}

export default App;