import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const EditForm = () => {
  const { id } = useParams(); // URLパラメータからIDを取得
  const navigate = useNavigate(); // ページ遷移のためのフック
  const [formData, setFormData] = useState({
    name: "",
    mail: "",
    gender: false,
    age: 0,
    birthday: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/try_models_update/${id}/`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert("指定したデータが見つかりません");
      });
  }, [id]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:8000/try_models_update/${id}/`, formData)
      .then((response) => {
        console.log(response.data);
        alert("データが更新されました！");
        navigate("/data-list"); // 更新後に一覧ページに移動
      })
      .catch((error) => {
        console.error(error);
        alert("エラーが発生しました");
      });
  };

  return (
    <div className="container mt-4">
      <nav className="mb-4">
        <Link to="/" className="btn btn-primary me-2">新規登録</Link>
        <Link to="/data-list" className="btn btn-secondary">データ一覧</Link>
      </nav>
      <h1>編集画面</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            氏名:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mail" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="mail"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            性別(男性ならON):
          </label>
          <input
            type="checkbox"
            id="gender"
            name="gender"
            checked={formData.gender}
            onChange={handleChange}
            className="form-check-input"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            年齢:
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="birthday" className="form-label">
            生年月日:
          </label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          更新する
        </button>
      </form>
    </div>
  );
};

export default EditForm;