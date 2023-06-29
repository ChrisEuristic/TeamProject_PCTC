"use client";

import { CalendarApi } from "@fullcalendar/core";
import { formatIsoMonthStr } from "@fullcalendar/core/internal";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { AiOutlineHome } from "react-icons/ai";
import DetailView from "./DetailView";
import { OriginShipData, ShipData, SimpleShipData } from "./ShipDataType";

export default function Calendar() {
  const [events, setEvents] = useState<SimpleShipData[]>();
  const [detailEvents, setDetailEvents] = useState<Map<string, ShipData>>();
  const shipMap = new Map<string, ShipData>();

  useEffect(() => {
    (async function () {
      const res = await fetch(`http://10.125.121.222:8080/api/berthStatus`);
      const shipDataArr = (await res.json()) as OriginShipData[];
      setEvents(shipDataArr.map((shipData) => {
        shipMap.set(shipData.vessel.concat(`(${shipData.berthing})`), {
          resourceId: shipData.shipOrder,
          title: shipData.vessel.concat(`(${shipData.berthing})`),
          start: new Date(shipData.scheduledArrivalTime),
          end: new Date(shipData.departureTime),
          shipName: shipData.shipName,
          berthing: shipData.berthing, // 접안
          shipOwner: shipData.shipOwner, // 선사
          scheduledArrivalTime: shipData.scheduledArrivalTime, // 예정 입항일시
          arrivalTime: shipData.arrivalTime, // 실제 입항일시
          cargoTime: shipData.cargoTime, // 반입 마감 일시
          workTime: shipData.workTime, // 작업 완료 일시
          departureTime: shipData.departureTime, // 출항 일시
          discharge: shipData.discharge, // 양하
          loading: shipData.loading, // 적하
        })

        return {
          resourceId: shipData.shipOrder,
          title: shipData.vessel.concat(`(${shipData.berthing})`),
          start: new Date(shipData.scheduledArrivalTime),
          end: new Date(shipData.departureTime),
        }
      }));

      setDetailEvents(shipMap);

    })();
  }, []);

  const resources = [
    { id: "1", title: "1번 선석" },
    { id: "2", title: "2번 선석" },
    { id: "3", title: "3번 선석" },
    { id: "4", title: "4번 선석" },
    { id: "5", title: "5번 선석" },
    { id: "6", title: "6번 선석" },
    { id: "7", title: "7번 선석" },
    { id: "8", title: "8번 선석" },
  ];

  const [prevClassName, setPrevClassName] = useState("");
  const [homeClassName, setHomeClassName] = useState("");
  const [nextClassName, setNextClassName] = useState("");

  const [calendarApi, setCalendarApi] = useState<CalendarApi | null>(null);
  const [currentDate, setCurrentDate] = useState(format(new Date(), "yyyy년 MM월 dd일"));
  const [detailViewState, setDetailViewState] = useState<JSX.Element>();

  useEffect(() => {
    if (calendarApi) {
      setCurrentDate(format(calendarApi.getDate(), "yyyy년 MM월 dd일"));
    }
  }, [calendarApi]);

  const handleToday = () => {
    if (calendarApi) {
      calendarApi.today();
      setCurrentDate(format(calendarApi.getDate(), "yyyy년 MM월 dd일"));
    }
  };

  const handlePrev = () => {
    if (calendarApi) {
      calendarApi.prev();
      setCurrentDate(format(calendarApi.getDate(), "yyyy년 MM월 dd일"));
    }
  };

  const handleNext = () => {
    if (calendarApi) {
      calendarApi.next();
      setCurrentDate(format(calendarApi.getDate(), "yyyy년 MM월 dd일"));
    }
  };

  return (
    <>
      <div>
        <h1>{currentDate}</h1>
        <article>
          <button
            className={homeClassName}
            onMouseOver={() => {
              setHomeClassName("feed-button-mouseover");
            }}
            onMouseLeave={() => {
              setHomeClassName("feed-button-mouseleave");
            }}
            onClick={handleToday}
          >
            <AiOutlineHome />
          </button>
          <button
            className={prevClassName}
            onMouseOver={() => {
              setPrevClassName("feed-button-mouseover");
            }}
            onMouseLeave={() => {
              setPrevClassName("feed-button-mouseleave");
            }}
            onClick={handlePrev}
          >
            &lt;
          </button>
          <button
            className={nextClassName}
            onMouseOver={() => {
              setNextClassName("feed-button-mouseover");
            }}
            onMouseLeave={() => {
              setNextClassName("feed-button-mouseleave");
            }}
            onClick={handleNext}
          >
            &gt;
          </button>
        </article>
        <FullCalendar
          plugins={[resourceTimelinePlugin]}
          initialView="resourceTimelineDay"
          events={events}
          resources={resources}
          height={500} // events의 개수가 8개를 초과한 부분에 대해 기본 높이 410에서 27px씩 가산.
          headerToolbar={{}}
          slotMinWidth={10}
          slotLabelFormat={{ hour: "numeric", meridiem: false, hour12: false }}
          resourceAreaWidth="200px"
          ref={(calendarComponent) => {
            if (calendarComponent && calendarComponent.getApi) {
              setCalendarApi(calendarComponent.getApi());
            }
          }}
          eventMouseEnter={(info) => {
            setDetailViewState(
              <DetailView
                x={info.jsEvent.clientX}
                y={info.jsEvent.clientY}
                info={detailEvents?.get(info.event.title)!}
                setDetailViewState={setDetailViewState}
              />
            );
          }}
        />
      </div>
      <span>{detailViewState}</span>
      <style jsx>{`
        div {
          width: 80vw;
          margin: 4rem;
          padding: 4rem;
          text-align: center;
          background-color: white;
          border-radius: 5px;
          box-shadow: 3px 3px 2px 0px #14141480;
        }
        h1 {
          font-size: 2rem;
          font-weight: bold;
        }
        article {
          display: flex;
          flex-direction: row;
          justify-content: end;
          font-size: 1.7rem;
          font-weight: bold;
        }
        button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          margin-bottom: 0.5rem;
        }

        .feed-button-mouseover {
          animation-name: feed-button-anim-on;
          animation-duration: 0.5s;
          animation-fill-mode: forwards;
        }

        .feed-button-mouseleave {
          animation-name: feed-button-anim-off;
          animation-duration: 0.5s;
          animation-fill-mode: forwards;
        }

        @keyframes feed-button-anim-on {
          from {
            background-color: rgba(0, 0, 0, 0);
          }
          to {
            background-color: rgba(0, 0, 0, 0.2);
          }
        }

        @keyframes feed-button-anim-off {
          from {
            background-color: rgba(0, 0, 0, 0.2);
          }
          to {
            background-color: rgba(0, 0, 0, 0);
          }
        }
      `}</style>
    </>
  );
}
