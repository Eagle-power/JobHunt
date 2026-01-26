import Marquee from "react-fast-marquee"
import { companies } from "../../Data/Data" 

const Companies = () => {
    return (
        <div className="mt-20 pb-5">
            <div className="text-4xl md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl mb-8 text-center font-semibold text-mine-shaft-100 [&>span]:text-bright-sun-400">Trusted by <span>1000+</span> Companies</div>
             
            <Marquee pauseOnHover={true}>
                {
                    companies.map((company, index) => (
                        <div key={index} className="mx-8 sm-mx:mx-6 xs-mx:mx-4 xsm-mx:mx-2 px-2 py-1 hover:bg-mine-shaft-900 rounded-lg cursor-pointer" >
                            <img className="h-16" src={`/Companies/${company}.png`} alt={company} />
                        </div>
                    ))
                }
                 
            </Marquee>
        </div>
    )
}

export default Companies
