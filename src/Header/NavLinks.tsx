import { Link, useLocation } from "react-router-dom"

const NavLinks = () => {

    const links = [
        { name: "Find Jobs", url: "/find-jobs" },
        { name: "Find Talent", url: "/find-talent" },
        { name: "Upload Job", url: "/upload-job" },
        { name: "About us", url: "/about-us" },
    ]
    const location = useLocation();

    return (
        <div className="flex text-mine-shaft-300 gap-5 h-full items-center">
            {

                links.map((link, index) => (
                    <div className={`${location.pathname===link.url?"border-bright-sun-400 text-bright-sun-400" : "border-transparent"} border-t-[3px] h-full flex items-center`}>
                        <Link key={index} to={link.url} >{link.name}</Link>
                    </div>
                ))
            }
        </div>
    )
}

export default NavLinks
