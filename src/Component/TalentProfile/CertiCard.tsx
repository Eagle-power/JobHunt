import { formateDate } from "../../Services/Utilities";

const CertiCard = (props:any) => {
    return (
        // top section
        < div className="flex justify-between sm-mx:flex-wrap gap-2" >
            <div className="flex gap-2 items-center">
                <div className="p-2 bg-mine-shaft-800 rounded-md shrink-0">
                    <img className="h-7" src={`/Icons/${props.issuer}.png`} alt={props.issuer} />
                </div>
                <div className="flex flex-col">
                    <div className="font-semibold xs-mx:text-xs">{props.name}</div>
                    <div className="text-sm text-mine-shaft-300 xs-mx:text-xs">{props.issuer}</div>
                </div>
            </div>

            <div className="flex flex-col sm-mx:flex-row sm-mx:gap-2 items-end">
                <div className="text-sm xs-mx:text-xs text-mine-shaft-300">Isssue: {formateDate(props.issueDate )}</div>
                <div className="text-sm xs-mx:text-xs text-mine-shaft-300">ID: {props.certificateId}</div>
            </div>
        </div >
    )
}

export default CertiCard;
