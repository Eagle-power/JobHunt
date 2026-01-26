import { Avatar, Divider, FileInput, Overlay } from "@mantine/core"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProfile } from "../../Services/ProfileService"
import Info from "./Info"
import { changeProfile, setProfile } from "../../Slices/ProfileSlice"
import About from "./About"
import Skills from "./Skills"
import Experience from "./Experience"
import Certificate from "./Certificate"
import { useHover } from "@mantine/hooks"
import { IconEdit } from "@tabler/icons-react"
import { successNotification } from "../../Services/NotificationService"
import { getBase64 } from "../../Services/Utilities"

const Profile = (props: any) => {
    const dispatch = useDispatch();
    const profile = useSelector((state : any)=>state.profile);
    const user = useSelector((state: any) => state.user);
    const { hovered, ref } = useHover();

    const handleFileChange  =async  (image : any)=>{
        let picture:any = await getBase64(image);
        let updatedProfile = {...profile , picture:picture.split(',')[1]}
        dispatch(changeProfile(updatedProfile));
        successNotification("Success", "Profile Photo Updated Successfully.");
    }
    

     


    return (
        <div className="w-4/5 lg-mx:w-full mx-auto">
            <div className="">
                {/* banner */}
                <div className="relative px-5">
                    <img className="rounded-t-2xl xs-mx:h-32" src="/Profile/banner.jpg" alt="" />

                    <div ref={ref} className="flex items-center justify-center  absolute -bottom-1/4 md-mx:-bottom-10 sm-mx:-bottom-16 left-6">
                        <Avatar className="!h-48  !w-48 md-mx:!w-40 md-mx:!h-40 
                                            sm-mx:!h-36 sm-mx:!w-36 xs-mx:!h-32 xs-mx:!w-32 
                                        border-mine-shaft-950 border-8  rounded-full" 
                                src={profile.picture ?`data:image/jpeg;base64,${profile.picture}`: "/Avatar.png"} 
                                alt={user.name} />

                        {hovered && <Overlay className="!rounded-full" color="#000" backgroundOpacity={0.40} />}
                        {hovered && <IconEdit className="absolute z-[300] !h-16   !w-16 hover:cursor-pointer  " />}
                        {hovered &&
                            <FileInput
                                onChange={handleFileChange}
                                className="absolute   z-[301] [&_*]:!rounded-full h-full [&_*]:!h-full w-full [&_div]:text-transparent"
                                variant="transparent"
                                size="lg"
                                radius="xl"
                                accept="image/png,image/jpeg,image/jpg"
                            />
                        }
                    </div>

                </div>


                <Info />

                <Divider mx="xs" size="sm" my="xl" />

                <About />

                <Divider mx="xs" size="sm" my="xl" />

                <Skills />

                <Divider mx="xs" size="sm" my="xl" />

                <Experience />

                <Divider mx="xs" size="sm" my="xl" />

                <Certificate />
            </div>
        </div>
    )
}

export default Profile
