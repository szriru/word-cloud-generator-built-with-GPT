'use client'
import ReactWordcloud from "react-wordcloud"
import { useReducer, useRef, useState } from "react";
import { wcContext } from '@/components/ContextProvider'
import { useContext } from 'react'
import { loadingWordS } from "@/utils/constants";
import saveElementAsImage from "@/lib/saveElementAsImage";
import ParamModal from '@/components/ParamModal'
import Link from "next/link";
import { IconBxRefresh } from "./Icons";
import { WordS } from "@/utils/types";

interface WordCloudProps {
  wordS: WordS
}

interface State {
  rotations: number
  rotationAngles: { min: number, max: number }
  fontSizes: { min: number, max: number }
  isModalOpen: boolean
}

interface Options {
  rotations: number
  rotationAngles: [number, number]
  fontSizes: [number, number]
  fontWeight: string
  transitionDuration: number
}

type ACTIONTYPE =
  | { type: "SET_ROTATIONS"; payload: number }
  | { type: "SET_ROTATION_ANGLES"; payload: { min: number, max: number } }
  | { type: "SET_FONT_SIZES"; payload: { min: number, max: number } }
  | { type: "SET_MODAL_OPEN"; payload: boolean };

function reducer(state: State, action: ACTIONTYPE) {
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
      throw new Error(`Unsupported action type`);
  }
}

export default function WordCloud({ wordS }: WordCloudProps) {
  const rotationsRef = useRef<HTMLInputElement | null>(null)
  const rotationAnglesMaxRef = useRef<HTMLInputElement | null>(null)
  const rotationAnglesMinRef = useRef<HTMLInputElement | null>(null)
  const fontSizeMaxRef = useRef<HTMLInputElement | null>(null)
  const fontSizeMinRef = useRef<HTMLInputElement | null>(null)
  let screenWidth = 500
  if (typeof window !== "undefined") {
    screenWidth = window.innerWidth
  }

  const [state, dispatch] = useReducer(reducer, {
    rotations: 2,
    rotationAngles: { min: 0, max: 90 },
    fontSizes: { min: 30, max: 60 },
    isModalOpen: false,
  });
  const [isHTUOpen, setIsHTUOpen] = useState(false)

  const options: Options = {
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
    //this params change cause errors to React-WordCloud. It won't render. the window will freeze.
    dispatch({ type: 'SET_ROTATIONS', payload: parseInt(rotationsRef?.current?.value!) });
    dispatch({
      type: 'SET_ROTATION_ANGLES',
      payload: {
        min: parseInt(rotationAnglesMinRef?.current?.value!),
        max: parseInt(rotationAnglesMaxRef?.current?.value!),
      },
    });
    dispatch({
      type: 'SET_FONT_SIZES',
      payload: {
        min: parseInt(fontSizeMinRef?.current?.value!),
        max: parseInt(fontSizeMaxRef?.current?.value!),
      },
    });
    dispatch({ type: 'SET_MODAL_OPEN', payload: false });
  }

  const { fetching } = useContext(wcContext)
  const forceUpdate = useReducer(() => ({}), {})[1] as () => void
  const elementRef = useRef(null);
  function handleSaveImage() {
    saveElementAsImage(elementRef.current);
  }
  return (
    <div className="flex flex-col shrink">
      <div ref={elementRef} className="w-full h-full m-4 ">
        {typeof window !== "undefined" ? (
          <ReactWordcloud
            options={options}
            size={screenWidth > 1000 ? [700, 550] : [screenWidth * 0.8, screenWidth * 0.85]}
            words={fetching ? loadingWordS : wordS}
          />
        ) : (
          <div>
            
          </div>
        )}
      </div>

      <ParamModal isOpen={state.isModalOpen}>
        <div className="flex flex-col justify-center gap-2 mb-2 ">
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
          <span className="text-3xl"><IconBxRefresh /></span>
        </button>
      </div>
    </div >
  )
}