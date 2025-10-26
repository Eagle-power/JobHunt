import { Button } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import ApplyJobComp from "../ApplyJob/ApplyJobComp"

const ApplyJobPage = () => {
    return (
        <div className="min-h-[100vh] p-4 bg-mine-shaft-950 font-['Nunito']">
            <Link to="/jobs" className="my-4 inline-block">
                <Button leftSection={<IconArrowLeft size={20} />} color="bright-sun.4" variant="light" >
                    Back
                </Button>
            </Link>
            <ApplyJobComp />
        </div>
    )
}

export default ApplyJobPage
