import { yupResolver } from "@hookform/resolvers/yup";
import { setCookie } from "cookies-next";
import { Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as yup from "yup";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import useLoginSignupStore from "@/store/useLoginSignupStore";

const schema = yup.object().shape({
  phone: yup.string().required("Email or username is required"),
  password: yup.string().min(5).max(32).required(),
});

const SignInWithPhone = () => {

  const loginSignupStore = useLoginSignupStore();
  type FormType = yup.InferType<typeof schema>;

  const form = useForm<FormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormType) => {
    // const response: any = await useMakeServerRequest("/user/login", "POST", {
    //   phone: `+${data.phone}`,
    //   password: data.password,
    // });
    // if (response.status === 200) {
    //   setCookie("auth_token", response.data.token);
    //   toast.success("Signed in successfully");
    //   //   router.push("/admin");
    // } else {
    //   toast.error("Invalid credentials");
    // }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PhoneInput
                  country="in"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  placeholder="Enter phone number"
                  containerClass="w-full bg-transparent px-2 text-textGrey border-1 border-textGrey dark:border-borderColor rounded-lg py-[.35rem]"
                  inputClass="!bg-transparent !w-full !border-none !text-base"
                  buttonClass="!bg-transparent !border-none hover:!bg-transparent"
                  dropdownClass="!bg-[#000000]"
                  searchClass="hover:!bg-transparent"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  icon={Lock}
                  {...field}
                  type="text"
                  placeholder="Password"
                  className="mt-3.5 h-12 rounded-lg border border-textGrey bg-transparent pl-12 text-base text-textGrey ring-offset-slate-50 placeholder:text-textGrey dark:border-borderColor"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
    </Form>
  );
};

export default SignInWithPhone;
