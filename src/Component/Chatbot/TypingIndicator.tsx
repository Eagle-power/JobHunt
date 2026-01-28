import { motion } from "framer-motion";

const TypingIndicator = () => {
    return (
        <div className="mb-3 flex justify-start">
            <div className="flex gap-2 px-4 py-3 bg-mine-shaft-800 rounded-2xl">
                {[0, 1, 2].map(i => (
                    <motion.span
                        key={i}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default TypingIndicator;
