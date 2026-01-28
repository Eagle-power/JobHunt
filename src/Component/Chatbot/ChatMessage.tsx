import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";

const ChatMessage = ({ role, text }: any) => {
    const isUser = role === "user";

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`mb-3 flex ${isUser ? "justify-end" : "justify-start"}`}
        >
            <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm prose prose-invert ${isUser
                        ? "bg-bright-sun-400 text-black rounded-br-none"
                        : "bg-mine-shaft-800 text-white rounded-bl-none"
                    }`}
            >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {text}
                </ReactMarkdown>
            </div>
        </motion.div>
    );
};

export default ChatMessage;
