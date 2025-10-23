import { useState } from 'react';
// import reactLogo from './assets/react.svg'; // Removido por não ser usado
// import viteLogo from '/vite.svg';         // Removido por não ser usado
import './App.css';

// ====================================================================
// DADOS DAS SEÇÕES
// ====================================================================

// Mapa de IDs para textos do menu
const SECTIONS_MAP = {
  'cards-section': 'Conceitos Fundamentais',
  'simple-section': 'Orientação na Prática',
  'carousel-section': 'Exemplos Básicos (Slider)',
  'faq-section': 'Dúvidas Frequentes (FAQ)',
};

const SECTION_IDS = Object.keys(SECTIONS_MAP);

// Dados da Sessão 2: Cards
const CONCEPTS = [
  {
    title: 'Classes e Objetos',
    explanation: 'Uma Classe é um molde que define atributos e métodos. O Objeto é a instância concreta dessa classe. Na POO, modelamos entidades do mundo real em sistemas.',
  },
  {
    title: 'Encapsulamento',
    explanation: 'É a proteção dos dados internos, controlando o acesso. Em Python, usamos a convenção de underscores para indicar que um atributo deve ser tratado como "privado".',
  },
  {
    title: 'Herança',
    explanation: 'Permite que uma nova classe (subclasse) herde propriedades de uma classe existente (superclasse), promovendo a reutilização de código e a hierarquia.',
  },
  {
    title: 'Polimorfismo',
    explanation: 'Significa "muitas formas". Permite que objetos de diferentes classes respondam ao mesmo método de maneiras distintas (Ex: Duck Typing em Python).',
  },
];

// Dados da Sessão 4: Carrossel/Slider
const CAROUSEL_SLIDES = [
  {
    title: 'O Construtor __init__',
    code: 'class Produto:\n  def __init__(self, nome, preco):\n    self.nome = nome\n    self.preco = preco',
    explanation: 'Chamado ao criar uma nova instância, inicializa os atributos do objeto. O parâmetro `self` representa a instância recém-criada.',
  },
  {
    title: 'Métodos e Comportamento',
    code: 'class Usuario:\n  def saudar(self):\n    return f"Olá, {self.nome}!"\n\nu = Usuario("Alice")\nprint(u.saudar())',
    explanation: 'Métodos (funções dentro da classe) definem o comportamento do objeto, como ações que ele pode realizar.',
  },
  {
    title: 'Instanciando Classes',
    code: 'class Pedido:\n  pass\n\np = Pedido()\ntipo = type(p)',
    explanation: 'A classe é o tipo, e a variável `p` é uma instância (objeto) desse tipo. Esta é a base da programação orientada a objetos.',
  },
];

// Dados da Sessão 5: FAQ
const FAQS = [
  { q: 'O que são Dunder Methods?', a: 'Métodos mágicos com `__` no início e fim (ex: `__init__`) usados para funcionalidades especiais da linguagem.' },
  { q: 'Variáveis de Instância vs. Classe?', a: 'Instância: exclusivas do objeto (`self.attr`). Classe: compartilhadas por todas as instâncias.' },
  { q: 'Como Python faz Encapsulamento?', a: 'Usa a convenção de underscores (`_`) ou o `name mangling` (`__`) para indicar que atributos são para uso interno.' },
  { q: 'O que é Duck Typing?', a: 'Princípio de polimorfismo: se um objeto tem o método que eu preciso, eu o uso, sem me importar com o tipo da classe (checa o comportamento, não o tipo).' },
  { q: 'Qual a utilidade do método `__str__`?', a: 'Retorna uma representação legível para humanos do objeto, usada ao chamar `print(objeto)`.' },
  { q: 'Quando usar Composição?', a: 'Quando um objeto *tem* outro (relação "tem um" - agregação), oferecendo mais flexibilidade do que a herança.' },
  { q: 'Qual o papel do `@property`?', a: 'Permite que métodos sejam acessados como se fossem atributos, controlando o acesso (*getters/setters*) de forma mais pythônica.' },
  { q: 'Método de Classe (`@classmethod`)?', a: 'Recebe a classe (`cls`) como primeiro argumento. É usado para criar construtores alternativos ou métodos que operam na classe em si, não na instância.' },
  { q: 'Método Estático (`@staticmethod`)?', a: 'Não recebe nem `self` nem `cls`. É uma função utilitária logicamente agrupada à classe, mas que não depende do estado da instância.' },
  { q: 'O que é MRO?', a: 'Method Resolution Order. A ordem que o Python segue para buscar um método em uma hierarquia de herança, especialmente na Herança Múltipla.' },
  { q: 'O que são Data Classes?', a: 'Classes otimizadas para armazenar dados (Python 3.7+), que geram automaticamente métodos como `__init__` e `__repr__`.' },
  { q: 'Abstração em Python?', a: 'Expor apenas o essencial e esconder a complexidade. Usamos o módulo `abc` (Abstract Base Classes) para definir classes e métodos abstratos.' },
  { q: 'Herança Múltipla é boa prática?', a: 'É possível, mas geralmente desaconselhada para evitar o Problema do Diamante e complexidade. Mixins são uma alternativa comum para adicionar funcionalidades.' },
  { q: 'Para que serve o `super()`?', a: 'Permite chamar métodos da classe pai (superclasse) dentro da subclasse, crucial para estender o construtor `__init__` e outros métodos herdados.' },
  { q: 'POO em Sistemas Complexos?', a: 'Traz modularidade, organização e manutenibilidade, pois permite modelar o sistema em módulos independentes com interfaces claras (objetos).' },
];

