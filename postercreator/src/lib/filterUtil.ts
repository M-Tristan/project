class FilterUtil {
  static blackWhite(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    var pixelData = imageData.data
    for (var i = 0; i < canvas.width * canvas.height; i++) {

      var r = pixelData[i * 4 + 0]
      var g = pixelData[i * 4 + 1]
      var b = pixelData[i * 4 + 2]

      var grey = r * 0.3 + g * 0.59 + b * 0.11
      let pv = 0
      if (grey > 125) {
        pv = 255
      }

      pixelData[i * 4 + 0] = pv
      pixelData[i * 4 + 1] = pv
      pixelData[i * 4 + 2] = pv
    }

    ctx.putImageData(imageData, 0, 0, 0, 0, canvas.width, canvas.height)
  }
  static reverse(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    var pixelData = imageData.data
    for (var i = 0; i < canvas.width * canvas.height; i++) {

      var r = pixelData[i * 4 + 0]
      var g = pixelData[i * 4 + 1]
      var b = pixelData[i * 4 + 2]

      pixelData[i * 4 + 0] = 255 - r
      pixelData[i * 4 + 1] = 255 - g
      pixelData[i * 4 + 2] = 255 - b
    }

    ctx.putImageData(imageData, 0, 0, 0, 0, canvas.width, canvas.height)
  }
  static mosaic(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    var img_data = ctx.getImageData(0, 0, canvas.width, canvas.height)
    var px_data = img_data.data

    var img_data_2 = ctx.getImageData(0, 0, canvas.width, canvas.height)
    var px_data_2 = img_data_2.data
    var size = 10
    for (var i = 0; i < canvas.width; i += size) {
      for (var j = 0; j < canvas.height; j += size) {
        var r_sum = 0
        var g_sum = 0
        var b_sum = 0
        // 获取 紧随 (i, j) 的 9个像素点
        for (var dx = 0; dx < size; dx++) {
          for (var dy = 0; dy < size; dy++) {
            var x = i + dx
            var y = j + dy
            // (x , y) 坐标
            var p_px = y * canvas.width + x
            r_sum += px_data[p_px * 4 + 0]
            g_sum += px_data[p_px * 4 + 1]
            b_sum += px_data[p_px * 4 + 2]
          }
        }


        var r_avg = r_sum / (size * size)
        var g_avg = g_sum / (size * size)
        var b_avg = b_sum / (size * size)
        for (var dx = 0; dx < size; dx++) {
          for (var dy = 0; dy < size; dy++) {
            var x = i + dx
            var y = j + dy
            var p_px = y * canvas.width + x
            px_data_2[p_px * 4 + 0] = r_avg
            px_data_2[p_px * 4 + 1] = g_avg
            px_data_2[p_px * 4 + 2] = b_avg
          }
        }
      }
    }

    ctx.putImageData(img_data_2, 0, 0, 0, 0, canvas.width, canvas.height)
  }

  // 去掉红色
  static removeRed(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    var pixelData = imageData.data
    for (var i = 0; i < canvas.width * canvas.height; i++) {
      // r 通道
      pixelData[i * 4 + 0] = 0

    }

    ctx.putImageData(imageData, 0, 0, 0, 0, canvas.width, canvas.height)

  }
  // 去掉绿色
  static removeGreen(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    var pixelData = imageData.data
    for (var i = 0; i < canvas.width * canvas.height; i++) {
      // r 通道
      pixelData[i * 4 + 1] = 0

    }

    ctx.putImageData(imageData, 0, 0, 0, 0, canvas.width, canvas.height)

  }
  // 去掉蓝色
  static removeBlue(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    var pixelData = imageData.data
    for (var i = 0; i < canvas.width * canvas.height; i++) {
      // r 通道
      pixelData[i * 4 + 2] = 0

    }

    ctx.putImageData(imageData, 0, 0, 0, 0, canvas.width, canvas.height)

  }
  static grayscale(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    var pixelData = imageData.data
    for (var i = 0; i < canvas.width * canvas.height; i++) {

      var r = pixelData[i * 4 + 0]
      var g = pixelData[i * 4 + 1]
      var b = pixelData[i * 4 + 2]

      var grey = r * 0.3 + g * 0.59 + b * 0.11
      // let pv = 0
      // if (grey > 125) {
      //   pv = 255
      // }

      pixelData[i * 4 + 0] = grey
      pixelData[i * 4 + 1] = grey
      pixelData[i * 4 + 2] = grey
    }
    ctx.putImageData(imageData, 0, 0, 0, 0, canvas.width, canvas.height)
  }
  // 红色
  static red(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    var pixelData = imageData.data
    for (var i = 0; i < canvas.width * canvas.height; i++) {


      pixelData[i * 4 + 1] = 0
      pixelData[i * 4 + 2] = 0

    }

    ctx.putImageData(imageData, 0, 0, 0, 0, canvas.width, canvas.height)

  }
  // 绿色
  static green(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    var pixelData = imageData.data
    for (var i = 0; i < canvas.width * canvas.height; i++) {

      pixelData[i * 4 + 0] = 0

      pixelData[i * 4 + 2] = 0

    }

    ctx.putImageData(imageData, 0, 0, 0, 0, canvas.width, canvas.height)

  }
  // 蓝色
  static blue(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    var pixelData = imageData.data
    for (var i = 0; i < canvas.width * canvas.height; i++) {

      pixelData[i * 4 + 0] = 0

      pixelData[i * 4 + 1] = 0

    }

    ctx.putImageData(imageData, 0, 0, 0, 0, canvas.width, canvas.height)

  }
  static nostalgia(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    var pixelData = imageData.data
    for (var i = 0; i < canvas.width * canvas.height; i++) {

      var r = pixelData[i * 4],
        g = pixelData[i * 4 + 1],
        b = pixelData[i * 4 + 2];
      var newR = (0.393 * r + 0.769 * g + 0.189 * b);
      var newG = (0.349 * r + 0.686 * g + 0.168 * b);
      var newB = (0.272 * r + 0.534 * g + 0.131 * b);
      var rgbArr = [newR, newG, newB].map((e) => {
        return e < 0 ? 0 : e > 255 ? 255 : e;
      });
      pixelData[i * 4] = rgbArr[0]
      pixelData[i * 4 + 1] = rgbArr[1]
      pixelData[i * 4 + 2] = rgbArr[2]
    }

    ctx.putImageData(imageData, 0, 0, 0, 0, canvas.width, canvas.height)
  }
  static casting(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    var pixelData = imageData.data
    for (var i = 0; i < canvas.width * canvas.height; i++) {

      var r = pixelData[i * 4],
        g = pixelData[i * 4 + 1],
        b = pixelData[i * 4 + 2];
      var newR = r * 128 / (g + b + 1);
      var newG = g * 128 / (r + b + 1);
      var newB = b * 128 / (g + r + 1);
      var rgbArr = [newR, newG, newB].map((e) => {
        return e < 0 ? 0 : e > 255 ? 255 : e;
      });
      pixelData[i * 4] = rgbArr[0]
      pixelData[i * 4 + 1] = rgbArr[1]
      pixelData[i * 4 + 2] = rgbArr[2]
    }

    ctx.putImageData(imageData, 0, 0, 0, 0, canvas.width, canvas.height)
  }
  static frozen(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    var pixelData = imageData.data
    for (var i = 0; i < canvas.width * canvas.height; i++) {

      var r = pixelData[i * 4],
        g = pixelData[i * 4 + 1],
        b = pixelData[i * 4 + 2];
      var newR = (r - g - b) * 3 / 2;
      var newG = (g - r - b) * 3 / 2;
      var newB = (b - g - r) * 3 / 2;
      var rgbArr = [newR, newG, newB].map((e) => {
        return e < 0 ? 0 : e > 255 ? 255 : e;
      });
      pixelData[i * 4] = rgbArr[0]
      pixelData[i * 4 + 1] = rgbArr[1]
      pixelData[i * 4 + 2] = rgbArr[2]
    }

    ctx.putImageData(imageData, 0, 0, 0, 0, canvas.width, canvas.height)
  }

  static comicStrip(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    var pixelData = imageData.data
    for (var i = 0; i < canvas.width * canvas.height; i++) {

      var r = pixelData[i * 4],
        g = pixelData[i * 4 + 1],
        b = pixelData[i * 4 + 2];
      var newR = Math.abs(g - b + g + r) * r / 256;
      var newG = Math.abs(b - g + b + r) * r / 256;
      var newB = Math.abs(b - g + b + r) * g / 256;
      var rgbArr = [newR, newG, newB];

      pixelData[i * 4] = rgbArr[0]
      pixelData[i * 4 + 1] = rgbArr[1]
      pixelData[i * 4 + 2] = rgbArr[2]
    }

    ctx.putImageData(imageData, 0, 0, 0, 0, canvas.width, canvas.height)
  }

  static brown(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    var pixelData = imageData.data
    for (var i = 0; i < canvas.width * canvas.height; i++) {

      var r = pixelData[i * 4],
        g = pixelData[i * 4 + 1],
        b = pixelData[i * 4 + 2];
      var newR = r * 0.393 + g * 0.769 + b * 0.189;
      var newG = r * 0.349 + g * 0.686 + b * 0.168;
      var newB = r * 0.272 + g * 0.534 + b * 0.131;
      var rgbArr = [newR, newG, newB];


      pixelData[i * 4] = rgbArr[0]
      pixelData[i * 4 + 1] = rgbArr[1]
      pixelData[i * 4 + 2] = rgbArr[2]
    }

    ctx.putImageData(imageData, 0, 0, 0, 0, canvas.width, canvas.height)
  }

  static darktone(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    var pixelData = imageData.data
    for (var i = 0; i < canvas.width * canvas.height; i++) {

      var r = pixelData[i * 4],
        g = pixelData[i * 4 + 1],
        b = pixelData[i * 4 + 2];
      var newR = r * r / 255;
      var newG = g * g / 255;
      var newB = b * b / 255;
      var rgbArr = [newR, newG, newB];


      pixelData[i * 4] = rgbArr[0]
      pixelData[i * 4 + 1] = rgbArr[1]
      pixelData[i * 4 + 2] = rgbArr[2]
    }

    ctx.putImageData(imageData, 0, 0, 0, 0, canvas.width, canvas.height)
  }

}

export default FilterUtil