import { Badge, Tabs } from "@mantine/core"
import JobDescription from "../JobDesc/JobDescription"
import TalentCards from "../FindTalent/TalentCard"
import { useEffect, useState } from "react"

const PostedJobDesc = (props: any) => {

    const [tab , setTab] = useState("overview");
    const [arr , setArr] = useState<any>([]);

    const handleTabChange  = (value : any)=>{
        setTab(value);
        if(value === "applicants"){
            setArr(props.applicants?.filter((x: any) => x.applicationStatus === "APPLIED"));
        }
        else if(value === "invited"){
            setArr(props.applicants?.filter((x: any) => x.applicationStatus === "INTERVIEWING"));
        }
        else if(value === "offered"){
            setArr(props.applicants?.filter((x: any) => x.applicationStatus === "OFFERED"))
        }
        else if(value === "rejected"){
            setArr(props.applicants?.filter((x: any) => x.applicationStatus === "REJECTED"))
        }
    }

    useEffect(()=>{
        handleTabChange("overview");
    },[props])

    return (
        <div className="mt-5 w-3/4 md-mx:w-full md-mx:p-0 px-5">
            {props.jobTitle ? <>
                <div className="text-2xl xs-mx:text-xl font-semibold flex items-center">{props.jobTitle} <Badge variant="light" ml="sm" size="sm" color="bright-sun.4">{props.jobStatus}</Badge></div>

                <div className="font-medium xs-mx:font-sm text-mine-shaft-300 mb-5">{props.location}</div>

                <div>
                    <Tabs variant="outline" radius="lg" value={tab} onChange={handleTabChange}>
                        <Tabs.List className="[&_button]:!text-xl sm-mx:[&_button]:!text-lg xs-mx:[&_button]:!text-base xs-mx:[&_button]:!px-2 xs-mx:font-medium  mb-5 font-semibold [&_button[data-active='true']]:text-bright-sun-400">
                            <Tabs.Tab value="overview">Overview</Tabs.Tab>
                            <Tabs.Tab value="applicants">Applicants</Tabs.Tab>
                            <Tabs.Tab value="invited">Invited</Tabs.Tab>
                            <Tabs.Tab value="offered">Offered</Tabs.Tab>
                            <Tabs.Tab value="rejected">Rejected</Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="overview" className="[&>div]:w-full">
                                < JobDescription {...props} edit closed = {props.jobStatus === "CLOSED"}  /> 
                             
                        </Tabs.Panel>
                        <Tabs.Panel value="applicants">
                            <div className="mt-10 flex flex-wrap  gap-10  justify-around">
                                {
                                    arr?.length ? arr.map((talent: any, index: number) => (
                                        <TalentCards key={index} {...talent} posted={true} />
                                    )) : <div className="text-2xl font-semibold">No Applicant </div>
                                }
                            </div>

                        </Tabs.Panel>
                        <Tabs.Panel value="invited">
                            <div className="mt-10 flex flex-wrap  gap-10 justify-around ">
                                {
                                    arr?.length ? arr.map((talent: any, index: number) => (
                                        <TalentCards key={index} {...talent} invited />
                                    )) : <div className="text-2xl font-semibold">No Invited Candidates </div>
                                }
                            </div>
                        </Tabs.Panel>
                        <Tabs.Panel value="offered">
                            <div className="mt-10 flex flex-wrap  gap-10 justify-around ">
                                {
                                    arr?.length ? arr.map((talent: any, index: number) => (
                                        <TalentCards key={index} {...talent} offered />
                                    )) : <div className="text-2xl font-semibold">No Offered Candidates </div>
                                }
                            </div>
                        </Tabs.Panel>
                        <Tabs.Panel value="rejected">
                            <div className="mt-10 flex flex-wrap  gap-10 justify-around ">
                                {
                                    arr?.length ? arr.map((talent: any, index: number) => (
                                        <TalentCards key={index} {...talent} rejected />
                                    )) : <div className="text-2xl font-semibold">No Rejected Candidates </div>
                                }
                            </div>
                        </Tabs.Panel>
                    </Tabs>
                </div>
            </> :
                <div className="text-2xl font-semibold min-h-[70vh] flex justify-center items-center">
                    No Job Found
                </div>
            }
        </div>
    )
}

export default PostedJobDesc
