import { array, object, string } from 'yup';

export const heroValidationSchema = object({
  nickname: string().required().min(3, 'must be at least 3 characters long').max(30, 'must be no longer than 30'),
  real_name: string().required(),
  origin_description: string().required(),
  superpowers: string().required(),
  catch_phrase: string().required(),
  images: array().of(
    object().shape({
      url: string().required()
    })
  )
});