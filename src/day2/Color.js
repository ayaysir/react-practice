import { useState } from "react";


export default function Color() {

    const [color, setColor] = useState("red")

    function onClick() {
        setColor("blue")
    }

    return(
        <button style={{backgroundColor: color}} onClick={onClick}>good</button>
    );
}