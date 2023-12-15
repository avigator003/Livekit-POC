"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox, Input, RadioGroup } from "@nextui-org/react";
import { EyeIcon, EyeOffIcon, Lock, User } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/AuthStore";
import { useEffect, useState } from "react";
import { RadioInput } from "../custom-ui/inputs/RadioInput";
import useLoginSignupStore from "@/store/useLoginSignupStore";
import useDebounce from "@/hooks/common/useDebounce";
import { AuthenticationFactory } from "@/repository/AuthenticationRepository";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  name: yup.string().required("Name is required"),
  gender: yup.string().required("Please select your gender"),
  //dateOfBirth: yup.string().required("Please select your date of birth"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .required("Please retype your password.")
    .oneOf([yup.ref("password")], "Passwords must match"),
  terms: yup.bool().oneOf([true], "Please accept terms and conditions"),
});

const defaultValues = {
  username: "",
  name: "",
  gender: "male",
  // dateOfBirth: new Date().toString(),
  password: "",
  confirmPassword: "",
  terms: false,
};

const Signup: React.FC = () => {
  const loginSignupStore = useLoginSignupStore();
  const authStore = useAuthStore();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isUniqueUserName, setIsUniqueUserName] = useState<boolean>(true);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    if (!isUniqueUserName) {
      toast.error("Username is already registered");
    } else {
      authStore.setUsername(data.username);
      authStore.setName(data.name);
      authStore.setGender(data.gender);
      //authStore.setDob(data.dateOfBirth);
      authStore.setPassword(data.password);
      loginSignupStore.setCurrentSignUpStep(2);
    }
  });

  // const handleDateOfBirthChange = (date: any) => {
  //   setValue("dateOfBirth", date, { shouldValidate: true });
  // };

  const handleTermsChanges = (data: boolean) => {
    setValue("terms", data);
  };

  const handleLoginModal = () => {
    loginSignupStore.setIsSignupModalOpen();
  };

  const debouncedSearch = useDebounce(watch("username"), 1000);

  const checkUserName = async () => {
    const response = await AuthenticationFactory.getInstance().fieldsDataChecking(
      watch("username"),
      "checkusername"
    );
    return response.data;
  };

  useEffect(() => {
    if (debouncedSearch) {
      checkUserName().then((isUnique) => {
        setIsUniqueUserName(isUnique);
      });
    }
  }, [debouncedSearch]);

  return (
    <div className="relative flex w-full max-w-3xl flex-col items-center justify-center rounded-xl bg-rightBg">
      {/* Logo  */}
      <div className="flex flex-col items-center justify-center">
        <div className="relative flex h-[55px] w-[60px] flex-col items-center">
          <Image src="/logo.png" alt="Whalesbook_Logo" fill />
        </div>
        <h1 className="mt-2 text-[1.5rem] font-semibold text-gray-600 dark:text-white">
          WhalesBook
        </h1>
      </div>

      <div className="lg:mt-6">
        <p className="text-center text-sm font-normal text-faceBlue">
          START FOR FREE
        </p>
        <h3 className="my-2 text-[2rem] font-semibold text-gray-600 dark:text-white">
          Create new account
        </h3>
        <p className="text-center text-base font-normal text-[#8F8F8F]">
          Get started by creating your account
        </p>
      </div>

      <form onSubmit={onSubmit}>
        <div className="mx-auto mt-5 flex w-full max-w-md flex-col gap-5 px-3">
          <div>
            <Input
              {...register("username")}
              type="text"
              placeholder="Username"
              label="Username"
              labelPlacement="outside"
              variant="bordered"
              radius="sm"
              size="lg"
              classNames={{
                input: ["text-sm"],
                inputWrapper: [
                  "h-12 rounded-lg border border-textGrey bg-transparent pl-2 text-base text-textGrey ring-offset-slate-50 placeholder:text-textGrey dark:border-borderColor",
                ],
              }}
              startContent={
                <User className="pointer-events-none mr-3 flex-shrink-0 text-2xl text-default-400" />
              }
            />
            {!isUniqueUserName && (
              <div className="text-sm text-red-500 bottom-">
                Username is already registered
              </div>
            )}
            {errors.username && isUniqueUserName && (
              <div className="text-sm text-red-500 bottom-">
                {errors.username.message}
              </div>
            )}
          </div>
          <div>
            <Input
              {...register("name")}
              type="text"
              label="Name"
              labelPlacement="outside"
              placeholder="Enter your Name"
              variant="bordered"
              radius="sm"
              size="lg"
              classNames={{
                input: ["text-sm"],
                inputWrapper: [
                  "h-12 rounded-lg border border-textGrey bg-transparent pl-2 text-base text-textGrey ring-offset-slate-50 placeholder:text-textGrey dark:border-borderColor",
                ],
              }}
              startContent={
                <User className="pointer-events-none mr-3 flex-shrink-0 text-2xl text-default-400" />
              }
            />
            {errors.name && (
              <div className="text-sm text-red-500">{errors.name.message}</div>
            )}
          </div>
          <div>
            <RadioGroup
              label="Select Gender"
              {...register("gender")}
              defaultValue={"male"}
              placeholder="Username"
              classNames={{
                wrapper: "flex flex-row flex-nowrap  gap-2",
                base: " w-full",
                label: "text-sm text-white",
              }}
            >
              <RadioInput value="male">Male</RadioInput>
              <RadioInput value="female">Female</RadioInput>
              <RadioInput value="other">Other</RadioInput>
            </RadioGroup>
          </div>

          {/* <DateInput
            label="Date of Birth"
            value={new Date(watch("dateOfBirth"))}
            onChange={handleDateOfBirthChange}
          /> */}
          
          <div>
            {" "}
            <Input
              {...register("password")}
              variant="bordered"
              className="mt-3.5"
              size="lg"
              radius="sm"
              label="Password"
              labelPlacement="outside"
              placeholder="Enter your password"
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
                  "border-1 border-textGrey dark:border-borderColor",
                ],
              }}
            />
            {errors.password && (
              <div className="text-sm text-red-500">
                {errors.password.message}
              </div>
            )}
          </div>
          <div>
            <Input
              {...register("confirmPassword")}
              variant="bordered"
              className="mt-3.5"
              size="lg"
              label="Confirm Password"
              labelPlacement="outside"
              radius="sm"
              placeholder="Confirm your password"
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
                  "border-1 border-textGrey dark:border-borderColor",
                ],
              }}
            />
            {errors.confirmPassword && (
              <div className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>

          <div className="mt-5">
            <Checkbox
              id="terms"
              checked={watch("terms") || false}
              onChange={() => handleTermsChanges(!watch("terms"))}
              className="ml-1 cursor-pointer"
              classNames={{
                base: "right-4",
                label: "text-sm text-gray-600 dark:text-white",
                wrapper:
                  "rounded-md mr-4 w-6 h-6 border border-textGrey dark:border-borderColor bg-transparent group-data-[selected=true]:bg-faceBlue",
              }}
            >
              By clicking on check box, you&rsquo;re agree to our{" "}
              <span className="text-faceBlue">Terms of services</span> and{" "}
              <span className="text-faceBlue">Privacy policy.</span>
            </Checkbox>
            {errors.terms && (
              <div className="text-sm text-red-500">{errors.terms.message}</div>
            )}
          </div>
          <Button
            type="submit"
            className="hover:bg-faceBlue/90 my-5 w-full rounded-lg bg-faceBlue py-3 text-center text-sm text-white ring-offset-slate-50 hover:opacity-90 "
          >
            Sign up
          </Button>
        </div>

        {/* Already have an account  */}
        <div className="mt-4 flex flex-col items-center justify-center gap-2 text-white xs:flex-row sm:gap-5">
          <span className="text-sm text-black dark:text-white/80">
            Already have an account?
          </span>
          <Button
            className="rounded-lg border-2 border-blue-500 bg-transparent px-1 py-1 text-black ring-offset-slate-50 hover:bg-transparent hover:opacity-90 dark:text-white"
            onClick={handleLoginModal}
          >
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
