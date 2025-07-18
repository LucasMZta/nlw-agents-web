import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import type {
   CreateQuestionRequest,
   CreateQuestionResponse,
   GetRoomQuestionsResponse,
} from './types/questions'

export function useCreateQuestion(roomId: string) {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: async (data: CreateQuestionRequest) => {
         const result: CreateQuestionResponse = await api.post(`/rooms/${roomId}/questions`, data)
         return result
      },
      //executa no momento que for feita a chamada para a API
      onMutate: ({ question }) => {
         const questions = queryClient.getQueryData<GetRoomQuestionsResponse>([
            'get-questions',
            roomId,
         ])

         const questionsArray = questions ?? []
         const newQuestion = {
            id: crypto.randomUUID(),
            question,
            answer: null,
            createdAt: new Date().toISOString(),
            isGeneratingAnswer: true,
         }
         queryClient.setQueryData<GetRoomQuestionsResponse>(
            ['get-questions', roomId],
            [newQuestion, ...questionsArray]
         )
         return { newQuestion, questions }
      },
      onSuccess: (data, _variables, context) => {
         // queryClient.invalidateQueries({ queryKey: ['get-questions', roomId] })
         queryClient.setQueryData<GetRoomQuestionsResponse>(
            ['get-questions', roomId],
            (questions) => {
               if (!questions) {
                  return questions
               }
               if (!context.questions) {
                  return questions
               }

               return questions.map((question) => {
                  if (question.id === context.newQuestion.id) {
                     return {
                        ...context.newQuestion,
                        id: context.newQuestion.id,
                        answer: data.answer,
                        isGeneratingAnswer: false,
                     }
                  }

                  return question
               })
            }
         )
      },
      onError: (_error, _variables, context) => {
         if (context?.questions) {
            queryClient.setQueryData<GetRoomQuestionsResponse>(
               ['get-questions', roomId],
               context.questions
            )
         }
      },
   })
}
