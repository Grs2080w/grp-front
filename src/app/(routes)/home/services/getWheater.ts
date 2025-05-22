export interface ForecastItem {
	day_week: string
	dir_air: string
	hour: string
	int_air: string
	sunrise: string
	sunset: string
	temp_max: number
	temp_max_goes_to: string
	temp_min: number
	temp_min_goes_to: string
	umi_max: number
	umi_min: number
}

export type WeatherEntry = ForecastItem[] | ForecastItem

export interface WeatherResponse {
	city: string
	code: string
	weather: WeatherEntry[]
}

export default async function GetWeather() {
	const response = await fetch(process.env.NEXT_URL_API_WHEATHER + "", {
		next: { revalidate: 60 * 60 * 24 },
		method: "GET",
	}).then((res) => res.json())

	return response as WeatherResponse
}
