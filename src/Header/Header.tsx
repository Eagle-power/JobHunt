import {  Indicator } from "@mantine/core"
import { IconAnchor, IconBell, IconSettings2 } from "@tabler/icons-react"
import NavLinks from "./NavLinks"
import { useLocation, useNavigate } from "react-router-dom"
import ProfileMenu from "./ProfileMenu"

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return location.pathname!== "/signup" && location.pathname!== "/login" ? (
        <div className="flex w-full px-6 text-white bg-mine-shaft-950 h-20 justify-between items-center font-[Nunito] ">
            <div className="flex gap-1 items-center text-bright-sun-400 cursor-pointer ">
                <IconAnchor className="h-8 w-8" stroke={2.5} />
                <div className="text-3xl font-semibold" onClick={()=>navigate('/')}>
                    Job Hunt
                </div>
            </div>
            {NavLinks()}
            <div className="flex  gap-5 items-center">
                
                <ProfileMenu />
                <div className="bg-mine-shaft-900 p-1.5 rounded-full">
                    <IconSettings2 stroke={1.5} />
                </div>
                <div className="bg-mine-shaft-900 p-1.5 rounded-full">
                    <Indicator  color="bright-sun.4" size={8} offset={6} processing>
                        <IconBell stroke={1.5} />
                    </Indicator>
                </div>
            </div>
        </div>
    ) : <></>
}

export default Header
