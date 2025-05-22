interface IconProps {
	type: string
}

export function FileIcon({ type }: IconProps) {
	const wrapperClass = `font-extrabold text-center`

	if (type === ".apk") {
		return <div className={`apk text-green-300 ${wrapperClass}`}>APK</div>
	} else if (type === ".csv") {
		return <div className={`csv text-emerald-500 ${wrapperClass}`}>CSV</div>
	} else if (type === ".doc") {
		return <div className={`doc text-blue-800 ${wrapperClass}`}>DOC</div>
	} else if (type === ".docx") {
		return <div className={`doc text-shadow-blue-500 ${wrapperClass}`}>DOCX</div>
	} else if (type === ".epub") {
		return <div className={`epub  text-shadow-blue-800 ${wrapperClass}`}>EPUB</div>
	} else if (type === ".exe") {
		return <div className={`exe text-gray-500 ${wrapperClass}`}>EXE</div>
	} else if (type === ".gif") {
		return <div className={`gif text-shadow-rose-400 ${wrapperClass}`}>GIF</div>
	} else if (type === ".jpg" || type === ".jpeg") {
		return <div className={` text-red-500 ${wrapperClass}`}>JPG</div>
	} else if (type === ".json") {
		return <div className={`text-amber-400 ${wrapperClass}`}>JSON</div>
	} else if (type === ".md") {
		return <div className={`text-amber-900 ${wrapperClass}`}>MD</div>
	} else if (type === ".mkv") {
		return <div className={`text-yellow-300 ${wrapperClass}`}>MKV</div>
	} else if (type === ".mp4") {
		return <div className={`text-shadow-violet-600 ${wrapperClass}`}>MP4</div>
	} else if (type === ".pdf") {
		return <div className={`text-red-800 ${wrapperClass}`}>PDF</div>
	} else if (type === ".png") {
		return <div className={`text-red-600 ${wrapperClass}`}>PNG</div>
	} else if (type === ".txt") {
		return <div className={`text-gray-400 ${wrapperClass}`}>TXT</div>
	} else if (type === ".excalidraw") {
		return <div className={`text-violet-950 ${wrapperClass}`}>EXCALIDRAW</div>
	} else {
		return <div className={`text-lime-500 ${wrapperClass}`}>{type.toUpperCase()}</div>
	}
}
