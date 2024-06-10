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

export const getNationalities = () => {
	return new Promise((resolve, reject) => {
		axios.get(
			CommonConstants.BASE_URL + '/getallnationality'
		)
			.then((response) => {
				resolve(response)
			}).catch((error) => {
			reject(error)
		})
	})
}

export const getStates = (countryId) => {
	return new Promise((resolve, reject) => {
			axios.post(
				CommonConstants.BASE_URL + '/getallstatebycountryid', {
					id: countryId
				})
				.then((response) => {
					resolve(response)
				}).catch((error) => {
					reject(error)
				}
			)
		}
	)
}

export const getOccupations = () => {
	return new Promise((resolve, reject) => {
		axios.get(
			CommonConstants.BASE_URL + '/getalloccupations'
		)
			.then((response) => {
				resolve(response)
			}).catch((error) => {
			reject(error)
		})
	})
}

export const storeIndividualKyc = (data) => {
	return new Promise((resolve, reject) => {
		axios.post(
			CommonConstants.BASE_URL + '/userkycdetails/create', data
		)
			.then((response) => {
				resolve(response)
			}).catch((error) => {
			reject(error)
		})
	})
}

export const getIssueingAuthorityByNationality = (nationalityId, countryId) => {
	return new Promise((resolve, reject) => {
		axios.post(
			CommonConstants.BASE_URL + '/getissueauthoritybynationality', {
				nationality: nationalityId,
				countryId: countryId
			}
		)
			.then((response) => {
				resolve(response)
			}).catch((error) => {
			reject(error)
		})
	})
}

export const getIdTypesByCountry = (countryId) => {
	return new Promise((resolve, reject) => {
		axios.post(
			CommonConstants.BASE_URL + '/getactiveidtypebycountryid', {
				countryId: countryId
			}
		)
			.then((response) => {
				resolve(response)
			}).catch((error) => {
			reject(error)
		})
	})
}

export const saveUserIdDetail = (data) => {
	return new Promise((resolve, reject) => {
		axios.post(
			CommonConstants.BASE_URL + '/useriddetails/create', data
		)
			.then((response) => {
				resolve(response)
			}).catch((error) => {
			reject(error)
		})
	})
}

export const saveUserDocument = (data, userId) => {
	
	return new Promise((resolve, reject) => {
		axios.post(`${CommonConstants.BASE_URL}/userfiles/upload/` + userId, data)
			.then((response) => {
				resolve(response);
			})
			.catch((error) => {
				reject(error);
			});
	});
};


export const updateUser = (data) => {
	return new Promise((resolve, reject) => {
		axios.patch(
			CommonConstants.BASE_URL + '/user/update', data
		)
			.then((response) => {
				resolve(response)
			}).catch((error) => {
			reject(error)
		})
	})
}

export const generateScantekLink = (id) => {

	return new Promise((resolve, reject) => {
		axios.post(
			CommonConstants.BASE_URL + '/generatedigitalverificationlink/' + id,
			{},
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
			.then((response) => {
				resolve(response)
			}).catch((error) => {
			reject(error)
		})
	})
}


export const storeBusinessDetail = (data) => {
	return new Promise((resolve, reject) => {
		axios.post(
			CommonConstants.BASE_URL + '/businessdetails/create', data
		)
			.then((response) => {
				resolve(response)
			}).catch((error) => {
			reject(error)
		})
	})
}