// ====================================================================
// COMPONENTES (Funções de renderização inline)
// ====================================================================

// Sessão 1: Menu de Navegação (Header)
const Header = () => {
  const handleScrollTo = (id, e) => {
    e.preventDefault();
    document.getElementById(id).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <header className="main-header">
      <div className="logo">POO em Python</div>
      <nav>
        <ul className="nav-list">
          {SECTION_IDS.map((id) => (
            <li key={id}>
              <a href={`#${id}`} onClick={(e) => handleScrollTo(id, e)}>
                {SECTIONS_MAP[id]}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

// Sessão 2: Cards com Hover e Box Shadow
const CardsSection = () => (
  <div className="cards-container">
    <h2>Conceitos Fundamentais da POO em Python</h2>
    <div className="cards-grid">
      {CONCEPTS.map((concept, index) => (
        <div key={index} className="card hover-shadow">
          <h3>{concept.title}</h3>
          <p>{concept.explanation}</p>
        </div>
      ))}
    </div>
  </div>
);

// Sessão 3: Imagem Fundo e Texto ao Lado
const SimpleSection = () => (
  <div className="simple-section-content">
    <div className="image-container">
      {/*
        O ideal seria usar uma imagem real.
        Aqui usamos uma div com uma classe para simular a imagem de fundo/placeholder.
      */}
      <div className="image-placeholder">
         Diagrama de POO (Placeholder)
      </div>
    </div>
    <div className="text-container">
      <h2>Orientação a Objetos: Simplificando Sistemas</h2>
      <p>
        A POO em Python é crucial para desenvolvimento de sistemas, pois modela o mundo real em objetos, facilitando a criação de código que é mais fácil de entender, manter e evoluir.
      </p>
      <p>
        Em projetos complexos, ela promove a modularidade e a reutilização de código através de **Herança** e **Composição**, organizando o sistema em blocos lógicos interconectados.
      </p>
    </div>
  </div>
);

// Sessão 4: Carrossel/Slider Simples (sem pacotes)
const CarouselSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? CAROUSEL_SLIDES.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === CAROUSEL_SLIDES.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const currentSlide = CAROUSEL_SLIDES[currentIndex];

  return (
    <div className="carousel-container">
      <h2>Conceitos Básicos em Ação</h2>
      <div className="slider-wrapper">
        <button onClick={goToPrevious} className="slide-arrow prev-arrow">
          &lt;
        </button>

        <div className="slide-content">
          <h3>{currentSlide.title}</h3>

          <div className="code-block">
            <pre><code>{currentSlide.code}</code></pre>
          </div>

          <p className="slide-explanation">{currentSlide.explanation}</p>
        </div>

        <button onClick={goToNext} className="slide-arrow next-arrow">
          &gt;
        </button>
      </div>

      <div className="dots-container">
        {CAROUSEL_SLIDES.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

// Sessão 5: FAQ com Summary
const FAQSection = () => (
  <div className="faq-container">
    <h2>Dúvidas Frequentes (FAQ) sobre POO</h2>
    <div className="faq-list">
      {FAQS.map((faq, index) => (
        <details key={index} className="faq-item">
          <summary className="faq-question">
            {faq.q}
          </summary>
          <p className="faq-answer">{faq.a}</p>
        </details>
      ))}
    </div>
  </div>
);


// ====================================================================
// FUNÇÃO PRINCIPAL APP
// ====================================================================

function App() {
  // O useState de 'count' foi mantido como no seu template original, mas não é usado.
  const [count, setCount] = useState(0);

  return (
    <>
      {/* 1. Header (Menu de Navegação Fixo) */}
      <Header />

      <main className="main-content">
        {/* 2. Sessão de Cards */}
        <section id="cards-section" className="section-padding">
          <CardsSection />
        </section>

        {/* 3. Sessão Simples (Imagem e Texto) */}
        <section id="simple-section" className="section-padding section-alt-bg">
          <SimpleSection />
        </section>

        {/* 4. Sessão de Carrossel */}
        <section id="carousel-section" className="section-padding">
          <CarouselSection />
        </section>

        {/* 5. Sessão de FAQ */}
        <section id="faq-section" className="section-padding section-alt-bg">
          <FAQSection />
        </section>
      </main>

      {/* Rodapé Opcional */}
      <footer>
        <p>&copy; 2025 POO em Python. Desenvolvido com React e Vite.</p>
        <div style={{ display: 'none' }}>Contador: {count}</div>
      </footer>
    </>
  );
}

export default App;