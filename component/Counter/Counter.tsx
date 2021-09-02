import { useReducer } from "react"

const intitialState = 10

type State = typeof intitialState & number

type Action = number | Function

const lazyLoad = (initial:Action) => typeof initial === 'function' ? initial() : initial

const reducer = (state: State, action: Action) =>  typeof action === 'function' ? action(state) : action

const useState = (initial: (number | Function)) => {
    const [count, dispatch]:[State, React.Dispatch<Action>]=useReducer(reducer, initial, lazyLoad)

    return [count, dispatch] as const
}

const Counter = () => {
    const [count, setCount] = useState(intitialState)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('clicked?', event)
        setCount((prevClick: number) => prevClick + 1)
    }

    return <><button onClick={handleClick}>INCREMENT</button><h1>Count is: {count}</h1></>
}

export default Counter