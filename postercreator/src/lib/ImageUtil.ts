class ImageUtil {
  static toBase64(src, type = 'png', scale = 1) {
    return new Promise((res, rej) => {
      src = src.replace("https://lp-canvas-1304910572.cos.ap-guangzhou.myqcloud.com", "https://lp-canvas-1304910572.file.myqcloud.com/")
      let image = new Image()
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = src
      image.onload = () => {
        let canvas = document.createElement('canvas')
        canvas.width = image.naturalWidth * scale
        canvas.height = image.naturalHeight * scale
        let ctx = canvas.getContext("2d") as CanvasRenderingContext2D
        let pictype = "image/png"
        if (type == 'jpg') {
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, image.naturalWidth * scale, image.naturalHeight * scale);
          pictype = "image/jpeg"
        }
        ctx.drawImage(image, 0, 0, image.naturalWidth * scale, image.naturalHeight * scale)
        res(canvas.toDataURL(pictype))
      }
    })
  }

}

export default ImageUtil