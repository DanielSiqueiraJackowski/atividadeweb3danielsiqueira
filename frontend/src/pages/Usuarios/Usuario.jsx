import { useEffect, useState } from 'react';
import {
  getUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario
} from '../../services/usuarioService';

function Usuarios() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // =========================
  // BUSCA POR ID
  // =========================

  const [searchId, setSearchId] = useState('');
  const [usuarioEncontrado, setUsuarioEncontrado] = useState(null);

  // =========================
  // CRIAÇÃO
  // =========================

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPass, setNewPass] = useState('');
  const [newPic, setNewPic] = useState('');

  // =========================
  // EDIÇÃO
  // =========================

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  // =========================
  // LISTAR TODOS
  // =========================

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getUsuarios();

      setUsers(data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.err ||
        err.response?.data?.erro ||
        err.message ||
        'Erro ao buscar usuários'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  // =========================
  // BUSCAR POR ID
  // =========================

  const handleBuscarPorId = async () => {
    if (!searchId.trim()) {
      setError('Informe um ID para realizar a busca.');
      return;
    }

    try {
      setError(null);
      setSuccess(null);
      setUsuarioEncontrado(null);

      const data = await getUsuario(searchId);

      setUsuarioEncontrado(data.data || data);
    } catch (err) {
      setUsuarioEncontrado(null);

      setError(
        err.response?.data?.err ||
        err.response?.data?.erro ||
        err.message ||
        'Usuário não encontrado'
      );
    }
  };

  const handleLimparBusca = () => {
    setSearchId('');
    setUsuarioEncontrado(null);
    setError(null);
  };

  // =========================
  // CRIAR USUÁRIO
  // =========================

  const handleAbrirModal = () => {
    setError(null);
    setSuccess(null);
    setShowCreateModal(true);
  };

  const handleFecharModal = () => {
    setShowCreateModal(false);

    setNewName('');
    setNewEmail('');
    setNewPass('');
    setNewPic('');

    setError(null);
  };

  const handleCriarUsuario = async (e) => {
    e.preventDefault();

    if (
      !newName.trim() ||
      !newEmail.trim() ||
      !newPass.trim()
    ) {
      setError('Nome, e-mail e senha são obrigatórios.');
      return;
    }

    try {
      setError(null);
      setSuccess(null);

      await createUsuario({
        name: newName.trim(),
        email: newEmail.trim(),
        pass: newPass,
        pic: newPic.trim() || null
      });

      handleFecharModal();

      setSuccess('Usuário criado com sucesso!');

      await fetchUsuarios();
    } catch (err) {
      setError(
        err.response?.data?.err ||
        err.response?.data?.erro ||
        err.message ||
        'Erro ao criar usuário'
      );
    }
  };

  // =========================
  // EDITAR USUÁRIO
  // =========================

  const handleIniciarEdicao = (user) => {
    setEditingId(user.id);

    setEditName(user.name);
    setEditEmail(user.email);

    setError(null);
    setSuccess(null);
  };

  const handleCancelarEdicao = () => {
    setEditingId(null);
    setEditName('');
    setEditEmail('');
  };

  const handleSalvarEdicao = async (id) => {
    if (!editName.trim() || !editEmail.trim()) {
      setError('Nome e e-mail são obrigatórios.');
      return;
    }

    try {
      setError(null);
      setSuccess(null);

      await updateUsuario(id, {
        name: editName.trim(),
        email: editEmail.trim()
      });

      handleCancelarEdicao();

      setSuccess('Usuário editado com sucesso!');

      await fetchUsuarios();

      if (
        usuarioEncontrado &&
        Number(usuarioEncontrado.id) === Number(id)
      ) {
        const data = await getUsuario(id);

        setUsuarioEncontrado(data.data || data);
      }
    } catch (err) {
      setError(
        err.response?.data?.err ||
        err.response?.data?.erro ||
        err.message ||
        'Erro ao editar usuário'
      );
    }
  };

  // =========================
  // EXCLUIR USUÁRIO
  // =========================

  const handleDelete = async (id) => {
    const confirmar = window.confirm(
      'Deseja realmente excluir este usuário?'
    );

    if (!confirmar) {
      return;
    }

    try {
      setError(null);
      setSuccess(null);

      await deleteUsuario(id);

      if (
        usuarioEncontrado &&
        Number(usuarioEncontrado.id) === Number(id)
      ) {
        setUsuarioEncontrado(null);
        setSearchId('');
      }

      if (editingId === id) {
        handleCancelarEdicao();
      }

      setSuccess('Usuário excluído com sucesso!');

      await fetchUsuarios();
    } catch (err) {
      setError(
        err.response?.data?.err ||
        err.response?.data?.erro ||
        err.message ||
        'Erro ao excluir usuário'
      );
    }
  };

  return (
    <div className="page-container">
      <div style={styles.header}>
        <h1>Lista de Usuários</h1>

        <button
          style={styles.createButton}
          onClick={handleAbrirModal}
        >
          + Novo usuário
        </button>
      </div>

      {/* =========================
          BUSCA POR ID
      ========================== */}

      <div style={styles.searchContainer}>
        <h2 style={styles.sectionTitle}>
          Buscar usuário por ID
        </h2>

        <div style={styles.searchRow}>
          <input
            type="number"
            min="1"
            placeholder="Digite o ID do usuário"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            style={styles.input}
          />

          <button
            onClick={handleBuscarPorId}
            style={styles.searchButton}
          >
            Buscar
          </button>

          {(searchId || usuarioEncontrado) && (
            <button
              onClick={handleLimparBusca}
              style={styles.secondaryButton}
            >
              Limpar
            </button>
          )}
        </div>

        {usuarioEncontrado && (
          <div style={styles.foundUserCard}>
            <div style={styles.userInfo}>
              <span style={styles.userName}>
                {usuarioEncontrado.name}
              </span>

              <span style={styles.userEmail}>
                {usuarioEncontrado.email}
              </span>
            </div>

            <div style={styles.statusBadge}>
              ID #{usuarioEncontrado.id}
            </div>
          </div>
        )}
      </div>

      {/* =========================
          MENSAGENS
      ========================== */}

      {success && (
        <div style={styles.successMessage}>
          {success}
        </div>
      )}

      {error && (
        <div style={styles.errorMessage}>
          Ops! {error}
        </div>
      )}

      {loading && (
        <div style={styles.message}>
          Carregando usuários...
        </div>
      )}

      {!loading && users.length === 0 && (
        <div style={styles.message}>
          Nenhum usuário encontrado no momento.
        </div>
      )}

      {/* =========================
          LISTA
      ========================== */}

      {!loading && users.length > 0 && (
        <>
          <h2 style={styles.sectionTitle}>
            Todos os usuários
          </h2>

          <ul style={styles.usersList}>
            {users.map((user) => (
              <li
                key={user.id}
                style={styles.userCard}
              >
                {editingId === user.id ? (
                  <>
                    <div style={styles.editContainer}>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) =>
                          setEditName(e.target.value)
                        }
                        placeholder="Nome"
                        style={styles.input}
                      />

                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) =>
                          setEditEmail(e.target.value)
                        }
                        placeholder="E-mail"
                        style={styles.input}
                      />
                    </div>

                    <div style={styles.actions}>
                      <button
                        onClick={() =>
                          handleSalvarEdicao(user.id)
                        }
                        style={styles.saveButton}
                      >
                        Salvar
                      </button>

                      <button
                        onClick={handleCancelarEdicao}
                        style={styles.secondaryButton}
                      >
                        Cancelar
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={styles.userInfo}>
                      <span style={styles.userName}>
                        {user.name}
                      </span>

                      <span style={styles.userEmail}>
                        {user.email}
                      </span>
                    </div>

                    <div style={styles.actions}>
                      <div style={styles.statusBadge}>
                        ID #{user.id}
                      </div>

                      <button
                        onClick={() =>
                          handleIniciarEdicao(user)
                        }
                        style={styles.editButton}
                      >
                        Editar
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(user.id)
                        }
                        style={styles.deleteButton}
                      >
                        Excluir
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* =========================
          MODAL DE CRIAÇÃO
      ========================== */}

      {showCreateModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>
              Novo usuário
            </h2>

            <form
              onSubmit={handleCriarUsuario}
              style={styles.modalForm}
            >
              <div style={styles.field}>
                <label style={styles.label}>
                  Nome
                </label>

                <input
                  type="text"
                  value={newName}
                  onChange={(e) =>
                    setNewName(e.target.value)
                  }
                  placeholder="Digite o nome"
                  style={styles.modalInput}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>
                  E-mail
                </label>

                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) =>
                    setNewEmail(e.target.value)
                  }
                  placeholder="usuario@email.com"
                  style={styles.modalInput}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>
                  Senha
                </label>

                <input
                  type="password"
                  value={newPass}
                  onChange={(e) =>
                    setNewPass(e.target.value)
                  }
                  placeholder="Digite a senha"
                  style={styles.modalInput}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>
                  Imagem / URL
                </label>

                <input
                  type="text"
                  value={newPic}
                  onChange={(e) =>
                    setNewPic(e.target.value)
                  }
                  placeholder="Opcional"
                  style={styles.modalInput}
                />
              </div>

              <div style={styles.modalActions}>
                <button
                  type="button"
                  onClick={handleFecharModal}
                  style={styles.secondaryButton}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  style={styles.saveButton}
                >
                  Criar usuário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '1.5rem',
  },

  searchContainer: {
    width: '100%',
    marginBottom: '2rem',
    padding: '1.5rem',
    background: 'var(--card-bg)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    boxSizing: 'border-box',
  },

  sectionTitle: {
    color: 'var(--text-primary)',
    marginBottom: '1rem',
  },

  searchRow: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    alignItems: 'center',
  },

  input: {
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    background: 'var(--card-bg)',
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    outline: 'none',
  },

  usersList: {
    listStyleType: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
  },

  userCard: {
    background: 'var(--card-bg)',
    border: '1px solid var(--border-color)',
    padding: '1rem 1.5rem',
    borderRadius: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '15px',
    transition: 'all 0.3s ease',
  },

  foundUserCard: {
    background: 'var(--card-bg)',
    border: '1px solid var(--border-color)',
    padding: '1rem 1.5rem',
    borderRadius: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1rem',
  },

  userInfo: {
    display: 'flex',
    flexDirection: 'column',
  },

  userName: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    marginBottom: '4px',
  },

  userEmail: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
  },

  statusBadge: {
    background: 'var(--badge-bg)',
    color: 'var(--primary-color)',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  },

  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  },

  editContainer: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    flex: 1,
  },

  createButton: {
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    background: 'var(--primary-color)',
    color: '#fff',
    fontWeight: '600',
  },

  searchButton: {
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    background: 'var(--primary-color)',
    color: '#fff',
    fontWeight: '600',
  },

  editButton: {
    border: 'none',
    padding: '8px 14px',
    borderRadius: '8px',
    cursor: 'pointer',
    background: '#0d6efd',
    color: '#fff',
    fontWeight: '600',
  },

  saveButton: {
    border: 'none',
    padding: '9px 15px',
    borderRadius: '8px',
    cursor: 'pointer',
    background: '#198754',
    color: '#fff',
    fontWeight: '600',
  },

  deleteButton: {
    border: 'none',
    padding: '8px 14px',
    borderRadius: '8px',
    cursor: 'pointer',
    background: '#dc3545',
    color: '#fff',
    fontWeight: '600',
  },

  secondaryButton: {
    border: '1px solid var(--border-color)',
    padding: '8px 14px',
    borderRadius: '8px',
    cursor: 'pointer',
    background: 'var(--card-bg)',
    color: 'var(--text-primary)',
    fontWeight: '600',
  },

  message: {
    textAlign: 'center',
    color: 'var(--text-secondary)',
    margin: '2rem 0',
    fontSize: '1.2rem',
  },

  errorMessage: {
    textAlign: 'center',
    margin: '1.5rem 0',
    fontSize: '1rem',
    color: '#dc3545',
    fontWeight: '600',
  },

  successMessage: {
    textAlign: 'center',
    margin: '1.5rem 0',
    fontSize: '1rem',
    color: '#198754',
    fontWeight: '600',
  },

  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.55)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px',
  },

  modal: {
    width: '100%',
    maxWidth: '500px',
    background: 'var(--card-bg)',
    border: '1px solid var(--border-color)',
    borderRadius: '14px',
    padding: '1.5rem',
    boxSizing: 'border-box',
  },

  modalTitle: {
    marginTop: 0,
    color: 'var(--text-primary)',
  },

  modalForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },

  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },

  label: {
    color: 'var(--text-primary)',
    fontWeight: '600',
  },

  modalInput: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '11px 12px',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    background: 'var(--card-bg)',
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    outline: 'none',
  },

  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '10px',
  },
};

export default Usuarios;