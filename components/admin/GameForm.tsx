import React from 'react';
import { Game } from '../../types';

interface GameFormProps {
  formData: Omit<Game, 'id'>;
  isEditing: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFormSubmit: (e: React.FormEvent) => void;
  handleCancelEdit: () => void;
}

const GameForm: React.FC<GameFormProps> = ({ formData, isEditing, handleInputChange, handleFormSubmit, handleCancelEdit }) => {
  return (
    <div className="bg-[#3c3c3c] p-4 md:p-6 rounded-lg border border-white">
        <h2 className="text-2xl font-bold text-white mb-4">{isEditing ? 'Editar Jogo' : 'Adicionar Novo Jogo'}</h2>
        <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          <div className="md:col-span-1 flex flex-col items-center">
            <div className="w-40 h-40 bg-gray-700 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-500 mb-4">
              {formData.image ? <img src={formData.image} alt="Preview" className="w-full h-full object-cover rounded-lg"/> : <span className="text-5xl text-gray-500">+</span>}
            </div>
             <input type="text" name="image" placeholder="URL da Imagem" value={formData.image} onChange={handleInputChange} className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-600 text-sm" />
          </div>

          <div className="md:col-span-3 grid grid-cols-1 gap-4">
            <input type="text" name="name" placeholder="Tema do jogo" value={formData.name} onChange={handleInputChange} className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-600" required />
            <textarea name="description" placeholder="Descrição do jogo" value={formData.description} onChange={handleInputChange} className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-600 h-24" required></textarea>
            <input type="text" name="launchDate" placeholder="Data de lançamento" value={formData.launchDate} onChange={handleInputChange} className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-600" required />
            <input type="text" name="developer" placeholder="Desenvolvedor" value={formData.developer} onChange={handleInputChange} className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-600" required />
            <input type="text" name="obtainLink" placeholder="Link do botão obter" value={formData.obtainLink} onChange={handleInputChange} className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-600" required />

            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-2">
                {isEditing && <button type="button" onClick={handleCancelEdit} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-md">Cancelar</button>}
                <button type="submit" className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-6 rounded-md">{isEditing ? 'Salvar Alterações' : 'Criar Jogo'}</button>
            </div>
          </div>
        </form>
      </div>
  );
};

export default GameForm;