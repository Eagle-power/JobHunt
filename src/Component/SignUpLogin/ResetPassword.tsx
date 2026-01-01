import { Button, Modal, PasswordInput, PinInput, TextInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { changePass, sendOtp, verifyOtp } from "../../Services/UserService";
import { signupValidation } from "../../Services/FormValidation";
import { errorNotification, successNotification } from "../../Services/NotificationService";
import { useInterval } from "@mantine/hooks";

const ResetPassword = (props: any) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passErr, setPassErr] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpSending, setOtpSending] = useState(false);
    const [verified, setVerified] = useState(false);
    const [resentLoader, setResendLoader] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const interval = useInterval(() => {
        if(seconds === 0){
            setResendLoader(false);
            setSeconds(60);
            interval.stop();
        }else{
            setSeconds((s) => s - 1)
        }
    }, 1000
    );


    const handleSendOtp = () => {
        setOtpSending(true);
        sendOtp(email).then((res) => {
            console.log(res)
            successNotification("OTP Sent Successfully.", "Enter OTP to reset.")
            setOtpSent(true);
            setOtpSending(false);
            setResendLoader(true);
            interval.start();
        }).catch((err) => {
            console.log(err)
            setOtpSending(false);
            errorNotification("OTP Sending failed.", err.response.data.errorMessage);
        })
    }

    const handleVerifyOtp = (otp: string) => {
        verifyOtp(email, otp)
            .then((res) => {
                console.log(res)
                successNotification("OTP Verified", "Enter new password.")
                setVerified(true)
            }).catch((err) => {
                console.log(err)
                errorNotification("OTP verification failed.", err.response.data.errorMessage)
            })
    }

    const resendOtp = () => {
        if(resentLoader)return;
        handleSendOtp();
        successNotification("OTP resend.", "Please check your email")
    }

    const changeEmail = () => {
        setOtpSent(false);
        setResendLoader(false);
        setSeconds(60);
        setVerified(false);
        interval.stop();
    }

    const handleResetPassword = () => {
        changePass(email, password).then((res) => {
            console.log(res)
            successNotification("Password Changed successfully", "Login with new password")
            props.close();
        }).catch((err) => {
            console.log(err)
            errorNotification("Password reset failed", err.response.data.errorMessage)
        })
    }

    return (
        <Modal opened={props.opened} onClose={props.close} title="Reset Password">
            <div className="flex flex-col gap-6">
                <TextInput value={email} name="email" onChange={(e) => setEmail(e.target.value)} size="md"
                    leftSection={<IconAt size={16} />}
                    rightSection={<Button onClick={handleSendOtp}
                        autoContrast
                        loading={otpSending && !otpSent}
                        size="xs"
                        className="mr-1"
                        disabled={email === "" || otpSent}
                        variant="filled">Login
                    </Button>}
                    rightSectionWidth="xl"
                    label="Email"
                    placeholder="Enter Your email"
                    withAsterisk
                />
                {
                    otpSent && <PinInput onComplete={handleVerifyOtp} className="mx-auto" size="md" gap="lg" length={6} type="number" />
                }

                {
                    otpSent && !verified && <div className="flex gap-2">
                        <Button onClick={resendOtp}
                            autoContrast
                            fullWidth
                            color="brightSun.4"
                            loading={otpSending}
                            variant="light">{resentLoader ? seconds : "Resend"}
                        </Button>

                        <Button onClick={changeEmail}
                            autoContrast
                            fullWidth
                            loading={otpSending}
                            variant="filled">Change Email
                        </Button>
                    </div>
                }

                {
                    verified && <PasswordInput value={password} name="password" error={passErr} onChange={(e) => { setPassword(e.target.value); setPassErr(signupValidation("password", e.target.value)) }} size="md" leftSection={<IconLock size={18} stroke={1.5} />} label="Password" withAsterisk placeholder="Enter your password" />

                }

                {
                    verified && <Button onClick={handleResetPassword}
                        autoContrast
                        fullWidth
                        variant="filled">Change Password
                    </Button>
                }

            </div>
        </Modal>
    )
}

export default ResetPassword;