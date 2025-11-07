import { ActionIcon, Divider } from "@mantine/core"
import { IconBriefcase, IconMapPin, IconPencil } from "@tabler/icons-react"
import ExpCard from "./ExpCard"
import CertiCard from "./CertiCard"
import { useState } from "react"

const Profile = (props: any) => {
    const [edit , setEdit] = useState([false,false,false,false,false]);
    const handleEdit=(index:number)=>{
        const newEdit = [...edit];
        newEdit[index] = !newEdit[index];
        setEdit(newEdit); 
    }
    return (

        <div className="w-4/5 mx-auto">
            <div className="relative">
                <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
                <img className="h-48  w-48 -bottom-1/4 left-3  border-mine-shaft-950 border-8  absolute rounded-full" src="/Avatar.png" alt="" />

            </div>
            <div className="px-3 mt-16">
                <div className="text-3xl font-semibold flex justify-between">{props.name}
                    <ActionIcon onClick={()=>handleEdit(0)} size="lg" variant="subtle" color="bright-sun.4"  >
                        <IconPencil className="h-4/5 w-4/5"  />
                    </ActionIcon>
                </div>
                <div className="text-xl flex gap-1 items-center"><IconBriefcase className="h-5 w-5" stroke={1.5} />{props.role}  &bull; {props.company}</div>
                <div className="flex gap-1 text-lg items-center text-mine-shaft-300"><IconMapPin className="h-5 w-5" stroke={1.5} />{props.location}</div>

            </div>
            <Divider mx="xs" size="sm" my="xl" />

            <div className="px-3">
                <div className="text-2xl font-semibold mb-3">About</div>
                <div className="text-sm text-mine-shaft-300  text-justify">
                    {props.about}
                </div>
            </div>

            <Divider mx="xs" size="sm" my="xl" />

            <div className="px-3">
                <div className="text-2xl font-semibold mb-3">Skills</div>
                <div className="flex flex-wrap gap-2">
                    {
                        props.skills?.map((skill: any, idx: any) => (
                            <div key={idx} className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1">{skill}</div>

                        ))
                    }
                </div>
            </div>

            <Divider mx="xs" size="sm" my="xl" />

            <div className="px-3">
                <div className="text-2xl font-semibold mb-5">Experience</div>
                <div className="flex flex-col gap-8">
                    {
                        props.experience.map((exp: any, idx: any) => <ExpCard key={idx} {...exp} />)
                    }
                </div>

            </div>

            <Divider mx="xs" size="sm" my="xl" />

            <div className="px-3">
                <div className="text-2xl font-semibold mb-5">Certification</div>
                <div className="flex flex-col gap-8">
                    {
                        props.certifications.map((certi: any, idx: any) => <CertiCard key={idx} {...certi} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile
