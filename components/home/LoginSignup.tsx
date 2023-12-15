"use client";
import React from "react";
import VerifyOtp from "@/components/Signup/VerifyOtp";
import ShadowModal from "@/components/custom-ui/modal/ShadowModal";
import Signin from "@/components/Signin";
import ForgotPassword from "@/components/Signin/ForgotPassword";
import CreatePassword from "@/components/Signin/CreatePassword";
import VerifyPhoneNumber from "@/components/Signin/VerifyPhoneNumber";
import Signup from "../Signup";
import AddPhoneNumber from "../Signup/AddPhoneNumber";
import ProfileInfo from "../Signup/ProfileInfo";
import useLoginSignupStore from "@/store/useLoginSignupStore";

const LoginModal: React.FC = () => {
  const loginSignupStore = useLoginSignupStore();
  const currentLoginStep = loginSignupStore.currentLoginStep;

  return currentLoginStep === 1 ? (
    <Signin />
  ) : currentLoginStep === 2 ? (
    <ForgotPassword />
  ) : currentLoginStep === 3 ? (
    <VerifyPhoneNumber />
  ) : currentLoginStep === 4 ? (
    <CreatePassword />
  ) : null;
};

const SignupModal: React.FC = () => {
  const loginSignupStore = useLoginSignupStore();
  const currentSignupStep = loginSignupStore.currentSignUpStep;
  return currentSignupStep === 1 ? (
    <Signup />
  ) : currentSignupStep === 2 ? (
    <AddPhoneNumber />
  ) : currentSignupStep === 3 ? (
    <VerifyOtp />
  ) : null;
};

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function LoginSignup(props: LoginModalProps) {
  const loginSignupStore = useLoginSignupStore();
  const isSignupModal = loginSignupStore.isSignupModalOpen;
  const { isOpen, onClose } = props;

  return (
    <>
      <div className="flex flex-wrap gap-3"></div>
      <ShadowModal
        body={isSignupModal ? <SignupModal /> : <LoginModal />}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
