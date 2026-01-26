import { Button, TextInput } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"

const Subscribe = () => {

    const matches  = useMediaQuery('(max-width: 639px') ;
    const matches1  = useMediaQuery('(max-width: 475px') ;

    return (
        <div className="mt-20 pb-1 flex flex-wrap items-center bg-mine-shaft-900 mx-20 sm-mx:mx-5 py-3 rounded-xl justify-around">
            <div className="text-4xl md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl w-2/5 bs-mx:w-4/5  text-center font-bold text-mine-shaft-100 [&>span]:text-bright-sun-400">Never wants to miss any <span>Job News ?</span></div>

            <div className="flex xs-mx:flex-col xs:items-center gap-4 bg-mine-shaft-700 px-3 py-2 rounded-xl  items-center">
                <TextInput
                    className="[&_input]:text-mine-shaft-100 font-semibold "
                    size={matches1 ? "sm" : matches ? "md" : "xl"}
                    variant="unstyled"
                    placeholder="your@email.com"
                />
                <Button className="!rounded-lg" color="bright-sun.4" size={matches1 ? "sm" : matches ? "md" : "xl"} variant="filled">Subscribe</Button>
            </div>
        </div>
    )
}

export default Subscribe
