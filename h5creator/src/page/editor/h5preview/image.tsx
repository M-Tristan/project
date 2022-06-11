/* eslint-disable react-hooks/exhaustive-deps */
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { image } from '../../../interface/module'
import MathUtil from '../../../lib/MathUtil';

interface type {
  module: image,
  play: boolean
}
function PImage(props: type) {
  const [module] = useState(props.module)

  useEffect(() => {
    let image = new Image();
    image.src = module.src;
    const nature = {
      naturalWidth: 0,
      naturalHeight: 0,
    };
    const draw = () => {

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
    return () => { }
  }, [module.id])


  const [animate, setAnimate] = useState({} as CSSProperties)
  let stopAnimate = false
  useEffect(() => {
    if (props.play) {
      implementAnimate()
    } else {
      setAnimate({
      })
    }

    return () => {
      stopAnimate = true
    }
  }, [module.animates, props.play])
  const implementAnimate = async () => {
    if (stopAnimate) {
      return
    }
    if (!module.animates) {
      return;
    }
    let enterAnimate = module.animates.find(
      (item: any) => item.type === "enter"
    );
    if (enterAnimate) {
      let duration = enterAnimate.duration
      setAnimate({
        animationName: enterAnimate.keyframe,
        animationDuration: `${enterAnimate.duration / 1000}s`,
      })
      await new Promise<void>((res, rej) => {
        setTimeout(() => {
          res();
        }, duration);
      });
    }
    if (stopAnimate) {
      return
    }
    let emphasizeAnimate = module.animates.find(
      (item: any) => item.type === "emphasize"
    );
    if (emphasizeAnimate) {
      let duration = emphasizeAnimate.duration
      setAnimate({
        animationName: emphasizeAnimate.keyframe,
        animationDuration: `${emphasizeAnimate.duration / 1000}s`,
      })
      await new Promise<void>((res, rej) => {
        setTimeout(() => {
          res();
        }, duration);
      });
    }
    if (stopAnimate) {
      return
    }
    let leaveAnimate = module.animates.find(
      (item: any) => item.type === "leave"
    );
    if (leaveAnimate) {
      let duration = leaveAnimate.duration
      setAnimate({
        animationName: leaveAnimate.keyframe,
        animationDuration: `${leaveAnimate.duration / 1000}s`,

      })
      await new Promise<void>((res, rej) => {
        setTimeout(() => {
          res();
        }, duration);
      });
      setAnimate({
        opacity: 0

      })
    }
  }
  const imageSize = function () {
    let crop = module.crop;
    return MathUtil.getFullSize(
      module.width,
      module.height,
      crop.width / crop.height
    );
  }();
  const imageCanvas = useRef<HTMLCanvasElement>(null);
  let style: CSSProperties = {
    width: module.width + 'px',
    height: module.height + 'px',
    left: module.left + 'px',
    top: module.top + 'px',
    transform: `rotate(${module.rotate ? module.rotate : 0}deg)`,
    zIndex: module.zindex,
    position: `absolute`,
    display: `inline-block`,
    userSelect: `none`
  }

  return (<div style={style}>
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
          transform: `rotateY(${module.rotateY ? 180 : 0}deg) rotateX(${module.rotateX ? 180 : 0}deg)`,
          position: `absolute`,
          top: `0`,
          left: `0`,
          overflow: `hidden`,
          boxSizing: `content-box`
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


    </div>

  </div>
  )
}

export default PImage
