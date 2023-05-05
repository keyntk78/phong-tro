import { Buffer } from 'buffer'
export const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const render = new FileReader()
    render.readAsDataURL(file)
    render.onload = () => resolve(render.result)
    render.onerror = (e) => reject(e)
  })

export const blogTobase64 = (blog) => new Buffer(blog, 'base64').toString('binary')
