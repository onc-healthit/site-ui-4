import renderer from 'react-test-renderer';
import React from 'react'
import Button from '@mui/material/Button'
import ArchiveFilter from './ArchiveFilter';

jest.mock('@mui/material/Button');

const renderTree = tree => renderer.create(tree);
describe('<ArchiveFilter>', () => {
  it('should render component', () => {
    expect(renderTree(<ArchiveFilter 
    />).toJSON()).toMatchSnapshot();
  });
  
});