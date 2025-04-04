import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import {
  Answer,
  type AnswerProps,
} from '@/domain/forum/enterprise/entities/answer'
import { faker } from '@faker-js/faker'

export const makeAnswer = (
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityId,
) => {
  return Answer.create(
    {
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )
}
