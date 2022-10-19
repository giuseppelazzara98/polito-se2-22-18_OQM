import { Table } from "react-bootstrap";
import Button from "../Button/Button";

function MainBoardTable(props) {

    return (
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
                        props.services.map(elem => <MainBoardRow service={elem.name} length={elem.result} key={elem.key} />)
                    }
                </tbody>
            </Table>
            <Button label="UPDATE" onClick={() => props.setUpdate(true)}></Button>
        </>
    );
}

function MainBoardRow(props) {

    return (
        <tr>
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