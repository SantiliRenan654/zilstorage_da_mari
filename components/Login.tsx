import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthHeader from './AuthHeader';

interface LoginProps {
  onNavigateToSignup: () => void;
}

const Login: React.FC<LoginProps> = ({ onNavigateToSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const result = login(email, password);
        if (!result.success) {
            setError(result.message || 'Falha no login.');
        }
    };

    return (
        <div className="w-full max-w-sm bg-[#3c3c3c] rounded-lg shadow-2xl overflow-hidden border border-gray-800">
            <AuthHeader />
            <div className="p-8 text-white">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold">Iniciar sessão</h1>
                </div>
                {error && <p className="text-red-400 text-center text-sm mb-4 bg-red-900/50 p-2 rounded">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-5">
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
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-400">
                        Não tem uma conta?{' '}
                        <button onClick={onNavigateToSignup} className="text-blue-400 hover:underline">
                            crie uma conta
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;