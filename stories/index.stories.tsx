import Reactfrom 'react';

import { HiroApp } from '../src';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

storiesOf('HiroApp', module).add('Default', () => (
  <HiroApp>Hello world!</HiroApp>
));

storiesOf('HiroApp', module).add('Theme', () => (
  <HiroApp theme="saas" ready={action('Theme loaded!')}>
    Hello world!
  </HiroApp>
));
