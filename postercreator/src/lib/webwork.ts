let worker = `
onmessage = function (e) {
  if(e.data.type == 'changeSvg'){
    changeSvg(e.data)
  }
};
function changeSvg(data){
  let id = data.id
 data = JSON.parse(data.data)
 let svg = data.svg;
 data.colorList.forEach((color, index) => {
   let replace = '{{color'+index+'}}'
   svg = svg.replace(new RegExp(replace, "gm"), color);
 });

  postMessage({
    id:id,
    data:svg
  });
}
`
import { v4 as uuidv4 } from 'uuid';
class webwork {
  work: Worker;
  eventMap = {};
  constructor() {
    let blob = new Blob([worker])
    var url = window.URL.createObjectURL(blob);
    this.work = new Worker(url)
    this.work.onmessage = (e) => {
      let func = this.eventMap[e.data.id]
      if (func) {
        func(e.data.data)
        delete this.eventMap[e.data.id]
      }
    }
  }
  postMessage(data?: any, finish?: Function) {
    let id = uuidv4()
    data.id = id
    this.eventMap[id] = finish
    data.data = JSON.stringify(data.data)
    this.work.postMessage(data)
  }

}

export default new webwork()