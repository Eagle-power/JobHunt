import { IconSparkles } from "@tabler/icons-react";

const SUGGESTIONS = [
    "Am I a good fit for this role?",
    "What skills should I improve for this job?",
    "Suggest courses to fill my skill gaps",
    "Summarize my resume in 3 lines",
];

const ChatbotEmptyState = ({ onSelect }: { onSelect: (q: string) => void }) => {
    return (
        <div className="h-full flex flex-col items-center justify-center text-center px-6 text-mine-shaft-300">
            <IconSparkles size={32} className="mb-3 text-bright-sun-400" />

            <div className="text-base font-semibold text-white mb-1">
                AI Career Assistant
            </div>

            <div className="text-sm mb-4">
                I can help you understand your resume, check job fit,
                and plan your next career move.
            </div>

            <div className="w-full">
                <div className="text-xs mb-2 text-mine-shaft-400">
                    Try asking:
                </div>

                <div className="flex flex-col gap-2">
                    {SUGGESTIONS.map((q, i) => (
                        <button
                            key={i}
                            onClick={() => onSelect(q)}
                            className="text-left text-sm px-3 py-2 rounded-lg
                                       bg-mine-shaft-800 hover:bg-mine-shaft-700
                                       text-mine-shaft-200 transition"
                        >
                            {q}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChatbotEmptyState;
