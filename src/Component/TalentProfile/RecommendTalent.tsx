import { useParams } from "react-router-dom" 
import TalentCards from "../FindTalent/TalentCard"

const RecommendTalent = (props:any) => {
  const {id} = useParams();
  return (
    <div>
      <div className="text-xl font-semibold mb-5">Recommended Talent</div>
      <div className="flex  flex-col flex-wrap gap-5 ">
        {
            props?.talents?.map((talent : any, index : number) =>index<4 && id != talent.id &&<TalentCards key={index} {...talent} />)
        }
      </div>
    </div>
  )
}

export default RecommendTalent
