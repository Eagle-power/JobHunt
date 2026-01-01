import { Anchor, Button, Checkbox, Group, PasswordInput, Radio, TextInput } from "@mantine/core"
import { IconAt, IconCheck, IconLock, IconUserCircle, IconX } from "@tabler/icons-react"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../../Services/UserService";
import { signupValidation } from "../../Services/FormValidation";
import { notifications } from "@mantine/notifications";
import { errorNotification, successNotification } from "../../Services/NotificationService";

const form = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "APPLICANT"
}

type SignUpProps = {
    loading: boolean;
    setLoading: (v: boolean) => void;
};


const SignUp = ({ loading, setLoading }: SignUpProps) => {

    const [data, setData] = useState<{ [key: string]: string }>(form);
    const [formError, setFormError] = useState<{ [key: string]: string }>(form);
    const navigate = useNavigate();



    const handleChange = (event: any) => {
        if (typeof (event) == "string") {
            setData({ ...data, accountType: event });
            return;
        }

        let name = event.target.name, value = event.target.value;
        setData({ ...data, [name]: value })
        setFormError({ ...formError, [name]: signupValidation(name, value) })
        if (name === "password" && data.confirmPassword !== "") {
            let err = "";
            if (data.confirmPassword !== value) err = "Passwords do not match.";
            setFormError({ ...formError, [name]: signupValidation(name, value), confirmPassword: err })
        }
        if (name === "confirmPassword") {
            if (data.password !== value) setFormError({ ...formError, [name]: "Passwords do not match." })
            else setFormError({ ...formError, confirmPassword: "" });
        }
    }

    const handleSubmit = () => {
        setLoading(true);
        let valid = true;
        let newFormError: { [key: string]: string } = {};

        for (let key in data) {
            if (key === "accountType") continue;
            if (key !== "confirmPassword") newFormError[key] = signupValidation(key, data[key]);
            else if (data[key] !== data["password"]) newFormError[key] = "Password do not match.";
            if (newFormError[key]) valid = false;
        }
        setFormError(newFormError);

        if (!valid) {
            setLoading(false);
            return;
        }

        if (valid) {
            registerUser(data).then((res) => {
                console.log(res)
                setData(form);

                successNotification("Registration Successfully", "Redirecting to Login page.")
                setTimeout(() => {
                    setLoading(false);
                    navigate("/login");
                }, 4000)

            }).catch((err) => {
                setLoading(false);
                console.log(err)
                errorNotification("Registration Failed", err.response.data.errorMessage)
            })
        }

    }

    return (
        <div className="w-full h-full px-40 flex flex-col [&_label]:!text-xl justify-center gap-3">
            <div className="text-2xl font-semibold ">Create Account</div>
            <TextInput value={data.name} name="name" onChange={handleChange} error={formError.name} leftSection={<IconUserCircle size={18} />} label="Full Name" size="md" placeholder="Enter Your name" withAsterisk />
            <TextInput value={data.email} name="email" onChange={handleChange} error={formError.email} leftSection={<IconAt size={16} />} label="Email" size="md" placeholder="Enter Your email" withAsterisk />
            <PasswordInput value={data.password} name="password" onChange={handleChange} error={formError.password} leftSection={<IconLock size={18} stroke={1.5} />} size="md" label="Password" withAsterisk placeholder="Enter your password" />
            <PasswordInput value={data.confirmPassword} name="confirmPassword" onChange={handleChange} error={formError.confirmPassword} leftSection={<IconLock size={18} stroke={1.5} />} size="md" label="Confirm Password" withAsterisk placeholder="Confirm your password" />
            <Radio.Group
                value={data.accountType}
                onChange={handleChange}
                label="I am creating account as ?"

                withAsterisk
            >
                <Group mt="xs">
                    <Radio className="py-4 px-6 hover:bg-mine-shaft-900 border has-[:checked]:border-bright-sun-400 has-[:checked]:bg-bright-sun-400/5 border-mine-shaft-800 rounded-lg" autoContrast value="APPLICANT" label="Applicant" />
                    <Radio className="py-4 px-6 hover:bg-mine-shaft-900 border has-[:checked]:border-bright-sun-400 has-[:checked]:bg-bright-sun-400/5 border-mine-shaft-800 rounded-lg" autoContrast value="EMPLOYER" label="Employer" />

                </Group>
            </Radio.Group>
            <Checkbox autoContrast size="md" label={<>I accept{' '}<Anchor>Terms & conditions</Anchor></>} />
            <Button  loading={loading} onClick={handleSubmit} autoContrast size="xl" className="text-xl !font-semibold !rounded-xl" variant="filled">Sign up</Button>
            <div className="mx-auto text-xl">Already Have an account? <span onClick={() => { navigate("/login"); setData(form); setFormError(form) }} className="text-bright-sun-400 hover:underline cursor-pointer">Login</span></div>
        </div>
    )
}

export default SignUp
