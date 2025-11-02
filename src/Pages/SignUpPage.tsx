// import { IconAnchor } from "@tabler/icons-react"
// import SignUp from "../SignUpLogin/SignUp"
// import Login from "../SignUpLogin/Login"
// import { useLocation } from "react-router-dom"

// const SignUpPage = () => {
//     const location = useLocation();
//     return (
//         <div className="h-screen bg-mine-shaft-950 font-['Nunito'] flex overflow-hidden">
//             <div className={`w-[100vw] h-[100vh] flex  [&>*]:flex-shrink-0 transition-all ease-in-out duration-1000 ${location.pathname==='/signup'?'-translate-x-1/2' : 'translate-x-0'} `}>
//                 <Login />
//                 {/* Left panel: Branding */}
//                 <div className={`w-1/2 h-full bg-mine-shaft-900 transition-all duration-1000 ease-in-out ${location.pathname==='/signup'?'rounded-r-[200px]':'rounded-l-[200px]'}  gap-5 flex flex-col items-center justify-center`}>
//                     <div className="flex gap-1 items-center text-bright-sun-400 " >
//                         <IconAnchor className="h-16 w-16" stroke={2.5} />
//                         <div className="text-6xl font-semibold"> Job Hunt </div>
//                     </div>
//                     <div className="text-3xl text-mine-shaft-200 font-semibold">Find the Job made for you</div>
//                 </div> 
//                 <SignUp />
//             </div>

//         </div>
//     )
// }

// export default SignUpPage

import { IconAnchor } from "@tabler/icons-react"
import SignUp from "../SignUpLogin/SignUp"
import Login from "../SignUpLogin/Login"
import { useLocation } from "react-router-dom"

const SignUpPage = () => {
    const location = useLocation();
    const isSignUp = location.pathname === '/signup';

    return (
        <div className="h-screen bg-mine-shaft-950 font-['Nunito'] flex relative overflow-hidden">

            {/* 1. Login Panel (Base Layer) */} 
            <div className="w-1/2 h-full  flex-shrink-0 relative z-10">
                <Login />
            </div>

            {/* 2. SignUp Panel (Base Layer) */} 
            <div className="w-1/2 h-full flex-shrink-0 relative z-10">
                <SignUp />
            </div>

            {/* 3. Branding Panel (Top Layer) */}
            <div
                className={`
                    w-1/2 h-full bg-mine-shaft-900 
                    transition-all duration-1000 ease-in-out 
                    gap-5 flex flex-col items-center justify-center
                    absolute top-0
                    z-20
                    ${isSignUp ? 'left-0' : 'left-1/2'}
                    ${isSignUp ? 'rounded-r-[200px]' : 'rounded-l-[200px]'}
                `}
            >
                <div className="flex gap-1 items-center text-bright-sun-400 " >
                    <IconAnchor className="h-16 w-16" stroke={2.5} />
                    <div className="text-6xl font-semibold"> Job Hunt </div>
                </div>
                <div className="text-3xl text-mine-shaft-200 font-semibold">Find the Job made for you</div>
            </div>

        </div>
    )
}

export default SignUpPage;