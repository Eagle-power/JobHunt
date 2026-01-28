import { Modal, TextInput, Button, ScrollArea } from "@mantine/core";
import { useState } from "react";
import { useEffect, useRef } from "react";

import { useSelector } from "react-redux";
import { askChatbot } from "../../Services/ChatService";
import ChatMessage from "./ChatMessage";
import { motion, AnimatePresence } from "framer-motion";
import TypingIndicator from "./TypingIndicator";
import ChatbotEmptyState from "./ChatbotEmptyState";


const ChatbotWindow = ({ opened, close, jobId }: any) => {
    const profile = useSelector((state: any) => state.profile);

    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement | null>(null);


    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMsg = { role: "user", text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await askChatbot(
                profile.id,
                userMsg.text,
                jobId ? Number(jobId) : undefined
            );

            setMessages(prev => [
                ...prev,
                { role: "ai", text: res.reply }
            ]);
        } catch {
            setMessages(prev => [
                ...prev,
                { role: "ai", text: "Something went wrong. Please try again." }
            ]);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [messages, loading]);

    return (
        <AnimatePresence>
            {opened && (
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                >
                    <Modal
                        opened={opened}
                        onClose={close}
                        title="AI Career Assistant"
                        size="md"
                        centered
                    >
                        {jobId && (
                            <div className="mb-2 text-xs text-bright-sun-400 font-medium">
                                🔍 Job Match Mode enabled
                            </div>
                        )}

                        <ScrollArea h={350} mb="md">
                            {messages.length === 0 && !loading ? (
                                <ChatbotEmptyState onSelect={(q) => setInput(q)} />
                            ) : (
                                <>
                                    {messages.map((msg, idx) => (
                                        <ChatMessage key={idx} {...msg} />
                                    ))}

                                    {loading && <TypingIndicator />}

                                    <div ref={bottomRef} />
                                </>
                            )}
                        </ScrollArea>


                        <div className="flex gap-2">
                            <TextInput
                                placeholder={
                                    jobId
                                        ? "Ask about your fit for this job..."
                                        : "Ask about your resume..."
                                }
                                value={input}
                                onChange={(e) => setInput(e.currentTarget.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                className="flex-1"
                                disabled={loading}
                            />
                            <Button
                                loading={loading}
                                disabled={loading}
                                onClick={handleSend}
                            >
                                Send
                            </Button>
                        </div>
                    </Modal>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ChatbotWindow;
