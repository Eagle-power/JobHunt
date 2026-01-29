import { Divider } from "@mantine/core"
import SearchBar from "../Component/FindJobs/SearchBar"
import Jobs from "../Component/FindJobs/Jobs"
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";






const FindJobs = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const title = searchParams.get("title");
        const type = searchParams.get("type");

        if (title) {
            dispatch(updateFilter({ "Job Title": [title] }));
        }

        if (type) {
            dispatch(updateFilter({ "Job Type": [type] }));
        }
    }, [searchParams, dispatch]);

    return (
        <div className="min-h-[100vh] bg-mine-shaft-950 font-['Nunito']">

            <SearchBar />
            <Divider size="sm" mx="md" />
            <Jobs />
        </div>
    )
}

export default FindJobs
