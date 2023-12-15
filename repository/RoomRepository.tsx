import api, { photoApi } from "@/setup/api";

export interface Channel {
  id: number;
  name: string;
}

export interface JoinRoomData {
  roomName: string;
  room_id: string;
}

export interface EndRoomData {
  room_id: string;
}

export interface DeleteImagesData {
  image_urls: string[];
}

export interface RoomsResponse {
  total_pages: number;
  total_items: number;
  data: Channel[];
}

export interface RoomRepository {
  getAll(): Promise<any>;
  uploadRoomThumbnail(data: FormData): Promise<any>;
  createRoom(data: any): Promise<any>;
  getHandRaises(data: any): Promise<any>;
  getBlockedUsers(roomId: string): Promise<any>;
  joinRoom(data: JoinRoomData): Promise<any>;
  raiseHand(rommId: any, identity: any): Promise<any>;
  updatePermissions(roomId: any, data: any): Promise<any>;
  endRoom(data: EndRoomData): Promise<any>;
  uploadImages(data: any, roomId: string): Promise<any>;
  deleteImages(data: DeleteImagesData, roomId: string): Promise<any>;
}

class AdminApiRoomRepository implements RoomRepository {
  getAll = async (): Promise<any> => {
    return await api
      .get<any>(`/livekit/list-rooms`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  getHandRaises = async (data: any): Promise<any> => {
    const { room_id, page } = data;
    return await api
      .get<any>(`/livekit/hand-raised/${room_id}?page=${page}&limit=10`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
  getBlockedUsers = async (roomId: string): Promise<any> => {
    return await api
      .get<any>(`/livekit/list-blocked-participants/${roomId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
  joinRoom = async (data: JoinRoomData): Promise<any> => {
    return await api
      .post<any>(`/livekit/join-room/${data.room_id}`, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
  endRoom = async (data: EndRoomData): Promise<any> => {
    return await api
      .post<any>(`/livekit/end-room/${data.room_id}`, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
  raiseHand = async (room_id: any, identity: any): Promise<any> => {
    return await api
      .post<any>(`/livekit/raise-hand/${room_id}`, {
        room_id,
        identity: identity,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
  createRoom = async (data: any): Promise<any> => {
    return await api
      .post<any>(`/livekit/create-room`, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
  uploadRoomThumbnail = async (data: FormData): Promise<any> => {
    return await photoApi
      .post<any>(`/aws/s3/upload`, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
  updatePermissions = async (roomId: any, data: any): Promise<any> => {
    return await api
      .post<any>(`/livekit/update-permission/${roomId}`, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
  uploadImages = async (data: FormData, roomId: string): Promise<any> => {
    return await photoApi
      .post<any>(`/livekit/upload-image?room_id=${roomId}`, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  deleteImages = async (
    data: DeleteImagesData,
    roomId: string
  ): Promise<any> => {
    return await api
      .post<any>(`/livekit/delete-image?room_id=${roomId}`, data)
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

export class RoomFactory {
  public static getInstance(
    type: RepositoryType = RepositoryType.ADMIN
  ): RoomRepository {
    switch (type) {
      case RepositoryType.ADMIN:
        return new AdminApiRoomRepository();
    }
  }
}
