import scope from './Register.module.scss'
import { Input, Button, Row, Col, message } from 'antd';
import { useState } from 'react';
import { register } from '../api/api'

interface type {
  backToLogin: Function
}
function Register(props: type) {
  const backToLogin = props.backToLogin
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rePassword, setrRePassword] = useState("")
  const registeredAccount = async () => {
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
    if (rePassword === "") {
      message.error('请再次输入密码');
      return
    }
    if (rePassword !== password) {
      message.error('两次密码不一致');
      return
    }
    let res = await register({ username, password })
    if (res.code === 200) {
      message.success(res.msg);
      backToLogin()
    } else {
      message.error(res.msg);
    }

  }
  return (
    <div className={scope['form']}>
      <Row gutter={[0, 20]} align='middle' justify='center'>
        <Col span={4}>用户名:</Col>
        <Col span={20}><Input value={username} onInput={(value) => { setUsername((value.target as HTMLInputElement).value) }} /></Col>
        <Col span={4}>密码:</Col>
        <Col span={20}><Input.Password value={password} onInput={(value) => { setPassword((value.target as HTMLInputElement).value) }} /></Col>
        <Col span={4}>确认密码:</Col>
        <Col span={20}><Input.Password value={rePassword} onInput={(value) => { setrRePassword((value.target as HTMLInputElement).value) }} /></Col>
      </Row>
      <div className={scope['button-area']}>
        <Button type="primary" block onClick={registeredAccount}>
          注册
        </Button>
      </div>
      <div className={scope['number-edit']}>
        <span>忘记密码</span>
        <span onClick={() => {
          backToLogin()
        }}>返回</span>
      </div>
    </div>
  )
}

export default Register