import Button from 'react-bootstrap/Button';

type Props = {
  partId: string;
}

export default function EntryTableAddingButton(props: Props) {
  return (
    <Button variant='secondary'>下に部を追加する</Button>
  )
}