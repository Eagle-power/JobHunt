import { IconAnchor, IconArrowLeft } from "@tabler/icons-react"
import { useLocation, useNavigate } from "react-router-dom"
import Login from "../Component/SignUpLogin/Login";
import SignUp from "../Component/SignUpLogin/SignUp";
import { Button, LoadingOverlay } from "@mantine/core";
import { useState } from "react";

const SignUpPage = () => {
    const location = useLocation();
    const isSignUp = location.pathname === '/signup';
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    return (
        <div className="h-screen bg-mine-shaft-950 font-['Nunito'] flex relative overflow-hidden ">
            <LoadingOverlay
                visible={loading}
                zIndex={100}
                overlayProps={{ blur: 2 }}
                loaderProps={{ color: "bright-sun.4", type: "bars" }}
                styles={{
                    overlay: {
                        position: "fixed",
                        inset: 0,
                    },
                }}
            />
            <Button leftSection={<IconArrowLeft size={20} />} onClick={() => navigate("/")} my="md" className="!absolute left-5 z-50" color="bright-sun.4" variant="light" >
                Home
            </Button>

            {/* 1. Login Panel (Base Layer) */}
            <div className="w-1/2 h-full  flex-shrink-0 relative z-10">
                <Login loading={loading}  setLoading={setLoading} />
            </div>

            {/* 2. SignUp Panel (Base Layer) */}
            <div className="w-1/2 h-full flex-shrink-0 relative z-10">
                <SignUp loading={loading}  setLoading={setLoading} />
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
                    <div className="text-6xl font-semibold cursor-pointer" onClick={() => navigate("/")}> Job Hunt </div>
                </div>
                <div className="text-3xl text-mine-shaft-200 font-semibold">Find the Job made for you</div>
            </div>

        </div>
    )
}

export default SignUpPage;