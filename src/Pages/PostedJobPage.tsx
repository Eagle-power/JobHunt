import PostedJob from "../Component/PostedJob/PostedJob"
import PostedJobDesc from "../Component/PostedJob/PostedJobDesc"

 
const PostedJobPage = () => {
    return (
        <div className="min-h-[100vh] px-4 bg-mine-shaft-950 font-['Nunito']"> 

            {/* profile added */}
            <div className="flex gap-5">
                <PostedJob />
                <PostedJobDesc />
            </div>
        </div>
    )
}

export default PostedJobPage
