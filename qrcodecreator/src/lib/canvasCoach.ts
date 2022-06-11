const canvasCoach: any = {
  canvas: null as unknown as HTMLCanvasElement,
  logo: null as unknown as HTMLCanvasElement,
  backImage: null as unknown as HTMLImageElement,
  downLoad(backInfo: any, logoInfo: any, type: string) {
    let backCanvas = document.createElement("canvas")
    backCanvas.width = 1000
    backCanvas.height = 1000
    let backCtx = backCanvas.getContext('2d') as CanvasRenderingContext2D
    if (this.backImage) {
      backCanvas.width = (backInfo.size + 100) * 10
      backCanvas.height = (backInfo.size + 100) * 10
      backCtx.fillStyle = 'white'
      backCtx.fillRect(0, 0, backCanvas.width, backCanvas.height)
      backCtx.drawImage(this.backImage, 0, 0, backCanvas.width, backCanvas.height)
    }

    backCtx.drawImage(this.canvas, (backCanvas.width - this.canvas.width) / 2, (backCanvas.height - this.canvas.height) / 2, this.canvas.width, this.canvas.height)
    if (this.logo) {
      if (logoInfo.position === 'center') {
        backCtx.drawImage(this.logo,
          (backCanvas.width - this.canvas.width * logoInfo.width / 100) / 2, (backCanvas.height - this.canvas.height * logoInfo.width / 100) / 2,
          this.canvas.width * logoInfo.width / 100,
          this.canvas.width * logoInfo.width / 100)
      } else {
        backCtx.drawImage(this.logo,
          (backCanvas.width - this.canvas.width) / 2 + this.canvas.width - this.canvas.width * logoInfo.width / 100,
          (backCanvas.width - this.canvas.width) / 2 + this.canvas.width - this.canvas.width * logoInfo.width / 100,
          this.canvas.width * logoInfo.width / 100,
          this.canvas.width * logoInfo.width / 100)
      }
    }
    let imageType = type === 'png' ? 'image/png' : 'image/jpeg'
    var link = document.createElement('a');
    link.href = backCanvas.toDataURL(imageType)
    link.download = `二维码${new Date().getTime()}.${type}`;
    link.click()
  }
}

export default canvasCoach