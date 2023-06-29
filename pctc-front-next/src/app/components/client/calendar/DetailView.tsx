"use client";
import { Dispatch, SetStateAction } from "react";
import { GrFormClose } from "react-icons/gr";
import { ShipData } from "./ShipDataType";

export default function DetailView({
  x,
  y,
  info,
  setDetailViewState,
}: {
  x: number;
  y: number;
  info: ShipData;
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
        <h1>{info.title}</h1>
        <div><span className="ship-detail-span-left">모선</span><span className="ship-detail-span-right">{info.shipName}</span></div>
        <div><span className="ship-detail-span-left">선사</span><span className="ship-detail-span-right">{info.shipOwner}</span></div>
        <div><span className="ship-detail-span-left">적하</span><span className="ship-detail-span-right">{info.discharge}</span></div>
        <div><span className="ship-detail-span-left">양하</span><span className="ship-detail-span-right">{info.loading}</span></div>
        <div><span className="ship-detail-span-left">입항</span><span className="ship-detail-span-right">{info.scheduledArrivalTime}</span></div>
        <div><span className="ship-detail-span-left">출항</span><span className="ship-detail-span-right">{info.departureTime}</span></div>
      </main>
      <style jsx>{`
        main {
          position: absolute;
          top: ${y - 200}px;
          left: ${x - 250}px;
          z-index: 100;
          width: 300px;
          height: 290px;
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
          margin: 1rem 0;
        }
        button {
          position: absolute;
          top: 5px;
          right: 5px;
        }
        div {
          width: 100%;
          display: flex;
          justify-content: space-evenly;
          margin: 0.25rem 0.5rem;
        }
        .ship-detail-span-left {
          width: 50px;
          display: flex;
          justify-content: center;
          font-weight: bold;
        }
        .ship-detail-span-right {
          width: 150px;
          display: flex;
          justify-content: center;
          border-bottom: 1px solid #141414;
        }
      `}</style>
    </>
  );
}
