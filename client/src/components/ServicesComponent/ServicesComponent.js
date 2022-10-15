import React, { useContext } from "react";
import styles from "./index.module.scss";
import { MainCtx } from "../../App";
import Button from "../Button/Button";

export default function ServicesComponent(props) {

  const {
    services,
  } = useContext(MainCtx);


  const handleClick = (serviceKey) => {
    // call to db to insert new user into the queue
  }

  return (
    <div className={styles.wrap}>
      <h2 className={styles.sectionTitle}>Select a service</h2>
      <div className={styles.servicesList}>
        {services?.map(service => (
          <Button key={service.key} label={service.name} onClick={() => handleClick(service.key)} className={styles.button}/>
        ))}
      </div>
    </div>
  )
}