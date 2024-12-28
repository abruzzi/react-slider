import './Slider.css';
import {useRef, useState} from "react";

const HANDLE_WIDTH = 20;

export const Slider = ({min = 0, value = 50, max = 100, width = 200}: {
  min: number,
  value: number,
  max: number,
  width: number
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isDragging, setDragging] = useState(false);
  const [position, setPosition] = useState(0);

  const onPointerDown = (e) => {
    setDragging(true);
    e.target.setPointerCapture(e.pointerId);
  }

  const onPointerMove = (e) => {
    if (!isDragging) {
      return;
    }

    if (!containerRef.current) {
      return;
    }

    const boundingRect = containerRef.current.getBoundingClientRect();
    const containerX = boundingRect.x;

    const pos = e.clientX - containerX;

    if (pos <= 0) {
      setPosition(0);
    } else if (pos >= (width - HANDLE_WIDTH)) {
      setPosition(width - HANDLE_WIDTH);
    } else {
      setPosition(pos);
    }
  }

  const onPointerUp = (e) => {
    setDragging(false);
    e.target.releasePointerCapture(e.pointerId);
  }

  return (
    <>
      {position}
      <div className="container"
           ref={containerRef}
           style={{width: `${width}px`}}
      >
        <div className="track"/>
        <div className="activeTrack" style={{width: `${position + 12}px`}}/>
        <div className="handle"
             onPointerMove={onPointerMove}
             onPointerDown={onPointerDown}
             onPointerUp={onPointerUp}
             style={{left: `${position}px`}}/>
      </div>
    </>)
}