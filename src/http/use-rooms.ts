import { useQuery } from '@tanstack/react-query'
import { getRooms } from '@/utils/queries'

export function useRooms() {
   return useQuery({
      queryKey: ['get-rooms'],
      queryFn: getRooms
   })
}
