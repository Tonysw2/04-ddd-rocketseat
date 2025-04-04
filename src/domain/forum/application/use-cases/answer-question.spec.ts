import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Answer Question', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to answer a question', async () => {
    const newAnswer = {
      content: 'new answer',
      authorId: new UniqueEntityId('instructor-id'),
      questionId: new UniqueEntityId('question-id'),
    }

    const { answer } = await sut.execute({
      content: 'new answer',
      instructorId: 'instructor-id',
      questionId: 'question-id',
    })

    expect(answer.id).toBeTruthy()
    expect(newAnswer.content).toEqual(answer.content)
  })
})
