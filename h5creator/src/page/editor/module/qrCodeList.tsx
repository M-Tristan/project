/* eslint-disable react-hooks/exhaustive-deps */
import './qrCodeList.scss'
import CodeItem from './codeItem'
import { getImageList } from '../../../api/api'
import { useEffect, useState } from 'react'
function QrCodeList() {
  const searchBackList = async () => {
    let res = await getImageList({ type: 'code' })
    let optionback = res.map((item: any) => {
      return {
        width: 125,
        color: {
          dark: `#ff000000`,
          light: `#ffffff`,
        },
        backImage: item.image_url
      }
    })

    setOptions([...options, ...optionback])
  }
  const [options, setOptions] = useState([{
    width: 125,
    color: {
      dark: `#000000`,
      light: `#ffffff`
    }
  },
  {
    width: 125,
    color: {
      dark: `#ff0000`,
      light: `#ffffff`
    }
  },
  {
    width: 125,
    color: {
      dark: `#0062ff`,
      light: `#ffffff`
    }
  },
  {
    width: 125,
    color: {
      dark: `#06aa00`,
      light: `#ffffff`
    }
  }])

  useEffect(() => {
    searchBackList()
    return () => { }
  }, [])

  let codeDom = options.map((item, index) => {
    return <CodeItem option={item} key={index}></CodeItem>
  })
  return (
    <div>
      {codeDom}
    </div>
  )
}

export default QrCodeList