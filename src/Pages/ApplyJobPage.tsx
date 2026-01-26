import { Button, Divider } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import { Link, useNavigate, useParams } from "react-router-dom"
import ApplyJobComp from "../Component/ApplyJob/ApplyJobComp"
import { useEffect, useState } from "react"
import { getJob } from "../Services/JobService"

const ApplyJobPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [job, setJob] = useState<any>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        getJob(id).then((res) => {
            setJob(res);
        }).catch((err) => {
            console.log(err);

        })
    }, [id])
    return (
        <div className="min-h-[100vh] p-4 bg-mine-shaft-950 font-['Nunito']">

            <Button my="sm" onClick={() => navigate(-1)} leftSection={<IconArrowLeft size={20} />} color="bright-sun.4" variant="light" >
                Back
            </Button>
            <ApplyJobComp {...job} />
        </div>
    )
}

export default ApplyJobPage
