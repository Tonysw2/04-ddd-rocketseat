import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'

describe('Fetch Question Answers', () => {
  let sut: FetchQuestionAnswersUseCase
  let answersRepo: InMemoryAnswersRepository

  beforeEach(() => {
    answersRepo = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(answersRepo)
  })

  it('should fetch answers by question id', async () => {
    await answersRepo.create(
      makeAnswer({ questionId: new UniqueEntityId('question-1') }),
    )
    await answersRepo.create(
      makeAnswer({ questionId: new UniqueEntityId('question-1') }),
    )

    const result = await sut.execute({ page: 1, questionId: 'question-1' })

    expect(result.isRight()).toBe(true)
    expect(result.value).toHaveLength(2)
    expect(result.value).toEqual([
      expect.objectContaining({ questionId: new UniqueEntityId('question-1') }),
      expect.objectContaining({ questionId: new UniqueEntityId('question-1') }),
    ])
  })

  it('should return paginated question answers', async () => {
    for (let i = 0; i < 22; i++) {
      await answersRepo.create(
        makeAnswer({ questionId: new UniqueEntityId('question-1') }),
      )
    }

    const result = await sut.execute({ questionId: 'question-1', page: 2 })

    expect(result.isRight()).toBe(true)
    expect(result.value).toHaveLength(2)
  })
})
