// import { useEffect, useState } from "react"
// import Sort from "../FindJobs/Sort"
// import TalentCards from "./TalentCard"
// import { getAllProfiles } from "../../Services/ProfileService"
// import { useDispatch, useSelector } from "react-redux"
// import { resetFilter } from "../../Slices/FilterSlice"

// const Talents = () => {
//     const dispatch = useDispatch();
//     const [talent, setTalent] = useState<any>([])
//     const filter = useSelector((state: any) => state.filter)
//       const sort  = useSelector((state : any)=>state.sort)
//     const [filteredTalent, setFilteredTalent] = useState<any>([])

//     useEffect(() => {
//         dispatch(resetFilter())
//         getAllProfiles().then((res) => {
//             setTalent(res);
//         }).catch((err) => {
//             console.log(err)
//         })
//     }, [])

//     useEffect(() => {
//         if (sort === "Experience (Low to High)") {
//             setTalent([...talent].sort((a: any, b: any) => a.totalExp - b.totalExp));
//         }
//         else if (sort === "Experience (High to Low)") {
//             setTalent([...talent].sort((a: any, b: any) => b.totalExp - a.totalExp))
//         }
//         else {

//         }
//     }, [sort])

//     useEffect(() => {

//         let filterTalent = talent;
//         console.log(filter)

//         if (filter.name) {
//             filterTalent = filterTalent.filter((talent: any) =>
//                 talent.name.toLowerCase().includes(filter.name.toLowerCase()))
//         }

//         if (filter["Job Title"] && filter["Job Title"].length > 0) {
//             filterTalent = filterTalent.filter((talent: any) => filter["Job Title"]
//                 ?.some((title: any) => talent.jobTitle.toLowerCase().includes(title.toLowerCase())))
//         }

//         if (filter.Location && filter.Location.length > 0) {
//             filterTalent = filterTalent.filter((talent: any) => filter.Location?.some((location: any) => talent.location.toLowerCase().includes(location.toLowerCase())))
//         }


//         if (filter.Skills && filter.Skills.length > 0) {
//             filterTalent = filterTalent.filter((talent: any) => filter.Skills?.some((skills: any) => talent.skills?.some((talentSkill: any) =>
//                 talentSkill.toLowerCase().includes(skills.toLowerCase()))))
//         }

//         if (filter.exp && filter.exp.length > 0) {
//             filterTalent = filterTalent.filter((talent: any) => filter.exp[0] <= talent.totalExp && talent.totalExp <= filter.exp[1])
//         }

//         setFilteredTalent(filterTalent)
//     }, [filter, talent])

//     return (
//         <div className="p-5">
//             <div className="flex justify-between">
//                 <div className="text-2xl font-semibold">Talents</div>
//                 <Sort />
//             </div>

//             <div className="mt-10 flex flex-wrap  gap-5 justify-around">
//                 {
//                     filteredTalent.length ? filteredTalent.map((talent: any, index: any) => (
//                         <TalentCards key={index} {...talent} />
//                     )) : <div className="text-2xl font-semibold text-center">No Talents found</div>
//                 }
//             </div>
//         </div>
//     )
// }

// export default Talents



import { useEffect, useState } from "react";
import Sort from "../FindJobs/Sort";
import TalentCards from "./TalentCard";
import { getAllProfiles } from "../../Services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../../Slices/FilterSlice";

const Talents = () => {
    const dispatch = useDispatch();

    const [talent, setTalent] = useState<any[]>([]);
    const [filteredTalent, setFilteredTalent] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const filter = useSelector((state: any) => state.filter);
    const sort = useSelector((state: any) => state.sort);

    /* ------------------ FETCH ------------------ */
    useEffect(() => {
        dispatch(resetFilter());
        setLoading(true);

        getAllProfiles()
            .then((res) => setTalent(res))
            .catch(console.log)
            .finally(() => setLoading(false));
    }, []);

    /* ------------------ SORT ------------------ */
    useEffect(() => {
        if (sort === "Experience (Low to High)") {
            setTalent([...talent].sort((a, b) => a.totalExp - b.totalExp));
        } else if (sort === "Experience (High to Low)") {
            setTalent([...talent].sort((a, b) => b.totalExp - a.totalExp));
        }
    }, [sort]);

    /* ------------------ FILTER ------------------ */
    useEffect(() => {
        let result = talent;

        if (filter.name) {
            result = result.filter((t) =>
                t.name.toLowerCase().includes(filter.name.toLowerCase())
            );
        }

        if (filter["Job Title"]?.length) {
            result = result.filter((t) =>
                filter["Job Title"].some((j: any) =>
                    t.jobTitle?.toLowerCase().includes(j.toLowerCase())
                )
            );
        }

        if (filter.Location?.length) {
            result = result.filter((t) =>
                filter.Location.some((l: any) =>
                    t.location?.toLowerCase().includes(l.toLowerCase())
                )
            );
        }

        if (filter.Skills?.length) {
            result = result.filter((t) =>
                filter.Skills.some((s: any) =>
                    t.skills?.some((ts: any) =>
                        ts.toLowerCase().includes(s.toLowerCase())
                    )
                )
            );
        }

        if (filter.exp?.length) {
            result = result.filter(
                (t) =>
                    filter.exp[0] <= t.totalExp &&
                    t.totalExp <= filter.exp[1]
            );
        }

        setFilteredTalent(result);
    }, [filter, talent]);

    return (
        <div className="p-5">
            <div className="flex justify-between">
                <div className="text-2xl font-semibold">Talents</div>
                <Sort />
            </div>

            <div className="mt-10 flex flex-wrap gap-5 justify-around">
                {loading
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <TalentCards key={i} loading />
                    ))
                    : filteredTalent.length
                        ? filteredTalent.map((t, i) => (
                            <TalentCards key={i} {...t} />
                        ))
                        : (
                            <div className="text-2xl font-semibold text-center">
                                No Talents found
                            </div>
                        )}
            </div>
        </div>
    );
};

export default Talents;
