import "./Slider.css";
import { useMemo, useRef, useState } from "react";

const HANDLE_WIDTH = 20;

export const Slider = ({
  min = 0,
  value = 50,
  max = 100,
  width = 200,
}: {
  min: number;
  value: number;
  max: number;
  width: number;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isDragging, setDragging] = useState(false);
  const [position, setPosition] = useState(() => {
    const range = max - min;
    return (value / range) * width;
  });

  const ratio = useMemo(() => (max - min) / width, [min, max, width]);

  const onPointerDown = (e) => {
    setDragging(true);
    e.target.setPointerCapture(e.pointerId);
  };

  const updatePosition = (handlePosition: number) => {
    const boundingRect = containerRef.current.getBoundingClientRect();

    const containerX = boundingRect.x;
    const pos = Math.round(handlePosition - containerX);

    if (pos <= 0) {
      setPosition(0);
    } else if (pos >= width) {
      setPosition(width);
    } else {
      setPosition(pos);
    }
  };

  const onPointerMove = (e) => {
    if (!isDragging) {
      return;
    }

    if (!containerRef.current) {
      return;
    }

    const pointerPos = e.clientX;

    updatePosition(pointerPos);
  };

  const onPointerUp = (e) => {
    setDragging(false);
    e.target.releasePointerCapture(e.pointerId);
  };

  const onKeyDown = (e) => {
    const handleX = e.target.getBoundingClientRect().x;

    switch (e.key) {
      case "ArrowLeft": {
        updatePosition(handleX - 5);
        break;
      }
      case "ArrowRight": {
        updatePosition(handleX + 5);
        break;
      }
      default:
        break;
    }
  };

  return (
    <>
      <span className="label">{Math.round(position * ratio)}</span>
      <div
        className="container"
        ref={containerRef}
        style={{ width: `${width + HANDLE_WIDTH}px` }}
      >
        <div className="track" />
        <div
          className="activeTrack"
          style={{ width: `${position + HANDLE_WIDTH}px` }}
        />
        <div
          className="handle"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerMove={onPointerMove}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          style={{ left: `${position}px` }}
        />
      </div>
    </>
  );
};
