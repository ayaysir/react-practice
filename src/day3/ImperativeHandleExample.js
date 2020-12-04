import React, { useState, useImperativeHandle, forwardRef } from 'react'

function ImperativeHandleExample(props, ref) {
    const [name, setName] = useState('')
    const [age, setAge] = useState(0)

    useImperativeHandle(ref, () => ({
        addAge: value => setAge(age + value),
        setName: value => setName(value),
        getNameLength: () => name.length
    }))

    return (
        <div>
            <p>{`name is ${name}`}</p>
            <p>{`age is ${age}`}</p>
        </div>
    )
}

export default forwardRef(ImperativeHandleExample)