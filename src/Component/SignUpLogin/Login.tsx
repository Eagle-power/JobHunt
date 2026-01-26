import { Button, PasswordInput, TextInput } from "@mantine/core"
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { loginValidation } from "../../Services/FormValidation"
import { notifications } from "@mantine/notifications"
import { useDisclosure } from "@mantine/hooks"
import ResetPassword from "./ResetPassword"
import { useDispatch } from "react-redux"
import { setUser } from "../../Slices/UserSlice"
import { setJwt } from "../../Slices/JwtSlice"
import { loginUser } from "../../Services/AuthService"
import { jwtDecode } from "jwt-decode"

const form = { email: "", password: "" }

const Login = ({ loading, setLoading }: { loading: boolean; setLoading: (v: boolean) => void; }) => {
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
            if (newFormError[key]) valid = false;
        }
        setFormError(newFormError);
        if (valid) {
            loginUser(data).then((res) => {
                notifications.show({
                    title: "Login Successfully",
                    message: "Redirecting to Home page...",
                    icon: <IconCheck style={{ width: "90%", height: "90%" }} />,
                    color: "teal",
                    className: "!border-green-500"
                })
                dispatch(setJwt(res.jwt))
                const decoded: any = jwtDecode(res.jwt);
                dispatch(setUser({ ...decoded, email: decoded.sub }))
                setTimeout(() => {
                    setLoading(false);
                    navigate("/");
                }, 4000)
            }).catch((err) => {
                setLoading(false);
                notifications.show({
                    title: "Login Failed",
                    message: err.response?.data?.errorMessage || "An error occurred",
                    icon: <IconX style={{ width: "90%", height: "90%" }} />,
                    color: "red",
                    className: "!border-red-500"
                })
            })
        } else {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="w-full h-full px-10 bs:px-20 flex flex-col justify-center gap-3 [&_label]:!text-xl">
                <div className="text-2xl font-semibold">Login to your Account</div>
                <TextInput value={data.email} name="email" error={formError.email} onChange={handleChange} size="md" leftSection={<IconAt size={16} />} label="Email" placeholder="Enter Your email" withAsterisk />
                <PasswordInput value={data.password} name="password" error={formError.password} onChange={handleChange} size="md" leftSection={<IconLock size={18} stroke={1.5} />} label="Password" withAsterisk placeholder="Enter your password" />
                <Button loading={loading} onClick={handleSubmit} autoContrast size="xl" className="!rounded-xl" variant="filled">Login</Button>
                <div className="mx-auto text-xl">Don't have an account? <span onClick={() => navigate("/signup")} className="text-bright-sun-400 hover:underline cursor-pointer">Sign up</span></div>
                <div onClick={open} className="text-bright-sun-400 hover:underline cursor-pointer text-center">Forget Password ?</div>
            </div>
            <ResetPassword opened={opened} close={close} />
        </>
    )
}

export default Login