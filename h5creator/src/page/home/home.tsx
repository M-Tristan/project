import EditHead from './editHead'
import NavigationBar from './navigationBar'
import scope from './home.module.scss'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import OwnModel from '../ownmodel/OwnModel';
function Home() {
  let { path } = useRouteMatch();
  console.log(`${path}ownmodel`)
  return (
    <>
      <EditHead></EditHead>
      <NavigationBar></NavigationBar>
      <div className={scope['content']}>
        <Switch>
          <Route exact path={path}>
            <h3>Please select a topic.</h3>
          </Route>
          <Route path={`${path}/ownmodel`}>
            <OwnModel />
          </Route>
        </Switch>
      </div>
    </>
  )

}
export default Home