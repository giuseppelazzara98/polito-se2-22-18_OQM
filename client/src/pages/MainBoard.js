import MainBoardTable from "../components/MainBoardTable/MainBoardTable";

export default function MainBoard(props) {
  return (
    <MainBoardTable services={props.services} setUpdate={props.setUpdate} />
  );
}

