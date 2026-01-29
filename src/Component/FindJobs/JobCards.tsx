// import { Button, Divider, Text } from "@mantine/core"
// import { IconBookmark, IconBookmarkFilled, IconClockHour3 } from "@tabler/icons-react"
// import { Link } from "react-router-dom"
// import { timeAgo } from "../../Services/Utilities"
// import { useDispatch, useSelector } from "react-redux"
// import { changeProfile } from "../../Slices/ProfileSlice"

// const JobCards = (props: any) => {

//     const dispatch = useDispatch();
//     const profile = useSelector((state: any) => state.profile);

//     const handleSaveJob = () => {
//         let savedJobs: any = Array.isArray(profile.savedJobs)
//             ? [...profile.savedJobs]
//             : [];
//         if (savedJobs?.includes(props.id)) {
//             savedJobs = savedJobs?.filter((id: any) => id !== props.id);

//         } else {
//             savedJobs = [...savedJobs, props.id];

//         }
//         let updatedProfile = { ...profile, savedJobs: savedJobs };
//         dispatch(changeProfile(updatedProfile))
//     }

//     return (
//         <div className="bg-mine-shaft-900 p-4 w-72 sm-mx:w-full flex  flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_black] !shadow-bright-sun-200 transition duration-300 ease-in-out">
//             {/* Top section */}
//             <div className="flex justify-between">
//                 <div className="flex gap-2 items-center">
//                     <div className="p-2 bg-mine-shaft-800 rounded-md">
//                         <img className="h-7" src={`/Icons/${props.company}.png`} alt={props.company} />
//                     </div>
//                     <div>
//                         <div className="font-semibold">{props.jobTitle}</div>
//                         <div className="text-xs text-mine-shaft-300">{props.company} &#x2022; {props.applicants ? props.applicants.length : 0} Applicants</div>
//                     </div>
//                 </div>
//                 {
//                     profile.savedJobs?.includes(props.id) ? <IconBookmarkFilled onClick={handleSaveJob} className="text-bright-sun-400 cursor-pointer " /> :
//                         <IconBookmark onClick={handleSaveJob} className="text-mine-shaft-300 cursor-pointer hover:text-bright-sun-400" />

//                 }
//             </div>

//             {/* Highlight section */}
//             <div className="flex flex-wrap mt-2 gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800  [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
//                 <div>{props.experience}</div>
//                 <div>{props.jobType}</div>
//                 <div>{props.location}</div>
//             </div>

//             {/* Description section */}
//             <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={2}>{props.about}</Text>
//             <Divider size="sm" color="mine-shaft.7" />

//             {/* Last section */}
//             <div className="flex justify-between">
//                 <div className="font-semibold text-mine-shaft-200">&#8377; {props.packageOffered} LPA</div>
//                 <div className="flex gap-1 text-xs items-center"><IconClockHour3 className="h-5 w-5" stroke={1.5} /> {timeAgo(props.postTime)}</div>
//             </div>
//             <Link to={`/jobs/${props.id}`}>

//                 <Button fullWidth color="bright-sun.4" variant="outline" >View Job</Button>
//             </Link>
//         </div>
//     )
// }

// export default JobCards



import { Button, Divider, Text, Skeleton } from "@mantine/core";
import {
    IconBookmark,
    IconBookmarkFilled,
    IconClockHour3,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { timeAgo } from "../../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";

const JobCards = (props: any) => {
    const { loading = false } = props;

    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);

    const handleSaveJob = () => {
        let savedJobs: any = Array.isArray(profile.savedJobs)
            ? [...profile.savedJobs]
            : [];

        if (savedJobs?.includes(props.id)) {
            savedJobs = savedJobs.filter((id: any) => id !== props.id);
        } else {
            savedJobs = [...savedJobs, props.id];
        }

        const updatedProfile = { ...profile, savedJobs };
        dispatch(changeProfile(updatedProfile));
    };

    return (
        <div className="bg-mine-shaft-900 p-4 w-72 sm-mx:w-full flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_black] !shadow-bright-sun-200 transition duration-300 ease-in-out">
            {/* ---------- Top section ---------- */}
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <div className="p-2 bg-mine-shaft-800 rounded-md">
                        {loading ? (
                            <Skeleton height={28} width={28} radius="md" />
                        ) : (
                            <img
                                className="h-7"
                                src={`/Icons/${props.company}.png`}
                                alt={props.company}
                            />
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        {loading ? (
                            <>
                                <Skeleton height={16} width={120} radius="md" />
                                <Skeleton height={12} width={160} radius="md" />
                            </>
                        ) : (
                            <>
                                <div className="font-semibold">
                                    {props.jobTitle}
                                </div>
                                <div className="text-xs text-mine-shaft-300">
                                    {props.company} &#x2022;{" "}
                                    {props.applicants
                                        ? props.applicants.length
                                        : 0}{" "}
                                    Applicants
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {!loading && (
                    profile.savedJobs?.includes(props.id) ? (
                        <IconBookmarkFilled
                            onClick={handleSaveJob}
                            className="text-bright-sun-400 cursor-pointer"
                        />
                    ) : (
                        <IconBookmark
                            onClick={handleSaveJob}
                            className="text-mine-shaft-300 cursor-pointer hover:text-bright-sun-400"
                        />
                    )
                )}
            </div>

            {/* ---------- Highlight section ---------- */}
            <div className="flex flex-wrap mt-2 gap-2 text-xs">
                {loading ? (
                    <>
                        <Skeleton height={20} width={60} radius="md" />
                        <Skeleton height={20} width={60} radius="md" />
                        <Skeleton height={20} width={60} radius="md" />
                    </>
                ) : (
                    <>
                        <div className="py-1 px-2 bg-mine-shaft-800 text-bright-sun-400 rounded-lg">
                            {props.experience}
                        </div>
                        <div className="py-1 px-2 bg-mine-shaft-800 text-bright-sun-400 rounded-lg">
                            {props.jobType}
                        </div>
                        <div className="py-1 px-2 bg-mine-shaft-800 text-bright-sun-400 rounded-lg">
                            {props.location}
                        </div>
                    </>
                )}
            </div>

            {/* ---------- Description ---------- */}
            {loading ? (
                <>
                    <Skeleton height={12} radius="md" />
                    <Skeleton height={12} radius="md" width="80%" />
                </>
            ) : (
                <Text
                    className="!text-xs text-justify !text-mine-shaft-300"
                    lineClamp={2}
                >
                    {props.about}
                </Text>
            )}

            <Divider size="sm" color="mine-shaft.7" />

            {/* ---------- Bottom section ---------- */}
            <div className="flex justify-between items-center">
                {loading ? (
                    <>
                        <Skeleton height={18} width={80} radius="md" />
                        <Skeleton height={18} width={90} radius="md" />
                    </>
                ) : (
                    <>
                        <div className="font-semibold text-mine-shaft-200">
                            &#8377; {props.packageOffered} LPA
                        </div>
                        <div className="flex gap-1 text-xs items-center">
                            <IconClockHour3
                                className="h-5 w-5"
                                stroke={1.5}
                            />
                            {timeAgo(props.postTime)}
                        </div>
                    </>
                )}
            </div>

            {/* ---------- Button ---------- */}
            {loading ? (
                <Skeleton height={36} radius="md" />
            ) : (
                <Link to={`/jobs/${props.id}`}>
                    <Button
                        fullWidth
                        color="bright-sun.4"
                        variant="outline"
                    >
                        View Job
                    </Button>
                </Link>
            )}
        </div>
    );
};

export default JobCards;
