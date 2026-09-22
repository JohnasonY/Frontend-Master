import React from "react";
import "./Pager.css";
/**
 * Pager component
 * Props:
 * 1. current: the current page number, also the initial page numebr
 * 2. totalData: the total number of the data
 * 3. limit: page capacity, shown the number of data per page
 * 4. panelNumber: the maximum number of pages can be shown in the pager
 * 5. onPageChange: the event occured when page changed
 */
export default function Pager(props) {
  const lastPageNum = getLastPageNumber(props); // last page number
  const min = getPanelMinNum(props);
  const max = getPanelMaxNum(min, lastPageNum, props);
  const numbers = [];
  for (let i = min; i <= max; i++) {
    numbers.push(
      <span
        key={i}
        onClick={() => {
          toPage(i, props);
        }}
        className={i === props.current ? "item active" : "item"}
      >
        {i}
      </span>,
    );
  }
  return (
    <>
      <span
        onClick={() => {
          toPage(1, props);
        }}
        className={props.current === 1 ? "item disabled" : "item"}
      >
        First
      </span>
      <span
        onClick={() => {
          toPage(props.current - 1 < 1 ? 1 : props.current - 1, props);
        }}
        className={props.current === 1 ? "item disabled" : "item"}
      >
        Prev
      </span>
      {/* number panel */}
      {numbers}
      <span
        onClick={() => {
          toPage(
            props.current + 1 > lastPageNum ? lastPageNum : props.current + 1,
            props,
          );
        }}
        className={props.current === lastPageNum ? "item disabled" : "item"}
      >
        Next
      </span>
      <span
        onClick={() => {
          toPage(lastPageNum, props);
        }}
        className={props.current === lastPageNum ? "item disabled" : "item"}
      >
        Last
      </span>
      <span className="currPageNum">{props.current}</span>/
      <span>{lastPageNum}</span>
    </>
  );
}

/**
 * Get last page number based on the props
 * @param {*} props
 */
function getLastPageNumber(props) {
  return Math.ceil(props.totalData / props.limit);
}

/**
 * Go to the target page
 * @param {*} target target page number
 * @param {*} props
 */
function toPage(target, props) {
  if (props.current === target) {
    return;
  }
  props.onPageChange && props.onPageChange(target);
}

/**
 * Get the min number displayed in the panel
 * @param {*} props
 * @returns
 */
function getPanelMinNum(props) {
  let min = props.current - Math.floor(props.panelNumber / 2);
  if (min < 1) {
    min = 1;
  }
  return min;
}

/**
 * Get the max number displayed in the panel
 * @param {*} min
 * @param {*} lastPageNum
 */
function getPanelMaxNum(min, lastPageNum, props) {
  let max = min + props.panelNumber - 1;
  if (max > lastPageNum) {
    max = lastPageNum;
  }
  return max;
}
