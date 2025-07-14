/** biome-ignore-all lint/suspicious/noConsole: <no> */
import { useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { uploadAudioAPI } from '@/utils/mutations'

//const para verificar se a versão do navegador do usuario suporte a API de recording ou não (!! significa Boolean())
const isRecordingSuported =
   !!navigator.mediaDevices &&
   typeof navigator.mediaDevices.getUserMedia === 'function' &&
   typeof window.MediaRecorder === 'function'

type RoomParams = {
   roomId: string
}
export function RecordRoomAudio() {

   const params = useParams<RoomParams>()

   const [isRecordind, setIsRecording] = useState(false)
   const recorder = useRef<MediaRecorder | null>(null)
   const intervalRef = useRef<NodeJS.Timeout>(null)

   if (!params.roomId) {
      return <Navigate replace to="/" />
   }

   function stopRecording() {
      setIsRecording(false)
      if (recorder.current && recorder.current.state !== 'inactive') {
         recorder.current.stop()
      }

      if (intervalRef.current) {
         clearInterval(intervalRef.current)
      }
   }

   async function uploadAudio(audio: Blob) {
      const formData = new FormData()

      formData.append('file', audio, 'audio.webm')

      if (!params.roomId) {
         return
      }

      const result = await uploadAudioAPI(params.roomId, formData)

      console.log(result);

   }

   function createRecorder(audio: MediaStream) {
      recorder.current = new MediaRecorder(audio, {
         mimeType: 'audio/webm',
         audioBitsPerSecond: 64_000,
      })

      recorder.current.ondataavailable = (event) => {
         if (event.data.size > 0) {
            console.log(event.data)
            uploadAudio(event.data)
         }
      }

      recorder.current.onstart = () => {
         console.log('Gravação iniciada...')
      }

      recorder.current.onstop = () => {
         console.log('Gravação pausada/encerrada...')
      }

      recorder.current.start()
   }

   async function startRecording() {
      if (!isRecordingSuported) {
         alert('Seu navegador nao suporta gravacao de audio')
         return
      }

      setIsRecording(true)
      const audio = await navigator.mediaDevices.getUserMedia({
         audio: {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 44_100,
         },
      })

      createRecorder(audio)

      intervalRef.current = setInterval(() => {
         recorder.current?.stop()
         createRecorder(audio)
      }, 5000);
   }

   return (
      <div className="flex h-screen flex-col items-center justify-center gap-3">

         {isRecordind ? (
            <>
               <Button onClick={stopRecording}>Parar Gravação</Button>
               <p>Gravando...</p>
            </>

         )
            : (
               <>
                  <Button onClick={startRecording}>Gravar Audio</Button>
                  <p>Pausado...</p>
               </>

            )
         }

      </div>
   )
}
