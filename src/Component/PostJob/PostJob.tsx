import { Button, NumberInput, TagsInput, Textarea } from "@mantine/core";
import { content, fields } from "../../Data/PostJob"
import SelectInput from "./SelectInput"
import TextEditor from "./TextEditor";
import { isNotEmpty, useForm } from "@mantine/form";
import { getJob, postJob } from "../../Services/JobService";
import { errorNotification, successNotification } from "../../Services/NotificationService";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";


const PostJob = () => {
    const select = fields;
    const {id} = useParams();
    const [editorData , setEditorData] = useState(content)
    const user = useSelector((state : any) => state.user);
    const navigate = useNavigate();
     const matches = useMediaQuery('(max-width: 350px)');

    const form = useForm({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: {
            jobTitle: '',
            company: '',
            experience: '',
            jobType: '',
            location: '',
            packageOffered: '',
            skillsRequired: [],
            about: '',
            description: content
        },
        validate: {
            jobTitle: isNotEmpty('JobTitle is Required'),
            company: isNotEmpty('company is Required'),
            experience: isNotEmpty('experience is Required'),
            jobType: isNotEmpty('jobType is Required'),
            location: isNotEmpty('location is Required'),
            packageOffered: isNotEmpty('packageOffered is Required'),
            skillsRequired: isNotEmpty('skillsRequired is Required'),
            about: isNotEmpty('about is Required'),
            description: isNotEmpty('description is Required'),
        }


    })

    const handlePost =()=>{
        form.validate();
        if(!form.isValid())return;
        postJob({...form.getValues(), id , postedBy : user.id , jobStatus : "ACTIVE" }).then((res)=>{
            successNotification("Success" , "Job posted Successfully");

            navigate(`/posted-jobs/${res.id}`);

        }).catch((err)=>{
            console.log(err)
            errorNotification("Error" , err.response.data.errorMessage)
        })
    }

    const handleDraft =()=>{ 
        postJob({...form.getValues() , id , postedBy : user.id , jobStatus : "DRAFT" }).then((res)=>{
            successNotification("Success" , "Job Drafted Successfully");
             navigate(`/posted-job/${res.id}`);
        }).catch((err)=>{
            console.log(err)
            errorNotification("Error" , err.response.data.errorMessage)
        })
    }

    useEffect(()=>{
        window.scrollTo(0,0);
        if(id!=="0"){
            getJob(id).then((res)=>{
                form.setValues(res);
                setEditorData(res.description)
            }).catch((err)=>{
                errorNotification("Error" , "Something went wrong");
            })
        }
        else{
            form.reset();
            setEditorData(content)
        }
    },[id])
    
    return (
        <div className='px-16 py-5 bs-mx:px-10 md-mx:px-5 '>
            <div className="text-2xl font-semibold mb-5">Post a Job</div>
            <div className="flex flex-col gap-5 mb-4">
                <div className="flex  gap-10 md-mx:gap-5 sm-mx:[&>*]:w-full sm-mx:flex-wrap [&>*]:w-1/2">
                    <div><SelectInput form={form} name="jobTitle" {...select[0]} /></div>
                    <div><SelectInput form={form} name="company" {...select[1]} /></div>
                </div>
                <div className="flex  gap-10 md-mx:gap-5 sm-mx:[&>*]:w-full sm-mx:flex-wrap  [&>*]:w-1/2">
                    <div><SelectInput form={form} name="experience" {...select[2]} /></div>
                    <div><SelectInput form={form} name="jobType" {...select[3]} /></div>
                </div>
                <div className="flex  gap-10 md-mx:gap-5 sm-mx:[&>*]:w-full sm-mx:flex-wrap  [&>*]:w-1/2">
                    <div><SelectInput form={form} name="location" {...select[4]} /></div>
                    <div><NumberInput {...form.getInputProps('packageOffered')} withAsterisk min={1} max={300} clampBehavior="strict" label="Salary" placeholder="Enter Salary" hideControls /></div>
                </div>
            </div>
            <TagsInput {...form.getInputProps('skillsRequired')} withAsterisk label="Skills" placeholder="Enter skill" splitChars={[',', ' ', '|']} clearable acceptValueOnBlur />

            <Textarea
                {...form.getInputProps('about')}
                className="mt-4"
                withAsterisk
                label="About Job"
                autosize
                placeholder="Enter about job.."
                minRows={3} 
            />

            <div className=" mt-4 mb-4 [&_button[data-active='true']]:!text-bright-sun-400 [&_button[data-active='true']]:!bg-bright-sun-400/20">
                <div className="text-sm font-medium">Job Description <span className="text-red-500">*</span></div>
                <TextEditor form={form} data={editorData} />
            </div>

            <div className="flex gap-4">
                <Button onClick={handlePost} color="bright-sun.4" variant="light" >
                    Publish  Job
                </Button>
                <Button color="bright-sun.4" variant="outline" onClick={handleDraft} >
                    Save as Draft
                </Button>
            </div>
        </div>
    )
}

export default PostJob 