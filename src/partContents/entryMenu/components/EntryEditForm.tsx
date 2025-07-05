import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useGetSavedData } from "../../../hooks/useGetSavedData";
import  { InputtingEntry } from "../../../type/Entry";
import { BuildInputtingEntryFromEntry } from "../../utils/BuildInputtingEntryFromEntry";

type Props = {
  entryId: string;
};

export default function EntryEditForm(props: Props): JSX.Element {
  const { entryId } = props;
  const { getSavedDataInUse } = useGetSavedData();
  const savedDataInUse = getSavedDataInUse();
  const entryMap = savedDataInUse.entryMap;
  const entry = entryMap[entryId];
  const inputtingEntry = BuildInputtingEntryFromEntry(entry);

  const methodsOfUseForm = useForm<InputtingEntry>({
    defaultValues: inputtingEntry,
  });

  const { register, handleSubmit} = methodsOfUseForm;

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log("Submitted data:", data);
  };

  return (
    <FormProvider {...methodsOfUseForm}>
      <Form onSubmit={handleSubmit(onSubmit)}>

        <Form.Group as={Row} className="mb-3">
          <Form.Label>演奏時間</Form.Label>
          <Col sm={5}>
            <Form.Control type="number" {...register("time")} placeholder="時" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label>メモ</Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" {...register("memo")} rows={3} placeholder="メモを入力" />
          </Col>
        </Form.Group>

        <Button type="submit">保存</Button>
      </Form>
    </FormProvider>
  );
}

