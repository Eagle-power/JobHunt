import { Tabs } from "@mantine/core"
import Card from "./Card"
import { jobList } from "../../Data/JobsData"
import { useEffect, useState } from "react"
import { getAllJob } from "../../Services/JobService"
import { useSelector } from "react-redux"

const JobHistory = () => {

    const profile = useSelector((state: any) => state.profile);
    const user = useSelector((state: any) => state.user);

    const [activeTab, setActiveTab] = useState<any>('APPLIED');
    const [jobList, setJobList] = useState<any>([]);
    const [showList, setshowList] = useState<any>([]);



    const handleTabChange = (value: string | null) => {
        setActiveTab(value);
        if (value === "SAVED") {
            setshowList(jobList.filter((job: any) => profile.savedJobs?.includes(job.id)))
        } else {
            setshowList(jobList.filter((job: any) => {
                let found = false;
                job.applicants?.forEach((applicant: any) => {
                    if (applicant.applicantId === user.id && applicant.applicationStatus === value) {
                        found =true;
                    }
                })
                return found;
            }));
        }
    }

    useEffect(() => {
        getAllJob().then((res) => {
            setJobList(res);

            setshowList(res.filter((job: any) => {
                let found = false;
                job.applicants?.forEach((applicant: any) => {
                    if (applicant.applicantId === user.id && applicant.applicationStatus === "APPLIED") {
                        found = true;
                    }
                })
                return found;
            }));
        }).catch((err) => {
            console.log(err);
        })
    }, [])


    return (
        <div >
            <div className="text-2xl font-semibold mb-5" >Job History</div>
            <div >
                <Tabs variant="outline" radius="lg" value={activeTab} onChange={handleTabChange}>
                    <Tabs.List className="[&_button]:!text-xl sm-mx:[&_button]:!text-lg xs-mx:[&_button]:!text-base xs-mx:[&_button]:!px-2 xs-mx:font-medium  mb-5 font-semibold [&_button[data-active='true']]:text-bright-sun-400">
                        <Tabs.Tab value="APPLIED">Applied</Tabs.Tab>
                        <Tabs.Tab value="SAVED">Saved</Tabs.Tab>
                        <Tabs.Tab value="OFFERED">Offered</Tabs.Tab>
                        <Tabs.Tab value="INTERVIEWING">In Progress</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value={activeTab}>
                        <div className="mt-10 flex flex-wrap  gap-5 justify-around">
                            {
                                showList.map((job: any, idx: any) => (<Card key={idx} {...job} {...{[activeTab.toLowerCase()]:true}} />))
                            }
                        </div>
                    </Tabs.Panel>

                </Tabs>
            </div>
        </div>
    )
}

export default JobHistory
