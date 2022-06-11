import scope from './pagemoveIcon.module.scss'
interface type {
  onClick: Function
}
function PageMoveIcon(props: type) {
  return (
    <div className={scope['PageMoveIcon']} onClick={() => { props.onClick() }}>
      <i className={`icon iconfont icon-zhankai ${scope['narrowone']} `}></i>
      <i className={`icon iconfont icon-zhankai ${scope['narrowtow']} `}></i>
      <i className={`icon iconfont icon-zhankai ${scope['narrowthree']} `}></i>
      <i className={`icon iconfont icon-zhankai ${scope['narrowfour']} `}></i>
    </div>
  )
}

export default PageMoveIcon