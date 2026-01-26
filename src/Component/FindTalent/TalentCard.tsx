import { Avatar, Button, Divider, Modal, Text } from "@mantine/core"
import { DateInput, TimeInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendarMonth, IconHeart, IconMapPin } from "@tabler/icons-react"
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { getProfile } from "../../Services/ProfileService";
import { changeAppStatus } from "../../Services/JobService";
import { errorNotification, successNotification } from "../../Services/NotificationService";
import { formatInterviewTime, openBase64PDF } from "../../Services/Utilities";

const TalentCards = (props: any) => {

    const { id } = useParams();
    const [opened, { open, close }] = useDisclosure(false);
    const [app, { open: openApp, close: closeApp }] = useDisclosure(false);
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<string>("");
    const ref = useRef<HTMLInputElement>(null);
    const [profile, setProfile] = useState<any>({});


    useEffect(() => {
        if (props.applicantId) {
            getProfile(props.applicantId)
                .then((res) => {
                    setProfile(res);
                }).catch((err) => {
                    console.log(err)
                })
        } else {
            setProfile(props);
        }
    }, [props])

    const handleOffer = (status: string) => {
        let interview: any = { id, applicantId: profile.id, applicationStatus: status };
        if (date && time) {
            if (status === "INTERVIEWING") {
                const updatedDate = new Date(date);
                const [hours, minutes] = time.split(":").map(Number);
                interview = { ...interview, interviewTime: updatedDate }
                updatedDate.setHours(hours, minutes, 0, 0);
            }
        }



        changeAppStatus(interview).then((res) => {
            if (status === "INTERVIEWING") {
                successNotification("Interview Scheduled", "Interview Scheduled Successfully.")
            } else if (status === "OFFERED") {
                successNotification("Offered", "Offer has been sent  successfully.");
            } else {
                successNotification("Rejected", "Applicant has been rejected.");
            }
            window.location.reload();
        }).catch((err) => {
            errorNotification("Error", err.response.data.errorMessage);
            console.log(err)
        })

    }
    return (
        <div className="bg-mine-shaft-900 p-4 w-96 bs-mx:w-[48%] md-mx:w-full flex  flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_black] !shadow-bright-sun-200 transition duration-300 ease-in-out">
            {/* Top section */}
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <div className="p-2 bg-mine-shaft-800 rounded-full">
                        <Avatar size="lg" src={profile?.picture ? `data:image/jpeg;base64,${profile?.picture}` : "/Avatar.png"} />
                    </div>
                    <div>
                        <div className="font-semibold text-lg">{props?.name}</div>
                        <div className="text-sm text-mine-shaft-300">{profile?.jobTitle} &#x2022; {profile?.company} </div>
                    </div>
                </div>
                <IconHeart className="text-mine-shaft-300 cursor-pointer" />
            </div>

            {/* Highlight section */}
            <div className="flex flex-wrap mt-2 gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800  [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
                {
                    profile?.skills?.map((skill: any, idx: any) => idx < 4 && (
                        <div key={idx}>{skill}</div>
                    ))
                }
            </div>

            {/* Description section */}
            <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={2}>{profile.about}</Text>
            <Divider size="sm" color="mine-shaft.7" />

            {/* Last section */}
            {
                props.invited ? (
                    <div className="flex gap-1 text-mine-shaft-200 text-sm items-center">
                        <IconCalendarMonth stroke={1.5} />
                        Interview: {formatInterviewTime(props.interviewTime)}
                    </div>
                ) : (
                    // Last Section
                    <div className="flex justify-between">
                        <div className=" text-mine-shaft-300">Exp: {props.totalExp ? props.totalExp : "<1"} years</div>
                        <div className="flex gap-1 text-xs items-center"><IconMapPin className="h-5 w-5" stroke={1.5} />{profile?.location}</div>
                    </div>
                )
            }


            <Divider size="sm" color="mine-shaft.7" />
            <div className="flex [&>*]:w-1/2 [&>*]:p-1">
                {
                    !props.invited && <>
                        <Link to={`/talent-profile/${profile.id}`}>
                            <Button color="bright-sun.4" variant="outline" fullWidth>Profile</Button>
                        </Link>
                        <div>
                            {
                                props.posted ? <Button onClick={open} rightSection={<IconCalendarMonth className="w-5 h-5" />} color="bright-sun.4" variant="light" fullWidth>Schedule</Button> :
                                    <Button color="bright-sun.4" variant="light" fullWidth>Message</Button>
                            }
                        </div>
                    </>
                }
                {
                    props.invited && <>
                        <div>
                            <Button onClick={() => handleOffer("OFFERED")} color="bright-sun.4" variant="outline" fullWidth>Accept</Button>

                        </div>
                        <div>
                            <Button onClick={() => handleOffer("REJECTED")} color="bright-sun.4" variant="light" fullWidth>Reject</Button>

                        </div>
                    </>
                }
            </div>
            {
                (props.invited || props.posted) && <Button color="bright-sun.4" onClick={openApp} autoContrast variant="filled" fullWidth>View Application</Button>

            }


            {/* Interview Schedule modal */}
            <Modal opened={opened} onClose={close} title="Schedule Interview" centered>
                {/* Modal content */}
                <div className="flex flex-col gap-4">
                    <DateInput minDate={new Date()} value={date as unknown as string} onChange={(val: any) => setDate(val)} label="Date" placeholder="Enter date" />
                    <TimeInput value={time} onChange={(e) => setTime(e.currentTarget.value)} label="Time" ref={ref} onClick={() => ref.current?.showPicker()} />
                    <Button onClick={() => handleOffer("INTERVIEWING")} color="bright-sun.4" variant="light" fullWidth>Schedule</Button>
                </div>
            </Modal>


            {/* Application modal */}
            <Modal opened={app} onClose={closeApp} title="Application" centered>
                <div className="flex flex-col gap-4" >
                    <div>
                        Email : &emsp; <a className="text-bright-sun-400 hover:underline cursor-pointer text-center" href={`mailto:${props.email}`} >{props.email}</a>
                    </div>
                    <div>
                        Website : &emsp; <a rel="noreferrer" target="_blank" className="text-bright-sun-400 hover:underline cursor-pointer text-center" href={props.website}   >{props.website}</a>
                    </div>
                    <div>
                        Resume : &emsp; <span onClick={() => openBase64PDF(props.resume)} className="text-bright-sun-400 hover:underline cursor-pointer text-center" >{props.name}</span>
                    </div>
                    <div>
                        Cover Letter : &emsp; <div  >{props.coverLetter}</div>
                    </div>

                </div>
            </Modal>
        </div>
    )
};

export default TalentCards
