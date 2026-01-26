import { Avatar, Rating } from "@mantine/core"
import { testimonials } from "../../Data/Data"

const Testimonials = () => {
    return (
        <div className="mt-20 pb-5 p-5" >
            <div className="text-4xl md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl mb-3 text-center font-bold text-mine-shaft-100 [&>span]:text-bright-sun-400">What <span>Users</span> says about us?</div>

            <div className="flex justify-evenly gap-5 md-mx:flex-wrap mt-10">
                {
                    testimonials.map((testi, idx) => (
                        <div key={idx} className="flex flex-col gap-3 w-[23%] md-mx:w-[48%] xs-mx:w-full border border-bright-sun-400 p-3 rounded-lg ">
                            <div className="flex gap-2 items-center">
                                <Avatar className="!h-14  !w-14" src='avatar.png' alt='Girl' />
                                <div>
                                    <div className="text-lg sm-mx:text-base xs-mx:text-sm text-mine-shaft-100 font-semibold">{testi.name}</div>
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
