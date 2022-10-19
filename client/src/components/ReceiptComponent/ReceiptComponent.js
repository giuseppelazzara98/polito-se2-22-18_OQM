import React, { useContext } from "react";
import styles from "./index.module.scss";
import { MainCtx } from "../../App";
import dayjs from "dayjs";
var duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

export default function ReceiptComponent(props) {
  const {
    receiptInfo,
  } = useContext(MainCtx);

  const getTimeEstimation = (time) => {
    if (time) {
      const duration = dayjs.duration(receiptInfo.timeEstimation, "minutes").format("HH:mm");
      return duration;
    }
    return "0";
  }

  return (
    receiptInfo && Object.keys(receiptInfo).length > 0 ?
      <div className={styles.wrap}>
        <span className={styles.title}>Your ticket</span>
        <div className={styles.infoContainer}>
          <span className={styles.info}>Ticket number: {receiptInfo?.waitListCode}</span>
          <span className={styles.info}>Queue code: {receiptInfo?.queueCode}</span>
          <span className={styles.info}>Estimated waiting time: {getTimeEstimation(receiptInfo?.timeEstimation)}</span>
        </div>
      </div>
    : <></>
  )
}