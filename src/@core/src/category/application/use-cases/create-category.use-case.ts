import { CategoryRepository } from "#category/domain/repository/category.repository"
import { Category } from "#category/domain/entities/category"
import { CategoryOutput, CategoryOutputMapper } from '../dto/category-output'
import { default as DefaultUseCase } from "#seedwork/application/use-case"

export namespace CreateCategoryUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private categoryRepo: CategoryRepository.Repository) { }

    async execute(input: Input): Promise<Output> {
      const entity = new Category(input)
      await this.categoryRepo.insert(entity)

      return CategoryOutputMapper.toOutput(entity)
    }
  }

  //DTO - Data Transfer Object
  export type Input = {
    name: string
    description?: string
    is_active?: boolean
  }

  export type Output = CategoryOutput
}

export default CreateCategoryUseCase