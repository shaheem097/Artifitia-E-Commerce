import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistore } from "./Redux/store.jsx";
import { ToastContainer } from "react-toastify";
import { SearchProvider } from './Context/SerachContext.jsx';
import { SubcategoryProvider } from './Context/SubcategoryContext.jsx';

import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SubcategoryProvider>
     <SearchProvider>
 <Provider store={store}>
    <PersistGate loading={null} persistor={persistore}>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        
      />
     
          <App />
    </PersistGate>
  </Provider>,
  </SearchProvider>
  </SubcategoryProvider>
  </React.StrictMode>,
)
