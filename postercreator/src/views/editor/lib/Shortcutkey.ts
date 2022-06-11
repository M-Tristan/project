import store from "@/store/index"
import EditPositionUtil from "./editPositionUtil"

class Shortcutkey {
  constructor() {


  }
  scrollDom: any
  keyEvent(event: KeyboardEvent) {
    let shiftKey = event.shiftKey
    let ctrlKey = event.ctrlKey
    let keyCode = event.keyCode
    if (keyCode === 37) {
      if (shiftKey) {
        store.commit('moveLeft', -3)
      } else {
        store.commit('moveLeft', -1)
      }

    }
    if (keyCode === 38) {
      if (shiftKey) {
        store.commit('moveTop', -3)
      } else {
        store.commit('moveTop', -1)
      }
    }
    if (keyCode === 39) {
      if (shiftKey) {
        store.commit('moveLeft', 3)
      } else {
        store.commit('moveLeft', 1)
      }
    }
    if (keyCode === 40) {
      if (shiftKey) {
        store.commit('moveTop', 3)
      } else {
        store.commit('moveTop', 1)
      }
    }
    if (keyCode === 67) {
      if (ctrlKey && store.getters.canCopy) {
        store.commit("copy");
      }
    }
    if (keyCode === 86) {
      if (ctrlKey && store.getters.canPast) {
        store.commit("paste");
        store.commit("pushBack");
      }
    }
    if (keyCode === 88) {
      if (ctrlKey && store.getters.canCopy) {
        store.commit("shear");
        store.commit("pushBack");
      }

    }
    if (keyCode === 90) {
      if (ctrlKey && store.state.backList.length > 1 && shiftKey == false) {
        store.commit("setBackClip", false);
        store.commit("back");
        store.commit("setEditModuleToBack");

      }
      if (ctrlKey && store.state.nextList.length > 1 && shiftKey == true) {
        store.commit("setBackClip", false);
        store.commit("next");
        store.commit("setEditModuleToBack");

      }


    }
    if (keyCode === 65) {
      if (ctrlKey) {
        store.commit("selectAll");
      }


    }

    if (keyCode === 8) {
      if (store.getters.canDelete && store.state.editModule.type !== 'text' && store.state.editModule.type !== 'effectText') {
        store.commit("delete");
      }

    }
    if (keyCode === 46) {
      if (store.getters.canDelete) {
        store.commit("delete");
      }
    }
    if (keyCode === 71) {
      if (ctrlKey && !shiftKey && store.state.group && store.state.group.id == undefined) {
        store.commit("addGroup");
      }
      if (ctrlKey && shiftKey && store.state.group && store.state.group.id != undefined) {
        store.commit("closeGroup");
      }
    }
    if (keyCode === 221) {
      if (store.getters.canDelete && ctrlKey && !shiftKey) {
        store.commit("layerAdjustment", 'up');
        store.commit("pushBack");
      }
      if (store.getters.canDelete && ctrlKey && shiftKey) {
        store.commit("layerAdjustment", 'top');
        store.commit("pushBack");
      }

    }
    if (keyCode === 219) {
      if (store.getters.canDelete && ctrlKey && !shiftKey) {
        store.commit("layerAdjustment", 'down');
        store.commit("pushBack");
      }
      if (store.getters.canDelete && ctrlKey && shiftKey) {
        store.commit("layerAdjustment", 'bottom');
        store.commit("pushBack");
      }
    }
    if (keyCode === 96 || keyCode === 48) {
      if (ctrlKey) {
        let position = EditPositionUtil.positionFunc()
        let canvasSize = position.canvasArea
        let canvas = store.state.postInfo.canvas
        let rateW = (canvasSize.width - 40) / canvas.width;
        let rateH = (canvasSize.height - 40) / canvas.height;
        let rate = rateW > rateH ? rateH : rateW;
        if (rate * 100 < 1) {
          rate = 0.01;
        }
        if (rate * 100 > 400) {
          rate = 4;
        }
        store.commit("setScale", Math.floor(rate * 100));
      }

    }
    if (keyCode === 107) {
      event.returnValue = false
      if (ctrlKey) {
        let scale = store.state.scale
        if (scale >= 400) {
          return;
        }
        if (scale < 10) {
          store.commit("setScale", scale + 1);
          return;
        }
        store.commit("setScale", scale + 10);
        return false
      }
    }
    if (keyCode === 109) {
      event.returnValue = false
      if (ctrlKey) {
        let scale = store.state.scale
        if (scale <= 1) {
          return;
        }
        if (scale < 20 && scale > 10) {
          store.commit("setScale", 10);
        }
        if (scale <= 10) {
          store.commit("setScale", scale - 1);
          return;
        }
        store.commit("setScale", scale - 10);
        return false
      }
    }
  }
  mousewheelEvent(event) {

    let ctrlKey = event.ctrlKey
    if (event.wheelDelta > 0) {


      if (ctrlKey) {
        event.preventDefault()
        let scale = store.state.scale
        if (scale >= 400) {
          return;
        }
        if (scale < 10) {
          store.commit("setScale", scale + 1);
          return;
        }
        store.commit("setScale", scale + 10);

        return false
      }
    } else {

      if (ctrlKey) {
        event.preventDefault()
        let scale = store.state.scale
        if (scale <= 1) {
          return;
        }
        if (scale < 20 && scale > 10) {
          store.commit("setScale", 10);
        }
        if (scale <= 10) {
          store.commit("setScale", scale - 1);
          return;
        }
        store.commit("setScale", scale - 10);
        return false
      }
    }

  }

  initShortcutkey(dom: HTMLElement) {
    this.scrollDom = dom
    window.addEventListener('keydown', this.keyEvent)
    dom.addEventListener('mousewheel', this.mousewheelEvent);
  }
  destoryShortcutkey() {
    window.removeEventListener('keydown', this.keyEvent)
    this.scrollDom.removeEventListener('keydown', this.mousewheelEvent)
  }
}

export default Shortcutkey

