import { Button, LoadingOverlay, PasswordInput, TextInput } from "@mantine/core"
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../Services/UserService"
import { useState } from "react"
import { loginValidation } from "../../Services/FormValidation"
import { notifications } from "@mantine/notifications"
import { useDisclosure } from "@mantine/hooks"
import ResetPassword from "./ResetPassword"
import { useDispatch } from "react-redux"
import { setUser } from "../../Slices/UserSlice"

const form = {
    email: "",
    password: "",

}
const Login = ({
    loading,
    setLoading,
}: {
    loading: boolean;
    setLoading: (v: boolean) => void;
}) => {
    const dispatch = useDispatch()
    const [data, setData] = useState<{ [key: string]: string }>(form);
    const [formError, setFormError] = useState<{ [key: string]: string }>(form);
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();


    const handleChange = (event: any) => {
        setFormError({ ...formError, [event.target.name]: "" })
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const handleSubmit = () => {
        setLoading(true);
        let valid = true;
        let newFormError: { [key: string]: string } = {};

        for (let key in data) {
            newFormError[key] = loginValidation(key, data[key]);
            if (newFormError[key]) {
                valid = false;
            }
        }
        setFormError(newFormError);
        if (valid) {
            loginUser(data).then((res) => {
                console.log(res)
                notifications.show({
                    title: "Login Successfully",
                    message: "Redirecting to Home page...",
                    withCloseButton: true,
                    icon: <IconCheck style={{ width: "90%", height: "90%" }} />,
                    color: "teal",
                    withBorder: true,
                    className: "!border-green-500"
                })
                setTimeout(() => {
                    setLoading(false);
                    dispatch(setUser(res))
                    navigate("/");
                }, 4000)
            }).catch((err) => {
                setLoading(false);
                console.log(err.response.data)
                notifications.show({
                    title: "Login Failed",
                    message: err.response.data.errorMessage,
                    withCloseButton: true,
                    icon: <IconX style={{ width: "90%", height: "90%" }} />,
                    color: "red",
                    withBorder: true,
                    className: "!border-red-500"
                })
            })
        }
    }


    return (
        <>
            <div className="w-full h-full px-40 flex flex-col justify-center gap-3 [&_label]:!text-xl">
                <div className="text-2xl font-semibold">Login to your Account</div>
                <TextInput value={data.email} name="email" error={formError.email} onChange={handleChange} size="md" leftSection={<IconAt size={16} />} label="Email" placeholder="Enter Your email" withAsterisk />
                <PasswordInput value={data.password} name="password" error={formError.password} onChange={handleChange} size="md" leftSection={<IconLock size={18} stroke={1.5} />} label="Password" withAsterisk placeholder="Enter your password" />
                <Button loading={loading} onClick={handleSubmit} autoContrast size="xl" className="!rounded-xl" variant="filled">Login</Button>
                <div className="mx-auto text-xl">Don't have an account? <span onClick={() => { navigate("/signup"); setData(form); setFormError(form) }} className="text-bright-sun-400 hover:underline cursor-pointer">Sign up</span></div>
                <div onClick={open} className="text-bright-sun-400 hover:underline cursor-pointer text-center">Forget Password ?</div>
            </div>
            <ResetPassword opened={opened} close={close} />
        </>
    )
}

export default Login
