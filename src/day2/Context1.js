import React, { useState } from 'react';

const UserContext = React.createContext('')
const ThemeContext = React.createContext('dark')

function Top() {
    const [username, setUsername] = useState('mike')
    const [theme, setTheme] = useState('light')

    return (
        <div>
            <ThemeContext.Provider value={theme}>
                <UserContext.Provider value={username}>
                    <div>상단 메뉴</div>
                    <Card />
                    <div><button onClick={
                        () => {
                            if(theme === 'dark') {
                                setTheme('light')
                            } else {
                                setTheme('dark')
                            }
                        }
                    }>테마 변경</button></div>
                </UserContext.Provider>
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </ThemeContext.Provider>

        </div>
    )
}

// function Card() {
//     return (
//         <div>
//             <Greeting />
//         </div>
//     )
// }

const Card = React.memo(() => {
    return (
        <div>
            <Greeting />
        </div>
    )
})

function Greeting() {
    return (
        <ThemeContext.Consumer>
            {theme => (
                <UserContext.Consumer>
                    {username => (
                        <p style={
                            {
                                color: theme === 'dark' ? 'white' : 'green',
                                backgroundColor: theme === 'dark' ? 'black' : null
                            }
                        }>
                            {`${username}님, 안녕하세요.`}
                        </p>
                    )}
                </UserContext.Consumer>
            )}
        </ThemeContext.Consumer>
    )
}

export default Top