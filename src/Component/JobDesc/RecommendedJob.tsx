import { jobList } from "../../Data/JobsData"
import JobCards from "../FindJobs/JobCards"

const RecommendedJob = () => {
    return (
        <div>
            <div className="text-xl font-semibold mb-5">Recommended Jobs</div>
            <div className="flex  flex-col flex-wrap gap-5 justify-between">
                {
                    jobList.map((talent, index) => index < 6 && <JobCards key={index} {...talent} />)
                }
            </div>
        </div>
    )
}

export default RecommendedJob
