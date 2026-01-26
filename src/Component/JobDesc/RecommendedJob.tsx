import { useParams } from "react-router-dom"
import JobCards from "../FindJobs/JobCards"
import { useEffect, useState } from "react";
import { getAllJob } from "../../Services/JobService";

const RecommendedJob = () => {
    const { id } = useParams();
    const [jobList, setJobList] = useState<any>(null);

    useEffect(() => {
        getAllJob().then((res) => {
            setJobList(res);
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <div>
            <div className="text-2xl font-semibold mb-5">Recommended Jobs</div>
            <div className="flex  bs:flex-col  flex-wrap gap-5 justify-between bs-mx:justify-start">
                {
                    jobList?.map((talent:any, index:number) => index < 6 && id != talent.id && <JobCards key={index} {...talent} />)
                }
            </div>
        </div>
    )
}

export default RecommendedJob
