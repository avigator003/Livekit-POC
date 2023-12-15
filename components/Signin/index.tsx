"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInWithEmail from "./SignInWithEmail";
import SignInWithPhone from "./SignInWithPhone";
import useLoginSignupStore from "@/store/useLoginSignupStore";

const Signin: React.FC = () => {
  const loginSignupStore= useLoginSignupStore();

  const handleSignupModal = () => {
    loginSignupStore.setIsSignupModalOpen();
  }
  return (
    <div className="relative flex h-screen w-full max-w-3xl flex-col items-center justify-center rounded-xl lg:h-fit">
      {/* Logo  */}
      <div className="flex flex-col items-center justify-center">
        <div className="relative flex h-[55px] w-[60px] flex-col items-center">
          <Image src="/logo.png" alt="Whalesbook_Logo" fill />
        </div>
        <h1 className="mt-2 text-lg font-semibold text-gray-600 dark:text-white">
          WhalesBook
        </h1>
      </div>

      <div className="lg:hidden">
        <h3 className="mb-2 mt-6 text-center text-3xl font-bold text-white">
          Let&rsquo;s sign you in.
        </h3>
        <p className="text-base font-normal text-[#8F8F8F]">
          Welcome back, You&rsquo;ve been missed!
        </p>
      </div>

      {/* Tabs  */}
      <div className="mx-auto mt-10 w-full max-w-md px-3">
        <div className="flex w-full flex-col">
          <Tabs defaultValue="email-username" className="h-fit w-full">
            <TabsList className="h-fit w-full rounded-[10px] border-2 border-textGrey bg-transparent p-0 dark:border-borderColor">
              <TabsTrigger
                value="email-username"
                className="w-full rounded-lg bg-transparent py-3 text-textGrey ring-offset-slate-50 data-[state=active]:bg-faceBlue data-[state=active]:text-white"
              >
                Email/Username
              </TabsTrigger>
              <TabsTrigger
                value="phone-number"
                className="w-full rounded-lg bg-transparent py-3 text-textGrey ring-offset-slate-50 data-[state=active]:bg-faceBlue data-[state=active]:text-white"
              >
                Phone Number
              </TabsTrigger>
            </TabsList>
            <TabsContent value="email-username" className="mt-5" tabIndex={-1}>
              <SignInWithEmail />
            </TabsContent>
            <TabsContent value="phone-number" className="mt-5" tabIndex={-1}>
              <SignInWithPhone />
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex flex-col items-center justify-center gap-2 text-white xs:flex-row sm:gap-5">
            <span className="text-sm text-black dark:text-white/80">
              New to Whalebook?
            </span>
              <Button className="rounded-lg border-2 border-blue-500 bg-transparent px-2 py-1 text-black ring-offset-slate-50 hover:bg-transparent hover:opacity-90 dark:text-white" onClick={handleSignupModal}>
                Create an account
              </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
