import { Moon, SunMedium } from "lucide-react"
import OtherDaysWeek from "./OtherDaysWeek"

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    weatherResponse: any
}

const styles = {
    wrapper: "w-fit p-12 rounded-md border-1 m-6 flex flex-wrap justify-center items-center gap-6 items-center",
    leftCol: "flex flex-col justify-between gap-4 items-center",
    iconCol: "flex justify-center flex-col items-center gap-2",
    greeting: "font-bold",
    tempRow: "font-bold text-4xl flex gap-2 items-end",
    maxLabel: "text-lg font-bold text-red-500",
    minLabel: "text-lg font-bold text-blue-500",
}

export default function WeatherComponent({ weatherResponse }: Props) {
    const hourCurrent = new Date().getHours()

    const max_temp: string =
        hourCurrent > 18
            ? weatherResponse.weather[0][2].temp_max
            : hourCurrent < 12
            ? weatherResponse.weather[0][0].temp_max
            : weatherResponse.weather[0][1].temp_max
    const min_temp: string =
        hourCurrent > 18
            ? weatherResponse.weather[0][2].temp_min
            : hourCurrent < 12
            ? weatherResponse.weather[0][0].temp_min
            : weatherResponse.weather[0][1].temp_min

    return (
        <div className={styles.wrapper}>
            <div className={styles.leftCol}>
                <div className={styles.iconCol}>
                    {hourCurrent > 18 ? (
                        <Moon className="text-blue-800" size={50} />
                    ) : (
                        <SunMedium size={50} className="text-yellow-500" />
                    )}
                    <div className={styles.greeting}>
                        {hourCurrent < 12
                            ? "Good Morning"
                            : hourCurrent < 18
                            ? "Good Afternoon"
                            : "Good Evening"}
                    </div>
                </div>
                <div>
                    <div className={styles.tempRow}>
                        {max_temp}
                        <div className={styles.maxLabel}>max</div>
                    </div>
                    <div className={styles.tempRow}>
                        {min_temp}
                        <div className={styles.minLabel}>min</div>
                    </div>
                </div>
            </div>
            <OtherDaysWeek weatherResponse={weatherResponse} />
        </div>
    )
}