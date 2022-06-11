
import { useDispatch, useSelector } from 'react-redux'
import './zoom.scss'
function Zoom() {
  const scale = useSelector((state: any) => state.H5Edit.scale)
  const dispatch = useDispatch()
  const increase = () => {
    if (scale >= 400) {
      return;
    }
    if (scale < 10) {
      dispatch({ type: "setScale", value: scale + 1 });
      return;
    }
    dispatch({ type: "setScale", value: scale + 10 });
  };

  const reduce = () => {
    if (scale <= 1) {
      return;
    }
    if (scale < 20 && scale > 10) {
      dispatch({ type: "setScale", value: 10 });
    }
    if (scale <= 10) {
      dispatch({ type: "setScale", value: scale - 1 });
      return;
    }
    dispatch({ type: "setScale", value: scale - 10 });
  };
  return (
    <div className='InputNumber'>
      <div>
        <i onClick={reduce} className='icon iconfont icon-jian'></i>
      </div>
      <div>{scale}</div>
      <div>

        <i onClick={increase} className='icon iconfont icon-jia'></i>
      </div>
    </div>
  )
}
export default Zoom