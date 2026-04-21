import { useEffect, useState } from "react";
import "./MyCloset.css";
import MediaCarousel from "../components/MediaCarousel";

function MyCloset() {
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    size: "",
    category: "",
    media: [],
    condition: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:4000/my-clothes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setClothes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Deseja excluir esta peça?");
    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:4000/clothes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao excluir peça");
      }

      setClothes((prevClothes) =>
        prevClothes.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.log(error);
      alert("Não foi possível excluir a peça.");
    } finally {
      setDeletingId(null);
    }
  };

  const openEditModal = (item) => {
    const currentMedia =
      item.media && item.media.length > 0
        ? item.media
        : item.images && item.images.length > 0
        ? item.images.map((url) => ({ type: "image", url }))
        : item.image
        ? [{ type: "image", url: item.image }]
        : [];

    setEditingItem(item);
    setFormData({
      title: item.title || "",
      description: item.description || "",
      size: item.size || "",
      category: item.category || "",
      media: currentMedia,
      condition: item.condition || "",
    });
  };

  const closeEditModal = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      description: "",
      size: "",
      category: "",
      media: [],
      condition: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!editingItem) return;

    try {
      setSavingEdit(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:4000/clothes/${editingItem._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao editar peça");
      }

      const updatedItem = data.clothing;

      setClothes((prevClothes) =>
        prevClothes.map((item) =>
          item._id === updatedItem._id ? updatedItem : item
        )
      );

      closeEditModal();
    } catch (error) {
      console.log(error);
      alert("Não foi possível atualizar a peça.");
    } finally {
      setSavingEdit(false);
    }
  };

  if (loading) {
    return <div className="closet-loading">Carregando seu closet...</div>;
  }

  return (
    <>
      <main className="closet-container">
        <div className="closet-header">
          <h1>Meu Closet</h1>
          <p>Veja as peças cadastradas no seu perfil.</p>
        </div>

        {clothes.length === 0 ? (
          <div className="closet-empty">
            <p>Você ainda não cadastrou nenhuma peça.</p>
          </div>
        ) : (
          <div className="closet-grid">
            {clothes.map((item) => {
              const previewMedia =
                item.media && item.media.length > 0
                  ? item.media
                  : item.images && item.images.length > 0
                  ? item.images.map((url) => ({ type: "image", url }))
                  : item.image
                  ? [{ type: "image", url: item.image }]
                  : [];

              return (
                <article key={item._id} className="closet-card">
                  <div className="closet-image-wrapper">
                    <MediaCarousel media={previewMedia} alt={item.title} />
                  </div>

                  <div className="closet-info">
                    <h2>{item.title}</h2>
                    <p>{item.description || "Sem descrição"}</p>

                    <div className="closet-meta">
                      <span>
                        <strong>Tamanho:</strong> {item.size}
                      </span>
                      <span>
                        <strong>Categoria:</strong> {item.category}
                      </span>
                      <span>
                        <strong>Condição:</strong> {item.condition}
                      </span>
                    </div>

                    <div className="closet-actions">
                      <button
                        type="button"
                        className="closet-edit-btn"
                        onClick={() => openEditModal(item)}
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        className="closet-delete-btn"
                        onClick={() => handleDelete(item._id)}
                        disabled={deletingId === item._id}
                      >
                        {deletingId === item._id ? "Excluindo..." : "Excluir"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {editingItem && (
        <div className="modal-overlay" onClick={closeEditModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Editar peça</h2>
              <button
                type="button"
                className="modal-close-btn"
                onClick={closeEditModal}
              >
                ×
              </button>
            </div>

            <form className="modal-form" onSubmit={handleEditSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Título"
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

              <div className="modal-actions">
                <button
                  type="button"
                  className="modal-cancel-btn"
                  onClick={closeEditModal}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="modal-save-btn"
                  disabled={savingEdit}
                >
                  {savingEdit ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default MyCloset;