import { Anchor, Button, Checkbox, Group, PasswordInput, Radio, TextInput } from "@mantine/core"
import { IconAt, IconLock, IconUserCircle } from "@tabler/icons-react"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { registerUser } from "../../Services/UserService";
import { signupValidation } from "../../Services/FormValidation";
import { errorNotification, successNotification } from "../../Services/NotificationService";

const form = { name: "", email: "", password: "", confirmPassword: "", accountType: "APPLICANT" }

const SignUp = ({ loading, setLoading }: { loading: boolean; setLoading: (v: boolean) => void; }) => {
    const [data, setData] = useState<{ [key: string]: string }>(form);
    const [formError, setFormError] = useState<{ [key: string]: string }>(form);
    const navigate = useNavigate();

    const handleChange = (event: any) => {
        if (typeof (event) === "string") {
            setData({ ...data, accountType: event });
            return;
        }
        let name = event.target.name, value = event.target.value;
        setData({ ...data, [name]: value })
        setFormError({ ...formError, [name]: signupValidation(name, value) })
    }

    const handleSubmit = () => {
        setLoading(true);
        let valid = true;
        let newFormError: { [key: string]: string } = {};

        for (let key in data) {
            if (key === "accountType") continue;
            newFormError[key] = signupValidation(key, data[key]);
            if (key === "confirmPassword" && data[key] !== data["password"]) newFormError[key] = "Password do not match.";
            if (newFormError[key]) valid = false;
        }
        setFormError(newFormError);

        if (valid) {
            registerUser(data).then(() => {
                successNotification("Registration Successfully", "Redirecting to Login page.")
                setTimeout(() => {
                    setLoading(false);
                    navigate("/login");
                }, 4000)
            }).catch((err) => {
                setLoading(false);
                errorNotification("Registration Failed", err.response.data.errorMessage)
            })
        } else {
            setLoading(false);
        }
    }

    return (
        <div className="w-full h-full px-10 bs:px-20 flex flex-col [&_label]:!text-lg bs:[&_label]:!text-xl justify-center gap-2 bs:gap-3">
            <div className="text-2xl font-semibold">Create Account</div>
            <TextInput value={data.name} name="name" onChange={handleChange} error={formError.name} leftSection={<IconUserCircle size={18} />} label="Full Name" size="md" placeholder="Enter Your name" withAsterisk />
            <TextInput value={data.email} name="email" onChange={handleChange} error={formError.email} leftSection={<IconAt size={16} />} label="Email" size="md" placeholder="Enter Your email" withAsterisk />
            <PasswordInput value={data.password} name="password" onChange={handleChange} error={formError.password} leftSection={<IconLock size={18} stroke={1.5} />} size="md" label="Password" withAsterisk placeholder="Enter your password" />
            <PasswordInput value={data.confirmPassword} name="confirmPassword" onChange={handleChange} error={formError.confirmPassword} leftSection={<IconLock size={18} stroke={1.5} />} size="md" label="Confirm Password" withAsterisk placeholder="Confirm your password" />

            <Radio.Group value={data.accountType} onChange={handleChange} label="I am creating account as ?" withAsterisk>
                <Group mt="xs" grow>
                    <Radio className="py-2 px-4 bs:py-4 bs:px-6 hover:bg-mine-shaft-900 border border-mine-shaft-800 rounded-lg has-[:checked]:border-bright-sun-400" value="APPLICANT" label="Applicant" />
                    <Radio className="py-2 px-4 bs:py-4 bs:px-6 hover:bg-mine-shaft-900 border border-mine-shaft-800 rounded-lg has-[:checked]:border-bright-sun-400" value="EMPLOYER" label="Employer" />
                </Group>
            </Radio.Group>

            <Checkbox autoContrast size="md" label={<>I accept <Anchor>Terms & conditions</Anchor></>} />
            <Button loading={loading} onClick={handleSubmit} autoContrast size="xl" className="text-xl !font-semibold !rounded-xl" variant="filled">Sign up</Button>
            <div className="mx-auto text-xl">Already Have an account? <span onClick={() => navigate("/login")} className="text-bright-sun-400 hover:underline cursor-pointer">Login</span></div>
        </div>
    )
}

export default SignUp;