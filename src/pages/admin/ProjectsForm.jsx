// src/pages/admin/ProjectsForm.jsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/index';
import Spinner from '../../components/Spinner';
import { toast } from '../../components/Toast';

export default function ProjectForm() {
  const nav = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [loading, setLoading] = React.useState(!!isEdit);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState('');
  const [form, setForm] = React.useState({
    title: '',
    completion: '',
    description: '',
  });

  // Load existing project when editing
  React.useEffect(() => {
    if (!isEdit) return;
    let alive = true;

    api
      .get(`/api/projects/${id}`)
      .then((data) => {
        if (alive) setForm(data);
      })
      .catch((e) => {
        if (alive) setError(e.message || 'Failed to load project');
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [id, isEdit]);

  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      if (isEdit) {
        await api.put(`/api/projects/${id}`, form);
        toast('Updated');
      } else {
        await api.post('/api/projects', form);
        toast('Created');
      }
      nav('/admin/projects');
    } catch (e) {
      console.error(e);
      setError(e.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  function field(name, type = 'text', placeholder = '') {
    return (
      <div className="col-6" key={name}>
        <div className="label">{name}</div>
        <input
          className="input"
          type={type}
          name={name}                     
          placeholder={placeholder}
          value={form[name] || ''}
          onChange={(e) =>
            setForm({
              ...form,
              [name]: e.target.value,
            })
          }
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="card">
        <Spinner />
      </div>
    );
  }

  return (
    <form className="card" onSubmit={onSubmit}>
      <h3 style={{ marginTop: 0 }}>Project – {isEdit ? 'Edit' : 'Add'}</h3>
      {error && <div className="empty">{error}</div>}

      <div className="row">
        {field('title')}
        {field('completion', 'date')}
        <div className="col-12">
          <div className="label">description</div>
          <textarea
            className="input"
            name="description"            
            value={form.description || ''}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div
        className="kv"
        style={{ justifyContent: 'flex-end', gap: 8, marginTop: 12 }}
      >
        <button
          className="btn"
          type="button"
          onClick={() => nav(-1)}
        >
          Cancel
        </button>
        <button
          className="btn primary"
          disabled={saving}
          type="submit"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </form>
  );
}
