import api, { photoApi } from "@/setup/api";
import { RegisteringUser } from "@/types/RegisteringUser";

export interface NewPasswordData{
  idToken: string,
  password: string,
  phoneNumber: string
}


export interface UpdateProfileData{
  profile_photo: string,
  about: string,
}


export interface RoomRepository {
  login(data:any): Promise<any>;
  register(data:any): Promise<any>;
  createNewPassword(data:NewPasswordData): Promise<any>;
  fieldsDataChecking(value:any,type:string) : Promise<any>;
  updateProfile(data:UpdateProfileData):Promise<any>
  uploadImages(data: FormData): Promise<any>;
}

class AdminApiAuthenticationRepository implements RoomRepository {
  login = async (data:any): Promise<any> => {
    return await api
      .post<any>(`/user/login`,data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
  register = async (data:RegisteringUser): Promise<any> => {
    return await api
      .post<any>(`/user/register`,data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  };
  createNewPassword = async (data: NewPasswordData): Promise<any> => {
    return await api
      .post<any>(`/user/forgotPassword`, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
  uploadImages = async (data: FormData): Promise<any> => {
    return await photoApi
      .post<any>(`/aws/s3/upload`, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
  updateProfile = async (data: UpdateProfileData): Promise<any> => {
    return await api
      .put<any>(`/profile/create`, {data:data})
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
  fieldsDataChecking = async (value: any,type:string): Promise<any> => {
    return await api
      .post<any>(`/profile/${value}/${type}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
}

export enum RepositoryType {
  ADMIN,
}

export class AuthenticationFactory {
  public static getInstance(
    type: RepositoryType = RepositoryType.ADMIN
  ): RoomRepository {
    switch (type) {
      case RepositoryType.ADMIN:
        return new AdminApiAuthenticationRepository();
    }
  }
}
