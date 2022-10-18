import MainBoardTable from "../components/MainBoardTable/MainBoardTable";
import API from '../api/api';
import  { useEffect, useState } from 'react';



export default function MainBoard(props) {
    const [lengths, setLengths] = useState([]);
    const [update,setUpdate]= useState([]);
    
    const changeUpdate=()=>{setUpdate(oldUpd=>oldUpd=!oldUpd)};
    useEffect(() => {
       
		props.services.map((service)=>API.getLenghtService(service).then(servicesLength => 
            {setLengths(oldLengths=>[...oldLengths, {service:service,servicesLength:servicesLength}])}).catch(error => console.log("errore")));
	}, [update]);
    return (
      <MainBoardTable  lengths={lengths} changeUpdate={changeUpdate}/>
    )
  }

 