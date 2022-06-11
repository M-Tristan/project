
import ReactDOM from 'react-dom';
import './index.css';
import './assets/css/animate.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import Edit from './page/editor/Edit'
import Home from './page/home/home'
import reportWebVitals from './reportWebVitals';
import './assets/iconfont/iconfont.css'
import 'antd/dist/antd.css';
// import 'default-passive-events'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

ReactDOM.render(
  // <React>
  <Provider store={store}>
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Redirect to="/index" />
          </Route>

          <Route path="/index">
            <Home></Home>
          </Route>
          <Route path="/edit">
            <Edit />
          </Route>
        </Switch>
      </div>
    </Router>
  </Provider>,

  // </React>, 

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
