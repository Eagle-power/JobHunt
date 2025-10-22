import { Avatar, Rating } from "@mantine/core"
import { testimonials } from "../Data/Data"

const Testimonials = () => {
    return (
        <div className="mt-20 pb-5" >
            <div className="text-4xl mb-3 text-center font-bold text-mine-shaft-100 [&>span]:text-bright-sun-400">What <span>Users</span> says about us?</div>

            <div className="flex justify-evenly">
                {
                    testimonials.map((testi, idx) => (
                        <div key={idx} className="flex flex-col gap-3 w-[23%] border border-bright-sun-400 p-3 rounded-lg mt-10">
                            <div className="flex gap-2 items-center">
                                <Avatar className="!h-14  !w-14" src='avatar.png' alt='Girl' />
                                <div>
                                    <div className="text-lg text-mine-shaft-100 font-semibold">{testi.name}</div>
                                    <Rating value={testi.rating} fractions={2} readOnly />
                                </div>
                            </div>
                            <div className="text-xs text-mine-shaft-300"> {testi.testimonial}  </div>
                        </div>
                    ))
                }
            </div> 
        </div >
    )
}

export default Testimonials
