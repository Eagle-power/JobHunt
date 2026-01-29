import { BrowserRouter, Route, Routes, useMatch } from "react-router-dom"
import Header from "../Component/Header/Header"
import { Divider } from "@mantine/core"
import FindJobs from "./FindJobs"
import FindTalent from "./FindTalent"
import JobDesc from "./JobDesc"
import CompanyPage from "./CompanyPage"
import PostedJobPage from "./PostedJobPage"
import JobHistoryPage from "./JobHistoryPage"
import ApplyJobPage from "./ApplyJobPage"
import TalentProfile from "./TalentProfile"
import PostJobPage from "./PostJobPage"
import SignUpPage from "./SignUpPage"
import ProfilePage from "./ProfilePage"
import HomePage from "./HomePage"
import Footer from "../Component/Footer/Footer"
import ProtectedRoute from "../Services/ProtectedRoute"
import PublicRoute from "../Services/PublicRoute"
import ChatbotWithRoute from "../Component/Chatbot/ChatbotWithRoute"
// import { useSelector } from "react-redux"

// const AppRoutes = () => {
//     // const user =useSelector((state:any) => state.user);


//     return (

//         <BrowserRouter>
//             <div className='relative'>
//                 <Header />
//                 <Divider size="sm" />
//                 <Routes>
//                     <Route path='/' element={<HomePage />} />
//                     <Route path='/find-jobs' element={<FindJobs />} />
//                     <Route path='/find-talent' element={<FindTalent />} />
//                     <Route path='/jobs/:id' element={<JobDesc />} />
//                     <Route path='/company/:name' element={<CompanyPage />} />
//                     <Route path='/posted-jobs/:id' element={<ProtectedRoute allowedRoles={['EMPLOYER']}><PostedJobPage /></ProtectedRoute>} />
//                     <Route path='/job-history' element={<ProtectedRoute allowedRoles={['APPLICANT']}><JobHistoryPage /></ProtectedRoute>} />
//                     <Route path='/apply-job/:id' element={<ApplyJobPage />} />
//                     <Route path='/talent-profile/:id' element={<TalentProfile />} />
//                     <Route path='/post-job/:id' element={<ProtectedRoute allowedRoles={['EMPLOYER']}><PostJobPage /></ProtectedRoute>} />
//                     <Route path='/signup' element={<PublicRoute><SignUpPage /></PublicRoute> } />
//                     <Route path='/login' element={<PublicRoute><SignUpPage /></PublicRoute>} />
//                     <Route path='/profile' element={<ProfilePage />} />

//                     <Route path='*' element={<HomePage />} />
//                 </Routes>
//                 <Footer />

//             </div>

//             <ChatbotWithRoute />


//         </BrowserRouter>

//     )
// }

// export default AppRoutes;



import {
    useNavigate
} from "react-router-dom";
import { useEffect } from "react";
import { setupResponseInterceptor } from "../Interceptor/AxiosInterceptor";

// all your imports remain same

/* ---------------- ROUTES CONTENT ---------------- */
const RoutesContent = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setupResponseInterceptor(navigate);
    }, [navigate]);

    return (
        <>
            <div className="relative">
                <Header />
                <Divider size="sm" />

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/find-jobs" element={<FindJobs />} />
                    <Route path="/find-talent" element={<FindTalent />} />
                    <Route path="/jobs/:id" element={<JobDesc />} />
                    <Route path="/company/:name" element={<CompanyPage />} />

                    <Route
                        path="/posted-jobs/:id"
                        element={
                            <ProtectedRoute allowedRoles={["EMPLOYER"]}>
                                <PostedJobPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/job-history"
                        element={
                            <ProtectedRoute allowedRoles={["APPLICANT"]}>
                                <JobHistoryPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="/apply-job/:id" element={<ApplyJobPage />} />
                    <Route path="/talent-profile/:id" element={<TalentProfile />} />

                    <Route
                        path="/post-job/:id"
                        element={
                            <ProtectedRoute allowedRoles={["EMPLOYER"]}>
                                <PostJobPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/signup"
                        element={<PublicRoute><SignUpPage /></PublicRoute>}
                    />

                    <Route
                        path="/login"
                        element={<PublicRoute><SignUpPage /></PublicRoute>}
                    />

                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="*" element={<HomePage />} />
                </Routes>

                <Footer />
            </div>

            <ChatbotWithRoute />
        </>
    );
};

/* ---------------- ROUTER PROVIDER ---------------- */
const AppRoutes = () => {
    return (
        <BrowserRouter>
            <RoutesContent />
        </BrowserRouter>
    );
};

export default AppRoutes;
