import { useNavigate, useParams } from "react-router-dom"
import PostedJob from "../Component/PostedJob/PostedJob"
import PostedJobDesc from "../Component/PostedJob/PostedJobDesc"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getJobPostedBy } from "../Services/JobService";
import { Button, Drawer } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";


const PostedJobPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user);
    const [jobList, setJobList] = useState<any[]>([]);
    const [job, setJob] = useState<any>({});
    const [opened, { open, close }] = useDisclosure(false);

    const matches = useMediaQuery('(max-width: 767px)');

    useEffect(() => {
        window.scrollTo(0, 0);
        getJobPostedBy(user.id)
            .then((res) => {
                setJobList(res);
                if (res && res.length > 0 && Number(id) === 0) navigate(`/posted-jobs/${res[0].id}`)
                setJob(res.find((item: any) => item.id == id));
            }).catch((err) => {
                console.log(err)
            })
    }, [id])

    return (
        <div className="min-h-[100vh] px-5 bg-mine-shaft-950 font-['Nunito']">

            {
                matches &&
                <Button size="md" my="xs" variant="default" onClick={open}>
                    All Jobs
                </Button>
            }

            {/* profile added */}
            <Drawer 
                opened={opened} 
                onClose={close} 
                title="All Jobs"  
                overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
                size={250}
            >
                

                <PostedJob job={job} jobList={jobList} />
            </Drawer>
            <div className="flex gap-5 justify-around py-5">
                {
                    !matches && <PostedJob job={job} jobList={jobList} />
                }

                <PostedJobDesc {...job} />
            </div>
        </div>
    )
}

export default PostedJobPage
