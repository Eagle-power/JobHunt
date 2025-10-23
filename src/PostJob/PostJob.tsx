import { Button, TagsInput } from "@mantine/core";
import { fields } from "../Data/PostJob"
import SelectInput from "./SelectInput"
import TextEditor from "./TextEditor";
import { IconArrowLeft } from "@tabler/icons-react";


const PostJob = () => {
    const select = fields;
    return (
        <div className='w-4/5 mx-auto '>
            <div className="text-2xl font-semibold mb-5">Post a Job</div>
            <div className="flex flex-col gap-5 mb-4">
                <div className="flex  gap-10 [&>*]:w-1/2">
                    <div><SelectInput {...select[0]} /></div>
                    <div><SelectInput {...select[1]} /></div>
                </div>
                <div className="flex  gap-10 [&>*]:w-1/2">
                    <div><SelectInput {...select[2]} /></div>
                    <div><SelectInput {...select[3]} /></div>
                </div>
                <div className="flex  gap-10 [&>*]:w-1/2">
                    <div><SelectInput {...select[4]} /></div>
                    <div><SelectInput {...select[5]} /></div>
                </div>
            </div>
            <TagsInput withAsterisk label="Skills" placeholder="Enter skill" splitChars={[',', ' ', '|']} clearable acceptValueOnBlur />


            <div className=" mt-4 mb-4 [&_button[data-active='true']]:!text-bright-sun-400 [&_button[data-active='true']]:!bg-bright-sun-400/20">
                <div className="text-sm font-medium">Job Description</div>
                <TextEditor />
            </div>

            <div className="flex gap-4">
                <Button   color="bright-sun.4" variant="light" >
                    Publish  Job
                </Button>
                <Button   color="bright-sun.4" variant="outline" >
                    Save as Draft
                </Button>
            </div>
        </div>
    )
}

export default PostJob 