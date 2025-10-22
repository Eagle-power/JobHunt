import { Button, TextInput } from "@mantine/core"

const Subscribe = () => {
    return (
        <div className="mt-20 pb-1 flex items-center bg-mine-shaft-900 mx-20 py-3 rounded-xl justify-around">
            <div className="text-4xl w-2/5   text-center font-bold text-mine-shaft-100 [&>span]:text-bright-sun-400">Never wants to miss any <span>Job News ?</span></div>

            <div className="flex gap-4 bg-mine-shaft-700 px-3 py-2 rounded-xl items-center">
                <TextInput
                    className="[&_input]:text-mine-shaft-100 font-semibold "
                    size="xl"
                    variant="unstyled"
                    placeholder="your@email.com"
                />
                <Button className="!rounded-lg" color="bright-sun.4" size="lg" variant="filled">Subscribe</Button>;
            </div>
        </div>
    )
}

export default Subscribe
