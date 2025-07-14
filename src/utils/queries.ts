import type { GetRoomQuestionsResponse } from "@/http/types/questions";
import type { GetRoomsResponse } from "@/http/types/rooms";
import { api } from "@/lib/axios";


export const getRooms = async (): Promise<GetRoomsResponse> => {
   const result = await api.get('/rooms');
   return result.data
}

export const getRoomQuestions = async (roomId: string): Promise<GetRoomQuestionsResponse> => {
   const result = await api.get(`/rooms/${roomId}/questions`)
   return result.data

}