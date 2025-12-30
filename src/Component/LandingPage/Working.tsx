import { Avatar } from "@mantine/core"
import { work } from "../../Data/Data"

const Working = () => {
    return (
        <div className="mt-20 pb-5">
            <div className="text-4xl mb-3 text-center font-bold text-mine-shaft-100 [&>span]:text-bright-sun-400">How it <span>Works</span></div>
            <div className="text-lg mb-10 mx-auto text-mine-shaft-300 text-center w-1/2">Effortlessly navigate through the process  and land your dream job.</div>

            <div className="flex   px-16 justify-between items-center">
                <div className="relative">
                    <img className="w-[40rem]" src="/Working/Girl.png" alt="How it works" />
                    <div className="absolute  top-[20%] right-10 w-36 flex flex-col gap-1 items-center border border-bright-sun-400 py-3 px-1 rounded-lg backdrop-blur-md">
                        <Avatar className="!h-16 !w-16" src='avatar2.png' alt='Girl' />
                        <div className="text-sm font-semibold text-mine-shaft-200 text-center">Complete your profile</div>
                        <div className="text-xs text-mine-shaft-300">70% Completed</div>
                    </div>
                </div>
                <div className="flex flex-col  gap-10">

                    {
                        work.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 ">
                                <div className="p-3 bg-bright-sun-300  rounded-full">
                                    <img className="h-12  w-12" src={`/Working/${item.name}.png`} alt={item.name} />
                                </div>
                                <div>
                                    <div className="text-mine-shaft-200 text-xl font-semibold">{item.name}</div>
                                    <div className="text-mine-shaft-300">{item.desc}</div>
                                </div>
                            </div>
                        ))
                    }


                </div>
            </div>
        </div>
    )
}

export default Working
