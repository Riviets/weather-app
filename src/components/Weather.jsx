import { useEffect, useState } from "react"
import search_icon from "../assets/search.png"
import clear_icon from "../assets/clear.png"
import cloud_icon from "../assets/cloud.png"
import drizzle_icon from "../assets/drizzle.png"
import humidity_icon from "../assets/humidity.png"
import rain_icon from "../assets/rain.png"
import snow_icon from "../assets/snow.png"
import wind_icon from "../assets/wind.png"
import { weatherService } from "../services/weatherService"
import Spinner from "./utils/Spinner"

export default function Weather(){

    const [cityWeatherData, setCityWeatherData] = useState(null)
    const [inputValue, setInputValue] = useState('London')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(()=>{
        handleSearch()
    }, [])

    function handleChange(event){
        setInputValue(event.target.value)
    }

    const allIcons = {
        1000: clear_icon,
        1003: cloud_icon,
        1006: cloud_icon,
        1030: drizzle_icon,
        1072: drizzle_icon,
        1153: drizzle_icon,
        1168: drizzle_icon,
        1171: drizzle_icon,
        1114: snow_icon,
        1117: snow_icon,
        1180: rain_icon,
        1183: rain_icon,
        1189: rain_icon,
        1192: rain_icon,
        1195: rain_icon,
        1198: rain_icon
    }

    async function handleSearch(){
        try{
            setIsLoading(true)
            setError(null)
            const data = await weatherService.getCurrentWeatherForCity(inputValue)
            const icon = allIcons[data.current.condition.code] || clear_icon
            setCityWeatherData({
                temp: Math.floor(data.current.temp_c),
                name: data.location.name,
                humidity: data.current.humidity,
                wind: data.current.wind_kph,
                icon: icon
            })
        }
        catch(err){
            setError(err)
        }
        finally{
            setIsLoading(false)
        }
    }

    return(
        <div className="flex flex-col items-center bg-white rounded-md px-8 py-10 bg-linear-to-br from-blue-800 to-purple-800">
            {isLoading ?
                <div className="flex justify-center items-center h-[450px] w-[300px]">
                    <Spinner />
                </div> 
                : 
                    <>
                        <div className="flex justify-between items-center gap-3 mb-3 text-[#525252]">
                            <input type="text" placeholder="Enter city name" value={inputValue} onChange={handleChange} className="bg-white rounded-full text-lg px-5 py-3 max-w-[250px] outline-none"/>
                            <div onClick={handleSearch} className="flex items-center justify-center bg-white rounded-full w-12 h-12">
                                <img src={search_icon} alt="Search" />
                            </div>
                        </div>
                        {
                            error ?
                            <>
                                <div className="flex justify-center items-center h-[450px] w-[300px]">
                                    <p className="font-bold text-2xl">No Results</p>
                                </div>
                            </> :
                            <>
                                <img src={cityWeatherData?.icon} alt="Weather icon" className="mb-3"/>
                                <p className="text-7xl font-semibold mb-1">{cityWeatherData?.temp}°C</p>
                                <p className="text-4xl tracking-wider mb-12">{cityWeatherData?.name}</p>
                                <div className="flex justify-between items-center w-full max-w-[270px]">
                                    <div className="flex gap-2 items-center">
                                        <img className="max-w-[20px]" src={humidity_icon} alt="Humidity" />
                                        <div className="flex flex-col">
                                            <p className="text-xl">{cityWeatherData?.humidity}%</p>
                                            <p>Humidity</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <img className="max-w-[20px]" src={wind_icon} alt="Wind speed" />
                                        <div className="flex flex-col">
                                            <p className="text-xl">{cityWeatherData?.wind} Km/h</p>
                                            <p>Wind Speed</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                       
                    </>
            }
        </div>
    )
}