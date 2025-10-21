import { Avatar } from "@mantine/core"
import { IconAnchor, IconBell, IconSettings2 } from "@tabler/icons-react"

const Header = () => {
    return (
        <div className="flex w-full px-6 text-white bg-mine-shaft-950 h-28 justify-between items-center ">
            <div className="flex gap-1 items-center text-bright-sun-400">
                <IconAnchor className="h-8 w-8" stroke={2.5} />
                <div className="text-3xl font-semibold">
                    Job Hunt
                </div>
            </div>
            <div className="flex gap-3">
                <a href="">Find Jobs</a>
                <a href="">Find Talent</a>
                <a href="">Upload Job</a>
                <a href="">About us</a>
            </div>
            <div className="flex  gap-5 items-center">
                <IconBell />
                <div className="flex items-center gap-2">
                    <div>Ankur</div>
                    <Avatar src="avatar.png" alt="Ankur" />
                </div>
                <IconSettings2 />
            </div>
        </div>
    )
}

export default Header
