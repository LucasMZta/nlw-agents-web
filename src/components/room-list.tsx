import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'
import { useRooms } from '@/http/use-rooms'
import { dayjs } from '@/lib/dayjs'

export function RoomList() {
   const { data, isLoading, isError, error } = useRooms()

   return (
      <Card>
         <CardHeader>
            <CardTitle>Salas Recentes</CardTitle>
            <CardDescription>
               Acesso rápido para as salas criadas recentemente
            </CardDescription>
         </CardHeader>
         <CardContent className="flex flex-col gap-3">
            {isLoading && (
               <p className="text-muted-foreground text-sm">Carregando salas...</p>
            )}
            {isError &&
               <p className='text-muted-foreground text-sm'> Erro: {JSON.stringify(error)}</p>
            }

            {!isError && data?.map((room) => (
               <Link
                  className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50"
                  key={room.id}
                  to={`/room/${room.id}`}
               >
                  <div className="flex flex-1 flex-col gap-1">
                     <h3 className="font-medium">{room.name}</h3>
                     <div className="flex items-center gap-2 text-xs">
                        <Badge variant={'secondary'}>
                           {dayjs(room.createdAt).fromNow()}{' '}
                        </Badge>
                        <Badge variant={'secondary'}>
                           {room.questionsCount} pergunta(s)
                        </Badge>
                     </div>
                  </div>
                  <span className="flex items-center gap-2 text-sm">
                     Entrar <ArrowRight className="size-3" />
                  </span>
               </Link>
            ))}
         </CardContent>
      </Card>
   )
}
