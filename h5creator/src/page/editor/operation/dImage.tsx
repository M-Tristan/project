/* eslint-disable react-hooks/exhaustive-deps */
import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { image } from '../../../interface/module'
import MathUtil from '../../../lib/MathUtil';
import Regulator from './regulator'
import Rotate from './rotate'
import './dImage.scss'
import { useDispatch, useSelector } from 'react-redux';
import edit from '../../../redux/edit';
import eventEmitter from '../../../lib/EventEmitter';

interface type {
  module: image
  edit?: boolean,
  animate?: any
}
function DImage(props: type) {
  const [module, setModule] = useState(props.module)
  let editcom = props.edit ? props.edit : false
  const [animate, setAnimate] = useState({} as CSSProperties)
  useEffect(() => {
    setModule({ ...props.module })
  }, [props.module.id])
  useEffect(() => {
    const changeModule = (id: string) => {
      if (id === module.id) {
        setModule({ ...props.module })
      }
    }
    eventEmitter.on('changeModule', changeModule)

    return () => {
      eventEmitter.off('changeModule', changeModule)
    }
  }, [module.id])

  useEffect(() => {
    let image = new Image();
    image.src = module.src;
    const nature = {
      naturalWidth: 0,
      naturalHeight: 0,
    };
    const draw = () => {
      if (editcom) {
        return
      }
      let crop = module.crop;
      if (!imageCanvas.current) {
        return
      }
      imageCanvas.current.setAttribute("width", String(crop.width));
      imageCanvas.current.setAttribute("height", String(crop.height));
      let ctx = imageCanvas.current.getContext("2d") as CanvasRenderingContext2D;
      ctx.clearRect(0, 0, crop.width, crop.height);
      ctx.drawImage(image, -crop.left, -crop.top);
      if (module.mask !== undefined && module.mask !== null) {
        let maskImage = new Image();
        maskImage.src = module.mask.src as string;
        maskImage.onload = () => {
          ctx.globalCompositeOperation = "destination-in";
          ctx.drawImage(maskImage, 0, 0, crop.width, crop.height);

        };
      }
    };
    image.onload = () => {
      nature.naturalWidth = image.naturalWidth;
      nature.naturalHeight = image.naturalHeight;
      draw();
    };
  }, [module.id])


  let editModule = edit.editModule
  let scale = useSelector((state: any) => state.H5Edit.scale)
  let moveScale = 100 / scale
  const dispatch = useDispatch()
  const imageSize = function () {
    let crop = module.crop;
    return MathUtil.getFullSize(
      module.width,
      module.height,
      crop.width / crop.height
    );
  }();


  useEffect(() => {
    let previewAnimate = props.animate
    if (previewAnimate) {
      setAnimate({
        animationName: previewAnimate.keyframe,
        animationDuration: `${previewAnimate.duration / 1000}s`
      })
    } else {
      if (animate) {
        setAnimate({})
      }
    }

  }, [props.animate])// eslint-disable-line react-hooks/exhaustive-deps
  const imageCanvas = useRef<HTMLCanvasElement>(null);


  const moduleMove = useCallback(() => {
    let module = props.module
    let event = window.event as MouseEvent
    let oriX = event.clientX
    let oriY = event.clientY
    let orileft = module.left
    let oritop = module.top
    dispatch({ type: 'setEditModule', moduleId: module.id })
    // let shouldPushBack = false
    window.onmousemove = (event: MouseEvent) => {
      let X = event.clientX
      let Y = event.clientY
      module.left = orileft + (X - oriX) * moveScale
      module.top = oritop + (Y - oriY) * moveScale
      eventEmitter.emit('changeModule', module.id)

    }
    window.onmouseup = () => {
      eventEmitter.emit('updateEditInfo', module.id)
      window.onmousemove = null
      window.onmouseup = null
      module.left = Math.round(module.left)
      module.height = Math.round(module.height)
      module.width = Math.round(module.width)
      module.top = Math.round(module.top)


    }
  }, [props.module, moveScale])
  let style = {
    width: module.width + 'px',
    height: module.height + 'px',
    left: module.left + 'px',
    top: module.top + 'px',
    transform: `rotate(${module.rotate ? module.rotate : 0}deg)`,
    zIndex: module.zindex,
  }
  return (<div
    onMouseDown={(e: React.MouseEvent) => { e.stopPropagation(); moduleMove() }}
    className="img-content"

    style={style}

  >
    <div style={{ ...animate, ...{ width: `100%`, height: `100%` } }}>

      <div
        className="image-border"
        style={{
          borderRadius: `${module.borderRadius}px`,
          filter: `blur(${module.blur}px) brightness(${module.filter.brightness}%) 
                  contrast(${module.filter.contrast}%) grayscale(${module.filter.grayscale}%) 
                  hue-rotate(${module.filter.hueRotate}deg) invert(${module.filter.invert}%) 
                  saturate(${module.filter.saturate}%)  drop-shadow(${module.dropshadowX}px ${module.dropshadowY}px ${module.dropshadowBlur}px  ${module.dropshadowColor} )`,
          width: module.width + 'px',
          height: module.height + 'px',
          opacity: module.opacity,
          transform: `rotateY(${module.rotateY ? 180 : 0}deg) rotateX(${module.rotateX ? 180 : 0
            }deg)`,
        }}
      >
        <canvas
          className="image"
          style={{
            width: imageSize.width + 'px',
            height: imageSize.height + 'px',
          }}
          ref={imageCanvas}
        ></canvas>
      </div>
      {
        (() => {
          if (editModule.id === module.id && editcom)
            return <> <Regulator module={module}></Regulator><Rotate module={module}></Rotate></>
        })()
      }

    </div>

  </div>
  )
}

export default DImage