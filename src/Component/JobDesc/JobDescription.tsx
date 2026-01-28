import { ActionIcon, Button, Divider } from "@mantine/core";
import { IconBookmark, IconBookmarkFilled } from "@tabler/icons-react"
import { Link } from "react-router-dom";
import { card } from "../../Data/JobDescData";

import DOMPurify from "dompurify";
import { timeAgo } from "../../Services/Utilities";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { postJob } from "../../Services/JobService";
import { errorNotification, successNotification } from "../../Services/NotificationService";

const JobDescription = (props: any) => {
    const dispatch = useDispatch();
    const data = DOMPurify.sanitize(props.description);
    
    const [applied, setApplied] = useState(false);


    const profile = useSelector((state: any) => state.profile);
    const user = useSelector((state: any) => state.user);

    const handleSaveJob = () => {
        let savedJobs: any = Array.isArray(profile.savedJobs)
            ? [...profile.savedJobs]
            : [];
        if (savedJobs?.includes(props.id)) {
            savedJobs = savedJobs?.filter((id: any) => id !== props.id);

        } else {
            savedJobs = [...savedJobs, props.id];

        }
        let updatedProfile = { ...profile, savedJobs: savedJobs };
        dispatch(changeProfile(updatedProfile))
    }

    const handleClose = () =>{
        postJob({...props , jobStatus:"CLOSED"}).then((res)=>{
            successNotification("Success" , "Job Closed Successfully");
        }).catch((err)=>{
            errorNotification("Error" , err.response.data.errorMessage);
        })
    }

    useEffect(() => {
        // console.log("hello beta", props.applicants)
        if (props.applicants?.filter((applicant: any) => applicant.applicantId === user.id).length > 0) {
            setApplied(true);
        } else {
            setApplied(false);
        }
    }, [props])

    return (
        <div className="w-2/3 bs-mx:w-full">
            {/* Top Hero section */}
            <div className="flex justify-between flex-wrap">
                <div className="flex gap-2 items-center ">
                    <div className="p-3 bg-mine-shaft-800 shrink-0 flex rounded-xl">
                        <img className="h-14 xs-mx:h-10 xs-mx:w-10" src={`/Icons/${props.company}.png`} alt="" />
                    </div>
                    <div>
                        <div className="font-semibold text-2xl xs-mx:text-xl ">{props.jobTitle}</div>
                        <div className="text-lg text-mine-shaft-300 flex flex-wrap  xs-mx:text-base"><span>{props.company}&#x2022;</span>  <span>  {timeAgo(props.postTime)} &#x2022; </span>  <span> {props.applicants ? props.applicants.length : 0} Applicants</span></div>
                    </div>
                </div>

                <div className="flex sm:flex-col sm-mx:my-5 sm gap-2 items-center sm-mx:w-full sm-mx:[&>button]:w-full">
                    {(props.edit || !applied) &&
                        <Link to={props.edit ?`/post-job/${props.id}` :`/apply-job/${props.id}`}>
                            <Button color="bright-sun.4" size="sm" variant="light" >{props.closed ? "Reopen" :  props.edit ? "Edit" : "Apply to this job"}</Button>
                        </Link>
                    }
                    {
                       !props.edit &&  applied && <Button color="green.8" size="sm" variant="light" >Applied</Button>

                    }
                    {
                        props.edit && !props.closed ? <Button color="red.5" size="sm" variant="outline" onClick={handleClose} >Close</Button> :
                            profile.savedJobs?.includes(props.id) ? 
                                <IconBookmarkFilled onClick={handleSaveJob} className="text-bright-sun-400 cursor-pointer " /> :
                                <IconBookmark onClick={handleSaveJob} className="text-mine-shaft-300 cursor-pointer hover:text-bright-sun-400" />

                    }
                </div>
            </div>
            <Divider my="xl" />

            {/* Icon Component */}
            <div className="flex justify-between gap-4 sm-mx:flex-wrap">
                {
                    card.map((item, index) => (
                        <div key={index} className="flex flex-col items-center gap-1">
                            <ActionIcon className="!h-12 !w-12 xs-mx:!h-10 xs-mx:!w-10" color="bright-sun.4" variant="light" radius="xl" aria-label="Settings">
                                <item.icon className="h-4/5 w-4/5" stroke={1.5} />
                            </ActionIcon>
                            <div className=" text-sm text-mine-shaft-300 xs-mx:text-sm">{item.name}</div>
                            <div className="font-semibold xs-mx:text-sm ">{props ? props[item.id] : "NA"} {item.id === "packageOffered" && <>LPA</>}</div>
                        </div>
                    ))
                }

            </div>
            <Divider my="xl" />

            {/* Skills section */}

            <div>
                <div className="text-xl font-semibold mb-5">Required Skills</div>
                <div className="flex flex-wrap gap-2">
                    {
                        props?.skillsRequired?.map((skill: any, idx: number) => (
                            <ActionIcon key={idx} className="!h-fit font-medium !text-sm !w-fit xs-mx:!text-xs" color="bright-sun.4" variant="light" radius="xl" p="xs" aria-label="Settings">
                                {skill}
                            </ActionIcon>
                        ))
                    }

                </div>
            </div>
            <Divider my="xl" />

            {/* About the Job */}
            <div className="[&_h4]:text-xl [&_p]:text-sm [&_li]:text-sm [&_*]:text-mine-shaft-300 [&_h4]:my-5 [&_h4]:font-semibold [&_h4]:text-mine-shaft-200 [&_p]:text-justify [&_li]:marker:text-bright-sun-400 [&_li]:mb-1" dangerouslySetInnerHTML={{ __html: data }}>
            </div>
            <Divider my="xl" />

            {/* About the Company */}
            <div >
                <div className="text-xl font-semibold mb-5">About Company</div>
                <div>
                    <div className="flex justify-between mb-3 xs-mx:flex-wrap xs-mx:gap-2">
                        <div className="flex gap-2 items-center">
                            <div className="p-3 bg-mine-shaft-800 rounded-xl">
                                <img className="h-8" src={`/Icons/${props.company}.png`} alt="" />
                            </div>
                            <div className="flex flex-col">
                                <div className="font-medium text-lg">{props.company}</div>
                                <div className=" text-mine-shaft-300">10k+ Employees</div>
                            </div>
                        </div>
                        <Link to={`/company/${props.company}`} >
                            <Button color="bright-sun.4" variant="light" >Company Page</Button>
                        </Link>
                    </div>
                    <div className="text-mine-shaft-300 text-justify xs-mx:text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. At facilis voluptate inventore vel beatae? Beatae voluptas ab possimus illum explicabo accusantium molestiae voluptates cupiditate, similique quasi fugit magni. Nam veniam iste distinctio illo minima temporibus vero voluptatem, quidem itaque nulla.</div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription;
