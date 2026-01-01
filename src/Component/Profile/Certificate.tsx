import { ActionIcon } from "@mantine/core";
import { IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import CertiCard from "./CertiCard";
import CertiInput from "./CertiInput";

const Certificate = () => {

    const profile = useSelector((state: any) => state.profile);
    const [edit, setEdit] = useState(false);
    const [addCerti, setAddCerti] = useState(false);

    const handleClick =() =>{
        setEdit(!edit);
    }


    return (
        <div className="px-3">
            <div className="flex justify-between text-2xl font-semibold mb-5">Certification
                <div className="flex gap-3">
                    <ActionIcon onClick={() => setAddCerti(true)} size="lg" variant="subtle" color="bright-sun.4"  >
                        <IconPlus className="h-4/5 w-4/5" />
                    </ActionIcon>

                    <ActionIcon onClick={handleClick} size="lg" variant="subtle" color={edit ? "red.8" : "bright-sun.4"}  >
                        {
                            edit ? <IconX className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />
                        }
                    </ActionIcon>
                </div>
            </div>
            <div className="flex flex-col gap-8">
                {
                    profile?.certifications?.map((certi: any, idx: number) => <CertiCard key={idx} edit={edit} idx={idx} {...certi} />)
                }
                {
                    addCerti && <CertiInput setEdit={setAddCerti} />
                }
            </div>
        </div>
    )
}

export default Certificate;