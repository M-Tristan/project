import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import MathUtil from '../../../lib/MathUtil'
import PositionUtil from '../../../lib/PositionUtil'
import edit, { EditUtil } from '../../../redux/edit'
import scope from './clipper.module.scss'
import ClipperRegulator from './clipperRegulator'
/* eslint-disable react-hooks/exhaustive-deps */
function Clipper() {
  const [editModule, setEditModule] = useState(_.cloneDeep(edit.editModule))
  const [showImage, setShowImage] = useState(_.cloneDeep(edit.editModule))
  const [showBack, setShowBack] = useState(false)
  const dispatch = useDispatch()
  let crop = PositionUtil.getClipInfo(
    editModule.width,
    editModule.height,
    editModule.crop
  );

  useEffect(() => {


    let imageScale = editModule.width / crop.width;
    showImage.oriTop = showImage.top;
    showImage.oriLeft = showImage.left;
    showImage.showTop = crop.top * imageScale;
    showImage.showLeft = crop.left * imageScale;
    let image = new Image();
    image.src = editModule.src;
    image.onload = () => {
      showImage.showWidth = image.naturalWidth * imageScale;
      showImage.showHeigth = image.naturalHeight * imageScale;
      let innerCenter = PositionUtil.getCenterPosition(
        showImage.showLeft,
        showImage.showTop,
        showImage.width,
        showImage.height
      );
      let hypotenuse = MathUtil.getHypotenuse(
        innerCenter.left - showImage.showWidth / 2,
        showImage.showHeigth / 2 - innerCenter.top
      );
      let innerAngle = 0;
      if (showImage.showHeigth / 2 - innerCenter.top !== 0) {
        innerAngle = MathUtil.atan(
          (showImage.showHeigth / 2 - innerCenter.top) /
          (innerCenter.left - showImage.showWidth / 2)
        );
      }
      if (innerCenter.left - showImage.showWidth / 2 < 0) {
        innerAngle += 180;
      }
      let showCenter = PositionUtil.getCenterPosition(
        showImage.left,
        showImage.top,
        showImage.width,
        showImage.height
      );
      let centerPosition = PositionUtil.getPositionbyOther(
        innerAngle - showImage.rotate,
        hypotenuse,
        showCenter
      );
      let realPosition = PositionUtil.getPositionByCenter(
        centerPosition.left,
        centerPosition.top,
        showImage.showWidth,
        showImage.showHeigth
      );
      editModule.top = realPosition.top;
      editModule.left = realPosition.left;
      setShowBack(true)
      setEditModule({ ...editModule })
      setShowImage({ ...showImage })
    };
  }, [])

  let backStyle = {
    width: showImage.showWidth + 'px',
    height: showImage.showHeigth + 'px',
    top: editModule.top + 'px',
    left: editModule.left + 'px',
    transform: `rotate(${editModule.rotate ? editModule.rotate : 0}deg)`,
  }
  let imageStyle = {
    width: showImage.showWidth + 'px',
    height: showImage.showHeigth + 'px',
    transform: `rotateY(${editModule.rotateY ? 180 : 0}deg) rotateX(${editModule.rotateX ? 180 : 0}deg)`,
  }
  let displayStyle = {
    width: showImage.width + 'px',
    height: showImage.height + 'px',
    top: showImage.top + 'px',
    left: showImage.left + 'px',
    transform: `rotate(${showImage.rotate ? showImage.rotate : 0}deg)`,
  }
  let displayImageStyle = {
    width: showImage.showWidth + 'px',
    height: showImage.showHeigth + 'px',
    top: `${-showImage.showTop}px`,
    left: `${-showImage.showLeft}px`,
    transform: `rotateY(${showImage.rotateY ? 180 : 0}deg) rotateX(${showImage.rotateX ? 180 : 0
      }deg)`,
  }
  const buttonInfo = (() => {
    return PositionUtil.getPosition(
      showImage.left + showImage.width / 2,
      showImage.top + showImage.height / 2,
      showImage.width,
      showImage.height,
      showImage.rotate
    );
  })();
  let buttonStyle = {
    top: `${buttonInfo.most.minTop - 50}px`,
    left: `${(buttonInfo.most.minLeft + buttonInfo.most.maxLeft) / 2}px`,
  }

  const ensureClip = () => {
    let image = new Image();
    image.src = showImage.src;
    image.onload = () => {
      let imageEdit = EditUtil.getModuleById(showImage.id) as any;
      let rateW = crop.width / editModule.width;
      let rateY = crop.height / editModule.height;
      imageEdit.crop = {
        width: showImage.width * rateW,
        height: showImage.height * rateY,
        left: showImage.showLeft * rateW,
        top: showImage.showTop * rateY,
      };
      imageEdit.top = showImage.top;
      imageEdit.left = showImage.left;
      imageEdit.width = showImage.width;
      imageEdit.height = showImage.height;

      dispatch({ type: "setClipOper", value: false })

    };
  }
  // console.log(displayImageStyle)
  let back = showBack ? <div
    className={scope["clipper"]}
    style={backStyle}
  >
    <img
      draggable="false"
      className={scope["image"]}
      src={showImage.src}
      style={imageStyle}
      alt='加载失败'
    />
    <div className={scope["org-image-area"]}></div>
  </div> : <></>

  let showImageDom = <div
    className={scope["showImage"]}
    style={displayStyle}
  >
    <div className={scope["image-content"]}>
      <img
        draggable="false"
        className={scope["display-image"]}
        src={showImage.src}
        style={displayImageStyle}
        alt='加载失败'
      />
    </div>
    <ClipperRegulator module={showImage} onChange={(value: any) => { setShowImage({ ...value }) }}></ClipperRegulator>
  </div>
  return (
    <>
      {back}
      {showImageDom}
      <div
        className={scope["button-area"]}
        style={buttonStyle}
      >
        <div className={scope["ensure-button"]} onClick={ensureClip}>
          <i className="icon iconfont icon-gouxuan"></i>
        </div>
      </div>
    </>
  )


}
export default Clipper