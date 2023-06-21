"use client";
import { Dispatch, SetStateAction } from "react";
import { GrFormClose } from "react-icons/gr";

export default function DetailView({
  x,
  y,
  info,
  setDetailViewState,
}: {
  x: number;
  y: number;
  info: string;
  setDetailViewState: Dispatch<SetStateAction<JSX.Element | undefined>>;
}) {
  return (
    <>
      <main>
        <button
          onClick={() => {
            setDetailViewState(undefined);
          }}
        >
          <GrFormClose />
        </button>
        <h1>{info}</h1>
      </main>
      <style jsx>{`
        main {
          position: absolute;
          top: ${y - 200}px;
          left: ${x - 250}px;
          z-index: 100;
          width: 200px;
          height: 300px;
          background-color: white;
          border: solid 1px #14141480;
          border-radius: 5px;
          box-shadow: 3px 3px 2px 0px #14141480;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        h1 {
          font-size: 1.5rem;
          font-weight: bold;
        }
        button {
          position: absolute;
          top: 5px;
          right: 5px;
        }
      `}</style>
    </>
  );
}
