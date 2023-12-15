"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Image from "next/image";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as yup from "yup";
import { auth } from "@/firebase";
import useAuthStore from "@/store/AuthStore";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@nextui-org/react";
import { IconLeft } from "react-day-picker";
import useLoginSignupStore from "@/store/useLoginSignupStore";
import { useState } from "react";

const schema = yup.object().shape({
  phone: yup.string().required("Please enter your phone number")
   .min(12, "Please enter a valid phone number"),
});

const defaultValues = {
  phone: "",
};

const AddPhoneNumber: React.FC = () => {
  const authStore = useAuthStore();
  const [otpSent, setOtpSent] = useState<boolean>(true);

  const loginSignupStore = useLoginSignupStore();
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
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
       
        authStore.setVerificationId(verificationId?.verificationId);
        authStore.setPhoneNumber(newPhone);
        setOtpSent(true);
        toast.success("Verification code sent");
        loginSignupStore.setCurrentSignUpStep(3);
        document.getElementById("send-code-button")?.remove();
      })
      .catch((error) => {
        setOtpSent(true);
        toast.error("Too many attempts. Please Try again later!");
        document.getElementById("send-code-button")?.remove();
      });
  };

  const { mutate, isLoading } = useMutation(sendCode, {
    onSuccess: (response: any) => {},
    onError: (err) => {
      toast.error("Unable to send code");
    },
  });

  const onSubmit = handleSubmit(async ({ phone }: { phone: string }) => {
    setOtpSent(false);
    mutate(phone);
  });

  if (isLoading || !otpSent) {
    return (
      <div className="relative flex h-screen w-full max-w-3xl flex-col items-center justify-center rounded-xl bg-rightBg px-5 py-10 sm:px-20 lg:h-fit">
        <Spinner
          color="success"
          size="lg"
          classNames={{
            wrapper: "h-28 w-28",
          }}
        />
        <p className="mt-10 text-2xl text-faceBlue">Sending OTP...</p>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen w-full max-w-3xl flex-col items-center justify-center rounded-xl bg-rightBg px-5 py-10 sm:px-20 lg:h-fit">
      {/* Back */}
      <div
        onClick={() => loginSignupStore.setCurrentSignUpStep(1)}
        className="absolute left-3 top-0 mt-4 cursor-pointer flex w-fit flex-col items-center gap-2 text-white xs:flex-row"
      >
        <IconLeft />
      </div>

      {/* Logo  */}
      <div className="flex flex-col items-center justify-center">
        <div className="relative flex h-[55px] w-[60px] flex-col items-center">
          <Image src="/logo.png" alt="Whalesbook_Logo" fill />
        </div>
        <h1 className="mt-2 text-lg font-semibold text-gray-600 dark:text-white">
          WhalesBook
        </h1>
      </div>

      <div className="text-center lg:mt-6">
        <h3 className="mb-2 text-[1.4rem] font-semibold text-gray-500 dark:text-white">
          Enter your phone number
        </h3>
        <p className="px-4 text-sm font-normal w-unit-8xl my-3 text-[#8F8F8F]">
          Add your phone number and we&apos;ll send you a verification code so
          we know you&apos;re real.
          <br className="hidden lg:flex" />
        </p>
      </div>

      <form onSubmit={onSubmit} className="w-full">
        <div className="mx-auto w-full max-w-md px-4 pt-5">
          <PhoneInput
            country="in"
            value={watch("phone")}
            onChange={(value) => setValue("phone", value)}
            placeholder="Enter phone number"
            containerClass="w-full bg-transparent px-2 text-textGrey border-2 border-textGrey dark:border-borderColor rounded-lg py-1"
            inputClass="!bg-transparent !w-full !border-none !text-base"
            buttonClass="!bg-transparent !border-none hover:!bg-transparent"
            dropdownClass="!bg-[#000000]"
            searchClass="hover:!bg-transparent"
          />

          <Button
            type="submit"
            className="hover:bg-faceBlue/90 mt-7 w-full rounded-lg bg-faceBlue py-3 text-center text-sm text-white ring-offset-slate-50 hover:opacity-90"
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPhoneNumber;
