import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useGetSavedData } from "../hooks/useGetSavedData";
import { useRemoveSavedData } from "../hooks/useRemoveSavedData";
import { FaCheckCircle } from "react-icons/fa";

export default function SaveData() {
  const { getSavedDataMap, getSavedDataInUse } = useGetSavedData();
  const { removeSavedData } = useRemoveSavedData();
  const savedDataMap = getSavedDataMap();
  const savedDataInUse = getSavedDataInUse();

  return (
    <div>
      <h2>セーブデータ一覧</h2>
      <Table>
        <thead>
          <tr>
            <th>セーブデータ名</th>
            <th>最終更新日時</th>
            <th>閲覧中</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(savedDataMap).map(([key, value]) => (
            <tr key={key}>
              <td>{value.name}</td>
              <td>{new Date(value.lastUpdated).toLocaleString()}</td>
              <td>{key === savedDataInUse.id && <FaCheckCircle />}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => {
                    alert(
                      `未実装: ${value.name}をロードする機能はまだ実装されていません。`
                    );
                  }}
                >
                  ロードする
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => {
                    if (
                      window.confirm(
                        `本当にセーブデータ「${value.name}」を削除しますか？`
                      )
                    ) {
                      removeSavedData(key);
                    }
                  }}
                >
                  削除
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
