import { jobList } from "../../Data/JobsData"
import JobCards from "./JobCards"
import Sort from "./Sort"

const Jobs = () => {
    return (
        <div className="p-5">
            <div className="flex justify-between">
                <div className="text-2xl font-semibold">Recommended Jobs</div>
                <Sort />
            </div>

            <div className="mt-10 flex flex-wrap  gap-5 justify-around">
                {
                    jobList.map((job, idx) => (<JobCards key={idx} {...job} />))
                }
            </div>
        </div>
    )
}

export default Jobs
