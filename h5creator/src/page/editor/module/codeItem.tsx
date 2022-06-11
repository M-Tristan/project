/* eslint-disable react-hooks/exhaustive-deps */
import codeItemScss from './codeItem.module.scss'
import * as QRCode from 'qrcode';
import { useEffect, useRef } from 'react';
import ModuleUtil from '../../../lib/ModuleUtil';
import { useDispatch } from 'react-redux';
interface option {
  width: number,
  color: {
    dark: string,
    light: string,
  },
  backImage?: string
}
function CodeItem(props: { option: option }) {
  const codeRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  useEffect(() => {
    QRCode.toCanvas('二维码编辑', props.option, (err: any, canvas: any) => {
      (codeRef.current as HTMLDivElement).append(canvas)
      if (err) throw err;
    });
    return () => {

    };
  }, []);
  const addCode = async () => {
    let codeInfo = await ModuleUtil.getAddCodeInfo({
      text: "二维码编辑",
      colorDark: props.option.color.dark,
      colorLight: props.option.color.light,
      backImage: props.option.backImage,
    });
    dispatch({ type: "addCode", 'code': codeInfo })
  };
  let backImage
  if (props.option.backImage) {
    backImage = <img className={codeItemScss.backImage} src={props.option.backImage} alt='加载失败' />
  }
  return (

    <div className={codeItemScss.code} ref={codeRef} onClick={addCode}>
      {backImage}
    </div>
  )
}

export default CodeItem