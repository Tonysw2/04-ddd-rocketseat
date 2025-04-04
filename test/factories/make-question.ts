import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import {
  Question,
  type QuestionProps,
} from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { faker } from '@faker-js/faker'

export const makeQuestion = (
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityId,
) => {
  return Question.create(
    {
      authorId: new UniqueEntityId(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      slug: Slug.create('new-question'),
      ...override,
    },
    id,
  )
}
