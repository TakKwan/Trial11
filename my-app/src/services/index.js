import axios from "axios"
import qs from 'qs'

const NPS_KEY = process.env.REACT_APP_NPS_KEY
const Client = axios.create({ baseURL: 'http://localhost:3001/api' })
const NPS = axios.create({
  baseURL: 'https://developer.nps.gov/api/v1',
  headers: { 'X-Api-Key': NPS_KEY }
})


Client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`
    } else {
      console.log("no token")
    }

    return config
  },
  (error) => Promise.reject(error)
)

export const register = async (userBody) => {
  try {
    const respond = await axios.post('http://localhost:3001/api/user/register', userBody)
    return respond.data
  } catch (error) {
    throw error
  }
}

export const login = async (userBody) => {
  try {
    const respond = await axios.post('http://localhost:3001/api/user/login', userBody)
    localStorage.setItem('token', respond.data.token)
    return respond.data
  } catch (error) {
    throw error
  }
}

export const getWatchlist = async (userId) => {
  try {
    const respond = await Client.get(`/watchlist/${userId}`)
    return respond.data
  } catch (error) {
    throw error
  }
}

export const getFavorites = async (userId) => {
  try {
    const respond = await Client.get(`/favorite/${userId}`)
    return respond.data
  } catch (error) {
    throw error
  }
}

export const CheckSession = async () => {
  try {
    const respond = await Client.get('/user/session')
    return respond.data
  } catch (error) {
    throw error
  }
}

export const getParks = async (start, limit) => {
  try {
    const respond = await NPS.get('/parks', { params: { start, limit } })
    return respond.data
  } catch (error) {
    throw error
  }
}

export const getPark = async (parkCode) => {
  try {
    const respond = await NPS.get('/parks', { params: { parkCode } })
    return respond.data.data[0]
  } catch (error) {
    throw error
  }
}

export const getMultiParks = async (parkCodes) => {
  try {
    const parkCodes_str = parkCodes.join(',')
    const respond = await NPS.get('/parks', {
      params: {
        parkCode: parkCodes_str
      }
    })
    return respond.data.data
  } catch (error) {
    throw error
  }
}

export const addToWatchList = async (userId, parkCode) => {
  try {
    const respond = await Client.post('watchlist', {
      userId,
      parkCode
    })

    return respond.data
  } catch (error) {
    throw error
  }
}

export const unwatch = async (userId, parkCode) => {
  try {
    const respond = await Client.delete('watchlist', {
      userId,
      parkCode
    })
  } catch (error) {
    throw error
  }
}

export const addToFavorites = async (userId, parkCode) => {
  try {
    const respond = await Client.post('favorite', {
      userId,
      parkCode
    })

    return respond.data
  } catch (error) {
    throw error
  }
}