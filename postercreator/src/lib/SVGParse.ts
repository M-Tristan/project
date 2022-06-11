import colorString from 'color-string'
import { v4 as uuidv4 } from 'uuid';
import CSSOM from 'cssom'
let gradientMap: any = {}
let styleMaps: any = {}
let clipPathMap: any = {}
let idMaps: any = {}
let colorList: Array<string> = []
let colorMap: any = {}
let svgMap: any = {}
async function loadSVGFromUrl(url: string) {
  // if (svgMap[url]) {
  //   return {
  //     svg: svgMap[url].svg,
  //     colorList: [...svgMap[url].colorList]

  //   }
  // }
  url = url.replace(/^\n\s*/, '').trim();
  var TIMEOUT = 3000
  let svgText = await new Promise(function (resolve) {
    var request = new XMLHttpRequest()
    request.onreadystatechange = done
    request.ontimeout = timeout
    request.responseType = 'text'
    request.timeout = TIMEOUT
    request.open('GET', url, true)
    request.send()
    function done() {
      if (request.readyState !== 4) return
      if (request.status !== 200) {
        resolve("")
      }
      resolve(request.response)
    }
    function timeout() {
      resolve("")
    }
  })

  // svgMap[url] = {
  //   svg: loadSVGFromString(String(svgText)),
  //   colorList: [...colorList]
  // }


  return {
    svg: loadSVGFromString(String(svgText)),
    colorList: [...colorList]

  }

}

function loadSVGFromString(string: string) {
  idMaps = {}
  colorList = []
  colorMap = {}
  let doc = new DOMParser().parseFromString(string, 'text/xml')
  idMaps = getIdMap(doc.children)
  let pathList = doc.getElementsByTagName("path")
  let ellipseList = doc.getElementsByTagName("ellipse")
  let rectList = doc.getElementsByTagName("rect")
  let circleList = doc.getElementsByTagName("circle")
  let lineList = doc.getElementsByTagName("line")
  let polygonList = doc.getElementsByTagName("polygon")
  let polylineList = doc.getElementsByTagName("polyline")
  let clipPathList = doc.getElementsByTagName("clipPath")
  let gList = doc.getElementsByTagName("g")
  let useList = doc.getElementsByTagName("use")
  let maskList = doc.getElementsByTagName("mask")
  let linearGradientList = doc.getElementsByTagName("linearGradient")
  let radialGradientList = doc.getElementsByTagName("radialGradient")

  let gradientList = [...linearGradientList, ...radialGradientList]
  let styles = doc.getElementsByTagName('style')
  let stylesList: any = []
  styleMaps = {}
  let ruleList: any = []
  gradientMap = {}
  clipPathMap = {}
  for (let index = 0; index < maskList.length; index++) {
    let mask = maskList[index]
    let newIdInfo = idMaps[String(mask.getAttribute("id")).trim()]
    if (newIdInfo) {
      mask.setAttribute("id", newIdInfo.newId)
    }
  }
  gradientList.forEach(item => {
    let newId = idMaps[String(item.getAttribute("id")).trim()].newId
    gradientMap[`#${item.getAttribute("id")?.trim()}`] = {
      gradient: item,
      newId: newId
    }
    gradientMap[`url("#${item.getAttribute("id")?.trim()}")`] = {
      gradient: item,
      newId: newId
    }
    item.setAttribute("id", newId)
  })
  gradientList.forEach(item => {
    let href = item.getAttribute("xlink:href")
    if (href && gradientMap[href]) {
      item.setAttribute("xlink:href", `#${gradientMap[href].newId}`)
    }
  })

  for (let index = 0; index < styles.length; index++) {
    if (styles[index].parentElement != null) {
      stylesList.push(styles[index].textContent)
      styles[index].parentElement?.removeChild(styles[index])
    }
  }
  if (stylesList.length != 0) {
    for (let index = 0; index < stylesList.length; index++) {
      let textContent = stylesList[index]
      let rules = CSSOM.parse(String(textContent))
      ruleList = [...ruleList, ...rules.cssRules]
    }
  }

  ruleList.forEach(rule => {
    let selectors = rule.selectorText.split(",")
    let style = getStyleFromRule(rule)
    selectors.forEach(item => {
      if (styleMaps[item]) {
        styleMaps[item] = { ...styleMaps[item], ...style }
      } else {
        styleMaps[item] = style
      }
    });
  });

  parseRuleText(styleMaps)
  loadStyle(pathList)
  loadStyle(ellipseList)
  loadStyle(rectList)
  loadStyle(circleList)
  loadStyle(lineList)
  loadStyle(polygonList)
  loadStyle(polylineList)
  loadStyle(gList)
  loadStyle(useList)
  resetElementIds(doc.children)
  doc.children[0].setAttribute("style", "width:100%;height:100%")
  return new XMLSerializer().serializeToString(doc.children[0])


}


