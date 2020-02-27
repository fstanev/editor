import * as types from '@config/types';
import deserializeHtml from '@editor/deserializer/deserializeHtml';

describe('deserialize html: p', () => {

  // ****
  test('deserialize works with single paragraph', () => {

    const output = deserializeHtml`
      <p>test</p>
    `;

    expect(output).toEqual([{
      type: types.PARAGRAPH,
      children: [{ text: 'test' }]
    }]);
  });

  // ****
  test('deserialize works with nested paragraph', () => {

    const output = deserializeHtml`
      <div>
        <div>
          <div>
            <p>test</p>
          </div>
        </div>
      </div>
    `;

    expect(output).toEqual([{
      type: types.PARAGRAPH,
      children: [{ text: 'test' }]
    }]);
  });

  // ****
  test('deserialize works with multiple nested paragraphs', () => {

    const output = deserializeHtml`
      <div>
        <p>test1</p>
        <p>test2</p>
        <p>test3</p>
      </div>
    `;

    expect(output).toEqual([
      { type: types.PARAGRAPH, children: [{ text: 'test1' }] },
      { type: types.PARAGRAPH, children: [{ text: 'test2' }] },
      { type: types.PARAGRAPH, children: [{ text: 'test3' }] },
    ]);
  });

});
