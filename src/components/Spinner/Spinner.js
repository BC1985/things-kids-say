import React from 'react';

function Spinner() {
    return (
        <span className="spinner-grow text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </span>
      );
}

export default Spinner;