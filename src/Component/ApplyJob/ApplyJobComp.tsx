import { Button, Divider, FileInput, LoadingOverlay, Notification, NumberInput, Textarea, TextInput } from "@mantine/core"
import { IconCheck, IconPaperclip } from "@tabler/icons-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom";



const ApplyJobComp = () => {

    const [preview, setPreview] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [sec, setSec] = useState(5);
    const navigate = useNavigate();

    const handlePreview = () => {
        setPreview(!preview);
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleSubmit = () => {
        setSubmit(true);
        let x = 5;
        setInterval(() => {
            x--;
            setSec(x);
            if (x === 0) navigate('/find-jobs');
        }, 1000)

    }

    return (
        <>
            <div className="w-2/3 mx-auto">
                {/* OverLay */}
                <LoadingOverlay className="!fixed"
                    visible={submit}
                    zIndex={1000}
                    overlayProps={{ radius: 'sm', blur: 2 }}
                    loaderProps={{ color: 'bright-sun.4', type: 'bars' }}
                />
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

                </div>
                <Divider my="xl" />

                <div className="text-xl font-semibold mb-5">Submit Your Application</div>
                <div className="flex flex-col gap-5">
                    <div className="flex gap-10 [&>*]:w-1/2">
                        <TextInput className={`${preview ? "text-mine-shaft-300  font-semibold" : ""}`} readOnly={preview} variant={preview ? "unstyled" : "default"} label="Full Name" withAsterisk placeholder="Enter your name" />
                        <TextInput className={`${preview ? "text-mine-shaft-300  font-semibold" : ""}`} readOnly={preview} variant={preview ? "unstyled" : "default"} label="Email" withAsterisk placeholder="Enter email" />
                    </div>

                    <div className="flex gap-10 [&>*]:w-1/2">
                        <NumberInput className={`${preview ? "text-mine-shaft-300  font-semibold" : ""}`} readOnly={preview} variant={preview ? "unstyled" : "default"} label="Phone Number" withAsterisk hideControls min={0} max={9999999999} clampBehavior="strict" placeholder="Enter Phone Number" />
                        <TextInput className={`${preview ? "text-mine-shaft-300  font-semibold" : ""}`} readOnly={preview} variant={preview ? "unstyled" : "default"} label="Personal Website" withAsterisk placeholder="Enter Url" />
                    </div>

                    <FileInput className={`${preview ? "text-mine-shaft-300  font-semibold" : ""}`} readOnly={preview} variant={preview ? "unstyled" : "default"} leftSection={<IconPaperclip stroke={1.5} />} label="Attach your CV" placeholder="Your CV" leftSectionPointerEvents="none" withAsterisk />

                    <Textarea className={`${preview ? "text-mine-shaft-300  font-semibold" : ""}`} readOnly={preview} variant={preview ? "unstyled" : "default"} placeholder="Enter something about yourself....." label="Cover Letter" autosize minRows={4} withAsterisk />

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
            </div>

            <Notification className={`!border-bright-sun-400 !fixed z-[1001] top-0 left-[40%]  transition duration-300 ease-in-out ${submit ? "translate-y-0" : "-translate-y-20"} `} icon={<IconCheck size={20} />} withBorder color="teal" title="Application Submitted" mt="md" withCloseButton={false}>
                Redirecting to Find Jobs in {sec} seconds...
            </Notification>
        </>
    )
}

export default ApplyJobComp
