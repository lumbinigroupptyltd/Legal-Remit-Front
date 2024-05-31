import axios from 'axios'
import { CommonConstants } from '../../../Constants/common.constants'

export const getCountries = () => {
  return new Promise((resolve, reject) => {
    axios.get(
      CommonConstants.BASE_URL + '/getallcountries'
    )
      .then((response) => {
        resolve(response)
      }).catch((error) => {
      reject(error)
    })
  })
}
