import React from 'react';

// PUBLIC_INTERFACE
function FloatingActionButton({ onClick, tooltip }) {
  return (
    <button
      className="fab"
      aria-label={tooltip || "Floating Action Button"}
      title={tooltip}
      onClick={onClick}
      tabIndex="0"
      type="button"
    >
      +
    </button>
  );
}

export default FloatingActionButton;
