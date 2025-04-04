import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { faker } from '@faker-js/faker'

export function makeQuestionComment(
  override: Partial<QuestionComment> = {},
  id?: UniqueEntityId,
): QuestionComment {
  return QuestionComment.create(
    {
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )
}
