import { useEffect, useState } from "react"

// export default function WidthPrinter() {
//     const [width, setWidth] = useState(window.innerWidth)
    
//     useEffect(() => {
//         const onResize = () => setWidth(window.innerWidth)
//         window.addEventListener('resize', onResize)
//         return () => {
//             window.removeEventListener('resize', onResize)
//         }
//     })

//     return (
//         <div>{`width is ${width}`}</div>
//     )
// }

function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        const onResize = () => setWidth(window.innerWidth)
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [])

    return width
}

export default function WidthPrinter() {
    const width = useWindowWidth()
    return <div>{`width is ${width}`}</div>
}