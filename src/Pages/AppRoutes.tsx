import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
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
import { useSelector } from "react-redux"

const AppRoutes = () => {
    const user =useSelector((state:any) => state.user);
    return (

        <BrowserRouter>
            <div className='relative'>
                <Header />
                <Divider size="sm" />
                <Routes>
                    <Route path='/find-jobs' element={<FindJobs />} />
                    <Route path='/find-talent' element={<FindTalent />} />
                    <Route path='/jobs' element={<JobDesc />} />
                    <Route path='/company' element={<CompanyPage />} />
                    <Route path='/posted-job' element={<PostedJobPage />} />
                    <Route path='/job-history' element={<JobHistoryPage />} />
                    <Route path='/apply-job' element={<ApplyJobPage />} />
                    <Route path='/talent-profile' element={<TalentProfile />} />
                    <Route path='/post-job' element={<PostJobPage />} />
                    <Route path='/signup' element={user ? <Navigate to="/" />:<SignUpPage />} />
                    <Route path='/login' element={user ? <Navigate to="/" />:<SignUpPage />} />
                    <Route path='/profile' element={<ProfilePage />} />

                    <Route path='*' element={<HomePage />} />
                </Routes>
                <Footer />

            </div>

        </BrowserRouter>

    )
}

export default AppRoutes;