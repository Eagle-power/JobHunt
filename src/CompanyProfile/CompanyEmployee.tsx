import { talents } from "../Data/TalentData"
import TalentCards from "../FindTalent/TalentCard"

const CompanyEmployee = () => {
    return (
        <div className="mt-10 flex flex-wrap  gap-10  ">
            {
                talents.map((talent, index) => index < 6 && (
                    <TalentCards key={index} {...talent} />
                ))
            }
        </div>
    )
}

export default CompanyEmployee
