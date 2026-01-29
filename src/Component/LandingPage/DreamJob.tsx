// import { Avatar, TextInput } from "@mantine/core"
// import { IconSearch } from "@tabler/icons-react"

// const DreamJob = () => {
//     return (
//         <div className="flex sm-mx:flex-col-reverse items-center px-16  bs-mx:px-10 md-mx:px-5">
//             {/* Left section */}
//             <div className="flex flex-col w-[45%] sm-mx:w-full gap-3">
//                 <div className="text-6xl bs-mx:text-5xl md-mx:text-4xl sm-mx:text-3xl font-bold text-mine-shaft-100 [&>span]:text-bright-sun-400 leading-tight">Find your <span >Dream job</span> with us</div>
//                 <div className="text-lg md-mx:text-base sm-mx:text-sm text-mine-shaft-200">Good life begins with a good company. Start explore thousands of jobs in one place.</div>

//                 <div className="flex gap-3 mt-5 items-center">
//                     <TextInput className="bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100" variant="unstyled" label="Job Title" placeholder="Software Engineer" />
//                     <TextInput className="bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100" variant="unstyled" label="Job Type" placeholder="Full Time" />
//                     <div className="flex items-center justify-center h-full w-20 bg-bright-sun-400 text-mine-shaft-100 rounded-lg  p-2 hover:bg-bright-sun-500 cursor-pointer">
//                         <IconSearch className="h-[85%] w-[85%]" />
//                     </div>
//                 </div>
//             </div>

//             {/* Right section */}
//             <div className="w-[55%] sm-mx:w-full flex items-center justify-center">
//                 {/* Image */}
//                 <div className="w-[40rem] relative">
//                     <img src="/Boy.png" alt="Candidate" />


//                     <div className="absolute w-fit top-[55%] xs-mx:top-[10%] xs-mx:right-4  -right-1 bs-mx:right-0 border-bright-sun-400 border rounded-lg p-2 backdrop-blur-md">
//                         <div className="text-center mb-1 text-sm text-mine-shaft-100">10k+ got job</div>
//                         <Avatar.Group>
//                             <Avatar src="avatar.png" />
//                             <Avatar src="avatar1.png" />
//                             <Avatar src="avatar2.png" />
//                             <Avatar>+9k</Avatar>
//                         </Avatar.Group>
//                     </div>

//                     <div className=" flex  flex-col absolute w-fit bs-mx:top-[35%] xs-mx:top-[60%] top-[40%] -left-15 border-bright-sun-400 border rounded-lg p-2 backdrop-blur-md">
//                         <div className="flex gap-2  items-center">
//                             <div className="w-10 h-10 p-1 bg-mine-shaft-900 rounded-lg">
//                                 <img src="./Icons/Google.png" alt="" />
//                             </div>
//                             <div className="text-sm text-mine-shaft-100">
//                                 <div>Software Engineer</div>
//                                 <div className="text-mine-shaft-200 text-xs">Rajkot, Gujrat</div>
//                             </div>
//                         </div>
//                         <div className="flex gap-2 text-mine-shaft-200 text-xs mt-2 justify-around">
//                             <span>1 day ago</span>
//                             <span>120 Applicants</span>
//                         </div>
//                     </div>


//                 </div>
//             </div>
//         </div>
//     )
// }

// export default DreamJob

