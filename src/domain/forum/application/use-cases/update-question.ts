import type { Question } from '../../enterprise/entities/question'
import type { QuestionsRepository } from '../repositories/questions-repository'

interface UpdateQuestionUseCaseRequest {
  questionId: string
  authorId: string
  title: string
  content: string
}

interface UpdateQuestionUseCaseResponse {
  question: Question
}

export class UpdateQuestionUseCase {
  constructor(private questionsRepo: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: UpdateQuestionUseCaseRequest): Promise<UpdateQuestionUseCaseResponse> {
    const question = await this.questionsRepo.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('Not allowed.')
    }

    question.title = title
    question.content = content

    await this.questionsRepo.update(question)

    return {
      question,
    }
  }
}
