import { Avatar, TextInput } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"

const DreamJob = () => {
    return (
        <div className="flex items-center px-16">
            {/* Left section */}
            <div className="flex flex-col w-[45%] gap-3">
                <div className="text-6xl font-bold text-mine-shaft-100 [&>span]:text-bright-sun-400 leading-tight">Find your <span >Dream job</span> with us</div>
                <div className="text-lg text-mine-shaft-200">Good life begins with a good company. Start explore thousands of jobs in one place.</div>

                <div className="flex gap-3 mt-5">
                    <TextInput className="bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100" variant="unstyled" label="Job Title" placeholder="Software Engineer" />
                    <TextInput className="bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100" variant="unstyled" label="Job Type" placeholder="Full Time" />
                    <div className="flex items-center justify-center h-full w-20 bg-bright-sun-400 text-mine-shaft-100 rounded-lg  p-2 hover:bg-bright-sun-500 cursor-pointer">
                        <IconSearch className="h-[85%] w-[85%]" />
                    </div>
                </div>
            </div>

            {/* Right section */}
            <div className="w-[55%] flex items-center justify-center">
                {/* Image */}
                <div className="w-[40rem] relative">
                    <img src="/Boy.png" alt="Candidate" />
                    <div className="absolute w-fit top-[55%] -right-1 border-bright-sun-400 border rounded-lg p-2 backdrop-blur-md">
                        <div className="text-center mb-1 text-sm text-mine-shaft-100">10k+ got job</div>
                        <Avatar.Group>
                            <Avatar src="avatar.png" />
                            <Avatar src="avatar1.png" />
                            <Avatar src="avatar2.png" />
                            <Avatar>+9k</Avatar>
                        </Avatar.Group>
                    </div>

                    <div className=" flex  flex-col absolute w-fit top-[40%] -left-15 border-bright-sun-400 border rounded-lg p-2 backdrop-blur-md">
                        <div className="flex gap-2  items-center">
                            <div className="w-10 h-10 p-1 bg-mine-shaft-900 rounded-lg">
                                <img src="./Icons/Google.png" alt="" />
                            </div>
                            <div className="text-sm text-mine-shaft-100">
                                <div>Software Engineer</div>
                                <div className="text-mine-shaft-200 text-xs">Rajkot, Gujrat</div>
                            </div>
                        </div>
                        <div className="flex gap-2 text-mine-shaft-200 text-xs mt-2 justify-around">
                            <span>1 day ago</span>
                            <span>120 Applicants</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DreamJob
