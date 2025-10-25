import { ActionIcon, Button, Divider } from "@mantine/core";
import { IconBookmark } from "@tabler/icons-react"
import { Link } from "react-router-dom";
import { card, desc, skills } from "../Data/JobDescData";

import DOMPurify from "dompurify";

const JobDescription = (props: any) => {

    const data = DOMPurify.sanitize(desc);
    return (
        <div className="w-2/3">
            {/* Top Hero section */}
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <div className="p-3 bg-mine-shaft-800 rounded-xl">
                        <img className="h-14" src={`/Icons/Google.png`} alt="" />
                    </div>
                    <div>
                        <div className="font-semibold text-2xl">Sooftware Engineer</div>
                        <div className="text-lg text-mine-shaft-300">Gooogle &#x2022; 3 days ago &#x2022; 48 Applicants</div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 items-center">
                    <Link to="/apply-job">
                        <Button color="bright-sun.4" size="sm" variant="light" >{props.edit ? "Edit" : "Apply to this job"}</Button>
                    </Link>
                    {props.edit ? <Button color="red.5" size="sm" variant="outline" >Delete</Button> : <IconBookmark className="text-bright-sun-400 cursor-pointer" />}
                </div>
            </div>
            <Divider my="xl" />

            {/* Icon Component */}
            <div className="flex justify-between">
                {
                    card.map((item, index) => (
                        <div key={index} className="flex flex-col items-center gap-1">
                            <ActionIcon className="!h-12 !w-12" color="bright-sun.4" variant="light" radius="xl" aria-label="Settings">
                                <item.icon className="h-4/5 w-4/5" stroke={1.5} />
                            </ActionIcon>
                            <div className=" text-sm text-mine-shaft-300">{item.name}</div>
                            <div className="font-semibold">{item.value}</div>
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
                        skills.map((skil, idx) => (
                            <ActionIcon key={idx} className="!h-fit font-medium !text-sm !w-fit" color="bright-sun.4" variant="light" radius="xl" p="xs" aria-label="Settings">
                                {skil}
                            </ActionIcon>
                        ))
                    }

                </div>
            </div>
            <Divider my="xl" />

            {/* About the Job */}
            <div className="[&_h4]:text-xl [&_*]:text-mine-shaft-300 [&_h4]:my-5 [&_h4]:font-semibold [&_h4]:text-mine-shaft-200 [&_p]:text-justify [&_li]:marker:text-bright-sun-400 [&_li]:mb-1" dangerouslySetInnerHTML={{ __html: data }}>
            </div>
            <Divider my="xl" />

            {/* About the Company */}
            <div>
                <div className="text-xl font-semibold mb-5">About Company</div>
                <div>
                    <div className="flex justify-between mb-3">
                        <div className="flex gap-2 items-center">
                            <div className="p-3 bg-mine-shaft-800 rounded-xl">
                                <img className="h-8" src={`/Icons/Google.png`} alt="" />
                            </div>
                            <div className="flex flex-col">
                                <div className="font-medium text-lg">Google</div>
                                <div className=" text-mine-shaft-300">10k+ Employees</div>
                            </div>
                        </div>
                        <Link to="/company" >
                            <Button color="bright-sun.4" variant="light" >Company Page</Button>
                        </Link>
                    </div>
                    <div className="text-mine-shaft-300 text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. At facilis voluptate inventore vel beatae? Beatae voluptas ab possimus illum explicabo accusantium molestiae voluptates cupiditate, similique quasi fugit magni. Nam veniam iste distinctio illo minima temporibus vero voluptatem, quidem itaque nulla.</div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription;
