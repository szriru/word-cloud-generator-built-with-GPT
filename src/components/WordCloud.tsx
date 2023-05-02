'use client'
import ReactWordcloud, { OptionsProp } from "react-wordcloud"
import cn from 'classnames'
import { useReducer, useRef, useState } from "react";
import { Context } from '@/components/ContextProvider'
import { useContext } from 'react'
import { loadingWordS } from "@/utils/constants";
import { toPng } from 'html-to-image';
import ParamModal from '@/components/ParamModal'
import Link from "next/link";

type WordS = Array<{
  text: string
  value: number
}>

interface WordCloudProps {
  wordS: WordS
}

async function saveElementAsImage(element: any) {
  await toPng(element)
    .then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = 'my-image.png';
      link.href = dataUrl;
      link.click();
    });
}

interface State {
  rotations: number
  rotationAngles: { min: number, max: number}
  fontSizes: { min: number, max: number}
  isModalOpen: boolean
}

function reducer(state: State, action: any) {
  switch (action.type) {
    case 'SET_ROTATIONS':
      return { ...state, rotations: action.payload };
    case 'SET_ROTATION_ANGLES':
      return { ...state, rotationAngles: action.payload };
    case 'SET_FONT_SIZES':
      return { ...state, fontSizes: action.payload };
    case 'SET_MODAL_OPEN':
      return { ...state, isModalOpen: action.payload };
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
}

export default function WordCloud({ wordS }: WordCloudProps) {
  const rotationsRef = useRef(null)
  const rotationAnglesMaxRef = useRef(null)
  const rotationAnglesMinRef = useRef(null)
  const fontSizeMaxRef = useRef(null)
  const fontSizeMinRef = useRef(null)
  let screenWidth = 500
  if(window){
    screenWidth = window.innerWidth
  }
  
  const [state, dispatch] = useReducer(reducer, {
    rotations: 2,
    rotationAngles: { min: 0, max: 90 },
    fontSizes: { min: 30, max: 60 },
    isModalOpen: false,
  });
  const [isHTUOpen, setIsHTUOpen] = useState(false)
  
  const options = {
    rotations: state.rotations,
    rotationAngles: [state.rotationAngles.min, state.rotationAngles.max],
    fontSizes: [state.fontSizes.min, state.fontSizes.max],
    fontWeight: "normal",
    transitionDuration: 1000,
  };
  function handleOpenModal() {
    dispatch({ type: "SET_MODAL_OPEN", payload: true })
  }
  function handleCloseModalAndSetParams() {
    // dispatch({ type: 'SET_ROTATIONS', payload: rotationsRef.current.value });
    // dispatch({
    //   type: 'SET_ROTATION_ANGLES',
    //   payload: {
    //     min: rotationAnglesMinRef.current.value,
    //     max: rotationAnglesMaxRef.current.value,
    //   },
    // });
    // dispatch({
    //   type: 'SET_FONT_SIZES',
    //   payload: {
    //     min: fontSizeMinRef.current.value,
    //     max: fontSizeMaxRef.current.value,
    //   },
    // });
    dispatch({ type: 'SET_MODAL_OPEN', payload: false });
  }

  const { fetching } = useContext(Context)
  const forceUpdate = useReducer(() => ({}), {})[1] as () => void
  const elementRef = useRef(null);
  function handleSaveImage() {
    saveElementAsImage(elementRef.current);
  }
  return (
    <div className="flex flex-col shrink">
      <div ref={elementRef} className="w-full h-full m-4 ">
        <ReactWordcloud
          options={options as OptionsProp}
          size={screenWidth > 1000 ? [700, 550] : [screenWidth * 0.8, screenWidth * 0.85]}
          words={fetching ? loadingWordS : wordS}
        />
      </div>
      
      <ParamModal isOpen={state.isModalOpen}>
        <div className="flex flex-col justify-center gap-2 mb-2 ">
          <h1 className="underline">sorry this feature is under construction. it won't affect anything</h1>
          <div className="flex gap-2 justify-start items-center">
            <label>Rotations:</label>
            <input className="ring-1 p-1" ref={rotationsRef} defaultValue={state.rotations} type="number" max={10} min={0} step={1} />
          </div>
          <div className="flex gap-2 justify-start items-center">
            <label>Rotation Angles:</label>
            <span>Min</span><input ref={rotationAnglesMinRef} defaultValue={state.rotationAngles.min} className="ring-1 p-1" type="number" max={state.rotationAngles.max} min={-360} />
            <span>Max</span><input ref={rotationAnglesMaxRef} defaultValue={state.rotationAngles.max} className="ring-1 p-1" type="number" max={360} min={state.rotationAngles.min} />
          </div>
          <div className="flex gap-2 justify-start items-center">
            <label>Font sizes:</label>
            <span>Min</span><input ref={fontSizeMinRef} defaultValue={state.fontSizes.min} className="ring-1 p-1" type="number" max={state.fontSizes.max} min={1} />
            <span>Max</span><input ref={fontSizeMaxRef} defaultValue={state.fontSizes.max} className="ring-1 p-1" type="number" max={100} min={state.fontSizes.min} />
          </div>
          {/* this params change cause errors to React-WordCloud. It won't render. the window will freeze. */}

        </div>
        <div className="flex justify-center items-center">
          <button className="ring-1 w-fit ring-red-500 bg-blue-500 text-white rounded-xl p-1" onClick={handleCloseModalAndSetParams}>SET Params</button>
        </div>
      </ParamModal>
      <ParamModal isOpen={isHTUOpen}>
        <div className="flex flex-col justify-start mb-2 gap-2">
          <p>1. Set your Open AI API KEY. <Link href="https://platform.openai.com/account/api-keys" className=" text-blue-500">Get it from HERE</Link></p>
          <p>2. Enter your word. ex&#41; Harry Potter</p>
          <p>3. Press "Make" button and wait.</p>
          <br />
          <p>"Save As Image" makes you save the wordcloud as an image</p>
          <p>"Adjust Params" makes you adjust the wordcloud's visual parameters</p>
          <p>"Re-render" makes you re-render wordcloud</p>
          <br />
          <h3 className="text-lg">How it works</h3>
          <p>a word you choose sent to GPT API and GPT returns most relevant words along with how much it relevant to</p>
        </div>
        <div className="flex justify-center">
          <button className="p-1 bg-blue-500 w-fit rounded-xl text-white" onClick={() => setIsHTUOpen(false)}>Close</button>
        </div>
      </ParamModal>
      <div className="flex justify-around mb-4">
        <button onClick={() => setIsHTUOpen(true)} className="p-1 rounded-xl bg-red-500">How to Use</button>
        <button onClick={handleSaveImage} className="p-1 rounded-xl bg-blue-500">Save As Image</button>
        <button className="p-1 rounded-xl bg-blue-500" onClick={handleOpenModal}>Adjust Params</button>
        <button onClick={forceUpdate} className="flex items-center p-1 rounded-xl bg-blue-500">
          <p>Re-render</p>
          <IconBxRefresh className='text-3xl' />
        </button>
      </div>
    </div >
  )
}

interface IconBxRefreshProps {
  className: string
}
function IconBxRefresh({ className }: IconBxRefreshProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      className={cn(className)}
    >
      <path d="M10 11H7.101l.001-.009a4.956 4.956 0 01.752-1.787 5.054 5.054 0 012.2-1.811c.302-.128.617-.226.938-.291a5.078 5.078 0 012.018 0 4.978 4.978 0 012.525 1.361l1.416-1.412a7.036 7.036 0 00-2.224-1.501 6.921 6.921 0 00-1.315-.408 7.079 7.079 0 00-2.819 0 6.94 6.94 0 00-1.316.409 7.04 7.04 0 00-3.08 2.534 6.978 6.978 0 00-1.054 2.505c-.028.135-.043.273-.063.41H2l4 4 4-4zm4 2h2.899l-.001.008a4.976 4.976 0 01-2.103 3.138 4.943 4.943 0 01-1.787.752 5.073 5.073 0 01-2.017 0 4.956 4.956 0 01-1.787-.752 5.072 5.072 0 01-.74-.61L7.05 16.95a7.032 7.032 0 002.225 1.5c.424.18.867.317 1.315.408a7.07 7.07 0 002.818 0 7.031 7.031 0 004.395-2.945 6.974 6.974 0 001.053-2.503c.027-.135.043-.273.063-.41H22l-4-4-4 4z" />
    </svg>
  );
}