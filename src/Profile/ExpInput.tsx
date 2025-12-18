import { useState } from "react";
import fields from "../Data/Profile";
import SelectInput from "./SelectInput";
import { Button, Checkbox, Textarea } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";

const ExpInput = (props: any) => {
    const select = fields;
    const [desc, setDescription] = useState("");
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [checked, setChecked] = useState(false);
    return (
        <div className="flex flex-col gap-3" >
            <div className="text-lg  font-semibold">{props.add ? "Add" : "Edit"} Experience</div>
            <div className="flex  gap-10 [&>*]:w-1/2">
                <SelectInput {...select[0]} />
                <SelectInput {...select[1]} />
            </div>
            <SelectInput {...select[2]} />

            <Textarea
                withAsterisk
                label="Summary"
                value={desc}
                autosize
                placeholder="Enter Summary of your recent job..."
                minRows={3}
                onChange={(event) => setDescription(event.currentTarget.value)}
            />
            <div className="flex  gap-10 [&>*]:w-1/2">
                <MonthPickerInput
                    withAsterisk
                    label="Start date"
                    maxDate={endDate || undefined}
                    placeholder="Pick date"
                    value={startDate}
                    onChange={setStartDate}
                />
                <MonthPickerInput
                    withAsterisk
                    label="End date"
                    disabled={checked}
                    minDate={startDate || undefined}
                    maxDate={new Date()}
                    placeholder="Pick date"
                    value={endDate}
                    onChange={setEndDate}
                />
            </div>
            <Checkbox
                checked={checked}
                onChange={(event) => setChecked(event.currentTarget.checked)}
                autoContrast
                size="md"
                label="currently working here"
            />

            <div className="flex gap-5">
                <Button onClick={() => props.setEdit(false)} color="bright-sun.4" variant="outline" >Save</Button>
                <Button onClick={() => props.setEdit(false)} color="red.8" variant="light" >Cancel</Button>
            </div>
        </div>
    )
}

export default ExpInput;