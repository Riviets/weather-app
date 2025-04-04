import axios from 'axios'

const API_URL = 'http://api.weatherapi.com/v1'

export const weatherService = {
    getCurrentWeatherForCity: async (query) => {
        try{
            const response = await axios.get(`${API_URL}/current.json?key=0416bf639f4844a6ab3113517250404&q=${query}`)
            return response.data
        }
        catch(error){
            throw error
        }
    }
}