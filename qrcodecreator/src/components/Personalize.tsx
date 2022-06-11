import { useState } from 'react'
import { Button, message } from 'antd';
import './Personalize.css'
import imageCache from '../lib/imageCache'
interface type {
  changeCustom: Function,
  custom: any
}
function Personalize(props: type) {
  let [eyeList, setEyeList] = useState(props.custom.eyeList as Array<string>)
  let [P1List, setP1List] = useState(props.custom.P1List as Array<string>)
  let [P2List, setP2List] = useState(props.custom.P2List as Array<string>)
  let [P3List, setP3List] = useState(props.custom.P3List as Array<string>)
  let [P4List, setP4List] = useState(props.custom.P4List as Array<string>)
  let [P5List, setP5List] = useState(props.custom.P5List as Array<string>)
  let [P6List, setP6List] = useState(props.custom.P6List as Array<string>)
  const createCode = () => {
    if (eyeList.length === 0 || P1List.length === 0) {
      message.error('码眼图和单点图不能为空')
      return
    }
    props.changeCustom({
      render: true,
      eyeList,
      P1List,
      P2List,
      P3List,
      P4List,
      P5List,
      P6List
    })
  }
  const cancelRender = () => {
    props.changeCustom({
      render: false,
      eyeList,
      P1List,
      P2List,
      P3List,
      P4List,
      P5List,
      P6List
    })
  }
  const addPoint = (type: string) => {
    let input = document.createElement("input")
    input.type = 'file'
    input.accept = ".png,.jpeg,.jpg";
    input.onchange = () => {
      if (input.files) {
        let src = ''
        switch (type) {
          case 'eye':
            if (eyeList.length >= 3) {
              message.error('只能上传三张码眼图')
              return
            }
            src = URL.createObjectURL(input.files[0])
            eyeList.push(src)
            setEyeList([...eyeList])
            break;
          case 'P1':
            src = URL.createObjectURL(input.files[0])
            P1List.push(src)
            setP1List([...P1List])
            break
          case 'P2':
            src = URL.createObjectURL(input.files[0])
            P2List.push(src)
            setP2List([...P2List])
            break
          case 'P3':
            src = URL.createObjectURL(input.files[0])
            P3List.push(src)
            setP3List([...P3List])
            break
          case 'P4':
            src = URL.createObjectURL(input.files[0])
            P4List.push(src)
            setP4List([...P4List])
            break
          case 'P5':
            src = URL.createObjectURL(input.files[0])
            P5List.push(src)
            setP5List([...P5List])
            break
          case 'P6':
            src = URL.createObjectURL(input.files[0])
            P6List.push(src)
            setP6List([...P6List])
            break
        }
        let image = new Image()
        image.src = src
        image.onload = () => {
          imageCache[src] = image
        }

      }
    }
    input.click()
  }
  const removePoint = (type: string, src: string) => {

    switch (type) {
      case 'eye':

        eyeList = eyeList.filter(item => {
          return item !== src
        })
        setEyeList([...eyeList])
        break;
      case 'P1':
        P1List = P1List.filter(item => {
          return item !== src
        })

        setP1List([...P1List])
        break
      case 'P2':
        P2List = P2List.filter(item => {
          return item !== src
        })
        setP2List([...P2List])
        break
      case 'P3':
        P3List = P3List.filter(item => {
          return item !== src
        })
        setP3List([...P3List])
        break
      case 'P4':
        P4List = P4List.filter(item => {
          return item !== src
        })
        setP4List([...P4List])
        break
      case 'P5':
        P5List = P5List.filter(item => {
          return item !== src
        })
        setP5List([...P5List])
        break
      case 'P6':
        P6List = P6List.filter(item => {
          return item !== src
        })
        setP6List([...P6List])
        break
    }
  }
  let eyeImageList = eyeList.map((src, index) => {
    return <div key={index} className='point-content'>
      <img alt='' className='point-item' src={src}></img>
      <i className='icon iconfont icon-delete-line delete-item' onClick={() => {
        removePoint('eye', src)
      }}></i>
    </div>
  })
  let P1ImageList = P1List.map((src, index) => {
    return <div key={index} className='point-content'>
      <img alt='' className='point-item' src={src}></img>
      <i className='icon iconfont icon-delete-line delete-item' onClick={() => {
        removePoint('P1', src)
      }}></i>
    </div>
  })
  let P2ImageList = P2List.map((src, index) => {
    return <div key={index} className='point-content'>
      <img alt='' className='point-item' src={src}></img>
      <i className='icon iconfont icon-delete-line delete-item' onClick={() => {
        removePoint('P2', src)
      }}></i>
    </div>
  })
  let P3ImageList = P3List.map((src, index) => {
    return <div key={index} className='point-content'>
      <img alt='' className='point-item' src={src}></img>
      <i className='icon iconfont icon-delete-line delete-item' onClick={() => {
        removePoint('P3', src)
      }}></i>
    </div>
  })
  let P4ImageList = P4List.map((src, index) => {
    return <div key={index} className='point-content'>
      <img alt='' className='point-item' src={src}></img>
      <i className='icon iconfont icon-delete-line delete-item' onClick={() => {
        removePoint('P4', src)
      }}></i>
    </div>
  })
  let P5ImageList = P5List.map((src, index) => {
    return <div key={index} className='point-content'>
      <img alt='' className='point-item' src={src}></img>
      <i className='icon iconfont icon-delete-line delete-item' onClick={() => {
        removePoint('P5', src)
      }}></i>
    </div>
  })
  let P6ImageList = P6List.map((src, index) => {
    return <div key={index} className='point-content'>
      <img alt='' className='point-item' src={src}></img>
      <i className='icon iconfont icon-delete-line delete-item' onClick={() => {
        removePoint('P6', src)
      }}></i>
    </div>
  })
  let cancelDom = <></>
  if (props.custom.render) {
    cancelDom = <Button onClick={() => { cancelRender() }} >取消个性化</Button>
  }
  return <div className='Personalize'>

    <div className='create-button'>
      <Button onClick={() => { createCode() }} >生成二维码</Button>
      {cancelDom}
    </div>

    <div className='point-line'>
      <div className='point-content must' onClick={() => {
        addPoint("eye")
      }}>
        <img alt='' className='point-item' src={require("../assets/image/eye.jpg").default}></img>
        {/* <i className='icon iconfont icon-jia add-point'></i> */}
      </div>
      <div className='imagelist'>
        {eyeImageList}
      </div>




    </div>
    <div className='point-line'>
      <div className='point-content must' onClick={() => {
        addPoint("P1")
      }}>
        <img alt='' className='point-item' src={require("../assets/image/point-1.jpg").default}></img>
        {/* <i className='icon iconfont icon-jia add-point'></i> */}
      </div>
      <div className='imagelist'>
        {P1ImageList}
      </div>

    </div>
    <div className='point-line'>
      <div className='point-content' onClick={() => {
        addPoint("P2")
      }}>
        <img alt='' className='point-item' src={require("../assets/image/point-2.jpg").default}></img>
      </div>
      <div className='imagelist'>
        {P2ImageList}
      </div>
    </div>
    <div className='point-line'>
      <div className='point-content' onClick={() => {
        addPoint("P3")
      }}>
        <img alt='' className='point-item' src={require("../assets/image/point-3.jpg").default}></img>
      </div>
      <div className='imagelist'>
        {P3ImageList}
      </div>
    </div>


    <div className='point-line'>
      <div className='point-content' onClick={() => {
        addPoint("P4")
      }}>
        <img alt='' className='point-item' src={require("../assets/image/point-4.jpg").default}></img>
      </div>
      <div className='imagelist'>
        {P4ImageList}
      </div>
    </div>

    <div className='point-line'>
      <div className='point-content' onClick={() => {
        addPoint("P5")
      }}>
        <img alt='' className='point-item' src={require("../assets/image/point-6.jpg").default}></img>
      </div>
      <div className='imagelist'>
        {P5ImageList}
      </div>
    </div>
    <div className='point-line'>
      <div className='point-content' onClick={() => {
        addPoint("P6")
      }}>
        <img alt='' className='point-item' src={require("../assets/image/point-5.jpg").default}></img>
      </div>
      <div className='imagelist'>
        {P6ImageList}
      </div>
    </div>
  </div>
}

export default Personalize