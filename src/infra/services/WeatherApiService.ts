import { fetchWeatherApi } from "openmeteo";

type paramsWeather = {
    latitude: number,
    longitude: number,
    hourly: Array<string>,
    past_days: number,
    forecast_days: number,
};

const url: string = "https://api.open-meteo.com/v1/forecast";

export class WeatherApiService {
    constructor(private params: paramsWeather) { }
    
    getWeather = async () => {
        const responses = await fetchWeatherApi(url, this.params);
        const response = responses[0];
        const latitude = response.latitude();
        const longitude = response.longitude();
        const elevation = response.elevation();
        const utcOffsetSeconds = response.utcOffsetSeconds();

        console.log(
            `\nCoordinates: ${latitude}°N ${longitude}°E`,
            `\nElevation: ${elevation}m asl`,
            `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
        );

        const hourly = response.hourly()!;

        const weatherData = {
            hourly: {
                time: Array.from(
                    { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() }, 
                    (_ , i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
                ),
                temperature_2m: hourly.variables(0)!.valuesArray(),
                precipitation_probability: hourly.variables(1)!.valuesArray(),
                precipitation: hourly.variables(2)!.valuesArray(),
                rain: hourly.variables(3)!.valuesArray(),
                showers: hourly.variables(4)!.valuesArray(),
                snow_depth: hourly.variables(5)!.valuesArray(),
                apparent_temperature: hourly.variables(6)!.valuesArray(),
                dew_point_2m: hourly.variables(7)!.valuesArray(),
                relative_humidity_2m: hourly.variables(8)!.valuesArray(),
                visibility: hourly.variables(9)!.valuesArray(),
                vapour_pressure_deficit: hourly.variables(10)!.valuesArray(),
                cloud_cover_high: hourly.variables(11)!.valuesArray(),
                cloud_cover_mid: hourly.variables(12)!.valuesArray(),
                cloud_cover_low: hourly.variables(13)!.valuesArray(),
                cloud_cover: hourly.variables(14)!.valuesArray(),
                surface_pressure: hourly.variables(15)!.valuesArray(),
                pressure_msl: hourly.variables(16)!.valuesArray(),
                weather_code: hourly.variables(17)!.valuesArray(),
                wind_speed_10m: hourly.variables(18)!.valuesArray(),
                wind_speed_80m: hourly.variables(19)!.valuesArray(),
                wind_speed_120m: hourly.variables(20)!.valuesArray(),
            },
        };

        // The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information
        console.log("\nHourly data:\n", weatherData.hourly)
    }

}