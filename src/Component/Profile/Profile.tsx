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
    const getBase64=(file:any)=>{
        return new Promise((resolve , reject)=>{
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload=()=>resolve(reader.result);
            reader.onerror=error=>reject(error);
        })
    }

     


    return (
        <div className="w-4/5 mx-auto">
            <div className="">
                {/* banner */}
                <div className="relative">
                    <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />

                    <div ref={ref} className="flex items-center justify-center  absolute -bottom-1/4 left-3">
                        <Avatar className="!h-48  !w-48   border-mine-shaft-950 border-8  rounded-full" src={profile.picture ?`data:image/jpeg;base64,${profile.picture}`: "/Avatar.png"} alt={user.name} />

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
