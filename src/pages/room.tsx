import { Navigate, useParams } from 'react-router-dom'

type RoomParams = {
   roomId: string
}

export function Room() {
   const { roomId } = useParams<RoomParams>()

   if (!roomId || roomId.length <= 1) {
      return <Navigate replace to="/" />
   }

   return (
      <div>
         Room details
         <div>{roomId} - {roomId.length}</div>
      </div>
   )
}
