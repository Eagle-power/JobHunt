import { Avatar,Divider, Tabs } from "@mantine/core"
import { IconMapPin } from "@tabler/icons-react" 
import Overview from "./Overview"
import CompanyJob from "./CompanyJob"
import CompanyEmployee from "./CompanyEmployee"

const Company = () => {
    return (
        <div className="w-3/4">
            <div className="relative">
                <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
                <img className="h-36  w-36 p-2  border-mine-shaft-950 border-8 -bottom-1/4 left-5  absolute rounded-3xl bg-mine-shaft-950" src="/Icons/Google.png" alt="" />

            </div>
            <div className="px-3 mt-16">
                <div className="text-3xl font-semibold flex justify-between">Google
                    <Avatar.Group>
                        <Avatar src="avatar.png" />
                        <Avatar src="avatar1.png" />
                        <Avatar src="avatar2.png" />
                        <Avatar>+10k</Avatar>
                    </Avatar.Group></div>
                <div className="flex gap-1 text-lg items-center text-mine-shaft-300"><IconMapPin className="h-5 w-5" stroke={1.5} />Rajkot</div>

            </div>
            <Divider mx="xs" size="sm" my="xl" />

            <div>
                <Tabs variant="outline" radius="lg" defaultValue="overview">
                    <Tabs.List className="[&_button]:text-lg mb-5 font-semibold [&_button[data-active='true']]:text-bright-sun-400">
                        <Tabs.Tab value="overview">Overview</Tabs.Tab>
                        <Tabs.Tab value="jobs">Jobs</Tabs.Tab>
                        <Tabs.Tab value="employees">Employees</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="overview"><Overview /></Tabs.Panel>
                    <Tabs.Panel value="jobs"><CompanyJob /></Tabs.Panel>
                    <Tabs.Panel value="employees"><CompanyEmployee /></Tabs.Panel>
                </Tabs>
            </div>
        </div>
    )
}

export default Company
