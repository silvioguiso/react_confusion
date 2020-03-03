import React, {Component} from 'react';
import Main from './components/MainComponent'
import './App.css';

//Routing
import { BrowserRouter} from 'react-router-dom'

//Redux
import { Provider } from 'react-redux'
import { ConfigureStore } from './redux/configureStore'

class App extends Component{

  render() {

    const store = ConfigureStore();

    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
              <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;