import { Avatar, TextInput, Skeleton } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DreamJob = () => {
    const navigate = useNavigate();

    const [jobTitle, setJobTitle] = useState("");
    const [jobType, setJobType] = useState("");
    const [loading, setLoading] = useState(true);

    // simulate page load (can later be tied to real API readiness)
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(timer);
    }, []);

    const handleSearch = () => {
        navigate(
            `/find-jobs?title=${encodeURIComponent(jobTitle)}&type=${encodeURIComponent(jobType)}`
        );
    };
 
    if (loading) {
        return (
            <div className="flex sm-mx:flex-col-reverse items-center px-16 bs-mx:px-10 md-mx:px-5">
                {/* Left skeleton */}
                <div className="flex flex-col w-[45%] sm-mx:w-full gap-4">
                    <Skeleton height={72} radius="md" />
                    <Skeleton height={24} width="80%" radius="md" />

                    <div className="flex gap-3 mt-5 items-center">
                        <Skeleton height={48} radius="md" width="100%" />
                        <Skeleton height={48} radius="md" width="100%" />
                        <Skeleton height={48} radius="md" width={80} />
                    </div>
                </div>

                {/* Right skeleton */}
                <div className="w-[55%] sm-mx:w-full flex items-center justify-center mt-8 sm-mx:mt-4">
                    <div className="relative">
                        <Skeleton height={420} width={420} radius="lg" />
                        <Skeleton
                            height={90}
                            width={140}
                            radius="md"
                            className="absolute top-[55%] -right-1"
                        />
                        <Skeleton
                            height={100}
                            width={200}
                            radius="md"
                            className="absolute top-[40%] -left-10"
                        />
                    </div>
                </div>
            </div>
        );
    }
 
    return (
        <div className="flex sm-mx:flex-col-reverse items-center px-16 bs-mx:px-10 md-mx:px-5">
            {/* Left section */}
            <div className="flex flex-col w-[45%] sm-mx:w-full gap-3">
                <div className="text-6xl bs-mx:text-5xl md-mx:text-4xl sm-mx:text-3xl font-bold text-mine-shaft-100 [&>span]:text-bright-sun-400 leading-tight">
                    Find your <span>Dream job</span> with us
                </div>

                <div className="text-lg md-mx:text-base sm-mx:text-sm text-mine-shaft-200">
                    Good life begins with a good company. Start explore thousands of jobs in one place.
                </div>

                <div className="flex gap-3 mt-5 items-center">
                    <TextInput
                        className="bg-mine-shaft-900 rounded-lg p-1 px-2 [&_input]:!text-mine-shaft-100"
                        variant="unstyled"
                        label="Job Title"
                        placeholder="Software Engineer"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.currentTarget.value)}
                    />

                    <TextInput
                        className="bg-mine-shaft-900 rounded-lg p-1 px-2 [&_input]:!text-mine-shaft-100"
                        variant="unstyled"
                        label="Job Type"
                        placeholder="Full Time"
                        value={jobType}
                        onChange={(e) => setJobType(e.currentTarget.value)}
                    />

                    <div
                        onClick={handleSearch}
                        className="flex items-center justify-center h-full w-20 bg-bright-sun-400 rounded-lg p-2 hover:bg-bright-sun-500 cursor-pointer"
                    >
                        <IconSearch className="h-[85%] w-[85%]" />
                    </div>
                </div>
            </div>

            {/* Right section */}
            <div className="w-[55%] sm-mx:w-full flex items-center justify-center">
                <div className="w-[40rem] relative">
                    <img src="/Boy.png" alt="Candidate" />

                    <div className="absolute w-fit top-[55%] xs-mx:top-[10%] xs-mx:right-4 -right-1 bs-mx:right-0 border-bright-sun-400 border rounded-lg p-2 backdrop-blur-md">
                        <div className="text-center mb-1 text-sm text-mine-shaft-100">
                            10k+ got job
                        </div>
                        <Avatar.Group>
                            <Avatar src="avatar.png" />
                            <Avatar src="avatar1.png" />
                            <Avatar src="avatar2.png" />
                            <Avatar>+9k</Avatar>
                        </Avatar.Group>
                    </div>

                    <div className="flex flex-col absolute w-fit bs-mx:top-[35%] xs-mx:top-[60%] top-[40%] -left-15 border-bright-sun-400 border rounded-lg p-2 backdrop-blur-md">
                        <div className="flex gap-2 items-center">
                            <div className="w-10 h-10 p-1 bg-mine-shaft-900 rounded-lg">
                                <img src="./Icons/Google.png" alt="" />
                            </div>
                            <div className="text-sm text-mine-shaft-100">
                                <div>Software Engineer</div>
                                <div className="text-mine-shaft-200 text-xs">
                                    Rajkot, Gujrat
                                </div>
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
    );
};

export default DreamJob;
