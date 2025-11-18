
import React from 'react';
import { HelpMessage } from '../../types';

interface HelpMessageModalProps {
    message: HelpMessage;
    onClose: () => void;
}

const HelpMessageModal: React.FC<HelpMessageModalProps> = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{message.subject}</h3>
                <div className="text-sm text-gray-500 mb-4 space-y-1">
                    <p><strong>De:</strong> {message.name} ({message.email})</p>
                    <p><strong>Data:</strong> {message.date}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-md text-gray-800 mb-6">
                    <p className="whitespace-pre-wrap">{message.message}</p>
                </div>
                <div className="flex justify-end">
                    <button 
                        onClick={onClose}
                        className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HelpMessageModal;
