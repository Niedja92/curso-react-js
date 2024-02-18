import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import "./filme.css";
import { toast } from "react-toastify";

function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "b544250d6979b4e9d78907ec8dcdbeca",
            language: "pt-BR",
          },
        })
        .then((response) => {
          // console.log(response.data)
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("FILME NÃO ENCONTRADO");
          navigate("/", { replace: true });
          // o navigate está sendo usado aqui para que quando cair no catch a página redirecione para a Home
          return;
        });
    }

    loadFilme();

    return () => {
      console.log("COMPONENTE FOI DESMONTADO!");
    };
  }, [id, navigate]);

  // Função criada para salvar os filmes na localStorage e também atualizar os que forem excluídos da lista de "Meus filmes"
  function salvarFilme() {
    const minhaLista = localStorage.getItem("@primeflix");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    // O método "some" fará com que seja feita um comparação e se já existe algum item do que foi selecionado na mesma
    // Salvar filme
    const hasFilme = filmesSalvos.some(
      (filmesSalvo) => filmesSalvo.id === filme.id
    );

    // Caso o filme desejado já esteja salvo na lista, executará este "if"
    if (hasFilme) {
      toast.warn("Esse filme já está na sua lista!");
      return;
    }

    // Ao salvar o filme na lista, a mesma será atualizada
    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso!");
  }

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average}</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a
            target="blank"
            rel="external"
            href={`https://youtube.com/results?search_query=${filme.title} Trailer`}
          >
            Trailer
          </a>
          {/* usa-se este caminho no href da tag "a" para que quando o button trailer, que é um link, for clicado, o usuário seja direcionado ao YouTube. O target="blank" é para que seja aberta outra aba e o rel="external", significa que não temos o controle sobre este link*/}
        </button>
      </div>
    </div>
  );
}

export default Filme;
