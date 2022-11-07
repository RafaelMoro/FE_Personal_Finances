/** @jsxImportSource @emotion/react */
import { Global } from '@emotion/react'
import { GlobalStyles } from '../src/styles'

const withGlobalProvider = (Story) => (
  <>
    <Global styles={GlobalStyles} />
    <Story />
  </>
)

export const decorators = [withGlobalProvider]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}