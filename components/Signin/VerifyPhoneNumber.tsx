"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { Resolver, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import useAuthStore from "@/store/AuthStore";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { Input, Spinner } from "@nextui-org/react";
import {
  PhoneAuthCredential,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "@/firebase";
import { setCookie } from "cookies-next";
import { IconLeft } from "react-day-picker";
import { useTimer } from "react-timer-hook";
import useLoginSignupStore from "@/store/useLoginSignupStore";
import { useState } from "react";

interface FormValues {
  otp: number | null;
}

const schema = yup.object().shape({
  otp: yup
    .number()
    .nullable()
    .required("Please enter otp")
    .min(6, "Please enter a valid OTP"),
});

const defaultValues: FormValues = {
  otp: null,
};

const resolver: Resolver<FormValues> = yupResolver(schema) as Resolver<
  FormValues
>;

const VerifyCode: React.FC = () => {
  const authStore = useAuthStore();
  const loginSignupStore = useLoginSignupStore();
  const [codeVerified, setCodeVerified] = useState<boolean>(true);
  const [timerFinished, setTimerFinished] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState<boolean>(true);
  const [loadingMessage, setLoadingMessage] =useState<string>("");

  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 30);

  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      setTimerFinished(true);
    },
  });

  const formattedSeconds = String(seconds).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    resolver,
  });

  const onSubmit = handleSubmit(async (data: any) => {
    setCodeVerified(false);
    verifyTokenMutate(data);
  });

  const verifyToken = async (data: { otp: number }) => {
    setLoadingMessage("Verifying OTP")
    const credential: PhoneAuthCredential = PhoneAuthProvider.credential(
      authStore.verificationId,
      String(data.otp)
    );
    await verifyCredentials(credential);
  };

  const verifyCredentials = async (credential: PhoneAuthCredential) => {
    signInWithCredential(auth, credential)
      .then(async (res) => {
        let token = await res?.user?.getIdToken();
        toast.success("OTP verified");
        setCodeVerified(true);
        setCookie("auth_token", token);
        loginSignupStore.setCurrentLoginStep(4)
      })
      .catch((error) => {
        setCodeVerified(true);
        toast.error("Invalid OTP");
      });
  };

  const {
    mutate: verifyTokenMutate,
    isLoading: verifyTokenLoading,
  } = useMutation(verifyToken, {
    onSuccess: (response: any) => {},
    onError: (err) => {
      toast.error("Unable to Verify token");
    },
  });

  const sendCode = async (phone: string) => {
    const sendCodeButton = document.createElement("div");
    sendCodeButton.id = "send-code-button";
    document.body.appendChild(sendCodeButton);

    const recaptchaVerifier = new RecaptchaVerifier(
      "send-code-button",
      {
        size: "invisible",
        callback: () => {},
      },
      auth
    );
    let newPhone = `+${phone}`;
    signInWithPhoneNumber(auth, newPhone, recaptchaVerifier)
      .then((verificationId) => {
        restart(expiryTimestamp);
        authStore.setVerificationId(verificationId?.verificationId);
        authStore.setPhoneNumber(newPhone);
        setOtpSent(true);
        toast.success("Verification code sent");
        document.getElementById("send-code-button")?.remove();
      })
      .catch((error) => {
        setOtpSent(true);
        toast.error("Too many attempts. Please Try again later!");
        document.getElementById("send-code-button")?.remove();
      });
  };

  const { mutate: sendCodeMutate, isLoading: sendCodeLoading } = useMutation(
    sendCode,
    {
      onSuccess: (response: any) => {},
      onError: (err) => {
        toast.error("Unable to send code");
      },
    }
  );

  const resendOtp = () => {
    setTimerFinished(false);
    setOtpSent(false);
    setLoadingMessage("Resending OTP");
    sendCodeMutate(authStore.phoneNumber);
  };

  if (
    !codeVerified ||
    verifyTokenLoading ||
    sendCodeLoading ||
    !otpSent
  ) {
    return (
      <div className="relative flex h-screen w-full max-w-3xl flex-col items-center justify-center rounded-xl bg-rightBg px-5 py-10 sm:px-20 lg:h-fit">
        <Spinner
          color="success"
          size="lg"
          classNames={{
            wrapper: "h-28 w-28",
          }}
        />

        <p className="mt-10 text-2xl text-faceBlue">
          {loadingMessage}
        </p>
      </div>
    );
  }
  return (
    <div className="relative flex h-screen w-full max-w-3xl flex-col items-center justify-center rounded-xl bg-rightBg px-5 py-10 sm:px-20 lg:h-fit">
      {/* Back */}
      <div
        onClick={() => loginSignupStore.setCurrentLoginStep(2)}
        className="absolute left-3 top-0 mt-4 cursor-pointer flex w-fit flex-col items-center gap-2 text-white xs:flex-row"
      >
        <IconLeft />
      </div>

      {/* Logo  */}
      <div className="flex flex-col items-center justify-center">
        <div className="relative flex h-[55px] w-[60px] flex-col items-center">
          <Image src="/logo.png" alt="Whalesbook_Logo" fill />
        </div>
        <h1 className="mt-2 text-[1.4rem] font-semibold text-gray-600 dark:text-white">
          WhalesBook
        </h1>
      </div>

      <div className="text-center lg:mt-6">
        <h3 className="mb-2 text-[1.4rem] font-black text-gray-500 dark:text-white">
          Verify your phone number
        </h3>
        <p className="px-4 text-xs font-normal text-[#8F8F8F]">
          Please enter 6 digits OTP received on {authStore.phoneNumber}
        </p>
      </div>

      <form onSubmit={onSubmit} className="w-full">
        <div className="w-full max-w-md px-4 pt-6">
          <Input
            isRequired
            {...register("otp")}
            type="text"
            placeholder="Enter 6 digits verification code"
            variant="bordered"
            radius="sm"
            size="lg"
            classNames={{
              input: ["text-sm"],
              inputWrapper: [
                "border-1 border-textGrey dark:border-borderColor",
              ],
            }}
          />
          <div className="text-center text-sm font-normal text-black dark:text-white">
            <p className="mt-3 mb-14">
              You will get OTP in: {formattedMinutes}:{formattedSeconds}
            </p>
            <div className="space-y-2">
              <p className="mt-8">
                Didn&rsquo;t get OTP?{" "}
                {timerFinished ? (
                  <span
                    className="text-[#FF5F5F] cursor-pointer"
                    onClick={resendOtp}
                  >
                    Resend
                  </span>
                ) : (
                  <span className="text-gray-500">Resend</span>
                )}
              </p>
              <Button
                type="submit"
                className="hover:bg-faceBlue/90  w-full rounded-lg bg-faceBlue py-3 text-center text-sm text-white ring-offset-slate-50  hover:opacity-90"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VerifyCode;