function loadStyle(domList: HTMLCollectionOf<SVGElement>) {
  for (let index = 0; index < domList.length; index++) {
    let dom = domList[index]
    let styleText = dom.getAttribute("style") ? dom.getAttribute("style") : ""
    let idName = dom.getAttribute("id")
    let className = dom.getAttribute("class")
    let styleFill = dom.style.fill


    if (idName && idMaps[idName.trim()]) {
      dom.setAttribute("id", idMaps[idName.trim()].newId)
    }

    if (styleFill && colorString.get(styleFill)) {
      if (colorMap[styleFill]) {
        styleText = `${styleText};fill:${colorMap[styleFill]};`
      } else {
        colorList.push(styleFill)
        colorMap[styleFill] = `{{color${colorList.length - 1}}}`
        styleText = `${styleText};fill:${colorMap[styleFill]};`
      }
    }
    if (styleMaps[`.${className}`]) {

      styleText = styleMaps[`.${className}`].cssContentText + ";" + styleText
      let fill = styleMaps[`.${className}`].fill
      let stroke = styleMaps[`.${className}`].stroke

      if (fill) {
        dom.setAttribute("fill", fill)
      }
      if (stroke) {
        dom.setAttribute("stroke", stroke)
      }
    }



    dom.removeAttribute("class")
    if (dom.getAttribute("fill")) {
      let fill = dom.getAttribute("fill") as string
      if (idMaps[fill]) {
        dom.setAttribute("fill", `url("#${idMaps[fill].newId}")`)
      }
    }
    if (dom.getAttribute("stroke")) {
      let stroke = dom.getAttribute("stroke") as string
      if (idMaps[stroke]) {
        dom.setAttribute("stroke", `url("#${idMaps[stroke].newId}")`)
      }
    }
    if (dom.getAttribute("xlink:href")) {
      let xlink = dom.getAttribute("xlink:href") as string
      if (idMaps[xlink]) {
        dom.setAttribute("xlink:href", `#${idMaps[xlink].newId}`)
      }
    }
    if (dom.getAttribute("mask")) {
      let mask = dom.getAttribute("mask") as string
      if (idMaps[mask]) {
        dom.setAttribute("mask", `url("#${idMaps[mask].newId}")`)
      }
    }



    dom.setAttribute('style', String(styleText))
    if (dom.style.fill) {
      let fill = dom.style.fill
      if (gradientMap[fill]) {
        dom.style.fill = `url("#${gradientMap[fill].newId}")`
      }
    }
  }
}
function getIdMap(childrens: HTMLCollection) {
  let result = {}
  if (childrens.length != 0) {

    for (let index = 0; index < childrens.length; index++) {
      let children = childrens[index]
      let id = children.getAttribute("id")
      let newId = uuidv4()
      if (id) {
        result[id] = {
          newId: newId
        }
        result[`url("#${id}")`] = {
          newId: newId
        }
        result[`url(#${id})`] = {
          newId: newId
        }
        result[`#${id}`] = {
          newId: newId
        }
      }
      if (children.children.length != 0) {
        let childrenIdMap = getIdMap(children.children)
        result = { ...result, ...childrenIdMap }
      }

    }

  }
  return result

}

function resetElementIds(childrens: HTMLCollection) {

  for (let index = 0; index < childrens.length; index++) {
    let children = childrens[index] as HTMLElement
    let id = children.getAttribute("id")
    let fill = children.getAttribute("fill")
    let stroke = children.getAttribute("stroke")
    let stopColor = children.getAttribute("stop-color")
    let styleStopColor = children.style['stop-color']
    // console.log('stop-color', styleStopColor)
    if (stopColor && colorString.get(stopColor)) {
      if (colorMap[stopColor]) {
        children.setAttribute("stop-color", colorMap[stopColor])
      } else {
        colorList.push(stopColor)
        colorMap[stopColor] = `{{color${colorList.length - 1}}}`
        children.setAttribute("stop-color", colorMap[stopColor])
      }
    }
    if (styleStopColor && colorString.get(styleStopColor)) {
      let styleText = children.getAttribute("style")
      if (colorMap[styleStopColor]) {
        children.setAttribute("style", `${styleText};stop-color:${colorMap[styleStopColor]}`)
      } else {
        colorList.push(styleStopColor)
        colorMap[styleStopColor] = `{{color${colorList.length - 1}}}`
        children.setAttribute("style", `${styleText};stop-color:${colorMap[styleStopColor]}`)
      }
    }

    if (fill && colorString.get(fill)) {
      if (colorMap[fill]) {
        children.setAttribute("fill", colorMap[fill])
      } else {
        colorList.push(fill)
        colorMap[fill] = `{{color${colorList.length - 1}}}`
        children.setAttribute("fill", colorMap[fill])
      }
    }
    if (stroke && colorString.get(stroke)) {
      if (colorMap[stroke]) {
        children.setAttribute("stroke", colorMap[stroke])
      } else {
        colorList.push(stroke)
        colorMap[stroke] = `{{color${colorList.length - 1}}}`
        children.setAttribute("stroke", colorMap[stroke])
      }
    }
    if (idMaps[String(id)]) {
      children.setAttribute("id", idMaps[String(id)].newId)
    }
    if (children.children.length != 0) {
      resetElementIds(children.children)
    }

  }
}

function getStyleFromRule(rule: any) {
  let style = {}
  for (let index = 0; index < rule.style.length; index++) {
    let property = rule.style[index]

    if (idMaps[rule.style[property]]) {
      style[property] = `url("#${idMaps[rule.style[property]].newId}")`
    } else {
      style[property] = rule.style[property]
    }

  }
  return style
}
function parseRuleText(styleMaps: any) {
  Object.keys(styleMaps).forEach(key => {
    let text = ""
    Object.keys(styleMaps[key]).forEach(styleKey => {
      if (styleKey != 'fill' && styleKey != 'stroke') {
        text += `${styleKey}:${styleMaps[key][styleKey]};`
      }

    })
    styleMaps[key].cssContentText = text
  })

}

export default { loadSVGFromString, loadSVGFromUrl }







