import React, { useParams } = from 'react';
import App2 from './index';
function AppContent() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { pageNuber } = useParams();
    return (
      <div>
        <App2 pageNuber={pageNuber} />
      </div>
    );
  }

export default AppContent;