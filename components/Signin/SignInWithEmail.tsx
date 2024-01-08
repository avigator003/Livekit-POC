import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Spinner } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { EyeIcon, EyeOffIcon, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as yup from "yup";

import { AuthenticationFactory } from "@/repository/AuthenticationRepository";
import { setupHeaderToken } from "@/setup/api";
import useAuthenticationStore from "@/store/useAuthenticationStore";
import { Button } from "../ui/button";
import { WhalesUser } from "@/types/WhalesUser";
import useLoginSignupStore from "@/store/useLoginSignupStore";

const schema = yup.object().shape({
  email: yup.string().required("Email or username is required"),
  password: yup.string().min(5).max(32).required(),
});

const defaultValues = {
  email: "",
  password: "",
};

const SignInWithEmail: React.FC = () => {
  const loginSignupStore = useLoginSignupStore();
  const authencationStore = useAuthenticationStore();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const login = async (data: any) => {
    return await AuthenticationFactory.getInstance().login(data);
  };

  const { mutate, isLoading } = useMutation(login, {
    onSuccess: (response: any) => {
      const user: WhalesUser = {
        name: response.name,
        userName: response.username,
        token: response.token,
        id: response._id,
        email: response.email,
        profilePhoto: response.profile_photo,
      };
      authencationStore.addUser(user);
      setupHeaderToken();
      router.push(`/dashboard/rooms`);
      toast.success("Signed in successfully"); 
    },
    onError: (err) => {
      toast.error("Invalid credentials");
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    mutate(data);
  });

  if (isLoading) {
    return <Spinner color="success" size="lg" />;
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <div>
        <Input
          isRequired
          {...register("email")}
          type="text"
          placeholder="Email or Username"
          variant="bordered"
          radius="sm"
          size="lg"
          classNames={{
            input: ["text-sm"],
            inputWrapper: ["border-1 border-textGrey dark:border-borderColor"],
          }}
          startContent={
            <User className="pointer-events-none mr-3 flex-shrink-0 text-2xl text-default-400" />
          }
        />
        {errors.email && (
          <div className="text-sm text-red-500">{errors.email.message}</div>
        )}
      </div>

      <div>
        <Input
          isRequired
          {...register("password")}
          variant="bordered"
          className="mt-3.5"
          size="lg"
          radius="sm"
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
            inputWrapper: ["border-1 border-textGrey dark:border-borderColor"],
          }}
        />
        {errors.password && (
          <div className="text-sm text-red-500">{errors.password.message}</div>
        )}
      </div>

      <p
        tabIndex={0}
        className="mt-1 cursor-pointer self-end text-sm font-medium text-faceBlue ring-offset-slate-50 hover:opacity-90"
        onClick={() => loginSignupStore.setCurrentLoginStep(2)}
      >
        Forgot password?
      </p>
      <Button
        type="submit"
        className="hover:bg-faceBlue/90 mt-6 w-full rounded-lg bg-faceBlue py-3 text-center text-sm text-white ring-offset-slate-50 hover:opacity-90"
      >
        Sign in
      </Button>
    </form>
  );
};

export default SignInWithEmail;
