import { Input, Button, Row, Col, message } from 'antd';
import { useState } from 'react';
import ReactDOM from 'react-dom'
import scope from './LoginDialog.module.scss'
import Register from './Register'
import { login } from '../api/api'
function LoginDialog() {
  const [part, setPart] = useState(0)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const loginFunc = async () => {
    if (username === "") {
      message.error('用户名不能为空');
      return
    }
    if (username.length < 5) {
      message.error('用户名长度不能短于5');
      return
    }
    if (password === "") {
      message.error('密码不能为空');
      return
    }
    if (password.length < 5) {
      message.error('密码长度不能短于5');
      return
    }
    let res = await login({ username, password })
    if (res.code === 200) {
      message.success(res.msg);
      localStorage.setItem('token', res.token)
      api.close()
      window.location.reload()
    } else {
      message.error(res.msg);
    }
  }
  return (
    <>
      <div className={scope['mask']} onClick={() => { api.close() }}></div>
      <div className={scope['LoginDialog']}>
        <div className={scope['head']}>
          LOGO
        </div>
        {/* <i className={classnames("icon", "iconfont", "icon-xianquanguanbi", scope["close-button"])}></i> */}
        {
          (() => {
            if (part === 0) {
              return <div className={scope['form']}>
                <Row gutter={[0, 20]} align='middle' justify='center'>
                  <Col span={4} >用户名:</Col>
                  <Col span={20}><Input value={username} onInput={(value) => { setUsername((value.target as HTMLInputElement).value) }} /></Col>
                  <Col span={4}>密码:</Col>
                  <Col span={20}><Input.Password value={password} onInput={(value) => { setPassword((value.target as HTMLInputElement).value) }} /></Col>
                </Row>
                <div className={scope['button-area']}>
                  <Button onClick={loginFunc} type="primary" block>
                    登录
                  </Button>
                </div>
                <div className={scope['number-edit']}>
                  <span>忘记密码</span>
                  <span onClick={() => {
                    setPart(1)
                  }}>注册</span>
                </div>
              </div>
            } else {
              return <Register backToLogin={() => { setPart(0) }}></Register>
            }
          })()
        }



      </div>
    </>
  )
}

let dom: HTMLDivElement
const api = {
  show() {
    if (dom) {
      ReactDOM.unmountComponentAtNode(dom)
    }

    dom = document.createElement('div')
    document.body.appendChild(dom)
    ReactDOM.render(<LoginDialog></LoginDialog>, dom)
  },
  close() {
    ReactDOM.unmountComponentAtNode(dom)
  }
}
export default api