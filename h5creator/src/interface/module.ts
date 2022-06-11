
export interface itemBase {
  id: string,
  type: string,
  opacity: number
}
export interface operItem extends itemBase {
  zindex: number,
  width: number,
  height: number,
  top: number,
  left: number,
  rotate: number
}

export interface textShadow {
  hShadow: number,
  vShadow: number,
  blur: number,
  color: string
}
export interface option {
  hShadow: number,
  vShadow: number,
  blur: number,
  color: string
}
export interface image extends operItem {
  src: string,
  blur: number,
  borderRadius: number,
  rotateY: boolean,
  rotateX: boolean,
  dropshadowX: number,
  dropshadowY: number,
  dropshadowBlur: number,
  dropshadowColor: string,
  animates?: Array<animate>
  crop: {
    height: number,
    left: number,
    top: number,
    width: number
  },
  filter: {
    brightness: number,
    contrast: number,
    grayscale: number,
    hueRotate: number,
    invert: number,
    saturate: number
  },
  mask?: {
    type: string,
    src?: string
  }
  // borderWidth:number,
  // borderColor:string
}
export interface chart extends operItem {
  option: object,
  chartType: string
  animates?: Array<animate>
}

export interface shape extends operItem {
  shapeType: string,
  color: string,
  sides?: number,
  angles?: number,
  sectorAngle?: number,
  petals?: number
  animates?: Array<animate>
}
interface deformation {
  type: string
}

export interface input extends operItem {
  inputType: string,
  color: string,
  borderColor: string,
  borderWidth: number,
  borderRadius: number,
  backgroundColor: string,
  placeholder: string,
  required: boolean,
  selectList: Array<{ id: string, value: string }>,
  animates?: Array<animate>
}

export interface button extends operItem {
  color: string,
  backgroundColor: string,
  borderColor: string,
  borderWidth: number,
  borderRadius: number,
  animates?: Array<animate>,
  buttonType: string
}


export interface options extends operItem {
  inputType: string,
  color: string,
  titleColor: string,
  titleBackgroundColor: string,
  backgroundColor: string,
  borderColor: string,
  borderWidth: number,
  borderRadius: number,
  title: string,
  selectList: Array<{ id: string, value: string }>,
  animates?: Array<animate>
}

export interface datetime extends operItem {
  dateType: string,
  color: string,
  backgroundColor: string,
  borderColor: string,
  borderWidth: number,
  borderRadius: number,
  animates?: Array<animate>
}

export interface vedio extends operItem {
  iframelink: string,
  animates?: Array<animate>
}

export interface text extends operItem {
  text: string,
  html: string,
  fontSize: number,
  fontFamily: string,
  color: string,
  bold: boolean,
  italic: boolean,
  textDecoration: string,
  textAlign: string,
  lineHeight: number,
  letterSpacing: number,
  opacity: number,
  textShadowList?: Array<textShadow>,
  strokeWidth: number,
  strokeColor: string,
  deformation?: deformation,
  animates?: Array<animate>
}

export interface effectText extends operItem {
  text: string,
  fontSize: number,
  fontFamily: string,
  color: string,
  bold: boolean,
  italic: boolean,
  textDecoration: string,
  textAlign: string,
  lineHeight: number,
  letterSpacing: number,
  opacity: number,
  textShadowList?: Array<textShadow>,
  strokeWidth: number,
  strokeColor: string,
  lengthRate: number,
  animates?: Array<animate>
}
export interface code extends operItem {
  text: string,
  colorDark: string,
  colorLight: string,
  backImage?: string,
  animates?: Array<animate>
}
export interface background extends itemBase {
  image?: {
    width: number,
    height: number,
    top: number,
    left: number,
    src: string,
    blur: number
  },
  color?: string
}

export interface canvas {
  width: number,
  height: number
}
export interface postInfo {
  canvas: canvas,
  layers: operItem[],
  background: background
}

export interface animate {
  type: string,
  duration: number,
  delay: number,
  keyframe: string,
  name: string,
  iterationCount: number,
  infinite: boolean
}