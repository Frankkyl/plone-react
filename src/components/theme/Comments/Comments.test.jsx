import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import Comments from './Comments';

const mockStore = configureStore();

jest.mock('moment', () =>
  jest.fn(() => ({
    format: jest.fn(() => 'Sunday, April 23, 2017 3:38 AM'),
    fromNow: jest.fn(() => 'a few seconds ago'),
  })),
);

describe('Comments', () => {
  it('renders a comments component', () => {
    const store = mockStore({
      comments: {
        items: [
          {
            '@id': 'someurl',
            author_name: 'admin',
            creation_date: '2017-11-06T19:36:01',
            text: { data: 'Some comment' },
            is_deletable: true,
            is_editable: true,
          },
        ],
        add: {
          loading: false,
          loaded: true,
        },
        delete: {
          loading: false,
          loaded: true,
        },
        edit: {
          loading: false,
          loaded: true,
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Comments pathname="/blog" />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});