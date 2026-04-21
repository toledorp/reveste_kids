import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddClothing.css";

function AddClothing() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    size: "",
    category: "",
    media: [],
    condition: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:4000/clothes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao cadastrar peça");
      }

      setMessage("Peça cadastrada com sucesso.");

      setFormData({
        title: "",
        description: "",
        size: "",
        category: "",
        media: [],
        condition: "",
      });

      setTimeout(() => {
        navigate("/closet");
      }, 1000);
    } catch (err) {
      console.log(err);
      setError(err.message || "Não foi possível cadastrar a peça.");
    } finally {
      setLoading(false);
    }
  };

  const handleImagesUpload = async (files) => {
    if (!files || files.length === 0) return;

    const selectedFiles = Array.from(files);

    if (selectedFiles.length > 5) {
      alert("Você pode enviar no máximo 5 imagens.");
      return;
    }

    try {
      setUploadingImages(true);

      const uploadedMedia = [];

      for (const file of selectedFiles) {
        const formDataCloud = new FormData();
        formDataCloud.append("file", file);
        formDataCloud.append("upload_preset", "reveste_kids_upload");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/djgu3sdab/image/upload",
          {
            method: "POST",
            body: formDataCloud,
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error("Erro ao fazer upload das imagens");
        }

        uploadedMedia.push({
          type: "image",
          url: data.secure_url,
        });
      }

      setFormData((prev) => {
        const existingVideos = prev.media.filter(
          (item) => item.type === "video",
        );

        return {
          ...prev,
          media: [...existingVideos, ...uploadedMedia],
        };
      });
    } catch (error) {
      console.log(error);
      alert("Erro ao enviar imagens");
    } finally {
      setUploadingImages(false);
    }
  };

  const handleVideoUpload = async (file) => {
    if (!file) return;

    try {
      setUploadingVideo(true);

      const formDataCloud = new FormData();
      formDataCloud.append("file", file);
      formDataCloud.append("upload_preset", "reveste_kids_upload");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/djgu3sdab/video/upload",
        {
          method: "POST",
          body: formDataCloud,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Erro ao fazer upload do vídeo");
      }

      setFormData((prev) => {
        const existingImages = prev.media.filter(
          (item) => item.type === "image",
        );

        return {
          ...prev,
          media: [
            {
              type: "video",
              url: data.secure_url,
            },
            ...existingImages,
          ],
        };
      });
    } catch (error) {
      console.log(error);
      alert("Erro ao enviar vídeo");
    } finally {
      setUploadingVideo(false);
    }
  };

  return (
    <main className="add-clothing-container">
      <div className="add-clothing-card">
        <div className="add-clothing-header">
          <h1>Cadastrar Peça</h1>
          <p>Adicione uma nova peça ao seu closet.</p>
        </div>

        <form className="add-clothing-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Título da peça"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Descrição"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />

          <input
            type="text"
            name="size"
            placeholder="Tamanho"
            value={formData.size}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Categoria"
            value={formData.category}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="condition"
            placeholder="Condição"
            value={formData.condition}
            onChange={handleChange}
          />

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleImagesUpload(e.target.files)}
          />

          {uploadingImages && <p>Enviando imagens...</p>}

          <input
            type="file"
            accept="video/*"
            onChange={(e) => handleVideoUpload(e.target.files[0])}
          />

          {uploadingVideo && <p>Enviando vídeo...</p>}

          {formData.media.length > 0 && (
            <div className="add-clothing-preview-grid">
              {formData.media.map((item, index) => (
                <div key={index} className="add-clothing-preview-item">
                  {item.type === "video" ? (
                    <video
                      src={item.url}
                      controls
                      className="add-preview-video"
                    />
                  ) : (
                    <img src={item.url} alt={`Prévia ${index + 1}`} />
                  )}
                </div>
              ))}
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Cadastrar peça"}
          </button>
        </form>

        {message && <p className="add-message success">{message}</p>}
        {error && <p className="add-message error">{error}</p>}
      </div>
    </main>
  );
}

export default AddClothing;
