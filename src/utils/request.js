import axios from 'axios'

const instance = axios.create({
  baseURL:
    'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd/',
  timeout: 5000,
})

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .get(
        url,
        { params },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
export const patch = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .patch(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
