"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowUpRightFromSquare } from "lucide-react"

const styles = {
    wrapper: "flex flex-col h-[100dvh] w-screen items-center justify-start bg-zinc-900",
    logoRow: "flex flex-row items-center justify-center mt-50",
    title: "text-9xl font-bold",
    logo: "bg-[url('/logo_white.svg')] bg-cover w-[200px] h-[200px] mx-[-40px]",
    subtitle: "font-bold text-2xl text-gray-700",
    loginWrapper: "mt-20",
    loginLink: "text-white",
    loginButton: "font-bold rounded-sm hover:cursor-pointer",
    footer: "absolute bottom-4 text-sm text-gray-500",
}

export default function Home() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.logoRow}>
                <div className={styles.title}>Grp</div>
                <div className={styles.logo}></div>
                <div className={styles.title}>Server</div>
            </div>
            <div className={styles.subtitle}>A Personal Server All-In-One Made By Gabriel Santos</div>
            <div className={styles.loginWrapper}>
                <Link href={`/login`} className={styles.loginLink}>
                    <Button className={styles.loginButton}>
                        Go to login page
                        <ArrowUpRightFromSquare />
                    </Button>
                </Link>
            </div>
            <footer className={styles.footer}>&copy; 2025 Grp@Server. All rights reserved.</footer>
        </div>
    )
}