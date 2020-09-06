import { createElement, useRef, forwardRef, useReducer, useContext, createContext, useCallback } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';

import './index.css';
import Logo from '../../components/Logo';
import { reducer, initialState, Context } from '../../utils/reducer'

// import {foo} from '../../utils'
// let {foo} = require('../../utils')

// foo = 'foo'



export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state,'dispatch all  state ~~~~')
  const temDispatch = (dispatch, state) => action => {
    typeof action === 'function' ? action(dispatch, state) : dispatch(action)
  }
  // useCallback根据场景使用依赖项
  const dispatchMiddle = useCallback(temDispatch(dispatch,state),[]) 
  const { Provider } = Context
  return <Provider value={{ state, dispatchMiddle }}>
    <Page />
  </Provider>
}

const Page = (props) => {

  let contValue = useContext(Context)
  // console.log(props, Context, reducer, initialState, contValue, 'props')
  // const [state, dispatch] = useReducer(reducer, initialState);
  const { state, dispatchMiddle } = contValue as any
  const inputEl = useRef(null);
  const onButtonClick = () => {
    console.log(state, state.count)
    // dispatchMiddle({ type: 'increment' })
    dispatchMiddle((dispatch, state)=>{
      // 根据场景使用state 
      console.log(state,'state ~~~~')
        dispatch({type: 'increment' })
    })
    // console.log(foo)
  };
  // console.log(foo)

  return (
    <View className="home">
      <Logo uri="//gw.alicdn.com/tfs/TB1MRC_cvb2gK0jSZK9XXaEgFXa-1701-1535.png" />
      <Text className="title">Welcome to Your Rax App{state.count}</Text>
      <Text className="info">More information about Rax</Text>
      <Text className="info" onClick={onButtonClick}>Visit https://rax.js.org</Text>
      <MyInput ref={inputEl}></MyInput>
    </View>
  );
}

const MyInput = forwardRef(function App(props, ref) {
  console.log(ref)
  return <View>
    <Text>app</Text>
  </View>
})