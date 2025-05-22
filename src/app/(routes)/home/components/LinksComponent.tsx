import { Archive, Brush, Github, Instagram, MessageCircle, MoveRight, Twitter, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"

const styles = {
    wrapper: "p-12 rounded-md border-1 m-6 flex flex-wrap justify-start gap-6 items-start",
    title: "font-bold text-2xl",
    linksRow: "flex flex-wrap gap-2",
    linkButton: "hover:cursor-pointer",
}

export default function LinksComponent() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Links</div>

            <div className={styles.linksRow}>
                <Button
                    onClick={() => {
                        window.open("https://github.com/Grs2080w", "_blank")
                    }}
                    className={styles.linkButton}
                    variant="outline"
                >
                    <Github />
                </Button>
                <Button
                    onClick={() => {
                        window.open("https://www.youtube.com", "_blank")
                    }}
                    className={styles.linkButton}
                    variant="outline"
                >
                    <Youtube />
                </Button>
                <Button
                    onClick={() => {
                        window.open("https://www.instagram.com", "_blank")
                    }}
                    className={styles.linkButton}
                    variant="outline"
                >
                    <Instagram />
                </Button>
                <Button
                    onClick={() => {
                        window.open("https://web.whatsapp.com", "_blank")
                    }}
                    className={styles.linkButton}
                    variant="outline"
                >
                    <MessageCircle />
                </Button>
                <Button
                    onClick={() => {
                        window.open("https://drive.google.com/drive", "_blank")
                    }}
                    className={styles.linkButton}
                    variant="outline"
                >
                    <Archive />
                </Button>
                <Button
                    onClick={() => {
                        window.open("https://x.com", "_blank")
                    }}
                    className={styles.linkButton}
                    variant="outline"
                >
                    <Twitter />
                </Button>
                <Button
                    onClick={() => {
                        window.open("https://www.canva.com/s/designs", "_blank")
                    }}
                    className={styles.linkButton}
                    variant="outline"
                >
                    <Brush />
                </Button>
                <Button
                    onClick={() => {
                        window.open("https://www.ilovepdf.com/pt/pdf_para_word", "_blank")
                    }}
                    className={styles.linkButton}
                    variant="outline"
                >
                    PDF <MoveRight /> WORD
                </Button>
                <Button
                    onClick={() => {
                        window.open("https://www.ilovepdf.com/pt/word_para_pdf", "_blank")
                    }}
                    className={styles.linkButton}
                    variant="outline"
                >
                    WORD <MoveRight /> PDF
                </Button>
            </div>
        </div>
    )
}