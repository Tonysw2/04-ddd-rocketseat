import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'

describe('Fetch Recent Questions', () => {
  let sut: FetchRecentQuestionsUseCase
  let questionsRepo: InMemoryQuestionsRepository

  beforeEach(() => {
    questionsRepo = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(questionsRepo)
  })

  it('should fetch questions ordered by most recent', async () => {
    await questionsRepo.create(
      makeQuestion({ createdAt: new Date('2022-01-01') }),
    )
    await questionsRepo.create(
      makeQuestion({ createdAt: new Date('2022-01-02') }),
    )
    await questionsRepo.create(
      makeQuestion({ createdAt: new Date('2022-01-03') }),
    )

    const result = await sut.execute({ page: 1 })

    expect(result.isRight()).toBe(true)
    expect(result.value).toHaveLength(3)
    expect(result.value).toEqual([
      expect.objectContaining({ createdAt: new Date('2022-01-03') }),
      expect.objectContaining({ createdAt: new Date('2022-01-02') }),
      expect.objectContaining({ createdAt: new Date('2022-01-01') }),
    ])
  })

  it('should return paginated questions', async () => {
    for (let i = 0; i < 22; i++) {
      await questionsRepo.create(makeQuestion())
    }

    const result = await sut.execute({ page: 2 })

    expect(result.isRight()).toBe(true)
    expect(result.value).toHaveLength(2)
  })
})
