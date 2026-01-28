import { Avatar, Button, Divider, FileInput, Overlay } from "@mantine/core"
import { useDispatch, useSelector } from "react-redux"
import Info from "./Info"
import { changeProfile } from "../../Slices/ProfileSlice"
import About from "./About"
import Skills from "./Skills"
import Experience from "./Experience"
import Certificate from "./Certificate"
import { useHover } from "@mantine/hooks"
import { IconEdit, IconFileText, IconTrash } from "@tabler/icons-react"
import { downloadResume, deleteResume } from "../../Services/ProfileService";
import { successNotification } from "../../Services/NotificationService"
import { getBase64 } from "../../Services/Utilities"

const Profile = (props: any) => {
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);
    const user = useSelector((state: any) => state.user);
    const { hovered, ref } = useHover();

    const handleFileChange = async (image: any) => {
        let picture: any = await getBase64(image);
        let updatedProfile = { ...profile, picture: picture.split(',')[1] }
        dispatch(changeProfile(updatedProfile));
        successNotification("Success", "Profile Photo Updated Successfully.");
    }


    const handleViewResume = async () => {
        await downloadResume(profile.id);
    };

    const handleDeleteResume = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete your resume?"
        );
        if (!confirmDelete) return;

        await deleteResume(profile.id);

        // update redux profile (same pattern as picture)
        dispatch(changeProfile({
            ...profile,
            resumeFileName: null,
            resumePdf: null
        }));

        successNotification("Success", "Resume deleted successfully.");
    };






    return (
        <div className="w-4/5 lg-mx:w-full mx-auto">
            <div className="">
                {/* banner */}
                <div className="relative px-5">
                    <img className="rounded-t-2xl xs-mx:h-32" src="/Profile/banner.jpg" alt="" />

                    <div ref={ref} className="flex items-center justify-center  absolute -bottom-1/4 md-mx:-bottom-10 sm-mx:-bottom-16 left-6">
                        <Avatar className="!h-48  !w-48 md-mx:!w-40 md-mx:!h-40 
                                            sm-mx:!h-36 sm-mx:!w-36 xs-mx:!h-32 xs-mx:!w-32 
                                        border-mine-shaft-950 border-8  rounded-full"
                            src={profile.picture ? `data:image/jpeg;base64,${profile.picture}` : "/Avatar.png"}
                            alt={user.name} />

                        {hovered && <Overlay className="!rounded-full" color="#000" backgroundOpacity={0.40} />}
                        {hovered && <IconEdit className="absolute z-[300] !h-16   !w-16 hover:cursor-pointer  " />}
                        {hovered &&
                            <FileInput
                                onChange={handleFileChange}
                                className="absolute   z-[301] [&_*]:!rounded-full h-full [&_*]:!h-full w-full [&_div]:text-transparent"
                                variant="transparent"
                                size="lg"
                                radius="xl"
                                accept="image/png,image/jpeg,image/jpg"
                            />
                        }
                    </div>

                </div>


                <Info />

                <Divider mx="xs" size="sm" my="xl" />

                <div className="px-5">
                    <div className="text-2xl font-semibold mb-3">Resume</div>

                    {profile.resumeFileName ? (
                        <div className="flex items-center justify-between bg-mine-shaft-900 rounded-xl p-4">
                            <div className="flex items-center gap-2 text-mine-shaft-100">
                                <IconFileText size={20} />
                                <span className="text-sm">
                                    {profile.resumeFileName}
                                </span>
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant="light"
                                    color="bright-sun.4"
                                    onClick={handleViewResume}
                                >
                                    View
                                </Button>

                                <Button
                                    size="sm"
                                    color="red"
                                    variant="light"
                                    onClick={handleDeleteResume}
                                >
                                    <IconTrash size={16} />
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-sm text-mine-shaft-400">
                            No resume uploaded
                        </div>
                    )}
                </div>


                <Divider mx="xs" size="sm" my="xl" />

                <About />

                <Divider mx="xs" size="sm" my="xl" />

                <Skills />

                <Divider mx="xs" size="sm" my="xl" />

                <Experience />

                <Divider mx="xs" size="sm" my="xl" />

                <Certificate />
            </div>
        </div>
    )
}

export default Profile
