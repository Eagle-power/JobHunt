import { Button, Divider } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import { Link, useNavigate } from "react-router-dom" 
import Company from "../Component/CompanyProfile/Company";
import SimilarCompanies from "../Component/CompanyProfile/SimilarCompanies";

const CompanyPage = () => {

    const navigate = useNavigate();

    return (
        <div className="min-h-[100vh] p-4 bg-mine-shaft-950 font-['Nunito']">
                 
                <Button leftSection={<IconArrowLeft size={20} />} onClick={()=>navigate(-1)} my="md" color="bright-sun.4" variant="light" >
                    Back
                </Button> 

            {/* profile added */}
            <div className="flex gap-5 justify-between"> 
                <Company />
                <SimilarCompanies />
            </div>
        </div>
    )
}

export default CompanyPage
