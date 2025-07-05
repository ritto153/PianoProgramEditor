import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useGetSavedData } from "../../../hooks/useGetSavedData";
import { Entry } from "../../../type/Entry";
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
  // const inputtingEntry = BuildInputtingEntryFromEntry(entry);

  const methodsOfUseForm = useForm<Entry>({
    defaultValues: entry,
  });

  const { register, handleSubmit, reset } = methodsOfUseForm;

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log("Submitted data:", data);
  };

  return (
    <FormProvider {...methodsOfUseForm}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <p>演奏者</p>
        {entry.participants.map((participant, index) => (
          <Card key={index} className="mb-3">
            <Card.Header>演奏者 {index + 1}</Card.Header>
            <Card.Body>
              <Row>
                <Form.Group as={Col} sm={4}>
                  <Form.Label>姓</Form.Label>
                  <Form.Control
                    type="text"
                    {...register(`participants.${index}.lastName`)}
                    placeholder="姓を入力"
                    defaultValue={participant.lastName}
                  />
                </Form.Group>
                <Form.Group as={Col} sm={4}>
                  <Form.Label>名</Form.Label>
                  <Form.Control
                    type="text"
                    {...register(`participants.${index}.firstName`)}
                    placeholder="名を入力"
                    defaultValue={participant.firstName}
                  />
                </Form.Group>
                <Form.Group as={Col} sm={4}>
                  <Form.Label>所属</Form.Label>
                  <Form.Control
                    type="text"
                    {...register(`participants.${index}.faculty`)}
                    placeholder="所属を入力"
                    defaultValue={participant.faculty}
                  />
                </Form.Group>
                <Form.Group as={Col} sm={4}>
                  <Form.Label>学年</Form.Label>
                  <Form.Control
                    type="number"
                    {...register(`participants.${index}.grade`)}
                    placeholder="学年を入力"
                    defaultValue={participant.grade}
                  />
                </Form.Group>
              </Row>
            </Card.Body>
          </Card>
        ))}
        <p>曲目</p>
        {entry.works.map((work, index) => (
          <Card key={index} className="mb-3">
            <Card.Header>曲目 {index + 1}</Card.Header>
            <Card.Body>
              <Row>
                <Form.Group as={Col} sm={6}>
                  <Form.Label>作曲者</Form.Label>
                  <Form.Control
                    type="text"
                    {...register(`works.${index}.composer`)}
                    placeholder="作曲者を入力"
                    defaultValue={work.composer}
                  />
                </Form.Group>
                <Form.Group as={Col} sm={6}>
                  <Form.Label>曲名</Form.Label>
                  <Form.Control
                    type="text"
                    {...register(`works.${index}.name`)}
                    placeholder="曲名を入力"
                    defaultValue={work.name}
                  />
                </Form.Group>
              </Row>
            </Card.Body>
          </Card>
        ))}

        <Form.Group as={Row} className="mb-3">
          <Form.Label>演奏時間</Form.Label>
          <Col sm={5}>
            <Form.Control
              type="number"
              {...register("time")}
              placeholder="時"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label>メモ</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              {...register("memo")}
              rows={3}
              placeholder="メモを入力"
            />
          </Col>
        </Form.Group>

        <Button type="submit" style={{ margin: "0 5px" }}>
          保存
        </Button>
        <Button
          variant="secondary"
          onClick={() => reset()}
          style={{ margin: "0 5px" }}
        >
          リセット
        </Button>
      </Form>
    </FormProvider>
  );
}
