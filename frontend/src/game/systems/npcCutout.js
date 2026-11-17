/** Tách phần nền giấy nối với mép khung; giữ màu sáng nằm kín bên trong model. */
export function cutoutNpcPixels({ data, width, height }) {
  const pixels = new Uint8ClampedArray(data)
  const visited = new Uint8Array(width * height)
  const queue = new Uint32Array(width * height)
  let head = 0
  let tail = 0
  const visit = (index) => {
    if (visited[index]) return
    visited[index] = 1
    const offset = index * 4
    const r = pixels[offset],
      g = pixels[offset + 1],
      b = pixels[offset + 2],
      a = pixels[offset + 3]
    // TẠM: ngưỡng tách nền kem đo từ sheet, không phải đặc tả màu áo/da.
    if (a === 0 || (r >= 215 && g >= 210 && b >= 195 && r >= g - 5 && g >= b - 5)) {
      pixels[offset + 3] = 0
      queue[tail++] = index
    }
  }
  for (let x = 0; x < width; x++) {
    visit(x)
    visit((height - 1) * width + x)
  }
  for (let y = 0; y < height; y++) {
    visit(y * width)
    visit(y * width + width - 1)
  }
  while (head < tail) {
    const index = queue[head++]
    const x = index % width
    if (x > 0) visit(index - 1)
    if (x < width - 1) visit(index + 1)
    if (index >= width) visit(index - width)
    if (index < width * (height - 1)) visit(index + width)
  }
  // Khung FRONT của Linh còn chạm một phần tiêu đề sheet. Chỉ giữ component lớn nhất
  // (cơ thể liên tục), không đưa chữ/đốm rời vào texture hoặc tính sai chiều cao người.
  const components = new Uint32Array(width * height)
  let component = 0,
    largest = 0,
    largestSize = 0
  for (let start = 0; start < width * height; start++) {
    if (components[start] || pixels[start * 4 + 3] === 0) continue
    component++
    head = 0
    tail = 1
    queue[0] = start
    components[start] = component
    while (head < tail) {
      const index = queue[head++],
        x = index % width,
        y = Math.floor(index / width)
      for (let dy = -1; dy <= 1; dy++)
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx,
            ny = y + dy
          if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue
          const next = ny * width + nx
          if (components[next] || pixels[next * 4 + 3] === 0) continue
          components[next] = component
          queue[tail++] = next
        }
    }
    if (tail > largestSize) {
      largestSize = tail
      largest = component
    }
  }
  for (let index = 0; index < components.length; index++) {
    if (components[index] !== largest) pixels[index * 4 + 3] = 0
  }
  let left = width,
    top = height,
    right = -1,
    bottom = -1
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      if (pixels[(y * width + x) * 4 + 3] === 0) continue
      left = Math.min(left, x)
      top = Math.min(top, y)
      right = Math.max(right, x)
      bottom = Math.max(bottom, y)
    }
  return {
    data: pixels,
    bounds: right < left ? null : [left, top, right - left + 1, bottom - top + 1],
  }
}
