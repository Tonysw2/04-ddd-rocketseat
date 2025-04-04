import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'

describe('Comment On Answer Use Case', () => {
  let answerCommentsRepository: InMemoryAnswerCommentsRepository
  let answersRepository: InMemoryAnswersRepository
  let sut: CommentOnAnswerUseCase

  beforeEach(() => {
    answerCommentsRepository = new InMemoryAnswerCommentsRepository()
    answersRepository = new InMemoryAnswersRepository()
    sut = new CommentOnAnswerUseCase(
      answersRepository,
      answerCommentsRepository,
    )
  })

  it('should be able to comment on answer', async () => {
    const answer = makeAnswer()

    await answersRepository.create(answer)

    const { answerComment } = await sut.execute({
      authorId: answer.id.toString(),
      answerId: answer.id.toString(),
      content: 'test comment',
    })

    expect(answerComment.content).toEqual('test comment')
  })
})
