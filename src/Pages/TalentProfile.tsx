import { Button } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"  
import Profile from "../Component/TalentProfile/Profile"
import RecommendTalent from "../Component/TalentProfile/RecommendTalent"
import { useEffect, useState } from "react"
import { getAllProfiles } from "../Services/ProfileService"

const TalentProfile = () => {
    const navigate = useNavigate();
    const [talents , setTalents] = useState<any[]>([]);

    useEffect(()=>{
        getAllProfiles().then((res)=>{
            setTalents(res);
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    
    return (
        <div className="min-h-[100vh] p-4 bg-mine-shaft-950 font-['Nunito']">
              
                <Button onClick={()=>navigate(-1)} leftSection={<IconArrowLeft size={20} />} my="sm" color="bright-sun.4" variant="light" >
                    Back
                </Button> 

            {/* profile added */}
            <div className="flex gap-5 lg-mx:flex-wrap">
                <Profile />
                <RecommendTalent  talents={talents} />
            </div>
        </div>
    )
}

export default TalentProfile
