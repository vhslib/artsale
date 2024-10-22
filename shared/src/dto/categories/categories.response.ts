import type { Category } from '../../entities/category.js'
import type { GenericResponse } from '../../generic-response.js'

export interface CategoriesResponse extends GenericResponse<'Ok'> {
    categories: Category[]
}
