// if a breaking change to the data format is made, `data-version`
// field in package.json should be increased, and a migration script should
// be implemented in `@editor/deserializer/deserializeRaw/migrations`

export const types = {
  p: 'paragraph',
  h1: 'heading-one',
  h2: 'heading-two',
  h3: 'heading-three',
  a: 'link',
  ul: 'bulleted-list',
  ol: 'numbered-list',
  li: 'list-item',
  q: 'blockquote',
  b: 'bold',
  i: 'italic',
  u: 'underline',
  s: 'strikethrough',
};

export const attrs = {
  p: () => ({ type: types.p }),
  h1: () => ({ type: types.h1 }),
  h2: () => ({ type: types.h2 }),
  h3: () => ({ type: types.h3 }),
  a: ({ href } = {}) => ({ type: types.a, href }),
  ul: () => ({ type: types.ul }),
  ol: () => ({ type: types.ol }),
  li: () => ({ type: types.li }),
  q: () => ({ type: types.q }),
  b: () => ({ [types.b]: true }),
  i: () => ({ [types.i]: true }),
  u: () => ({ [types.u]: true }),
  s: () => ({ [types.s]: true }),
};
