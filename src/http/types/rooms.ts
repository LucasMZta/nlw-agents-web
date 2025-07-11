
export type CreateRoomsRequest = {
   name: string
   description: string
}

export type CreateRoomsResponse = {
   roomId: string;
}

export type GetRoomsResponse = Array<{
   id: string
   name: string
   createdAt: string
   questionsCount: number
}>