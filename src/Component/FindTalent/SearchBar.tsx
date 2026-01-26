import { Button, Collapse, Divider, Input, RangeSlider } from "@mantine/core"
import React, { useState } from "react"
import MultiInput from "../FindJobs/MultiInput"
import { searchFields } from "../../Data/TalentData"
import { IconUserCircle } from "@tabler/icons-react"
import { useDispatch } from "react-redux"
import { updateFilter } from "../../Slices/FilterSlice"
import { useDisclosure, useMediaQuery } from "@mantine/hooks"


const SearchBar = () => {
    const [opened, { toggle }] = useDisclosure(false);
    const matches = useMediaQuery('(max-width: 475px)');

    const dispatch = useDispatch();
    const [value, setValue] = useState<[number, number]>([0, 50])
    const [name, setName] = useState('');


    const handleChange = (name: any, event: any) => {
        if (name === "exp") {
            dispatch(updateFilter({ exp: event }))
        } else {
            setName(event.currentTarget.value);
            dispatch(updateFilter({ name: event.currentTarget.value }))
        }
    }

    return (
        <div>
            <div className="flex justify-end">
                {
                    matches && <Button onClick={toggle} m='sm' radius='lg' variant="outline" color="bright-sun.4">{opened ? "Filters" : "Close"}</Button>

                }
            </div>
            <Collapse in={!(opened || !matches)} transitionDuration={500} transitionTimingFunction="linear">

                <div className="flex px-5 py-8 lg-mx:!flex-wrap">
                    <div className="flex lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] items-center xs-mx:w-full xs-mx:mb-1">
                        <div className="text-bright-sun-400 bg-mine-shaft-900 rounded-full p-1 mr-2"><IconUserCircle size={20} /></div>
                        <Input defaultValue={name} onChange={(e) => handleChange("name", e)} className="[&_input]:!placeholder-mine-shaft-300" variant="unstyled" placeholder="Talent Name" />
                    </div>

                    {
                        searchFields.map((item, idx) => {
                            return <React.Fragment key={idx}>
                                <div key={idx} className="w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full">
                                    <MultiInput {...item} />
                                </div>
                                <Divider className="sm-mx:hidden" mr="xs" size="sm" orientation="vertical" />
                            </React.Fragment>
                        })
                    }
                    <div className="w-1/5 lg-mx:mt-7  bs-mx:w-[30%] sm-mx:w-[48%] lg-mx:w-1/4 xs-mx:w-full xs-mx:mb-1 [&_.mantine-Slider-label]:!translate-y-11">
                        <div className="flex justify-between text-sm">
                            <div>Experience (Years)</div>
                            <div> {value[0]} years  -  {value[1]} years  </div>
                        </div>
                        <RangeSlider size="xs" min={1} max={50} color="bright-sun.4" value={value} onChange={setValue}
                            onChangeEnd={(e) => handleChange("exp", e)}
                            minRange={1}
                            labelTransitionProps={{
                                transition: 'skew-down',
                                duration: 150,
                                timingFunction: 'linear',
                            }}
                        />
                    </div>
                </div>
            </Collapse>
        </div>
    )
}

export default SearchBar
