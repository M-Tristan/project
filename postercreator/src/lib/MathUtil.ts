interface Size {
  width: number,
  height: number
}
class MathUtil {
  constructor() {

  }
  static sin(angle: number): number {
    return Math.sin(angle / 180 * Math.PI)
  }
  static asin(sinValue: number): number {
    return Math.asin(sinValue) / Math.PI * 180
  }
  static cos(angle: number): number {
    return Math.cos(angle / 180 * Math.PI)
  }
  static tan(angle: number): number {
    return Math.tan(angle / 180 * Math.PI)
  }
  static atan(tanvalue: number): number {
    return Math.atan(tanvalue) / Math.PI * 180
  }
  /**
   * 得到直角三角形斜边
   * @param width 
   * @param height 
   * @returns 
   */
  static getHypotenuse(width: number, height: number): number {
    return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))
  }
  static getFullSize(width: number, height: number, rate: number): Size {
    if (width / height > rate) {
      return {
        width: width,
        height: width / rate
      }
    }
    return {
      width: height * rate,
      height: height
    }
  }

}
export default MathUtil