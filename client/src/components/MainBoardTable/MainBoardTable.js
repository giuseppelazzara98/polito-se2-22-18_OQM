import { Table } from "react-bootstrap";
import Button from "../Button/Button";

function MainBoardTable(props){
    
    return(
        <>
        <Table key="table">
            <thead>
                <tr>
                    <th>SERVICE</th>
                    <th>LENGHT</th>
                </tr>
            </thead>
            <tbody>
                {
                    
                    props.lengths.map(elem=>
                        
                        <MainBoardRow service={elem.service.name} length={elem.servicesLength.number} key={elem.service.name}/>)
                }
            </tbody>
        </Table>
        <Button onClick={()=>props.changeUpdate()}>UPDATE</Button>
        </>
    );
}

function MainBoardRow(props){
    
    return(
        <tr key={props.service}>
            <td>
                {props.service}
            </td>
            <td>
                {props.length}
            </td>
        </tr>
    );
}

export default MainBoardTable;