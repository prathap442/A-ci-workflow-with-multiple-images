import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  // const div = document.createElement('div');
  // ReactDOM.render(<App />, div);
  // ReactDOM.unmountComponentAtNode(div);
  // I'm commenting out this particular app.test.js this test case because the test case has got the calling of the app component
  // the app component inturn tries to call the fib Component 
  // this Fib Component makes an api call to the backend so that the test case fails
  // at this what generally the people do is they mock out such kind of cases and then test the front end
  // this si the place where mocking plays a crucial role.
});
