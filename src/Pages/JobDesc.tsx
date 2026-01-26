import { Button } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import { Link, useParams } from "react-router-dom"  
import JobDescription from "../Component/JobDesc/JobDescription"
import RecommendedJob from "../Component/JobDesc/RecommendedJob"
import { useEffect, useState } from "react"
import { getJob } from "../Services/JobService"
 
const JobDesc = () => {

    const {id} = useParams();
    const [job , setJob] = useState<any>(null);

    useEffect(()=>{
        window.scrollTo(0,0);
        getJob(id).then((res)=>{
            setJob(res);
        }).catch((err)=>{
            console.log(err);

        })
    },[id])

    return (
        <div className="min-h-[100vh] p-4 bg-mine-shaft-950 font-['Nunito']">

            <Link to="/find-jobs" className="my-4 inline-block">
                <Button leftSection={<IconArrowLeft size={20} />} color="bright-sun.4" variant="light" >
                    Back
                </Button>
            </Link>

            {/* profile added */}
            <div className="flex gap-5 justify-around bs-mx:flex-wrap">
                <JobDescription {...job} />
                <RecommendedJob />
            </div>
        </div>
    )
}

export default JobDesc
