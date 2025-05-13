// React, useStateのフック、axiosライブラリ、React RouterのLinkコンポーネントをインポート
import React, { useState } from "react";
import axios from "axios"; // HTTPリクエストを行うためのライブラリ
import { Link } from "react-router-dom"; // React RouterのLinkコンポーネント

// Appコンポーネントを定義
const App = () => {
  // ReactのuseStateフックを使用してフォームデータを管理
  const [formData, setFormData] = useState({
    name: "",       // 名前
    mail: "",       // メールアドレス
    gender: false,  // 性別 (true or falseで表現)
    age: 0,         // 年齢
    birthday: "",   // 誕生日 (日付)
  });

  // フォームの入力値が変更された時に呼び出されるハンドラ関数
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target; // イベントオブジェクトから関連情報を取得
    setFormData({
      // 現在のフォームデータをスプレッド構文で展開
      ...formData,
      // 入力フィールドのタイプに応じて値を設定 (checkboxの場合はchecked、それ以外ではvalueを使用)
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // フォームが送信された時に呼び出されるハンドラ関数
  const handleSubmit = (event) => {
    event.preventDefault(); // ブラウザのデフォルト挙動（ページリロード）を防ぐ
    // axiosを使ってバックエンドにデータをPOSTリクエストで送信
    axios
      .post("http://localhost:8000/api/try_models_new/", formData) // ローカルのサーバーにデータ送信
      .then((response) => {
        console.log(response.data); // 成功時のレスポンスデータをコンソールに表示
        alert("データの送信が成功しました！"); // 成功メッセージをアラートで表示
      })
      .catch((error) => {
        console.error(error); // エラーメッセージをコンソールに表示
        alert("エラーが発生しました"); // エラーメッセージをアラートで表示
      });
  };

  // AppコンポーネントのUIを定義
  return (
    <div className="container mt-4">
      {/* フォームページとデータリストページへのナビゲーションリンク */}
      <nav className="mb-4">
        {/* React RouterのLinkコンポーネント。クリック時に指定されたルートに移動 */}
        <Link to="/" className="btn btn-primary me-2">新規登録</Link>
        <Link to="/data-list" className="btn btn-secondary">データ一覧</Link>
      </nav>

      {/* フォームのタイトル */}
      <h1>メンバー新規登録</h1>

      {/* フォームの定義 */}
      <form onSubmit={handleSubmit}>
        {/* 名前入力フィールド */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            氏名:
          </label>
          <input
            type="text" // テキスト入力フィールド
            id="name" 
            name="name" // フィールド名 (stateのキーと一致)
            value={formData.name} // フォームデータの値をバインド
            onChange={handleChange} // 値が変わるたびにhandleChange関数を呼ぶ
            className="form-control" // Bootstrapクラスでスタイリング
          />
        </div>

        {/* メール入力フィールド */}
        <div className="mb-3">
          <label htmlFor="mail" className="form-label">
            Email:
          </label>
          <input
            type="email" // Email入力フィールド (メール形式を期待)
            id="mail"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* 性別入力フィールド (チェックボックス) */}
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            性別(男性ならON):
          </label>
          <input
            type="checkbox" // チェックボックス入力
            id="gender"
            name="gender"
            checked={formData.gender} // チェックされた状態をバインド
            onChange={handleChange}
            className="form-check-input"
          />
        </div>

        {/* 年齢入力フィールド */}
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            年齢:
          </label>
          <input
            type="number" // 数値を入力するフィールド
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* 誕生日入力フィールド */}
        <div className="mb-3">
          <label htmlFor="birthday" className="form-label">
            生年月日:
          </label>
          <input
            type="date" // 日付入力フィールド
            id="birthday"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* 送信ボタン */}
        <button type="submit" className="btn btn-primary">
          登録
        </button>
      </form>
    </div>
  );
};

export default App; // Appコンポーネントをエクスポート