import api from "@/setup/api";

export interface EgressData {
   room_id:string,
   urls : Array<String>
   customBaseUrl: string
}

export interface StopEgressData {
    room_id:string,
 }


export interface EgressRepository {
  publishEgress(data:EgressData): Promise<any>;
  stopEgress(data:StopEgressData): Promise<any>;

}

class AdminApiEgressRepository implements EgressRepository {
    publishEgress = async (data:EgressData): Promise<any> => {
    return await api
      .post<any>(`/livekit/start-livestream/${data.room_id}`,data)
      .then((response) => {
       return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
  stopEgress = async (data:StopEgressData): Promise<any> => {
    return await api
      .post<any>(`/livekit/stop-livestream/${data.room_id}`,data)
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

export class EgressFactory {
  public static getInstance(
    type: RepositoryType = RepositoryType.ADMIN
  ): EgressRepository {
    switch (type) {
      case RepositoryType.ADMIN:
        return new AdminApiEgressRepository();
    }
  }
}
