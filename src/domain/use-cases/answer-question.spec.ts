import type { Answer } from '../entities/answer'
import type { AnswersRepository } from '../repositories/answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

const fakeAnswersRepository: AnswersRepository = {
  async create(data: Answer) {
    return
  },
}

test('it should be able to create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const { answer } = await answerQuestion.execute({
    content: 'Nova resposta',
    questionId: '1',
    instructorId: '1',
  })

  expect(answer.content).toEqual('Nova resposta')
})
