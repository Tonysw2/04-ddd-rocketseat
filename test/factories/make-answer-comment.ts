import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { faker } from '@faker-js/faker'

export function makeAnswerComment(
  override: Partial<AnswerComment> = {},
  id?: UniqueEntityId,
): AnswerComment {
  return AnswerComment.create(
    {
      authorId: new UniqueEntityId(),
      answerId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )
}
