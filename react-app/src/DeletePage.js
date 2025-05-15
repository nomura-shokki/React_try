import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const DeletePage = () => {
  const { id } = useParams(); // URLから取得したID
  const navigate = useNavigate(); // ページ遷移用のフック
  const [record, setRecord] = useState(null); // レコード内容を保存するためのstate

  // 指定されたレコードをAPIから取得
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/try_models_update/${id}/`) // GETエンドポイントを利用してレコードデータを取得
      .then((response) => {
        setRecord(response.data); // レコード内容をstateに保存
      })
      .catch((error) => {
        console.error(error);
        alert("指定したデータが見つかりません");
        navigate("/data-list");
      });
  }, [id, navigate]);

  // レコードを削除する関数
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/api/try_models_delete/${id}/`)
      .then(() => {
        alert("データが削除されました");
        navigate("/data-list"); // 削除後にデータ一覧ページへ移動
      })
      .catch((error) => {
        console.error(error);
        alert("エラーが発生しました"); // 削除失敗時にエラーメッセージを表示
      });
  };

  // レコード内容がまだ取得できていない場合の画面表示
  if (!record) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <nav className="mb-4">
        <Link to="/" className="btn btn-primary me-2">
          新規登録
        </Link>
        <Link to="/data-list" className="btn btn-secondary">
          データ一覧
        </Link>
      </nav>

      <h1>削除確認</h1>
      <p>以下のデータを削除しますか？</p>

      {/* 削除するレコード内容を一覧表示 */}
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>ID</th>
            <td>{record.id}</td>
          </tr>
          <tr>
            <th>氏名</th>
            <td>{record.name}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{record.mail}</td>
          </tr>
          <tr>
            <th>性別</th>
            <td>{record.gender ? "男性" : "女性"}</td>
          </tr>
          <tr>
            <th>年齢</th>
            <td>{record.age}</td>
          </tr>
          <tr>
            <th>生年月日</th>
            <td>{record.birthday}</td>
          </tr>
        </tbody>
      </table>

      {/* 削除ボタン */}
      <button className="btn btn-danger" onClick={handleDelete}>
        削除する
      </button>
    </div>
  );
};

export default DeletePage;