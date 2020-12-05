import React, { useEffect, useState, useRef, useCallback, useReducer } from 'react'
import './../common.css'
import ImperativeHandleExample from './ImperativeHandleExample'

const UserContext = React.createContext({username: "", helloCount: 0})
const SetUserContext = React.createContext(() => {})

function EditContextData1() {
    const [user, setUser] = useState({
        username: "mike",
        helloCount: 0
    })

    return (
        <div>
            <SetUserContext.Provider value={setUser}>
                <UserContext.Provider value={user}>
                    <SubElement1 />
                </UserContext.Provider>
            </SetUserContext.Provider>
        </div>
    )
}

function SubElement1() {
    return (
        <SetUserContext.Consumer>
            {setUser => (
                <UserContext.Consumer>
                    {
                        ({username, helloCount}) => (
                            <React.Fragment>
                                <p>{`${username}님, 안녕하세요.`}</p>
                                <p>{`인사 횟수: ${helloCount}`}</p>
                                <button
                                    onClick={() => setUser({username, helloCount: helloCount + 1})}
                                >인사하기</button>
                        
                            </React.Fragment>
                        )
                    }
                </UserContext.Consumer>
            )}
        </SetUserContext.Consumer>
    )
}

function TextInput() {
    // useRef를 이용하면 자식요소에 접근할 수 있다.
    const inputRef = useRef()

    useEffect(() => {
        // ref 객체의 current 속성을 이용하면 자식 요소에 접근할 수 있다.
        inputRef.current.focus()
    }, [])

    return (
        <div>
            {/* 접근하고자 하는 자식 요소의 ref 속성에 ref 객체를 입력한다. */}
            <input type="text" ref={inputRef} />
            <button>저장</button>
        </div>
    )
}

const INITIAL_TEXT = "ㅁㅁ"

function Form() {
    const [text, setText] = useState(INITIAL_TEXT)
    const [showText, setShowText] = useState(true)

    // useCallback의 메모이제이션: 한 번 생성된 함수를 계속 재사용
    const setInitialText = useCallback(ref => {
        ref && setText(INITIAL_TEXT)
    }, [])

    return(
        <div>
            {showText && (
                <input
                    type="text"
                    // ref={ref => ref && setText(INITIAL_TEXT)}
                    ref={setInitialText}
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
            )}
            <button onClick={() => setShowText(!showText)}>보이기/가리기</button>
        </div>
    )
}

function MeasureAge() {
    const [age, setAge] = useState(20)
    // age의 이전 값을 저장하기 위한 용도로 useRef 훅을 사용
    const prevAgeRef = useRef(20)

    useEffect(
        () => {
            // age 값이 변경되면 그 값을 prevAgeRef에 저장
            prevAgeRef.current = age
        }
    , [age])
    
    const prevAge = prevAgeRef.current
    const text = age === prevAge ? 'same' : age > prevAge ? 'older' : 'younger'

    return (
        <div>
            <p>{`age ${age} is ${text} than age ${prevAge}`}</p>
            <button 
                onClick={() => {
                    const age = Math.floor(Math.random() * 60 + 1)
                    setAge(age)
                }}
            >나이 변경</button>
        </div>
    )

}

const INITIAL_STATE = {name: 'empty', age: 10}

function reducer(state, action) {
    console.log(action.type, action)
    switch(action.type) {
        case 'setName':
            return { ...state, name: action.name }
        case 'setAge':
            return { ...state, age: action.age }
        default:
            return state
    }
}

function ReducerExample() {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
    
    return (
        <div>
            <p>{`name is ${state.name}`}</p>
            <p>{`age is ${state.age}`}</p>
            <input
                type="text"
                name="inputName"
                value={state.name}
                onChange={e => dispatch({type: 'setName', name: e.currentTarget.value})}
            />
            <input
                type="number"
                name="inputAge"
                value={state.age}
                onChange={e => dispatch({type: 'setAge', age: e.currentTarget.value})}
            />
        </div>
    )
}

function Parent() {
    const profileRef = useRef()

    const onClick = () => {
        if(profileRef.current) {
            console.log('currentNameLength: ', profileRef.current.getNameLength())
            profileRef.current.addAge(5)
            profileRef.current.setName(String.fromCharCode(64 + Math.ceil(Math.random() * 20)))
        }
    }

    return (
        <div>
            <ImperativeHandleExample ref={profileRef} />
            <button onClick={onClick}>add age 5</button>
        </div>
    )
}

export default function Day3() {
    return (
        <div>
            <Parent />
            <ReducerExample />
            <MeasureAge />
            <Form />
            <TextInput />
            <EditContextData1 />
        </div>
    )
}

