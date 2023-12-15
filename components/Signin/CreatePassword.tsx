"use client";

import { EyeIcon, EyeOffIcon, Lock } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Spinner } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import {
  AuthenticationFactory,
  NewPasswordData,
} from "@/repository/AuthenticationRepository";
import toast from "react-hot-toast";
import { getCookie } from "cookies-next";
import useAuthStore from "@/store/AuthStore";
import useLoginSignupStore from "@/store/useLoginSignupStore";
import { IconLeft } from "react-day-picker";

const schema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .required("Please retype your password.")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const defaultValues = {
  password: "",
  confirmPassword: "",
};

const CreatePassword: React.FC = () => {
  const authStore = useAuthStore();
  const loginSignupStore = useLoginSignupStore();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const createNewPassword = async (data: NewPasswordData) => {
    return await AuthenticationFactory.getInstance().createNewPassword(data);
  };

  const { mutate, isLoading } = useMutation(createNewPassword, {
    onSuccess: (response: any) => {
      reset();
      toast.success("New Password created successfully");
    },
    onError: (err) => {
      toast.error("Unable to create new password");
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const passwordData: NewPasswordData = {
      idToken: getCookie("auth_token") || "",
      password: data.password,
      phoneNumber: authStore.phoneNumber,
    };
    mutate(passwordData);
  });


  if (isLoading ) {
    return (
      <div className="relative flex h-screen w-full max-w-3xl flex-col items-center justify-center rounded-xl bg-rightBg px-5 py-10 sm:px-20 lg:h-fit">
        <Spinner
          color="success"
          size="lg"
          classNames={{
            wrapper: "h-28 w-28",
          }}
        />
        <p className="mt-10 text-2xl text-faceBlue">Creating new passowrd</p>
      </div>
    );
  }

  return (
    <div className="relative flex w-full max-w-3xl flex-col items-center justify-center rounded-xl bg-rightBg">
      {/* Back */}
      <div
        onClick={() => loginSignupStore.setCurrentLoginStep(3)}
        className="absolute left-3 top-0 mt-4 cursor-pointer flex w-fit flex-col items-center gap-2 text-white xs:flex-row"
      >
        <IconLeft />
      </div>

      {/* Logo  */}
      <div className="flex flex-col items-center justify-center">
        <div className="relative flex h-[55px] w-[60px] flex-col items-center">
          <Image src="/logo.png" alt="Whalesbook_Logo" fill />
        </div>
        <h1 className="mt-2 text-xl font-black text-gray-600 dark:text-white">
          WhalesBook
        </h1>
      </div>

      <div className="text-center lg:mt-6">
        <h3 className="mb-2 text-[1.2rem] font-black text-gray-500 dark:text-white">
          Create new password
        </h3>
        <p className="text-sm w-unit-7xl font-normal text-[#8F8F8F]">
          Your new password must be different from previous used password
        </p>
      </div>

      <form onSubmit={onSubmit} className="w-full">
        <div className="mx-auto mt-5 flex w-full max-w-md flex-col gap-5 px-3">
          <div className="w-full">
          <Input
            {...register("password")}
            variant="bordered"
            className="mt-3.5"
            size="lg"
            radius="sm"
            label="Password"
            labelPlacement="outside"
            description="Password must be atleast 8 characters"
            placeholder="Password"
            startContent={
              <Lock className="pointer-events-none mr-3 flex-shrink-0 text-2xl text-default-400" />
            }
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeOffIcon className="pointer-events-none text-2xl text-default-400" />
                ) : (
                  <EyeIcon className="pointer-events-none text-2xl text-default-400" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            classNames={{
              input: ["text-sm"],
              inputWrapper: [
                "h-12 rounded-lg border border-textGrey bg-transparent pl-2 text-base text-textGrey ring-offset-slate-50 placeholder:text-textGrey dark:border-borderColor",
              ],
            }}
          />
          {errors.password && (
            <div className="text-sm text-red-500">
              {errors.password.message}
            </div>
          )}
          </div>
          <Input
            {...register("confirmPassword")}
            variant="bordered"
            className="mt-3.5"
            size="lg"
            label="Confirm Password"
            labelPlacement="outside"
            radius="sm"
            placeholder="Confirm password"
            startContent={
              <Lock className="pointer-events-none mr-3 flex-shrink-0 text-2xl text-default-400" />
            }
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeOffIcon className="pointer-events-none text-2xl text-default-400" />
                ) : (
                  <EyeIcon className="pointer-events-none text-2xl text-default-400" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            classNames={{
              input: ["text-sm"],
              inputWrapper: [
                "h-12 rounded-lg border border-textGrey bg-transparent pl-2 text-base text-textGrey ring-offset-slate-50 placeholder:text-textGrey dark:border-borderColor",
              ],
            }}
          />
          {errors.confirmPassword && (
            <div className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </div>
          )}
          <Button
            type="submit"
            className="hover:bg-faceBlue/90 mt-3 w-full rounded-lg bg-faceBlue py-3 text-center text-sm text-white ring-offset-slate-50  hover:opacity-90"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePassword;
