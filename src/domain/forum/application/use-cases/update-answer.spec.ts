import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { UpdateAnswerUseCase } from './update-answer'

let answersRepository: InMemoryAnswersRepository
let sut: UpdateAnswerUseCase

describe('UpdateAnswerUseCase', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()
    sut = new UpdateAnswerUseCase(answersRepository)
  })

  it('should update an answer', async () => {
    const newAnswer = makeAnswer()

    await answersRepository.create(newAnswer)

    const result = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newAnswer.authorId.toString(),
      content: 'Updated Content',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({ content: 'Updated Content' })
  })

  it('should not be able to update from another user', async () => {
    const newAnswer = makeAnswer()

    await answersRepository.create(newAnswer)

    const result = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'another author',
      content: 'Updated Content',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('should not be able to update with a wrong answer id', async () => {
    const newAnswer = makeAnswer()

    await answersRepository.create(newAnswer)

    const result = await sut.execute({
      answerId: 'wrong-answer-id',
      authorId: newAnswer.authorId.toString(),
      content: 'Updated Content',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
