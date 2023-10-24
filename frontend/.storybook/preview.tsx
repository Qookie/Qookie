import React from 'react';
import type { Preview } from '@storybook/react';
import GlobalStyle from '../src/styles/GlobalStyle';

export const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators = [
  (Story) => (
    <>
      <GlobalStyle />
      <Story />
    </>
  ),
];
