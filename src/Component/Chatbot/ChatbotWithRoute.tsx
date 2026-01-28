import { useMatch } from "react-router-dom";
import ChatbotWidget from "./ChatbotWidget";

const ChatbotWithRoute = () => {
    const jobMatch = useMatch("/jobs/:id");

    const jobId = jobMatch?.params?.id
        ? Number(jobMatch.params.id)
        : undefined;

    return <ChatbotWidget jobId={jobId} />;
};

export default ChatbotWithRoute;
