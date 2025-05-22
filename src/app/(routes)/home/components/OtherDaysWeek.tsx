interface Props {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	weatherResponse: any
}

const styles = {
	wrapper: "flex flex-col gap-2",
	row: "flex gap-3 items-center justify-center",
	day: "font-bold",
	max: "text-red-600 font-bold flex gap-1",
	min: "font-bold text-blue-700 flex gap-1",
}

export default function OtherDaysWeek({ weatherResponse }: Props) {
	const hourCurrent = new Date().getHours()
	const day_2 = weatherResponse.weather[1][0].day_week.slice(0, 3).toUpperCase()
	const max_temp_2 = hourCurrent > 18 ? weatherResponse.weather[1][2].temp_max : hourCurrent < 12 ? weatherResponse.weather[1][0].temp_max : weatherResponse.weather[1][1].temp_max
	const min_temp_2 = hourCurrent > 18 ? weatherResponse.weather[1][2].temp_min : hourCurrent < 12 ? weatherResponse.weather[1][0].temp_min : weatherResponse.weather[1][1].temp_min

	const day_3 = weatherResponse.weather[2].day_week.slice(0, 3).toUpperCase()
	const max_temp_3 = weatherResponse.weather[2].temp_max
	const min_temp_3 = weatherResponse.weather[2].temp_min
	const day_4 = weatherResponse.weather[3].day_week.slice(0, 3).toUpperCase()
	const max_temp_4 = weatherResponse.weather[3].temp_max
	const min_temp_4 = weatherResponse.weather[3].temp_min
	const day_5 = weatherResponse.weather[4].day_week.slice(0, 3).toUpperCase()
	const max_temp_5 = weatherResponse.weather[4].temp_max
	const min_temp_5 = weatherResponse.weather[4].temp_min

	return (
		<div className={styles.wrapper}>
			<div className={styles.row}>
				<div className={styles.day}>{day_2}</div>
				<div className={styles.max}>
					max
					<div>{max_temp_2}</div>
				</div>
				<div className={styles.min}>
					min
					<div>{min_temp_2}</div>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.day}>{day_3}</div>
				<div className={styles.max}>
					max
					<div>{max_temp_3}</div>
				</div>
				<div className={styles.min}>
					min
					<div>{min_temp_3}</div>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.day}>{day_4}</div>
				<div className={styles.max}>
					max
					<div>{max_temp_4}</div>
				</div>
				<div className={styles.min}>
					min
					<div>{min_temp_4}</div>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.day}>{day_5}</div>
				<div className={styles.max}>
					max
					<div>{max_temp_5}</div>
				</div>
				<div className={styles.min}>
					min
					<div>{min_temp_5}</div>
				</div>
			</div>
		</div>
	)
}
