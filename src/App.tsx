import { DragDropContext } from "react-beautiful-dnd";
import Part from "./components/Part";
import CsvDownloadButton from "./csvDownload/CsvDownloadButton";
import EntryAdditionAccordion from "./entryAddition/components/EntryAdditionAccordion";
import { ReorderEntryInPartMap } from "./utils/ReorderEntryInPartMap";
import { DropResult } from "./type/DropResult";
import { PartMap } from "./type/Part";
import styled from "styled-components";
import { useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import PageHeader from "./components/PageHeader";
import { useGetSavedData } from "./hooks/useGetSavedData";
import { useSetSavedData } from "./hooks/useSetSavedData";
import SaveData from "./components/SaveData";

const Wrapper = styled.div`
  margin: 1em;
`;

export default function App() {
  const { getSavedDataMap, getSavedDataInUse } = useGetSavedData();
  const savedDataInUse = getSavedDataInUse();
  const savedDataMap = getSavedDataMap();
  const { partMap } = savedDataInUse;
  const { setPartMapOfSavedDataInUse } = useSetSavedData();

  const onDragEnd = (result: DropResult) => {
    setPartMapOnDragEnd(result, partMap, setPartMapOfSavedDataInUse);
  };

  const sortedParts = Object.values(partMap).sort(
    (a, b) => a.partNum - b.partNum
  );

  useEffect(() => {
    localStorage.setItem("savedDataMap", JSON.stringify(savedDataMap));
  }, [partMap]);

  return (
    <Wrapper>
      <PageHeader />
      <Tabs
        defaultActiveKey="entryAddition"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="entryAddition" title="エントリー追加">
          <EntryAdditionAccordion />
        </Tab>
        <Tab eventKey="entryList" title="セーブデータ一覧">
          <SaveData />
        </Tab>
      </Tabs>
      <DragDropContext onDragEnd={onDragEnd}>
        {sortedParts.map((part) => (
          <Part key={part.id} partId={part.id} />
        ))}
      </DragDropContext>
      <CsvDownloadButton />
    </Wrapper>
  );
}

function setPartMapOnDragEnd(
  dropResult: DropResult,
  initialPartMap: PartMap,
  setPartMap: (partMap: PartMap) => void
): void {
  // 表の外にドロップされた場合
  if (!dropResult.destination) return;

  // 同じテーブルの同じ場所にドロップされた場合
  if (
    dropResult.destination.droppableId === dropResult.source.droppableId &&
    dropResult.destination.index === dropResult.source.index
  )
    return;

  const reorderedPartMap = ReorderEntryInPartMap({
    partMap: initialPartMap,
    draggableId: dropResult.draggableId,
    droppableId: dropResult.source.droppableId,
    destination: dropResult.destination,
  });

  setPartMap(reorderedPartMap);
}
