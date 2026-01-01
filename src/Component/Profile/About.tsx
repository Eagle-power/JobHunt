import { ActionIcon, Textarea } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/NotificationService";


const About = () => {

    const  dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const profile = useSelector((state: any) => state.profile);
    const [about, setAbout] = useState("");

    const handleClick = () => {
        if (!edit) {
            setEdit(true);
            setAbout(profile.about);
        } else {
            setEdit(false);

        }
    }

    const handleSave = () => {
        setEdit(false);
        let updatedProfile = { ...profile, about:about};
        dispatch(changeProfile(updatedProfile));
        successNotification("Success", "About Updated Successfully.")
        
    }

    return (
        <div className="px-3">
            <div className="flex justify-between text-2xl font-semibold mb-3">About
                <div>
                    {
                        edit && <ActionIcon onClick={handleSave} size="lg" variant="subtle" color={edit ? "green.8" : "bright-sun.4"}  >
                            <IconCheck className="h-4/5 w-4/5" />

                        </ActionIcon>
                    }

                    <ActionIcon onClick={handleClick} size="lg" variant="subtle" color={edit ? "red.8" : "bright-sun.4"}  >
                        {
                            edit ? <IconX className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />
                        }
                    </ActionIcon>
                </div>
            </div>
            {
                edit ?
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
                            {profile?.about}
                        </div>
                    </>
            }


        </div>
    )
}

export default About;