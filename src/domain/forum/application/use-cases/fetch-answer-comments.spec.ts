import { makeAnswer } from 'test/factories/make-answer'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'

describe('Fetch Answer Comments', () => {
  let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
  let inMemoryAnswersRepository: InMemoryAnswersRepository
  let sut: FetchAnswerCommentsUseCase

  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to fetch comments for an answer', async () => {
    const answer = makeAnswer()
    await inMemoryAnswersRepository.create(answer)

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: answer.id }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: answer.id }),
    )

    const { answerComments } = await sut.execute({
      answerId: answer.id.toString(),
      page: 1,
    })

    expect(answerComments).toHaveLength(2)
  })

  it('should return paginated comments for an answer', async () => {
    const answer = makeAnswer()
    await inMemoryAnswersRepository.create(answer)

    for (let i = 0; i < 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({ answerId: answer.id }),
      )
    }

    const { answerComments } = await sut.execute({
      answerId: answer.id.toString(),
      page: 2,
    })

    expect(answerComments).toHaveLength(2)
  })
})
