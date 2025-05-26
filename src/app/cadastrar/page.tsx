'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ulid } from 'ulid';
import styles from './page.module.css';
import api from '../../services/api';

export default function CadastrarEvento() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    imageUrl: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      id: ulid(),
      ...form,
    };

    try {
      await axios.post(`${api}/event`, data);
      alert('Evento cadastrado com sucesso!');
      router.push('/');
    } catch (error) {
      console.error('Erro ao cadastrar evento:', error);
      alert('Erro ao cadastrar evento');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Cadastrar Novo Evento</h1>
      <form onSubmit={handleSubmit} className={styles.formulario}>
        <label>
          Título
          <input
            className={styles.input}
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Descrição
          <textarea
            className={styles.textarea}
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Data
          <input
            className={styles.input}
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Local
          <input
            className={styles.input}
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          URL da Imagem
          <input
            className={styles.input}
            type="text"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            required
          />
        </label>
        <div className={styles.botoes}>
          <button type="submit" className={styles.botaoCadastrar}>Cadastrar Evento</button>
          <a href="/" className={styles.botaoVoltar}>Voltar</a>
        </div>
      </form>
    </div>
  );
}
