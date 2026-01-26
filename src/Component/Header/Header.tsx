import { Burger, Button, Drawer } from "@mantine/core"
import { IconAnchor, IconX } from "@tabler/icons-react"
import NavLinks from "./NavLinks"
import { Link, useLocation, useNavigate } from "react-router-dom"
import ProfileMenu from "./ProfileMenu"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getProfile } from "../../Services/ProfileService"
import { setProfile } from "../../Slices/ProfileSlice"
import NotifyMenu from "./NotifyMenu"
import { jwtDecode } from "jwt-decode"
import { setUser } from "../../Slices/UserSlice"
import { setupResponseInterceptor } from "../../Interceptor/AxiosInterceptor"
import { useDisclosure } from "@mantine/hooks"

const Header = () => {

    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const token = useSelector((state: any) => state.jwt);
    const navigate = useNavigate();
    const location = useLocation();

    const [opened, { open, close }] = useDisclosure(false);

    const links = [
        { name: "Find Jobs", url: "/find-jobs" },
        { name: "Find Talent", url: "/find-talent" },
        { name: "Post Job", url: "/post-job/0" },
        { name: "Posted Job", url: "/posted-jobs/0" },
        { name: "Job History", url: "/job-history" },
        // { name: "SignUp", url: "/signup" },
    ]


    useEffect(() => {
        setupResponseInterceptor(navigate);

    }, [navigate])

    useEffect(() => {
        if (token !== "") {
            if(localStorage.getItem("token") !=""){

                const decoded = jwtDecode(localStorage.getItem("token")||"");
                dispatch(setUser({ ...decoded, email: decoded.sub }))
            }

        }
        if (!user || !user.id) return;

        if(user?.profileId){

            getProfile(user?.profileId).then((data: any) => {
                dispatch(setProfile(data));
            }).catch((error: any) => {
                console.log(error);
            })
        }
    }, [token, navigate]);

    return location.pathname !== "/signup" && location.pathname !== "/login" ? (
        <div className="flex w-full px-6 text-white bg-mine-shaft-950 h-20 justify-between items-center font-[Nunito] ">
            <div className="flex gap-1 items-center text-bright-sun-400 cursor-pointer ">
                <IconAnchor className="h-8 w-8" stroke={2.5} />
                <div className="xs-mx:hidden text-3xl font-semibold" onClick={() => navigate('/')}>
                    Job Hunt
                </div>
            </div>
            {NavLinks()}
            <div className="flex  gap-5 items-center">

                {
                    user ? <ProfileMenu /> : <Link to="/login">
                        <Button variant="subtle" color="bright-sun.4" >
                            Login
                        </Button>
                    </Link>
                }
                {
                    user ? <NotifyMenu /> : <></>
                }

                {

                }
                <Burger className="bs:hidden" opened={opened} onClick={open} aria-label="Toggle navigation" />
                <Drawer opened={opened} onClose={close}
                    overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
                    position="right"
                    size='xs'
                    closeButtonProps={{
                        icon: <IconX size={30} stroke={2} />,
                    }}
                >
                    <div className="flex flex-col gap-5 items-center">
                        {
                            links.map((link, index) => (
                                <div key={index} className="hover:text-bright-sun-400 text-xl h-full flex items-center">
                                    <Link to={link.url} >{link.name}</Link>
                                </div>
                            ))
                        }
                    </div>
                </Drawer>


            </div>
        </div>
    ) : <></>
}

export default Header
