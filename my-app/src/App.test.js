import AppContainer from './App';

it('renders learn react link', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppContainer/>, div)
  ReactDOM.unmountComponentAtNode(div)
})
