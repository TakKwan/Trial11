import axios from "axios"
import qs from 'qs'

const NPS_KEY = process.env.REACT_APP_NPS_KEY
const Client = axios.create({ baseURL: 'http://localhost:3001/api' })
const NPS = axios.create({
  baseURL: 'https://developer.nps.gov/api/v1',
  headers: { 'X-Api-Key': NPS_KEY }
})
const USER_TOKEN_STORAGE_KEY = "token"

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
    const respond = await Client.post('/user/register', userBody)
    localStorage.setItem(USER_TOKEN_STORAGE_KEY, respond.data.token)
    return respond.data.user
  } catch (error) {
    throw error
  }
}

export const login = async (userBody) => {
  try {
    const respond = await Client.post('/user/login', userBody)
    localStorage.setItem(USER_TOKEN_STORAGE_KEY, respond.data.token)
    return respond.data.user
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
    if (!userId) return Promise.resolve([])
    const respond = await Client.get(`/favorite/${userId}`)
    return respond.data
  } catch (error) {
    throw error
  }
}

export const checkSession = async () => {
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
    if (!parkCodes || parkCodes?.length === 0) {
      return Promise.resolve(null);
    }
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
  const respond = await Client.post('watchlist', {
    userId,
    parkCode
  })
}

export const unwatch = async (userId, parkCode) => {
  const respond = await Client.delete(`watchlist/${userId}/${parkCode}`)
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

export const removeFavorite = async (userId, parkCode) => {
  Client.delete(`favorite/${userId}/${parkCode}`)
}

export const searchParks = async (query) => {
  try {
    const respond = await NPS.get('parks', {
      params: {
        q: query
      }
    })

    return respond.data.data
  } catch (error) {
    throw error
  }
}


export const getUser = () => {
  try {
    const token = localStorage.getItem(USER_TOKEN_STORAGE_KEY)
    if (token) {
      return checkSession().catch(e => localStorage.removeItem(USER_TOKEN_STORAGE_KEY))
    }
  } catch (error) {
    throw error
  }
}

export const logoutUser = () => {
  try {
    localStorage.removeItem(USER_TOKEN_STORAGE_KEY)
  } catch (error) {
    throw error
  }
}