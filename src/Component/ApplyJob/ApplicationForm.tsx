import { Button, FileInput, LoadingOverlay, NumberInput, Textarea, TextInput } from "@mantine/core"
import { isNotEmpty, useForm } from "@mantine/form";
import { IconPaperclip } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBase64 } from "../../Services/Utilities";
import { applyJob } from "../../Services/JobService";
import { errorNotification, successNotification } from "../../Services/NotificationService";
import { useSelector } from "react-redux";

const ApplicationForm = () => {

    const  {id} = useParams();
    const navigate = useNavigate();
    const user = useSelector((state : any)=>state.user);
    const [preview, setPreview] = useState(false);

    const [submit, setSubmit] = useState(false);


    const handlePreview = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        form.validate();
        if(!form.isValid())return;
        
        setPreview(!preview);
    }

    const handleSubmit = async () => {
        setSubmit(true)
        let resume:any = await getBase64(form.getValues().resume);
        let applicant = {...form.getValues() ,applicantId : user.id, resume:resume.split(',')[1]}

        applyJob(id , applicant ).then((res)=>{
            setSubmit(false);
            successNotification("Success" , "Application Submitted Successfully")
            navigate("/job-history")
        }).catch((err)=>{
            setSubmit(false);
            errorNotification("Error" , err.response.data.errorMessage); 
        })
    }

    const form = useForm({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: {
            name: '',
            email: '',
            phone: '',
            website: '',
            resume : null,
            coverLetter : ''
        },
        validate: {
            name: isNotEmpty("Name is required"),
            email : isNotEmpty("Email is required"),
            phone : isNotEmpty("Phone is required"),
            website: isNotEmpty("Website is required"),
            resume : isNotEmpty("Resume  is required")
            
        }
    })


    return (
        <>
            {/* OverLay */}
            <LoadingOverlay className="!fixed"
                visible={submit}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 2 }}
                loaderProps={{ color: 'bright-sun.4', type: 'bars' }}
            />
            <div className="text-xl font-semibold mb-5">Submit Your Application</div>
            <div className="flex flex-col gap-5">
                <div className="flex gap-10 md-mx:gap-5 sm-mx:[&>*]:w-full sm-mx:flex-wrap [&>*]:w-1/2">
                    <TextInput {...form.getInputProps("name")} className={`${preview ? "text-mine-shaft-300  font-semibold" : ""}`} readOnly={preview} variant={preview ? "unstyled" : "default"} label="Full Name" withAsterisk placeholder="Enter your name" />
                    <TextInput {...form.getInputProps("email")} className={`${preview ? "text-mine-shaft-300  font-semibold" : ""}`} readOnly={preview} variant={preview ? "unstyled" : "default"} label="Email" withAsterisk placeholder="Enter email" />
                </div>

                <div className="flex gap-10 md-mx:gap-5 sm-mx:[&>*]:w-full sm-mx:flex-wrap [&>*]:w-1/2">
                    <NumberInput {...form.getInputProps("phone")} className={`${preview ? "text-mine-shaft-300  font-semibold" : ""}`} readOnly={preview} variant={preview ? "unstyled" : "default"} label="Phone Number" withAsterisk hideControls min={0} max={9999999999} clampBehavior="strict" placeholder="Enter Phone Number" />
                    <TextInput {...form.getInputProps("website")} className={`${preview ? "text-mine-shaft-300  font-semibold" : ""}`} readOnly={preview} variant={preview ? "unstyled" : "default"} label="Personal Website" withAsterisk placeholder="Enter Url" />
                </div>

                <FileInput {...form.getInputProps("resume")} accept="application/pdf" className={`${preview ? "text-mine-shaft-300  font-semibold" : ""}`} readOnly={preview} variant={preview ? "unstyled" : "default"} leftSection={<IconPaperclip stroke={1.5} />} label="Attach your CV" placeholder="Your CV" leftSectionPointerEvents="none" withAsterisk />

                <Textarea {...form.getInputProps("coverLetter")} className={`${preview ? "text-mine-shaft-300  font-semibold" : ""}`} readOnly={preview} variant={preview ? "unstyled" : "default"} placeholder="Enter something about yourself....." label="Cover Letter" autosize minRows={4} withAsterisk />

                {
                    !preview && <Button onClick={handlePreview} color="bright-sun.4" variant="light" >Preview</Button>
                }
                {
                    preview && (
                        <div className="flex gap-10 [&>*]:w-1/2">
                            <Button fullWidth onClick={handlePreview} color="bright-sun.4" variant="outline" >Edit</Button>
                            <Button fullWidth onClick={handleSubmit} color="bright-sun.4" variant="light" >Submit</Button>
                        </div>
                    )
                }
            </div>

        </>
    )
}

export default ApplicationForm