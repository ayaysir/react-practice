import React from 'react'

export class WidthColor extends React.Component {

    // 클래스 필드에서 직접 할당
    state = {
        boxWidth: 0
    }
    divRef = React.createRef()

    constructor(props) {
        super(props)

        // 상태값을 직접 할당하는 것은 컨스트럭터에서만 허용
        // 다른 생명주기 메서드에서 상태값을 변경할 때는 setState 사용
        // 클래스 필드에서 직접 할당 가능
        // this.state = {
        //     currentMovie: props.age < 10 ? '뽀로로' : '어벤저스'
        // }
    }

    componentDidMount() {
        const rect = this.divRef.current.getBoundingClientRect()
        this.setState({ boxWidth: rect.width })
    }

    render() {
        const { boxWidth } = this.state
        const backgroundColor = boxWidth < 1000 ? 'red' : 'blue'
        console.log(boxWidth, backgroundColor)

        return (
            <div
                ref={this.divRef}
                style={{ width: '100%', height: '100px', backgroundColor }}
            ><span style={{ color: "white" }}>box</span></div>
        )
    }

}

export class DetectHeightChange extends React.Component {
    state = {
        items: []
    }
    divRef = React.createRef()

    getSnapshotBeforeUpdate(prevProps, prevState) {
        const { items } = this.state
        if (prevState.items.length < items.length) {
            const rect = this.divRef.current.getBoundingClientRect()
            return rect.height
        }
        return null
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot !== null) {
            const rect = this.divRef.current.getBoundingClientRect()
            if (rect.height != snapshot) {
                console.log('height changed')
            }
        }
    }

    onClick = () => {
        const { items } = this.state
        return (
            this.setState({ items: [...items, 'item'] })
        )
    }

    render() {
        const { items } = this.state
        return (
            <React.Fragment>
                <button onClick={this.onClick}>add</button>
                <div ref={this.divRef} style={{ width: '100%' }}>
                    <ul>
                        {items.map((item, index) => <li style={{height: 50}} key={index}>{item}</li>)}
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}