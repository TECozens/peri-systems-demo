import {SeparatedHeading} from "../src/components/Util/SeparatedHeading/SeparatedHeading";
import {render, waitFor} from "@testing-library/react"
const regeneratorRuntime = require('regenerator-runtime')
import {
  getByRole,
  findByText,
  getByPlaceholderText,
} from '@testing-library/dom'
import React from "react";

// describe('Array', () => {
//   describe('#indexOf()', () => {
//     it('should return -1 when the value is not present', () => {
//       assert.strictEqual([1, 2, 3].indexOf(4), -1);
//     });
//   });
//   describe('ES6 Compatibility', () => {
//     it('should return true if compatible', () => {
//       assert.strictEqual([1, 2, 3].indexOf(4), -1);
//     });
//   });
//   describe('test component', () => {
//     // const a = render(<SeparatedHeading />)
//     console.log(a)
//   })
// });

test("doing something", async () => {
  const primaryText = 'Primary Heading'
  const secondaryText = 'Secondary Heading'
  const a = render(<SeparatedHeading primary={primaryText} secondary={secondaryText} />)
  const d = await waitFor(() => a.findByText(primaryText))
  console.log("yep", Object.keys(d))
  expect(d.type).toBe('h2')
})

// describe('asdasd', () => {
//   it('asdasyuhdjasd', async () => {
//     expect(await findByText(render(<SeparatedHeading primary='DOGSHUIT' secondary='asdasd' />), 'User Name Required')).toBeVisible()
//   })
// })