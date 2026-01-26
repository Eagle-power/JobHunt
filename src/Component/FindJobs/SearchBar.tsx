import { Button, Collapse, Divider, RangeSlider } from "@mantine/core"
import { dropdownData } from "../../Data/JobsData"
import MultiInput from "./MultiInput"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateFilter } from "../../Slices/FilterSlice"
import { useDisclosure, useMediaQuery } from "@mantine/hooks"


const SearchBar = () => {
    const [opened, { toggle }] = useDisclosure(false);
    const dispatch = useDispatch();
    const [value, setValue] = useState<[number, number]>([0, 300])
    const matches = useMediaQuery('(max-width: 475px)');


    const handleChange = (event: any) => {

        dispatch(updateFilter({ salary: event }))


    }
    return (
        <div>
            <div className="flex justify-end">
                {
                    matches && <Button onClick={toggle} m='sm' radius='lg' variant="outline" color="bright-sun.4">{opened ?  "Filters":"Close" }</Button>

                }
            </div>
            <Collapse in={!(opened || !matches)} transitionDuration={500} transitionTimingFunction="linear">
                <div className="flex px-5 py-8 lg-mx:!flex-wrap">

                    {
                        dropdownData.map((item, idx) => (
                            <>
                                <div key={idx} className="lg-mx:w-1/4 bs-mx:w-[30%] xs-mx:w-full sm-mx:w-[48%] xs-mx:mb-1">
                                    <MultiInput {...item} />
                                </div>
                                <Divider className="sm-mx:hidden" mr="xs" size="sm" orientation="vertical" />
                            </>
                        ))
                    }
                    <div className="w-1/5 lg-mx:mt-7  bs-mx:w-[30%] sm-mx:w-[48%] lg-mx:w-1/4 xs-mx:w-full xs-mx:mb-1 [&_.mantine-Slider-label]:!translate-y-11">
                        <div className="flex justify-between text-sm">
                            <div>Salary</div>
                            <div>&#8377; {value[0]} LPA - &#8377; {value[1]}  LPA</div>
                        </div>
                        <RangeSlider size="xs" color="bright-sun.4" onChangeEnd={handleChange} value={value} onChange={setValue}
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
