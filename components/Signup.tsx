import React, { useState } from 'react';

interface SignupProps {
  onSignup: (name: string, email: string, password: string) => { success: boolean, message?: string };
  onNavigateToLogin: () => void;
}

// Fix: Moved SignupWindow outside of the Signup component to prevent re-rendering issues that caused input fields to lose focus after each character typed.
const SignupWindow = ({children}: {children: React.ReactNode}) => (
     <div className="w-full max-w-sm bg-[#3c3c3c] rounded-lg shadow-2xl overflow-hidden border border-gray-800">
        <div className="bg-[#2a2a2a] p-2 flex justify-between items-center border-b border-gray-500">
            <div className="flex items-center space-x-2">
               <span className="text-sm font-semibold text-green-400">Zil</span>
               <span className="text-sm font-semibold text-gray-300">STORAGE</span>
            </div>
             <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
        </div>
        <div className="p-8 text-white">
            {children}
        </div>
    </div>
);

const Signup: React.FC<SignupProps> = ({ onSignup, onNavigateToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const result = onSignup(name, email, password);
        if (result.success) {
            setSubmitted(true);
        } else {
            setError(result.message || 'Ocorreu um erro ao criar a conta.');
        }
    };

    if (submitted) {
        return (
            <SignupWindow>
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Cadastro enviado!</h1>
                    <p className="text-gray-300 mb-6">Sua conta foi criada e está pendente de aprovação por um administrador.</p>
                    <button onClick={onNavigateToLogin} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition-colors">
                        Voltar para Login
                    </button>
                </div>
            </SignupWindow>
        );
    }
    
    return (
        <SignupWindow>
            <button onClick={onNavigateToLogin} className="flex items-center space-x-2 text-gray-300 hover:text-white mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                <span>Voltar</span>
            </button>
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold">Criar a sua conta</h1>
            </div>
            {error && <p className="text-red-400 text-center text-sm mb-4 bg-red-900/50 p-2 rounded">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-5">
                 <div>
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">Nome</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password"  className="text-sm font-medium text-gray-300">Senha</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition-colors">
                    Seguinte
                </button>
            </form>
        </SignupWindow>
    );
};

export default Signup;