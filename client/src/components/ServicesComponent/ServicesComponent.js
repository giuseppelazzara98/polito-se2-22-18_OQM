import React, { useContext } from "react";
import styles from "./index.module.scss";
import { MainCtx } from "../../App";
import Button from "../Button/Button";
import API from "../../api/api";

export default function ServicesComponent(props) {

  const {
    services,
    setReceiptInfo,
  } = useContext(MainCtx);


  const handleClick = (serviceKey) => {
    // call to db to insert new user into the queue
    API.insertNewTicket({
      id_service: serviceKey,
    }).then(response => setReceiptInfo(response)).catch(err => console.log("err", err));
  }

  return (
    <div className={styles.wrap}>
      <h2 className={styles.sectionTitle}>Select a service</h2>
      <div className={styles.servicesList}>
        {services?.map(service => (
          <Button key={service.key} label={service.name} onClick={() => handleClick(service.key)} className={styles.button}/>
        ))}
        {services?.length === 0 && (
          <div className={styles.alert}>
            There is a problem, try later
          </div>
        )}
      </div>
    </div>
  )
}