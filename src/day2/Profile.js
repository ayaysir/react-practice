import React, {useEffect, useState} from 'react'

// custom hook
function useUser(userId) {
    const [user, setUser] = useState()

    useEffect(() => {
        setUser(userId)
        console.log(`get data from api... ${userId}`) 
     }, [userId]) // userId가 변경되는 경우에만 작업을 하도록 한다. (의존성 배열)

     return user

}

export default function Profile({userId}) {

    // 상태값을 하나의 객체로 관리할 때에는 useReducer훅을 사용하는 것이 좋다.
    const [state, setState] = useState({
        name: '',
        age: 0
    })

    useUser(userId)

    return(
        <div>
            <p>{`name is ${state.name}`}</p>
            <p>{`age is ${state.age}`}</p>
            <input 
                type="text" 
                value={state.name}
                onChange={e => setState({...state, name: e.target.value})}
            />
            <input 
                type="number" 
                value={state.age}
                onChange={e => setState({...state, age: e.target.value})}
            />
        </div>
    );
}