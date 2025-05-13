import React, { useState, useEffect } from "react"; // Reactコンポーネントを作成する際に必要な関数をインポート
import axios from "axios"; // HTTPリクエストを行うためのライブラリをインポート
import { Link } from "react-router-dom"; // React RouterのLinkコンポーネント

// DataListコンポーネントを定義
const DataList = () => {
  // Reactのstate（状態）を利用してデータ、ローディング状態、エラー状態を管理
  const [data, setData] = useState([]); // データの初期状態を空の配列としてセット
  const [loading, setLoading] = useState(true); // ローディング状態を管理（初期値はtrue＝読み込み中）
  const [error, setError] = useState(null); // エラー状態を管理（初期値はnull＝エラーなし）

  // useEffectフックを使用してコンポーネントの描画後に実行される非同期処理を定義
  useEffect(() => {
    // DjangoアプリケーションのAPIからデータを取得するHTTPリクエスト
    // axiosライブラリを使用してGETリクエストを実行する
    axios
      .get("http://localhost:8000/api/try_models_list/") // APIエンドポイントを指定（DjangoのREST APIからデータ取得）
      .then((response) => {
        setData(response.data); // レスポンスデータをstateに保存
        setLoading(false); // ローディング状態をfalseに設定（データ取得完了）
      })
      .catch((err) => {
        setError(err.message); // エラーメッセージをstateに保存（例えば、サーバーエラーやネットワークエラー）
        setLoading(false); // ローディング状態をfalseに設定（エラーが発生して完了した）
      });
  }, []); // 空の依存配列を指定して、コンポーネントの初回レンダリング時にのみこの処理を実行

  // ローディング状態（データを読み込んでいる最中）の画面表示
  if (loading) {
    return <div>Loading...</div>; // 読み込み中であることをユーザーに通知（シンプルなテキスト）
  }

  // エラーが発生した場合の画面表示
  if (error) {
    return <div>Error: {error}</div>; // エラー内容を表示（具体的なエラーメッセージを含む）
  }

  // 最終的なデータ表示部分
  return (
    <div className="container mt-4"> {/* Bootstrapのスタイルを適用するためのコンテナクラス */}
      {/* フォームページとデータリストページへのナビゲーションリンク */}
      <nav className="mb-4">
        {/* React RouterのLinkコンポーネント。クリック時に指定されたルートに移動 */}
        <Link to="/" className="btn btn-primary me-2">新規登録</Link>
        <Link to="/data-list" className="btn btn-secondary">データ一覧</Link>
      </nav>
      <h1>データ一覧</h1> {/* ページタイトルを表示 */}
      {data.length === 0 ? (
        <p>No data found.</p> // データが空の場合の通知表示（ユーザーに何もデータがないことを知らせる）
      ) : (
        <table className="table table-bordered"> {/* Bootstrapのスタイルを適用したテーブル */}
          <thead>
            <tr>
              {/* テーブルのヘッダー部分を定義 */}
              <th>ID</th>
              <th>氏名</th>
              <th>Email</th>
              <th>性別</th>
              <th>年齢</th>
              <th>生年月日</th>
              <th>編集</th>
              <th>削除</th>
            </tr>
          </thead>
          <tbody>
            {/* データの各項目をテーブルの行としてマッピング */}
            {data.map((item) => (
              <tr key={item.id}> {/* 各データ項目を行として表示。ユニークなキーとしてIDを設定 */}
                <td>{item.id}</td> {/* ID項目を表示 */}
                <td>{item.name}</td> {/* Name（名前）項目を表示 */}
                <td>{item.mail}</td> {/* Mail（メールアドレス）項目を表示 */}
                <td>{item.gender ? "男性" : "女性"}</td> {/* Gender（性別）を表示。trueならMale、falseならFemale */}
                <td>{item.age}</td> {/* Age（年齢）項目を表示 */}
                <td>{item.birthday}</td> {/* Birthday（誕生日）項目を表示 */}
                <td><Link to={`/edit/${item.id}`}>編集</Link></td>
                <td><Link to={`/delete/${item.id}`}>削除</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// コンポーネントをエクスポートして他のファイルで利用可能にする
export default DataList;