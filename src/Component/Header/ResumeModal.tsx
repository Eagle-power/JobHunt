import { Modal, Button, Group, Text, FileInput } from "@mantine/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
    uploadResume,
    downloadResume,
    deleteResume
} from "../../Services/ProfileService";

const ResumeModal = ({ opened, close }: any) => {
    const profile = useSelector((state: any) => state.profile);

    const [file, setFile] = useState<File | null>(null);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [viewLoading, setViewLoading] = useState(false);

    // 🔹 Upload / Replace Resume
    const handleUpload = async () => {
        if (!file) return;

        if (file.type !== "application/pdf") {
            alert("Only PDF files are allowed");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Resume must be under 5MB");
            return;
        }

        try {
            setUploadLoading(true);
            await uploadResume(profile.id, file);
            alert("Resume uploaded successfully");
            setFile(null);
        } catch (err) {
            alert("Resume upload failed");
        } finally {
            setUploadLoading(false); // ✅ reset BEFORE closing
            close();
        }
    };

    // 🔹 View Resume
    const handleView = async () => {
        try {
            setViewLoading(true);
            await downloadResume(profile.id);
        } finally {
            setViewLoading(false);
        }
    };

    // 🔹 Delete Resume
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete the resume?");
        if (!confirmDelete) return;

        try {
            setUploadLoading(true);
            await deleteResume(profile.id);
            alert("Resume deleted");
        } catch (err) {
            alert("Failed to delete resume");
        } finally {
            setUploadLoading(false);
            close();
        }
    };

    return (
        <Modal opened={opened} onClose={close} title="Resume" centered>
            <Text size="sm" mb="xs">
                {profile.resumeFileName ? "Resume uploaded" : "No resume uploaded"}
            </Text>

            {profile.resumeFileName && (
                <Text size="xs" c="dimmed" mb="md">
                    Current resume: {profile.resumeFileName}
                </Text>
            )}

            <FileInput
                accept="application/pdf"
                placeholder="Upload resume (PDF)"
                value={file}
                onChange={setFile}
                disabled={uploadLoading || viewLoading}
            />

            <Group mt="md">
                <Button
                    onClick={handleUpload}
                    loading={uploadLoading}
                    disabled={uploadLoading || viewLoading}
                >
                    Upload / Replace
                </Button>

                {profile.resumeFileName && (
                    <>
                        <Button
                            variant="outline"
                            loading={viewLoading}
                            disabled={uploadLoading || viewLoading}
                            onClick={handleView}
                        >
                            View
                        </Button>

                        <Button
                            color="red"
                            onClick={handleDelete}
                            disabled={uploadLoading || viewLoading}
                        >
                            Delete
                        </Button>
                    </>
                )}
            </Group>
        </Modal>
    );
};

export default ResumeModal;
