import { Divider } from "@mantine/core"
import SearchBar from "../Component/FindJobs/SearchBar"
import Jobs from "../Component/FindJobs/Jobs"

 
const FindJobs = () => {
    return (
        <div className="min-h-[100vh] bg-mine-shaft-950 font-['Nunito']">
             
            <SearchBar /> 
            <Divider   size="sm" mx="md"  />
            <Jobs />
        </div>
    )
}

export default FindJobs
