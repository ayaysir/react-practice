import PropTypes from 'prop-types'
import { useCallback, useEffect, useReducer, useState } from 'react'

import './../common.css'
import {WidthColor, DetectHeightChange } from './Legacy'

Person.propTypes = {
    isMale: PropTypes.bool.isRequired,
    age: function(props, propName, componentName) {
        const value = props[propName]
        if(value < 10 || value > 20) {
            return new Error(
                `Invalid prop ${propName} supplied to ${componentName}.
                It must be 10 <= value <= 20`
            )
        }
    },
    type: PropTypes.oneOf(["gold", "silver", "bronze"]),
    onChangeName: PropTypes.func,
    onChangeTitle: PropTypes.func.isRequired
}

function Person({ type, age, isMale, onChangeName, onChangeTitle }) {
    function onClick1() {
        const msg = `type: ${type}, age: ${age ? age : '알 수 없음'}`
        console.log(msg, { color: type === "gold" ? "red" : "black"})
    }

    function onClick2(name, title) {
        if(onChangeName) {
            onChangeName(name)
        }
        onChangeTitle(title)
        isMale ? goMalePage() : goFemalePage()
    }

    return (
        <div>
            <button onClick={onClick1}>button 1</button>
            <button onClick={onClick2}>button 2</button>
        </div>
    )
}

function goMalePage() {
    alert("male")
}

function goFemalePage() {
    alert("female")
}

// 렌더링 시 삼항 연산자보다 && 이 효율적이다.
function Greeting({ isLogin, name, cash }) {
    return(
        <div>
            Welcome.
            {
                isLogin &&  <p>{name}님, 보유한 금액은 {cash}입니다.</p>
            }
        </div>
    )
}

// 이벤트 기간에는 개인정보를 생략한 채 이벤트 문구만 보여줘야 함
// 로그인 했는데 캐시가 100만원 넘으면 해킹한 사람이므로 개인정보를 보여주면 안됨
function Greeting2({ isEvent, isLogin, name, cash }) {
    return(
        <div>
            Welcome.
            {
                isEvent && <p>이벤트 개최중! 이벤트를 놓치지 마세요.</p>
            }
            {
                !isEvent && isLogin && cash <= 1000000 && (
                    <div>
                        <p>{name}님, 보유한 금액은 {cash}입니다.</p>
                    </div>
                )
            }
            {
                cash > 1000000 && <p>꺼져 해킹범</p>
            }
        </div>
    )
}

function FetchUser1({ userId }) {
    const [user, setUser] = useState()
    useEffect(() => {
        fetchUser(userId).then(data => setUser(data))
    }, [userId])

    return (
        <div>
            {JSON.stringify(user)}
        </div>
    )
}

function FetchUser2({ userId }) {
    const [user, setUser] = useState()
    const fetchAndSetUser = useCallback(
        // 여기 있는 파라미터 개수가 밑의 fetchAndSetUser(true) 에서 사용하는 것과 동일
        async isNeedDetail => {
            const data = await fetchUser(userId, isNeedDetail)
            setUser(data)
        },
        [userId]
    )

    useEffect(() => {
        if(!user || user.id !== userId) {
            fetchAndSetUser(true)
        }
    // }, [fetchAndSetUser])
    }) // 이렇게 의존성 배열을 입력하지 않으면 부수 효과 함수에서 사용된 모든 변수는 가장 최신화된 값을 참조

    return (
        <div>
            {JSON.stringify(user)}
        </div>
    )
}

function fetchUser(userId, isNeedDetail) {
    return new Promise((resolve, reject) => {
        resolve({
            userId,
            userName: "test",
            photo: "url",
            isNeedDetail
        })
    })
}

function Counter1() {
    const [count, setCount] = useState(0)
    useEffect(() => {
        function onClick() {
            setCount(prev => prev + 1)
        }
        window.addEventListener("click", onClick)
        return () => window.removeEventListener("click", onClick)
    })

    return (
        <div>
            <h2>카운터</h2>
            <p>{count}</p>
        </div>
    )
}

function Timer({ initialTotalSeconds }) {
    const [hour, setHour] = useState(Math.floor(initialTotalSeconds / 3600))
    const [minute, setMinute] = useState(Math.floor((initialTotalSeconds % 3600) / 60))
    const [second, setSecond] = useState(initialTotalSeconds % 60)

    useEffect(() => {
        const id = setInterval(() => {
            if(second) {
                setSecond(second - 1)
            } else if(minute) {
                setMinute(minute - 1)
                setSecond(59)
            } else if(hour) {
                setHour(hour - 1)
                setMinute(59)
                setSecond(59)
            }
        }, 1000)
    })

    return (
        <div>
            {hour} : {minute} : {second}
        </div>
    )
}

function Timer2({ initialTotalSeconds }) {
    const [state, dispatch] = useReducer(reducer, {
        hour: Math.floor(initialTotalSeconds / 3600),
        minute: Math.floor((initialTotalSeconds % 3600) / 60),
        second: initialTotalSeconds % 60
    })

    const {hour, minute, second} = state
    useEffect(() => {
        const id = setInterval(dispatch, 1000)
        return () => clearInterval(id)
    })

    return (
        <div>
            {hour} : {minute} : {second}
        </div>
    )
} 

function reducer(state) {
    const { hour, minute, second } = state

    if(second)  return {...state, second: second - 1}
    else if(minute) return {...state, minute: minute - 1, second: 59}
    else if(hour) return {hour: hour - 1, minute: 59, second: 59}
    else return state
}

// 이름 있는 함수로 내보내는 것이 좋다.
export default function Day4() {
    return (
        <div>
            <DetectHeightChange />
            <WidthColor />
            <Timer2 initialTotalSeconds="10000" />
            <Timer initialTotalSeconds="10000" />
            <Counter1 />
            <FetchUser2 userId="cab" />
            <FetchUser1 userId="ax" />
            <Greeting2 isLogin={true} name="lee" cash="300000000" />
            <Greeting isLogin={true} name="lee" cash="3000" />
            <Person onChangeTitle={title => document.title = title} isMale={true} type="gold" age="15" />
        </div>
    );
}