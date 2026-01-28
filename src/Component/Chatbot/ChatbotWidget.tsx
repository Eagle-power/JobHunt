import { ActionIcon } from "@mantine/core";
import { IconMessageCircle } from "@tabler/icons-react";
import { useState } from "react";
import ChatbotWindow from "./ChatbotWindow";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const ChatbotWidget = ({ jobId }: { jobId?: number }) => {
    const [opened, setOpened] = useState(false);
    const user = useSelector((state: any) => state.user);

    // hide chatbot immediately on logout
    if (!user || !user.email) return null;

    return (
        <>
            {/* Floating Button */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="fixed bottom-6 right-6 z-[999]"
            >
                <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <ActionIcon
                        size="xl"
                        radius="xl"
                        color="bright-sun.4"
                        variant="filled"
                        onClick={() => setOpened(true)}
                        className="shadow-lg hover:shadow-xl"
                    >
                        <IconMessageCircle size={28} />
                    </ActionIcon>
                </motion.div>
            </motion.div>

            {/* Chat Window */}
            <ChatbotWindow
                jobId={jobId}
                opened={opened}
                close={() => setOpened(false)}
            />
        </>
    );
};

export default ChatbotWidget;
