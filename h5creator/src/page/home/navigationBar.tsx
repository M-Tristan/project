import scope from './navigationBar.module.scss'
import { EditUtil } from '../../redux/edit'
import { Button, message } from 'antd';
import { saveJson, addTemplate } from '../../api/api'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import classnames from 'classnames';
// import { useHistory } from 'react-router-dom';

function NavigationBar() {
  let { url } = useRouteMatch();
  const history = useHistory()
  const local = useLocation()
  // console.log(local)
  let activeness = function active(bool: boolean) {
    if (bool) {
      return scope['active']
    } else {
      return ''
    }
  }

  const creatingWork = async () => {
    try {
      let res = await saveJson({ json: EditUtil.getNewPageJson() })
      let jsonId = res.id
      let modelres = await addTemplate({ jsonId, name: '新建模板', type: 'h5', coverImg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAPklEQVR4nO3BMQEAAADCoPVPbQsvoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgKcBnKQAAaZ1lY4AAAAASUVORK5CYII=' })

      window.open(`#/edit?id=${modelres.id}`, '_blank')
    } catch (err: any) {
      message.error(err.msg)
    }
  }
  return (
    <div className={scope["NavigationBar"]}>
      <div className={scope["create-button"]}>
        <Button type="primary" size='large' onClick={creatingWork}>
          <i className="icon iconfont icon-jia"></i>创建作品
        </Button>
      </div>
      <ul className={scope["Navigation-list"]}>
        <li className={scope["Navigation-item"]}>模板中心</li>
        {/* <NavLink to={`${url}/ownmodel`}> */}
        <li onClick={() => { history.push(`${url}/ownmodel`) }} className={classnames(scope['Navigation-item'], activeness(local.pathname === `${url}/ownmodel`))} >我的作品</li>
        {/* </NavLink> */}



        <li className={scope["Navigation-item"]}>我的素材</li>
      </ul>
    </div>
  )
}

export default NavigationBar