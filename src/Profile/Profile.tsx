import { ActionIcon, Divider, TagsInput, Textarea } from "@mantine/core"
import { IconBriefcase, IconDeviceFloppy, IconMapPin, IconPencil, IconPlus } from "@tabler/icons-react"
import ExpCard from "./ExpCard"
import CertiCard from "./CertiCard"
import { useState } from "react"
import SelectInput from "./SelectInput"
import fields from "../Data/Profile"
import ExpInput from "./ExpInput"
import CertiInput from "./CertiInput"

const Profile = (props: any) => {
    const select = fields;
    const [edit, setEdit] = useState([false, false, false, false, false]);
    const [about, setAbout] = useState('Hello this is my About section....');
    const [skills, setSkills] = useState(["React", "SpringBoot", "MongoDB", "HTML", "CSS", "JavaScript", "Node.js", "Express", "MySQL", "Python", "Django", "Figma", "Sketch", "Docker", "AWS"]);
    const [addExp, setAddExp] = useState(false);
    const [addCerti, setAddCerti] = useState(false);


    const handleEdit = (index: number) => {
        const newEdit = [...edit];
        newEdit[index] = !newEdit[index];
        setEdit(newEdit);
    }
    return (

        <div className="w-4/5 mx-auto">
            <div className="relative">
                <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
                <img className="h-48  w-48 -bottom-1/4 left-3  border-mine-shaft-950 border-8  absolute rounded-full" src="/Avatar.png" alt="" />

            </div>
            <div className="px-3 mt-16">
                <div className="text-3xl font-semibold flex justify-between">{props.name}
                    <ActionIcon onClick={() => handleEdit(0)} size="lg" variant="subtle" color="bright-sun.4"  >
                        {
                            edit[0] ? <IconDeviceFloppy className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />
                        }
                    </ActionIcon>
                </div>

                {
                    edit[0] ?
                        <>
                            <div className="flex  gap-10 [&>*]:w-1/2">
                                <SelectInput {...select[0]} />
                                <SelectInput {...select[1]} />
                            </div>
                            <SelectInput {...select[2]} />
                        </> :
                        <>
                            <div className="text-xl flex gap-1 items-center"><IconBriefcase className="h-5 w-5" stroke={1.5} />{props.role}  &bull; {props.company}</div>
                            <div className="flex gap-1 text-lg items-center text-mine-shaft-300"><IconMapPin className="h-5 w-5" stroke={1.5} />{props.location}</div>

                        </>
                }
            </div>

            <Divider mx="xs" size="sm" my="xl" />

            <div className="px-3">
                <div className="flex justify-between text-2xl font-semibold mb-3">About
                    <ActionIcon onClick={() => handleEdit(1)} size="lg" variant="subtle" color="bright-sun.4"  >
                        {
                            edit[1] ? <IconDeviceFloppy className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />
                        }
                    </ActionIcon>
                </div>
                {
                    edit[1] ?
                        <>
                            <Textarea
                                value={about}
                                autosize
                                placeholder="Enter about yourself..."
                                minRows={3}
                                onChange={(event) => setAbout(event.currentTarget.value)}
                            />
                        </> :
                        <>
                            <div className="text-sm text-mine-shaft-300  text-justify">
                                {props.about}
                            </div>
                        </>
                }


            </div>

            <Divider mx="xs" size="sm" my="xl" />

            <div className="px-3">
                <div className="flex justify-between text-2xl font-semibold mb-3">Skills
                    <ActionIcon onClick={() => handleEdit(2)} size="lg" variant="subtle" color="bright-sun.4"  >
                        {
                            edit[2] ? <IconDeviceFloppy className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />
                        }
                    </ActionIcon>
                </div>

                {
                    edit[2] ? <TagsInput
                        value={skills}
                        onChange={setSkills}
                        placeholder="Add Skills"
                        splitChars={[',', ' ', '|']}
                    /> : <div className="flex flex-wrap gap-2">
                        {
                            skills?.map((skill: any, idx: any) => (
                                <div key={idx} className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1">{skill}</div>

                            ))
                        }
                    </div>
                }



            </div>

            <Divider mx="xs" size="sm" my="xl" />

            <div className="px-3">
                <div className="flex justify-between text-2xl font-semibold mb-5">Experience
                    <div className="flex gap-3">
                        <ActionIcon onClick={() => setAddExp(true)} size="lg" variant="subtle" color="bright-sun.4"  >
                            <IconPlus className="h-4/5 w-4/5" />
                        </ActionIcon>

                        <ActionIcon onClick={() => handleEdit(3)} size="lg" variant="subtle" color="bright-sun.4"  >
                            {
                                edit[3] ? <IconDeviceFloppy className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />
                            }
                        </ActionIcon>
                    </div>
                </div>
                <div className="flex flex-col gap-8">
                    {
                        props.experience.map((exp: any, idx: any) => <ExpCard key={idx} {...exp} edit={edit[3]} />)
                    }
                    {
                        addExp && <ExpInput add setEdit={setAddExp} />
                    }

                </div>

            </div>

            <Divider mx="xs" size="sm" my="xl" />

            <div className="px-3">
                <div className="flex justify-between text-2xl font-semibold mb-5">Certification
                    <div className="flex gap-3">
                        <ActionIcon onClick={() => setAddCerti(true)} size="lg" variant="subtle" color="bright-sun.4"  >
                            <IconPlus className="h-4/5 w-4/5" />
                        </ActionIcon>

                        <ActionIcon onClick={() => handleEdit(4)} size="lg" variant="subtle" color="bright-sun.4"  >
                            {
                                edit[4] ? <IconDeviceFloppy className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />
                            }
                        </ActionIcon>
                    </div>
                </div>
                <div className="flex flex-col gap-8">
                    {
                        props.certifications.map((certi: any, idx: any) => <CertiCard key={idx} edit={edit[4]} {...certi} />)
                    }
                    {
                       addCerti && <CertiInput setEdit={setAddCerti} />
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile
