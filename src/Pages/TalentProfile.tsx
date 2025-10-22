import { Button, Divider } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import Profile from "../TalentProfile/Profile"
import { profile } from "../Data/TalentData"
import RecommendTalent from "../TalentProfile/RecommendTalent"

const TalentProfile = () => {
    return (
        <div className="min-h-[100vh] p-4 bg-mine-shaft-950 font-['Nunito']">
            <Divider size="sm" />
            <Link to="/find-talent" className="my-4 inline-block">
                <Button leftSection={<IconArrowLeft size={20} />} color="bright-sun.4" variant="light" >
                    Back
                </Button>
            </Link> 

            {/* profile added */}
            <div className="flex gap-5">
                <Profile {...profile} />
                <RecommendTalent />
            </div>
        </div>
    )
}

export default TalentProfile
