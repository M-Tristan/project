
import { useSelector } from 'react-redux';
import scope from './clipperRegulator.module.scss'
interface type {
  module: any,
  changeWidth?: Function,
  minHeight?: number,
  minWidth?: number,
  onChange: Function
}
function ClipperRegulator(props: type) {
  let module = props.module
  // const dispatch = useDispatch()
  let cursor = function () {
    let result: any = {};
    if (
      (module.rotate < 25 && module.rotate >= 0) ||
      (module.rotate < 360 && module.rotate >= 340)
    ) {
      result.leftTop = "nw-resize";
      result.middleTop = "n-resize";
      result.rightTop = "ne-resize";
      result.rightMiddle = "e-resize";
      result.rightDown = "nw-resize";
      result.middleDown = "n-resize";
      result.leftDown = "ne-resize";
      result.leftMiddle = "e-resize";
    }
    if (module.rotate < 70 && module.rotate >= 25) {
      result.leftTop = "n-resize";
      result.middleTop = "ne-resize";
      result.rightTop = "e-resize";
      result.rightMiddle = "nw-resize";
      result.rightDown = "n-resize";
      result.middleDown = "ne-resize";
      result.leftDown = "e-resize";
      result.leftMiddle = "nw-resize";
    }
    if (module.rotate < 115 && module.rotate >= 70) {
      result.leftTop = "ne-resize";
      result.middleTop = "e-resize";
      result.rightTop = "nw-resize";
      result.rightMiddle = "n-resize";
      result.rightDown = "ne-resize";
      result.middleDown = "e-resize";
      result.leftDown = "nw-resize";
      result.leftMiddle = "n-resize";
    }
    if (module.rotate < 160 && module.rotate >= 115) {
      result.leftTop = "e-resize";
      result.middleTop = "nw-resize";
      result.rightTop = "n-resize";
      result.rightMiddle = "ne-resize";
      result.rightDown = "e-resize";
      result.middleDown = "nw-resize";
      result.leftDown = "n-resize";
      result.leftMiddle = "ne-resize";
    }
    if (module.rotate < 205 && module.rotate >= 160) {
      result.leftTop = "nw-resize";
      result.middleTop = "n-resize";
      result.rightTop = "ne-resize";
      result.rightMiddle = "e-resize";
      result.rightDown = "nw-resize";
      result.middleDown = "n-resize";
      result.leftDown = "ne-resize";
      result.leftMiddle = "e-resize";
    }
    if (module.rotate < 250 && module.rotate >= 205) {
      result.leftTop = "n-resize";
      result.middleTop = "ne-resize";
      result.rightTop = "e-resize";
      result.rightMiddle = "nw-resize";
      result.rightDown = "n-resize";
      result.middleDown = "ne-resize";
      result.leftDown = "e-resize";
      result.leftMiddle = "nw-resize";
    }
    if (module.rotate < 295 && module.rotate >= 250) {
      result.leftTop = "ne-resize";
      result.middleTop = "e-resize";
      result.rightTop = "nw-resize";
      result.rightMiddle = "n-resize";
      result.rightDown = "ne-resize";
      result.middleDown = "e-resize";
      result.leftDown = "nw-resize";
      result.leftMiddle = "n-resize";
    }
    if (module.rotate < 340 && module.rotate >= 295) {
      result.leftTop = "e-resize";
      result.middleTop = "nw-resize";
      result.rightTop = "n-resize";
      result.rightMiddle = "ne-resize";
      result.rightDown = "e-resize";
      result.middleDown = "nw-resize";
      result.leftDown = "n-resize";
      result.leftMiddle = "ne-resize";
    }
    return result;
  }();
  let scale = useSelector((state: any) => state.H5Edit.scale)
  let moveScale = 100 / scale
  const controlshape = (direction: string) => {
    const onChange = props.onChange
    const event: MouseEvent = window.event as MouseEvent;
    let oriX = event.clientX;
    let oriY = event.clientY;
    let oriTop = module.top;
    let oriLeft = module.left;
    let width = module.width;
    let height = module.height;
    let cos = Math.cos((module.rotate / 180) * Math.PI);
    let sin = Math.sin((module.rotate / 180) * Math.PI);
    let oriShowTop = module.showTop;
    let oriShowLeft = module.showLeft;
    let showWidth = module.showWidth;
    let showHeigth = module.showHeigth;
    if (direction === "right-down") {
      window.onmousemove = (event: MouseEvent) => {
        let X = event.clientX;
        let Y = event.clientY;
        let newWidth =
          width +
          (X - oriX) * moveScale * cos +
          (Y - oriY) * moveScale * sin;
        let newHeight =
          height -
          (X - oriX) * moveScale * sin +
          (Y - oriY) * moveScale * cos;
        if (newHeight + oriShowTop >= showHeigth) {
          newHeight = showHeigth - oriShowTop;
        }
        if (newWidth + oriShowLeft >= showWidth) {
          newWidth = showWidth - oriShowLeft;
        }
        module.width = newWidth > 20 ? newWidth : 20;
        module.left =
          oriLeft - ((module.width - width) * (1 - cos)) / 2;
        module.top = oriTop + ((module.width - width) * sin) / 2;
        module.height = newHeight > 40 ? newHeight : 40;
        module.left =
          module.left - ((module.height - height) * sin) / 2;
        module.top =
          module.top - ((module.height - height) * (1 - cos)) / 2;
        onChange(module)
      };

    } else if (direction === "right-middle") {
      window.onmousemove = (event: MouseEvent) => {
        let X = event.clientX;
        let Y = event.clientY;
        let newWidth =
          width +
          (X - oriX) * moveScale * cos +
          (Y - oriY) * moveScale * sin;
        if (newWidth + oriShowLeft >= showWidth) {
          newWidth = showWidth - oriShowLeft;
        }
        module.width = newWidth > 20 ? newWidth : 20;
        module.left =
          oriLeft - ((module.width - width) * (1 - cos)) / 2;
        module.top = oriTop + ((module.width - width) * sin) / 2;
        onChange(module)
      };
    } else if (direction === "right-top") {
      window.onmousemove = (event: MouseEvent) => {
        let X = event.clientX;
        let Y = event.clientY;
        let newWidth =
          width +
          (X - oriX) * moveScale * cos +
          (Y - oriY) * moveScale * sin;
        let newHeight =
          height +
          (X - oriX) * moveScale * sin -
          (Y - oriY) * moveScale * cos;
        if (oriShowTop - newHeight + height <= 0) {
          newHeight = oriShowTop + height;
        }
        if (newWidth + oriShowLeft >= showWidth) {
          newWidth = showWidth - oriShowLeft;
        }
        module.width = newWidth > 20 ? newWidth : 20;
        module.left =
          oriLeft - ((module.width - width) * (1 - cos)) / 2;
        module.top = oriTop + ((module.width - width) * sin) / 2;
        module.height = newHeight > 40 ? newHeight : 40;
        module.left =
          module.left + ((module.height - height) * sin) / 2;
        module.top =
          module.top - ((module.height - height) * (1 + cos)) / 2;
        module.showTop = oriShowTop - module.height + height;
        onChange(module)
      };
    } else if (direction === "middle-down") {
      window.onmousemove = (event: MouseEvent) => {
        let Y = event.clientY;
        let X = event.clientX;
        let newHeight =
          height -
          (X - oriX) * moveScale * sin +
          (Y - oriY) * moveScale * cos;
        if (newHeight + oriShowTop >= showHeigth) {
          newHeight = showHeigth - oriShowTop;
        }
        module.height = newHeight > 40 ? newHeight : 40;
        module.left =
          oriLeft - ((module.height - height) * sin) / 2;
        module.top =
          oriTop - ((module.height - height) * (1 - cos)) / 2;
        onChange(module)
      };
    } else if (direction === "middle-top") {
      window.onmousemove = (event: MouseEvent) => {
        let Y = event.clientY;
        let X = event.clientX;
        let newHeight =
          height +
          (X - oriX) * moveScale * sin -
          (Y - oriY) * moveScale * cos;
        if (oriShowTop - newHeight + height <= 0) {
          newHeight = oriShowTop + height;
        }
        module.height = newHeight > 40 ? newHeight : 40;
        module.left =
          oriLeft + ((module.height - height) * sin) / 2;
        module.top =
          oriTop - ((module.height - height) * (1 + cos)) / 2;
        module.showTop = oriShowTop - module.height + height;
        onChange(module)
      };
    } else if (direction === "left-top") {
      window.onmousemove = (event: MouseEvent) => {
        let X = event.clientX;
        let Y = event.clientY;
        let newWidth =
          width -
          (X - oriX) * moveScale * cos -
          (Y - oriY) * moveScale * sin;
        let newHeight =
          height +
          (X - oriX) * moveScale * sin -
          (Y - oriY) * moveScale * cos;
        if (oriShowLeft - newWidth + width <= 0) {
          newWidth = oriShowLeft + width;
        }
        if (oriShowTop - newHeight + height <= 0) {
          newHeight = oriShowTop + height;
        }
        module.width = newWidth > 20 ? newWidth : 20;
        module.left =
          oriLeft - ((module.width - width) * (cos + 1)) / 2;
        module.top = oriTop - ((module.width - width) * sin) / 2;
        module.height = newHeight > 40 ? newHeight : 40;
        module.left =
          module.left + ((module.height - height) * sin) / 2;
        module.top =
          module.top - ((module.height - height) * (1 + cos)) / 2;
        module.showTop = oriShowTop - module.height + height;
        module.showLeft = oriShowLeft - module.width + width;
        onChange(module)
      };
    } else if (direction === "left-middle") {
      window.onmousemove = (event: MouseEvent) => {
        let X = event.clientX;
        let Y = event.clientY;
        let newWidth =
          width -
          (X - oriX) * moveScale * cos -
          (Y - oriY) * moveScale * sin;
        if (oriShowLeft - newWidth + width <= 0) {
          newWidth = oriShowLeft + width;
        }
        module.width = newWidth > 20 ? newWidth : 20;
        module.left =
          oriLeft - ((module.width - width) * (cos + 1)) / 2;
        module.top = oriTop - ((module.width - width) * sin) / 2;
        module.showLeft = oriShowLeft - module.width + width;
        onChange(module)
      };
    } else if (direction === "left-down") {
      window.onmousemove = (event: MouseEvent) => {
        let X = event.clientX;
        let Y = event.clientY;
        let newWidth =
          width -
          (X - oriX) * moveScale * cos -
          (Y - oriY) * moveScale * sin;
        let newHeight =
          height -
          (X - oriX) * moveScale * sin +
          (Y - oriY) * moveScale * cos;
        if (oriShowLeft - newWidth + width <= 0) {
          newWidth = oriShowLeft + width;
        }
        if (newHeight + oriShowTop >= showHeigth) {
          newHeight = showHeigth - oriShowTop;
        }
        module.width = newWidth > 20 ? newWidth : 20;
        module.left =
          oriLeft - ((module.width - width) * (cos + 1)) / 2;
        module.top = oriTop - ((module.width - width) * sin) / 2;
        module.height = newHeight > 40 ? newHeight : 40;
        module.left =
          module.left - ((module.height - height) * sin) / 2;
        module.top =
          module.top - ((module.height - height) * (1 - cos)) / 2;
        module.showLeft = oriShowLeft - module.width + width;
        onChange(module)
      };
    }

    window.onmouseup = () => {
      window.onmousemove = null;
      window.onmouseup = null;
      module.left = Math.round(module.left);
      module.height = Math.round(module.height);
      module.width = Math.round(module.width);
      module.top = Math.round(module.top);
      onChange(module)
    };
  };

  let dom = (



    <div
      className='item-list'
      draggable="false"

    >

      <div
        className={scope["item"]}
        onMouseDown={(e: React.MouseEvent) => { e.stopPropagation(); controlshape('left-top') }}
        style={
          {
            cursor: cursor.leftTop,
            left: 0 + 'px',
            top: 0 + 'px',
            transform: `translateX(-50%) translateY(-50%) scale(${moveScale})`,
          }
        }
      ></div>


      <div
        className={scope["item-vertical"]}
        onMouseDown={(e: React.MouseEvent) => { e.stopPropagation(); controlshape('left-middle') }}
        style={{
          cursor: cursor.leftMiddle,
          left: 0 + 'px',
          top: module.height / 2 + 'px',
          transform: `translateX(-50%) translateY(-50%) scale(${moveScale})`,
        }}
      ></div>

      <div
        className={scope["item"]}
        onMouseDown={(e: React.MouseEvent) => { e.stopPropagation(); controlshape('left-down') }}
        style={{
          cursor: cursor.leftDown,
          left: 0 + 'px',
          top: module.height + 'px',
          transform: `translateX(-50%) translateY(-50%) scale(${moveScale})`,
        }}
      ></div>

      <div
        className={scope["item-Horizontal"]}
        onMouseDown={(e: React.MouseEvent) => { e.stopPropagation(); controlshape('middle-top') }}
        style={{
          cursor: cursor.middleTop,
          left: module.width / 2 + 'px',
          top: 0 + 'px',
          transform: `translateX(-50%) translateY(-50%) scale(${moveScale})`,
        }}
      ></div>
      <div
        className={scope["item-Horizontal"]}
        onMouseDown={(e: React.MouseEvent) => { e.stopPropagation(); controlshape('middle-down') }}
        style={{
          cursor: cursor.middleDown,
          left: module.width / 2 + 'px',
          top: module.height + 'px',
          transform: `translateX(-50%) translateY(-50%) scale(${moveScale})`,
        }}
      ></div>
      <div
        className={scope["item"]}
        onMouseDown={(e: React.MouseEvent) => { e.stopPropagation(); controlshape('right-top') }}
        style={{
          cursor: cursor.rightTop,
          left: module.width + 'px',
          top: '0px',
          transform: `translateX(-50%) translateY(-50%) scale(${moveScale})`,
        }}
      ></div>

      <div
        className={scope["item-vertical"]}
        onMouseDown={(e: React.MouseEvent) => { e.stopPropagation(); controlshape('right-middle') }}
        style={{
          cursor: cursor.rightMiddle,
          left: module.width + 'px',
          top: module.height / 2 + 'px',
          transform: `translateX(-50%) translateY(-50%) scale(${moveScale})`,
        }}
      ></div>
      <div
        className={scope["item"]}
        onMouseDown={(e: React.MouseEvent) => { e.stopPropagation(); controlshape('right-down') }}
        style={{
          cursor: cursor.rightDown,
          left: module.width + 'px',
          top: module.height + 'px',
          transform: `translateX(-50%) translateY(-50%) scale(${moveScale})`,
        }}
      ></div>
    </div>)
  return (
    <>
      {dom}
    </>
  )



}
export default ClipperRegulator