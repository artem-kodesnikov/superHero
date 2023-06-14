export interface Hero {
  _id: string,
  nickname: string,
  real_name: string,
  origin_description: string,
  superpowers: string,
  catch_phrase: string,
  images: { _id?: string, url: string }[]
}