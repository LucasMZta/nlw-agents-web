import type { CreateRoomsRequest, CreateRoomsResponse } from "@/http/types/rooms";
import { api } from "@/lib/axios";

export const createRoom = async (data: CreateRoomsRequest): Promise<CreateRoomsResponse> => {
   const result = await api.post('/rooms', data)
   return result.data
}

export const uploadAudioAPI = async (roomId: string, formData: FormData) => {

   const result = await api.post(`/rooms/${roomId}/audio`, formData)

   return result.data
}