'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './page.module.css';
import Card from '../components/card/card';
import api from '../services/api';

interface Evento {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
}

export default function Home() {
  const [eventos, setEventos] = useState<Evento[]>([]);

  useEffect(() => {
    axios.get(`${api}/event`)
      .then((response) => {
        setEventos(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar eventos:', error);
      });
  }, []);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Divulgação de Eventos</h1>
          <p>
            Encontre os melhores eventos, shows e experiências perto de você. Fique por dentro das novidades e garanta sua presença nos maiores eventos da sua região!
          </p>
        </div>
      </section>

      <main className={styles.container}>
        <section className={styles.eventos}>
          <h2>Próximos Eventos</h2>
          <div className={styles.cardGrid}>
            {eventos.map((evento) => (
              <Card
                key={evento.id}
                id={evento.id}
                titulo={evento.title}
                descricao={evento.description}
                imagem={evento.imageUrl}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
