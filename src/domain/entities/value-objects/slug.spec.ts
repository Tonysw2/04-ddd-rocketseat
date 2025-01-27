import { Slug } from './slug'

test('it should be able to create a new slug from text', () => {
  const slug = Slug.createFromText('Uma Campanha engraçada piá')

  expect(slug.value).toEqual('uma-campanha-engracada-pia')
})
