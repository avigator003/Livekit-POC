// useUserDetails.ts
import useAuthenticationStore from "@/store/useAuthenticationStore";

interface UserDetails {
  name: string | undefined;
  _id: string | undefined;
}

const useUserDetails = (): UserDetails => {
  const authStore = useAuthenticationStore();

  return {
    name: authStore.user?.name,
    _id: authStore.user?.id,
  };
};

export default useUserDetails;
