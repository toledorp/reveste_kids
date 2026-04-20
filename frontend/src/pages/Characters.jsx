import { useEffect, useMemo, useState } from "react";
import { getCharacters, fetchData } from "../services/api";
import "./Characters.css";

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newCharacter, setNewCharacter] = useState({
    name: "",
    birth_year: "",
    homeworld: "",
    species: "",
    descriptions: {
      height: "",
      mass: "",
      gender: "",
      eye_color: "",
    },
  });

  const charactersPerPage = 9;

  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsAdmin(role === "admin");
    loadCharacters();
  }, []);

  const loadCharacters = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getCharacters();
      const list = Array.isArray(data) ? data : data.persons || [];
      setCharacters(list);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNewCharacter({
      name: "",
      birth_year: "",
      homeworld: "",
      species: "",
      descriptions: {
        height: "",
        mass: "",
        gender: "",
        eye_color: "",
      },
    });
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Deseja excluir este personagem?");
    if (!confirmed) return;

    try {
      await fetchData(`/persons/${id}`, {
        method: "DELETE",
      });

      await loadCharacters();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (character) => {
    setEditingId(character._id);
    setNewCharacter({
      name: character.name || "",
      birth_year: character.birth_year || "",
      homeworld: character.homeworld?._id || "",
      species: character.species?._id || "",
      descriptions: {
        height: character.descriptions?.height || "",
        mass: character.descriptions?.mass || "",
        gender: character.descriptions?.gender || "",
        eye_color: character.descriptions?.eye_color || "",
      },
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...newCharacter,
        descriptions: {
          ...newCharacter.descriptions,
          height: Number(newCharacter.descriptions.height),
          mass: Number(newCharacter.descriptions.mass),
        },
      };

      if (editingId) {
        await fetchData(`/persons/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });

        alert("Personagem atualizado com sucesso.");
      } else {
        await fetchData("/persons", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        alert("Personagem criado com sucesso.");
      }

      resetForm();
      await loadCharacters();
    } catch (err) {
      alert(err.message);
    }
  };

  const totalPages = Math.ceil(characters.length / charactersPerPage);

  const currentCharacters = useMemo(() => {
    const startIndex = (currentPage - 1) * charactersPerPage;
    const endIndex = startIndex + charactersPerPage;
    return characters.slice(startIndex, endIndex);
  }, [characters, currentPage]);

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="characters">
      <div className="characters-container">
        <h1 className="characters-title">Characters</h1>
        <p className="characters-subtitle">
          Explore iconic beings from the Star Wars universe.
        </p>

        {isAdmin && (
          <div className="admin-form-wrapper">
            <h2 className="admin-form-title">
              {editingId ? "Editar Personagem" : "Adicionar Personagem"}
            </h2>

            <form className="admin-film-form" onSubmit={handleSubmit}>
              <div className="admin-form-grid">
                <input
                  type="text"
                  placeholder="Nome"
                  value={newCharacter.name}
                  onChange={(e) =>
                    setNewCharacter({ ...newCharacter, name: e.target.value })
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Ano de nascimento"
                  value={newCharacter.birth_year}
                  onChange={(e) =>
                    setNewCharacter({
                      ...newCharacter,
                      birth_year: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="ID do planeta"
                  value={newCharacter.homeworld}
                  onChange={(e) =>
                    setNewCharacter({
                      ...newCharacter,
                      homeworld: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="ID da espécie"
                  value={newCharacter.species}
                  onChange={(e) =>
                    setNewCharacter({
                      ...newCharacter,
                      species: e.target.value,
                    })
                  }
                />

                <input
                  type="number"
                  placeholder="Altura"
                  value={newCharacter.descriptions.height}
                  onChange={(e) =>
                    setNewCharacter({
                      ...newCharacter,
                      descriptions: {
                        ...newCharacter.descriptions,
                        height: e.target.value,
                      },
                    })
                  }
                />

                <input
                  type="number"
                  placeholder="Peso"
                  value={newCharacter.descriptions.mass}
                  onChange={(e) =>
                    setNewCharacter({
                      ...newCharacter,
                      descriptions: {
                        ...newCharacter.descriptions,
                        mass: e.target.value,
                      },
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="Gênero"
                  value={newCharacter.descriptions.gender}
                  onChange={(e) =>
                    setNewCharacter({
                      ...newCharacter,
                      descriptions: {
                        ...newCharacter.descriptions,
                        gender: e.target.value,
                      },
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="Cor dos olhos"
                  value={newCharacter.descriptions.eye_color}
                  onChange={(e) =>
                    setNewCharacter({
                      ...newCharacter,
                      descriptions: {
                        ...newCharacter.descriptions,
                        eye_color: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div className="admin-actions">
                <button type="submit" className="admin-submit-btn">
                  {editingId ? "Salvar" : "Criar"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    className="admin-cancel-btn"
                    onClick={resetForm}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {loading && <p className="characters-message">Loading characters...</p>}

        {error && (
          <p className="characters-message error">
            Error loading characters: {error}
          </p>
        )}

        {!loading && !error && characters.length === 0 && (
          <p className="characters-message">No characters found.</p>
        )}

        {!loading && !error && characters.length > 0 && (
          <>
            <div className="characters-grid">
              {currentCharacters.map((character) => (
                <div className="character-card" key={character._id}>
                  <h3>{character.name}</h3>

                  <p>
                    <strong>Birth Year:</strong> {character.birth_year ?? "N/A"}
                  </p>

                  <p>
                    <strong>Homeworld:</strong>{" "}
                    {character.homeworld?.name ?? "N/A"}
                  </p>

                  <p>
                    <strong>Species:</strong> {character.species?.name ?? "N/A"}
                  </p>

                  <p>
                    <strong>Height:</strong>{" "}
                    {character.descriptions?.height ?? "N/A"}
                  </p>

                  <p>
                    <strong>Mass:</strong>{" "}
                    {character.descriptions?.mass ?? "N/A"}
                  </p>

                  <p>
                    <strong>Gender:</strong>{" "}
                    {character.descriptions?.gender ?? "N/A"}
                  </p>

                  <p>
                    <strong>Eye Color:</strong>{" "}
                    {character.descriptions?.eye_color ?? "N/A"}
                  </p>

                  {isAdmin && (
                    <div className="film-admin-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(character)}
                      >
                        Editar
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(character._id)}
                      >
                        Excluir
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <div className="pagination-numbers">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (pageNumber) => (
                    <button
                      key={pageNumber}
                      className={`pagination-number ${
                        currentPage === pageNumber ? "active" : ""
                      }`}
                      onClick={() => goToPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  )
                )}
              </div>

              <button
                className="pagination-btn"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Characters;