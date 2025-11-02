import { IconAnchor, IconBrandFacebook, IconBrandInstagram, IconBrandX } from "@tabler/icons-react"
import { footerLinks } from "../Data/Data"
import { useLocation } from "react-router-dom";

const Footer = () => {
    const location = useLocation();
    return location.pathname !== "/signup" && location.pathname!== "/login" ? (
        <div className="pt-20 pb-5 flex gap-5 bg-mine-shaft-950 font-[Nunito] justify-around">
            <div className="w-1/4 flex flex-col gap-4">
                <div className="flex gap-1 items-center text-bright-sun-400 cursor-pointer ">
                    <IconAnchor className="h-6 w-6" stroke={2.5} />
                    <div className="text-xl font-extrabold"> Job Hunt  </div>
                </div>
                <div className="text-sm text-mine-shaft-300">Job portal with user profiles, skills updates, certifications, work experience and admin job postings.</div>
                <div className="flex gap-3 text-bright-sun-400 [&>div]:bg-mine-shaft-900 [&>div]:p-2 [&>div]:rounded-full [&>div]:cursor-pointer hover:[&>div]:bg-mine-shaft-700 ">
                    <div><IconBrandFacebook /></div>
                    <div><IconBrandInstagram /></div>
                    <div><IconBrandX /></div>
                </div>
            </div>

            {
                footerLinks.map((itm, idx) => (
                    <div key={idx}>
                        <div className="text-lg font-semibold mb-2 text-bright-sun-400">{itm.title}</div>
                        {
                            itm.links.map((link, index) => (
                                <div key={index} className="text-mine-shaft-300 text-sm mb-1 hover:text-bright-sun-400 cursor-pointer hover:translate-x-2 transition duration-300 ease-in-out">
                                    {link}
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    ) : <></>
}

export default Footer
