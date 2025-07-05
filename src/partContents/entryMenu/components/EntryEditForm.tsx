import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useForm, SubmitHandler, appendErrors } from "react-hook-form";
import { useGetSavedData } from "../../../hooks/useGetSavedData";
import { useEditEntry } from "../../../hooks/useEditEntry";
import { Entry } from "../../../type/Entry";

type Props = {
  entryId: string;
  onCloseModal: () => void;
};

export default function EntryEditForm(props: Props): JSX.Element {
  const { entryId, onCloseModal } = props;
  const { getSavedDataInUse } = useGetSavedData();
  const { editEntry } = useEditEntry();
  const savedDataInUse = getSavedDataInUse();
  const entryMap = savedDataInUse.entryMap;
  const entry = entryMap[entryId];

  const { register, handleSubmit } = useForm<Entry>({
    defaultValues: entry,
  });

  const onSubmit: SubmitHandler<Entry> = (data) => {
    editEntry(data);
    onCloseModal();
  };

  return (
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
                  {...register(`participants.${index}.lastName`, { required: true })}
                  placeholder="姓を入力"
                  defaultValue={participant.lastName}
                />
              </Form.Group>
              <Form.Group as={Col} sm={4}>
                <Form.Label>名</Form.Label>
                <Form.Control
                  type="text"
                  {...register(`participants.${index}.firstName`, { required: true })}
                  placeholder="名を入力"
                  defaultValue={participant.firstName}
                />
              </Form.Group>
              <Form.Group as={Col} sm={4}>
                <Form.Label>所属</Form.Label>
                <Form.Control
                  type="text"
                  {...register(`participants.${index}.faculty`, { required: true })}
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
                  {...register(`works.${index}.composer`, { required: true })}
                  placeholder="作曲者を入力"
                  defaultValue={work.composer}
                />
              </Form.Group>
              <Form.Group as={Col} sm={6}>
                <Form.Label>曲名</Form.Label>
                <Form.Control
                  type="text"
                  {...register(`works.${index}.name`, { required: true })}
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
          <Form.Control type="number" {...register("time", { required: true })} placeholder="分" />
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

      <Button
        type="button"
        style={{ margin: "0 5px" }}
        onClick={handleSubmit(onSubmit)} // type="submit" を設定しても動かないので、onClick を使う
      >
        保存
      </Button>
    </Form>
  );
}
