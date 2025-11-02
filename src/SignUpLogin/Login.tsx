import { Button,   PasswordInput, TextInput } from "@mantine/core"
import { IconAt, IconLock } from "@tabler/icons-react"
import { Link } from "react-router-dom"

const Login = () => {
    return (
        <div className="w-full h-full px-40 flex flex-col justify-center gap-3 [&_label]:!text-xl">
            <div className="text-2xl font-semibold">Login to your Account</div> 
            <TextInput  size="md" leftSection={<IconAt size={16} />} label="Email" placeholder="Enter Your email" withAsterisk />
            <PasswordInput  size="md" leftSection={<IconLock size={18} stroke={1.5} />} label="Password" withAsterisk placeholder="Enter your password" />  
            <Button autoContrast size="xl" className="!rounded-xl" variant="filled">Login</Button>
            <div className="mx-auto text-xl">Don't have an account? <Link to="/signup" className="text-bright-sun-400 hover:underline">Sign up</Link></div>
        </div>
    )
}

export default Login
