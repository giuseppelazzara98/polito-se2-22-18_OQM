import React, { useContext } from "react";
import styles from "./index.module.scss";
import { MainCtx } from "../../App";

export default function ReciptComponent(props) {
  const {
    receiptInfo,
  } = useContext(MainCtx);

  return (
    receiptInfo ?
      <div className={styles.wrap}>
        <span className={styles.title}>Your ticket</span>
        <div className={styles.infoContainer}>
          <span className={styles.info}>Ticket number: {receiptInfo?.waitListCode}</span>
          <span className={styles.info}>Queue code: {receiptInfo?.queueCode}</span>
          <spam className={styles.info}>Estimated waiting time: {receiptInfo?.timeEstimation}</spam>
        </div>
      </div>
    : <></>
  )
}