import { useQuery } from '@tanstack/react-query'
import { getRoomQuestions } from '@/utils/queries'

export function useRoomQuestions(roomId: string) {
   return useQuery({
      queryKey: ['get-questions', roomId],
      queryFn: () => getRoomQuestions(roomId),
   })
}
