'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import api from '../../../services/api';
import styles from './page.module.css';

interface Evento {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
}

export default function DetalhesEvento() {
  const { id } = useParams();
  const router = useRouter();
  const [evento, setEvento] = useState<Evento | null>(null);

interface Comentario {
  texto: string;
  estrelas: number;
}

const [comentarios, setComentarios] = useState<Comentario[]>([]);
const [novoComentario, setNovoComentario] = useState('');
const [avaliacao, setAvaliacao] = useState<number>(0);

  useEffect(() => {
    if (id) {
      axios.get(`${api}/event/${id}`)
        .then((response) => {
          setEvento(response.data);
        })
        .catch((error) => {
          console.error('Erro ao buscar evento:', error);
        });
    }
  }, [id]);

  const handleDelete = async () => {
    const confirmar = confirm('Tem certeza que deseja deletar este evento?');
    if (!confirmar) return;

    try {
      await axios.delete(`${api}/event/${id}`);
      alert('Evento deletado com sucesso!');
      router.push('/');
    } catch (error) {
      console.error('Erro ao deletar evento:', error);
      alert('Erro ao deletar evento');
    }
  };

 const handleAddComentario = (e: React.FormEvent) => {
  e.preventDefault();
  if (novoComentario.trim() === '') return;

  const comentarioNovo: Comentario = {
    texto: novoComentario,
    estrelas: avaliacao,
  };

  setComentarios([...comentarios, comentarioNovo]);
  setNovoComentario('');
  setAvaliacao(0);
};


  if (!evento) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.container}>
      <a href="/" className={styles.botaoVoltarTopo}>Voltar</a>

      <div className={styles.content}>
        <div className={styles.imagemContainer}>
          <img src={evento.imageUrl} alt={evento.title} className={styles.imagem} />
        </div>

        <div className={styles.infoContainer}>
          <h1 className={styles.titulo}>{evento.title}</h1>
          <p className={styles.descricao}>{evento.description}</p>
          <p><strong>Data:</strong> {evento.date}</p>
          <p>
            <strong>Local:</strong> {evento.location}
          </p>

          <div className={styles.botoes}>
            <button onClick={handleDelete} className={styles.botaoDeletar}>
              Deletar Evento
            </button>
          </div>       
        </div>
      </div>
      <div className={styles.comentarios}>
            <h2>Comentários</h2> 
            <strong>Avaliação:</strong> {' '}
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setAvaliacao(star)}
                style={{
                  cursor: 'pointer',
                  color: star <= avaliacao ? 'gold' : '#ccc',
                  fontSize: '20px'
                }}
              >
                ★
              </span>
            ))}
            <form onSubmit={handleAddComentario} className={styles.formComentario}>
              <input
                type="text"
                placeholder="Adicione um comentário..."
                value={novoComentario}
                onChange={(e) => setNovoComentario(e.target.value)}
              />
              <button type="submit">Comentar</button>
            </form>
            <ul>
              {comentarios.length === 0 && <li>Seja o primeiro a comentar!</li>}
              {comentarios.map((comentario, index) => (
                <li key={index}>
                  <div>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        style={{
                          color: i < comentario.estrelas ? 'gold' : '#ccc',
                          fontSize: '18px',
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  {comentario.texto}
                </li>
              ))}
            </ul>
          </div>
    </div>
  );
}
