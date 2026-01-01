import { ActionIcon } from "@mantine/core";
import { IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ExpInput from "./ExpInput";
import ExpCard from "./ExpCard";

const Experience = () => {

        const  profile = useSelector((state : any)=>state.profile);
    
        const [edit, setEdit] = useState(false);
        const [addExp ,setAddExp] = useState(false);

        const  handleClick =()=>{
            setEdit(!edit);
        }

    return (
        <div className="px-3">
            <div className="flex justify-between text-2xl font-semibold mb-5">Experience
                <div className="flex gap-3">
                    <ActionIcon onClick={() => setAddExp(true)} size="lg" variant="subtle" color="bright-sun.4"  >
                        <IconPlus className="h-4/5 w-4/5" />
                    </ActionIcon>

                    <ActionIcon onClick={ handleClick } size="lg" variant="subtle" color={edit ? "red.8" :"bright-sun.4"}  >
                        {
                            edit ? <IconX className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />
                        }
                    </ActionIcon>
                </div>
            </div>
            <div className="flex flex-col gap-8">
                {
                    profile?.experiences?.map((exp: any, idx: number) => <ExpCard key={idx} index={idx} {...exp} edit={edit} />)
                }
                {
                    addExp && <ExpInput add setEdit={setAddExp} />
                }

            </div>

        </div>
    )
}

export default Experience;