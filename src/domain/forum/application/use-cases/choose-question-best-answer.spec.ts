import { makeAnswer } from 'test/factories/make-answer'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'

let questionsRepository: InMemoryQuestionsRepository
let answersRepository: InMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    answersRepository = new InMemoryAnswersRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      questionsRepository,
      answersRepository,
    )
  })

  it('should choose the best answer for a question', async () => {
    const newQuestion = makeQuestion()
    const newAnswer = makeAnswer({
      questionId: newQuestion.id,
    })

    await questionsRepository.create(newQuestion)
    await answersRepository.create(newAnswer)

    const { question } = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newQuestion.authorId.toString(),
    })

    expect(question.bestAnswerId).toEqual(newAnswer.id)
  })

  it('should not be able to choose the best answer for a question from another user', async () => {
    const newQuestion = makeQuestion()
    const newAnswer = makeAnswer({
      questionId: newQuestion.id,
    })

    await questionsRepository.create(newQuestion)
    await answersRepository.create(newAnswer)

    await expect(
      sut.execute({
        authorId: 'anotherUserId',
        answerId: newAnswer.id.toString(),
      }),
    ).rejects.instanceOf(Error)
  })
})
