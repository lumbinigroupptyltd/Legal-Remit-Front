import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CommonConstants } from '../Constants/common.constants'

const useAxiosInterceptors = () => {
	const navigate = useNavigate()

	useEffect(() => {
		const requestInterceptor = axios.interceptors.request.use(
			function (config) {
				const openRouteKeywords = [
					'signin',
					'getallcontactus_details',
					'getissueauthoritybynationality',
					'getallcountries',
					'businessdetails/create'
					// 'getallsendercountries',
					// 'getallreview',
					// 'getallnews'
				];

				// Check if the request URL contains any of the open route keywords
				if (!openRouteKeywords.some(keyword => config.url.endsWith(keyword))) {
					const token = localStorage.getItem('token');
					if (token) {
						config.headers.Authorization = `Bearer ${token}`;
					}
				}
				return config;
			},
			function (error) {
				return Promise.reject(error);
			}
		);


		const responseInterceptor = axios.interceptors.response.use(
			function (response) {
				return response
			},
			function (error) {
				if (error.response && error.response.status === 401) {
					const refreshToken = localStorage.getItem('refreshToken')
					if (refreshToken) {
						return axios
							.post(CommonConstants.BASE_URL + '/refreshToken', {
								token: refreshToken
							})
							.then((response) => {
								if (response && response.data.token) {
									
									localStorage.setItem('token', response.data.token)
									error.config.headers.Authorization = `Bearer ${response.data.token}`
									return axios(error.config)
								} else {
									redirectToLogin()
								}
							})
							.catch(() => {
								redirectToLogin()
							})
					} else {
						redirectToLogin()
					}
				}
				return Promise.reject(error)
			}
		)

		// Cleanup interceptors on component unmount
		return () => {
			axios.interceptors.request.eject(requestInterceptor)
			axios.interceptors.response.eject(responseInterceptor)
		}
	}, [history])

	// Redirect to login route
	const redirectToLogin = () => {
		localStorage.clear()
		sessionStorage.clear()
		navigate('/login')
	}

	// Return an empty array to avoid re-running the effect
	return []
}

export default useAxiosInterceptors
