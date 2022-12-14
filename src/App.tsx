import React, { useState } from 'react';
import './App.css'

interface ClickedProps {
  clientX: number
  clientY: number
}

function App() {
  const [clickedPoints, setClickedPoints] = useState<ClickedProps[]>([])
  const [undoPoints, setUndoPoints] = useState<ClickedProps[]>([])

  function getCoordinates(e: React.MouseEvent<HTMLElement>) {
    const { clientX, clientY } = e
    console.log({ clientX, clientY });
    setClickedPoints([...clickedPoints, { clientX, clientY }])
  }

  function handleUndo(){
    const newClickedPoints = [...clickedPoints]
    const undoPoint = newClickedPoints.pop()
    if(!undoPoint) return
    setClickedPoints(newClickedPoints)
    setUndoPoints([...undoPoints, undoPoint])
  }

  function handleRedo() {
    const newUndoPoints = [...undoPoints]
    const redoPoint = newUndoPoints.pop()
    if(!redoPoint) return
    setUndoPoints(newUndoPoints)
    setClickedPoints([...clickedPoints, redoPoint])
  }

  return (
    <>
      <button disabled={clickedPoints.length === 0} onClick={handleUndo}>UNDO</button>
      <button disabled={undoPoints.length === 0} onClick={handleRedo}>REDO</button>
      <div className="App" onClick={getCoordinates}>
        {clickedPoints.map((clickedPoint, index) => {
          return(
            <div 
            key={index}
            style={{
              left: clickedPoint.clientX -5,
              top: clickedPoint.clientY -5,
              position: 'absolute',
              borderRadius: '50%',
              backgroundColor: 'red',
              width: '10px',
              height: '10px'
            }}></div>
          )
        })}      
      </div>
    </>
  )
}

export default App;
