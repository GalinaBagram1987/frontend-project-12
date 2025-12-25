import React, { useState } from 'react';
import AddChannelForm from '../components/addChannelForm.jsx';

const AddChannelButton = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

    const handleOpened = () => {
      setIsFormOpen(true);
      <AddChannelForm />
    };

    const handleClosed = () => {
      setIsFormOpen(false);
    };
    return (
      <>
				<button type='button' 
          onClick={handleOpened}
          className="p-0 text-primary btn btn-group-vertical">
						<svg xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 16 16" 
              width="20" 
              height="20" 
              fill="currentColor" 
              className="bi bi-plus-square">
						<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
							<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
						</svg>
						<span className="visually-hidden">+</span>
					</button>
          {isFormOpen && (
        <AddChannelForm onClose={handleClosed} />
      )}
      </>
    )

};

export default AddChannelButton;
