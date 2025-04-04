import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'

describe('Comment On Question Use Case', () => {
  let questionCommentsRepository: InMemoryQuestionCommentsRepository
  let questionsRepository: InMemoryQuestionsRepository
  let sut: CommentOnQuestionUseCase

  beforeEach(() => {
    questionCommentsRepository = new InMemoryQuestionCommentsRepository()
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new CommentOnQuestionUseCase(
      questionsRepository,
      questionCommentsRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const question = makeQuestion()

    await questionsRepository.create(question)

    const { questionComment } = await sut.execute({
      authorId: question.id.toString(),
      questionId: question.id.toString(),
      content: 'test comment',
    })

    expect(questionComment.content).toEqual('test comment')
  })
})
