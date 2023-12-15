import { yupResolver } from "@hookform/resolvers/yup";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useAuthStore from "@/store/AuthStore";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import {
  AuthenticationFactory,
  UpdateProfileData,
} from "@/repository/AuthenticationRepository";
import toast from "react-hot-toast";
import useAuthenticationStore from "@/store/useAuthenticationStore";
import { WhalesUser } from "@/types/WhalesUser";

const schema = yup.object().shape({
  bio: yup
    .string()
});

const defaultValues = {
  bio: "",
};

const ProfileInfo: React.FC = () => {
  const authStore = useAuthStore();
  const authenticationStore = useAuthenticationStore();
  const user = authenticationStore.user;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [profileData, setProfileData] = useState<UpdateProfileData>({
    about: "",
    profile_photo: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const updateProfile = async (data: UpdateProfileData) => {
    setProfileData(data);
    return await AuthenticationFactory.getInstance().updateProfile(data);
  };

  const { mutate, isLoading } = useMutation(updateProfile, {
    onSuccess: (response: any) => {
      console.log("Resposne", response.data);
      authStore.setProfilePicture(
        selectedFile && URL.createObjectURL(selectedFile)
      );
      authStore.setBio(profileData.about);
      const previousUser = authenticationStore.user;
      const user: WhalesUser = {
        name: previousUser?.name || "",
        userName: previousUser?.userName || "",
        token: response.data.token,
        id: previousUser?.id || "",
        email: previousUser?.email || "",
        profilePhoto: response.data.profile_photo,
      };
      authenticationStore.addUser(user);
      toast.success("Profile Updated Successfully");
    },
    onError: (err) => {
      toast.error("Unable to update profile");
    },
  });

  const onSubmit = handleSubmit(async ({ bio }: { bio?: string }) => {
    const updateProfileData: UpdateProfileData = {
      about: bio?.trim() || "",
      profile_photo: profileData.profile_photo,
    };
    mutate(updateProfileData);
  });

  const handleFileSelect = async (event: any) => {
    const selectedFiles = event.target.files[0];
    setSelectedFile(selectedFiles);
    if (selectedFiles) {
      const formData = new FormData();
      formData.append("file", selectedFiles);
      try {
        const result = await AuthenticationFactory.getInstance().uploadImages(
          formData
        );
        setProfileData((prevProfileData) => ({
          ...prevProfileData,
          profile_photo: result.url,
        }));
      } catch (error) {
        console.error("Error uploading room thumbnail:", error);
        toast.error("An error occurred while uploading room thumbnail");
      }
    }
  };

  return (
    <div className="relative flex w-full max-w-3xl flex-col items-center justify-center rounded-xl bg-transparent">
      {/* Logo  */}
      <div className="flex flex-col items-center justify-center">
        <div className="relative flex h-[55px] w-[60px] flex-col items-center">
          <Image src="/logo.png" alt="Whalesbook_Logo" fill />
        </div>
        <h1 className="mt-2 text-[1.4rem] font-semibold text-gray-600 dark:text-white">
          WhalesBook
        </h1>
      </div>
      <form onSubmit={onSubmit} className="w-full">
        <Label
          htmlFor="dropzone-file"
          className="group relative mx-auto mt-10 flex h-[5rem] w-[5rem] cursor-pointer flex-col items-center justify-center rounded-full border border-textGrey transition-all hover:border-grey hover:bg-grey hover:text-white dark:border-2 dark:border-borderColor dark:border-white dark:hover:border-leftBg dark:hover:bg-leftBg lg:mt-8"
        >
          {selectedFile ? (
            <Image
              className="rounded-full group-hover:opacity-80"
              src={URL.createObjectURL(selectedFile)}
              alt="upload_photo"
              fill
              style={{ objectFit: "cover" }}
            />
          ) : (
            <>
              {user?.profilePhoto ? (
                <Image
                  className="rounded-full group-hover:opacity-80"
                  src={user?.profilePhoto }
                  alt="upload_photo"
                  fill
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <Camera />
              )}
            </>
          )}
          <input
            onChange={(event) => handleFileSelect(event)}
            id="dropzone-file"
            type="file"
            className="hidden"
            accept="image/*"
          />
        </Label>

        <p className="mt-3 text-center text-md font-extrabold text-gray-500 dark:text-white">
          Upload Profile Image
        </p>

        <div className="mx-auto mt-3 w-full max-w-md px-4">
          <Textarea
            {...register("bio")}
            classNames={{
              inputWrapper: [
                "mt-2 w-full resize-none rounded-md border-2 border-textGrey bg-transparent p-3 text-base font-normal text-textGrey outline-none ring-offset-slate-50 dark:border-borderColor",
              ],
            }}
            label="About/Bio"
            labelPlacement="outside"
            placeholder="Write Here!"
            description={`${watch("bio")?.length ?? 0}/150`}
            maxLength={150}
            cols={30}
            rows={4}
          />
          <Button
            disabled={profileData.profile_photo === ""}
            type="submit"
            className="hover:bg-faceBlue/90 my-5 w-full rounded-lg bg-faceBlue py-3 text-center text-sm text-white ring-offset-slate-50  hover:opacity-90"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileInfo;
