import { Divider } from "@mantine/core" 
import SearchBar from "../Component/FindTalent/SearchBar"
import Talents from "../Component/FindTalent/Talents"

const FindTalent = () => {
    return (
        <div className="min-h-[100vh] bg-mine-shaft-950 font-['Nunito']">
             
            <SearchBar />
            <Divider size="sm" mx="md" /> 
            <Talents />
        </div>
    )
}

export default FindTalent
