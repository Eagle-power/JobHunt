import { Avatar, Button, Divider, Modal, Text } from "@mantine/core"
import { DateInput, TimeInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendarMonth, IconHeart, IconMapPin } from "@tabler/icons-react"
import { useRef, useState } from "react";
import { Link } from "react-router-dom"

const TalentCards = (props: any) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [value, setValue] = useState<string | null>(null);
    const ref = useRef<HTMLInputElement>(null);
    return (
        <div className="bg-mine-shaft-900 p-4 w-96 flex  flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_black] !shadow-bright-sun-200 transition duration-300 ease-in-out">
            {/* Top section */}
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <div className="p-2 bg-mine-shaft-800 rounded-full">
                        <Avatar size="lg" src={`/${props.image}.png`} alt="" />
                    </div>
                    <div>
                        <div className="font-semibold text-lg">{props.name}</div>
                        <div className="text-sm text-mine-shaft-300">{props.role} &#x2022; {props.company} </div>
                    </div>
                </div>
                <IconHeart className="text-mine-shaft-300 cursor-pointer" />
            </div>

            {/* Highlight section */}
            <div className="flex mt-2 gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800  [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
                {
                    props.topSkills?.map((skill: any, idx: any) => (
                        <div key={idx}>{skill}</div>
                    ))
                }
            </div>

            {/* Description section */}
            <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={2}>{props.about}</Text>
            <Divider size="sm" color="mine-shaft.7" />

            {/* Last section */}
            <div className="flex justify-between">
                <div className="font-bold text-mine-shaft-200">{props.expectedCtc}</div>
                <div className="flex gap-1 text-xs items-center"><IconMapPin className="h-5 w-5" stroke={1.5} />{props.location}</div>
            </div>
            <Divider size="sm" color="mine-shaft.7" />
            <div className="flex [&>*]:w-1/2 [&>*]:p-1">
                <Link to="/talent-profile">
                    <Button color="bright-sun.4" variant="outline" fullWidth>Profile</Button>
                </Link>
                <div>
                    {
                        props.posted ? <Button onClick={open} rightSection={<IconCalendarMonth className="w-5 h-5" />} color="bright-sun.4" variant="light" fullWidth>Schedule</Button> :
                            <Button color="bright-sun.4" variant="light" fullWidth>Message</Button>
                    }
                </div>
            </div>

            <Modal  opened={opened} onClose={close} title="Schedule Interview" centered>
                {/* Modal content */}
                <div className="flex flex-col gap-4">
                    <DateInput minDate={new Date()} value={value} onChange={setValue} label="Date" placeholder="Enter date" />
                    <TimeInput label="Time" ref={ref} onClick={() => ref.current?.showPicker()} />
                    <Button color="bright-sun.4" variant="light" fullWidth>Schedule</Button>
                </div>
            </Modal>
        </div>
    )
}

export default TalentCards
