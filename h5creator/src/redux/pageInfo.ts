import { background, operItem } from "../interface/module";

interface postInfo {
  layers: operItem[],
  background: background,
  canvas: object
}
let pageList = {
  pageList: [] as postInfo[]
}
export default pageList