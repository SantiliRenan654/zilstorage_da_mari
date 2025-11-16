import React from 'react';

const HelpPage: React.FC = () => {
  const faqs = [
    {
      question: "Por que minha conta está com o status 'Pendente'?",
      answer: "Após o cadastro, todas as novas contas precisam ser revisadas e aprovadas por um administrador para garantir a segurança da plataforma. Normalmente, isso leva de 24 a 48 horas. Você receberá uma notificação por e-mail assim que sua conta for ativada."
    },
    {
      question: "Como posso alterar meu nome, e-mail ou senha?",
      answer: "Você pode gerenciar todas as suas informações pessoais na página 'Meu Perfil'. Para acessá-la, clique no ícone de usuário no canto superior direito do cabeçalho e selecione 'Meu Perfil' no menu."
    },
    {
      question: "Como adiciono um jogo à biblioteca?",
      answer: "A adição, edição e exclusão de jogos na biblioteca é uma funcionalidade restrita a administradores. Se você tem uma sugestão de jogo educacional que gostaria de ver na plataforma, entre em contato conosco."
    },
    {
      question: "O que significa 'salvar' um jogo?",
      answer: "Ao clicar no ícone de coração em um jogo, você o adiciona à sua lista de favoritos. Isso permite que você acesse rapidamente os jogos que mais lhe interessam na página 'Meus Jogos Salvos', sem precisar procurá-los na lista principal."
    },
     {
      question: "Os jogos são gratuitos?",
      answer: "Nossa plataforma atua como um diretório, indicando e fornecendo links para jogos educacionais disponíveis na internet. A gratuidade de cada jogo depende da política de seus respectivos desenvolvedores. A maioria dos jogos que listamos possui uma versão gratuita."
    }
  ];

  return (
    <main className="container mx-auto py-12 md:py-20 px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
        Perguntas Frequentes (FAQ)
      </h1>
      <div className="max-w-4xl mx-auto space-y-8">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-slate-900 p-6 rounded-lg border border-gray-700/50">
            <h3 className="text-xl font-bold mb-3 text-green-300">
              {faq.question}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default HelpPage;
