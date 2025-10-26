import { jobList } from '../Data/JobsData'
import JobCards from '../FindJobs/JobCards'

const CompanyJob = () => {
    return (
        <div className="mt-10 flex flex-wrap mx-10  gap-5 justify-between">
            {
                jobList.map((job, idx) => (<JobCards key={idx} {...job} />))
            }
        </div>
    )
}

export default CompanyJob
