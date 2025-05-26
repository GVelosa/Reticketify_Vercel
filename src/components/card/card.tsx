import styles from './card.module.css';
import Link from 'next/link';

interface CardProps {
  id: string;
  titulo: string;
  descricao: string;
  imagem: string;
}

export default function Card({ id, titulo, descricao, imagem }: CardProps) {
  return (
    <div className={styles.card}>
      <img src={imagem} alt={titulo} className={styles.imagem} />
      <div className={styles.conteudo}>
        <h3 className={styles.titulo}>{titulo}</h3>
        <p className={styles.descricao}>{descricao}</p>
        <Link href={`/item/${id}`} className={styles.botao}>
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
}
