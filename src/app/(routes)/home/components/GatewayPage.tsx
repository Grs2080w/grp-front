"use client"

import UseStyleBar from "@/hooks/use-style-bar"
import { User } from "@/types/User"
import ListToDos from "./listToDos"
import ListToDosPhone from "./listToDosPhone"
import WeatherComponent from "./WeatherComponent"
import LinksComponent from "./LinksComponent"

interface Props {
    userProfile: User
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    weatherResponse: any
}

const styles = {
    wrapperMobile: "bg-zinc-900 w-[88dvw] h-[calc(100dvh)] pr-12",
    wrapperDesktopExpanded: "bg-zinc-900 w-[calc(100vw-18rem)] h-[100dvh]",
    wrapperDesktopCollapsed: "bg-zinc-900 w-[calc(100vw-6rem)] transition-[width] duration-320 h-[90dvh]",
    topMobile: "w-full h-[40%] flex flex-col items-center justify-center gap-5 mt-8",
    topDesktop: "w-full h-[40%] flex flex-col items-center justify-center gap-5",
    titleMobile: "font-bold text-4xl",
    titleDesktop: "font-bold text-7xl",
    subtitleMobile: "font-bold text-zinc-600 text-lg",
    subtitleDesktop: "font-bold text-zinc-600 text-xl",
    todosMobile: "w-[100vw]",
    bottom: "w-full h-[50%] flex flex-wrap justify-center items-center p-2",
}

export default function GatewayPage({ userProfile, weatherResponse }: Props) {
    const { isMobile, state } = UseStyleBar()

    const wrapperClass = isMobile
        ? styles.wrapperMobile
        : state === "expanded"
        ? styles.wrapperDesktopExpanded
        : styles.wrapperDesktopCollapsed

    const topClass = isMobile ? styles.topMobile : styles.topDesktop
    const titleClass = isMobile ? styles.titleMobile : styles.titleDesktop
    const subtitleClass = isMobile ? styles.subtitleMobile : styles.subtitleDesktop
    const todosClass = isMobile ? styles.todosMobile : ""

    return (
        <div className={wrapperClass}>
            <div className={topClass}>
                <div className={titleClass}>Welcome back, {userProfile.username}</div>
                <div className={subtitleClass}>What would you like to do today?</div>
                <div className={todosClass}>
                    {!isMobile ? <ListToDos isMobile={true} /> : <ListToDosPhone />}
                </div>
            </div>
            <div className={styles.bottom}>
                <WeatherComponent weatherResponse={weatherResponse} />
                <LinksComponent />
            </div>
        </div>
    )
}