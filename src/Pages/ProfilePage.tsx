import { Divider } from "@mantine/core" 

import { profile } from "../Data/TalentData"
import Profile from "../Component/Profile/Profile"

const ProfilePage = () => {
    return (
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['Nunito'] ">
            <Divider mx="md" mb="xl" />
            <Profile {...profile} />

        </div>
    )
}

export default ProfilePage
