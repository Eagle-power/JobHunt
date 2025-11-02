import { Anchor, Button, Checkbox, PasswordInput, TextInput } from "@mantine/core"
import { IconAt, IconLock, IconUserCircle } from "@tabler/icons-react"
import { Link } from "react-router-dom"

const SignUp = () => {
    return (
        <div className="w-full h-full px-40 flex flex-col [&_label]:!text-xl justify-center gap-3">
            <div className="text-2xl font-semibold ">Create Account</div>
            <TextInput leftSection={<IconUserCircle size={18} />} label="Full Name" size="md" placeholder="Enter Your name" withAsterisk />
            <TextInput leftSection={<IconAt size={16} />} label="Email" size="md" placeholder="Enter Your email" withAsterisk />
            <PasswordInput leftSection={<IconLock size={18} stroke={1.5} />} size="md" label="Password" withAsterisk placeholder="Enter your password" />
            <PasswordInput leftSection={<IconLock size={18} stroke={1.5} />} size="md" label="Confirm Password" withAsterisk placeholder="Confirm your password" />
            <Checkbox autoContrast size="md" label={<>I accept{' '}<Anchor>Terms & conditions</Anchor></>} />
            <Button autoContrast size="xl" className="text-xl !font-semibold !rounded-xl" variant="filled">Sign up</Button>
            <div className="mx-auto text-xl">Already Have an account? <Link to="/login" className="text-bright-sun-400 hover:underline">Login</Link></div>
        </div>
    )
}

export default SignUp
