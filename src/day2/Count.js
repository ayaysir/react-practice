import { useEffect, useState } from "react";

function Title(props) {
    // props.title = "eefef"
    // × TypeError: Cannot assign to read only property 'title' of object '#<Object>'

    return <p>{props.title}</p>
}

function Count() {
    const [count, setCount] = useState(0)

    function onClick() {
        setCount(count + 1)
    }
    
    return (
        <div>
            <Title title={`현재 카운트: ${count}`} />
            <button onClick={onClick}>증가</button>
        </div>
    )
}

function Count2() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        document.title = `count: ${count}`
    })

    function onClick() {
        setCount(prev => prev + 1)
        setCount(prev => prev + 2)
    }

    console.log('render called')

    return(
        <div>
            <h2>{count}</h2>
            <button onClick={onClick}>증가</button>
        </div>
    )
}

export {Count, Count2}