export interface WhalesRoomImages {
  image_urls: WhalesRoomImage[];
}

interface WhalesRoomImage {
  image_url: string;
  user: RoomImagesUser;
}

interface RoomImagesUser {
  name: string;
  profile_photo: string;
  username: string;
  _id: string;
}

