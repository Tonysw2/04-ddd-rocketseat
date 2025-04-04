import { makeQuestion } from 'test/factories/make-question'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'

describe('Fetch Question Comments', () => {
  let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository
  let sut: FetchQuestionCommentsUseCase

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to fetch comments for a question', async () => {
    const question = makeQuestion()
    await inMemoryQuestionsRepository.create(question)

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: question.id }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: question.id }),
    )

    const { questionComments } = await sut.execute({
      questionId: question.id.toString(),
      page: 1,
    })

    expect(questionComments).toHaveLength(2)
  })

  it('should return paginated comments for a question', async () => {
    const question = makeQuestion()
    await inMemoryQuestionsRepository.create(question)

    for (let i = 0; i < 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({ questionId: question.id }),
      )
    }

    const { questionComments } = await sut.execute({
      questionId: question.id.toString(),
      page: 2,
    })

    expect(questionComments).toHaveLength(2)
  })
})
