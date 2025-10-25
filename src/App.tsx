import './App.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/dates/styles.css';
import { createTheme, Divider, MantineProvider } from '@mantine/core';
import HomePage from './Pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FindJobs from './Pages/FindJobs';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import FindTalent from './Pages/FindTalent';
import TalentProfile from './Pages/TalentProfile';
import PostJobPage from './Pages/PostJobPage';
import JobDesc from './Pages/JobDesc';
import ApplyJobPage from './Pages/ApplyJobPage';
import CompanyPage from './Pages/CompanyPage';
import PostedJobPage from './Pages/PostedJobPage';

function App() {
  const theme = createTheme({
    colors: {
      'bright-sun': ['#fffbeb', '#fff3c6', '#ffe588', '#ffd149', '#ffbd20', '#f99b07', '#dd7302', '#b75006', '#943c0c', '#7a330d', '#461902'],
      'mine-shaft': ['#f6f6f6', '#e7e7e7', '#d1d1d1', '#b0b0b0', '#888888', '#6d6d6d', '#5d5d5d', '#4f4f4f', '#454545', '#3d3d3d', '#2d2d2d'],
    },
    fontFamily: "Nunito",
    primaryColor: 'bright-sun',
    primaryShade: 4,
  })
  return (
    <MantineProvider defaultColorScheme='dark' theme={theme} >
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
            <Route path='/apply-job' element={<ApplyJobPage />} />
            <Route path='/talent-profile' element={<TalentProfile />} />
            <Route path='/post-job' element={<PostJobPage />} />

            <Route path='*' element={<HomePage />} />
          </Routes>
          <Footer />

        </div>

      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
