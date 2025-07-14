import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createRoom } from '@/utils/mutations'
import type { CreateRoomsRequest } from './types/rooms'

export function useCreateRoom() {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: (data: CreateRoomsRequest) => createRoom(data),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['get-rooms'] })
      },
   })
}
