import React, { useEffect, useState } from 'react';
import './App.css';
import './index.css';

import { AppBar, Toolbar, Typography, Button, Box, Snackbar, Alert } from '@mui/material';

import ListProduct from './components/ListProduct.jsx';
import ShoppingCart from './components/ShoppingCart';
import RegisterProduct from './components/RegisterProduct.jsx';
import Login from './components/Login.jsx';

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const [currentPage, setCurrentPage] = useState(loggedIn ? 'listProducts' : 'login');
  const [cart, setCart] = useState(null);
  const [selectedProductForEdit, setSelectedProductForEdit] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const createShoppingCart = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3001/carrinho-de-compras', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Falha ao criar carrinho');
        }
        return response.json();
      })
      .then(data => setCart(data))
      .catch(error => {
        console.error("Erro ao criar carrinho:", error);
        setSnackbarMessage('Erro ao iniciar o carrinho.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const fetchShoppingCart = (cartId) => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:3001/carrinho-de-compras/${cartId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Falha ao obter carrinho');
        }
        return response.json();
      })
      .then(data => setCart(data))
      .catch(error => {
        console.error('Erro ao obter carrinho:', error);
        setSnackbarMessage('Erro ao atualizar o carrinho.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const handleAddToCartApp = (product) => {
    if (!cart || !cart.id) {
      setSnackbarMessage('Carrinho não inicializado. Tente novamente.');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }

    const payload = {
      produtoId: product.id,
      carrinhoId: cart.id,
      quantidade: 1,
    };

    const token = localStorage.getItem('token');
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      })
    };

    fetch(`http://localhost:3001/carrinho-produtos`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Falha ao adicionar produto ao carrinho');
        }
        return response.json();
      })
      .then(() => {
        fetchShoppingCart(cart.id);
        setSnackbarMessage(`"${product.nome}" adicionado ao carrinho!`);
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      })
      .catch(error => {
        console.error("Erro ao adicionar produto ao carrinho:", error);
        setSnackbarMessage('Erro ao adicionar produto ao carrinho.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const handleRemoveFromCartApp = (cartItemId) => {
    if (!cart || !cart.id) {
      setSnackbarMessage('Carrinho não inicializado.');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }

    const token = localStorage.getItem('token');
    const requestOptions = {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    };

    fetch(`http://localhost:3001/carrinho-produtos/${cartItemId}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Falha ao remover item do carrinho');
        }
        return response.text().then(text => text ? JSON.parse(text) : {});
      })
      .then(() => {
        fetchShoppingCart(cart.id);
        setSnackbarMessage('Item removido do carrinho.');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      })
      .catch(error => {
        console.error("Erro ao remover item do carrinho:", error);
        setSnackbarMessage('Erro ao remover item do carrinho.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };


  const handleProductEditRequest = (product) => {
    setSelectedProductForEdit(product);
    setCurrentPage('registerProduct');
  };

  const handleProductRegisteredOrEdited = () => {
    setSelectedProductForEdit(null);
    setCurrentPage('listProducts');
    setSnackbarMessage('Produto salvo com sucesso!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleLoggedIn = () => {
    setLoggedIn(true);
    setCurrentPage('listProducts');
  };

  useEffect(() => {
    if (loggedIn) {
      createShoppingCart();
    }
  }, [loggedIn]);

  const renderContent = () => {
    switch (currentPage) {
      case 'login':
        return <Login onLoggedIn={handleLoggedIn} />;
      case 'listProducts':
        return <ListProduct onAddToCart={handleAddToCartApp} onEditProduct={handleProductEditRequest} />;
      case 'shoppingCart':
        return <ShoppingCart cart={cart} onRemoveItem={handleRemoveFromCartApp} />;
      case 'registerProduct':
        return <RegisterProduct selectedProduct={selectedProductForEdit} onProductSaved={handleProductRegisteredOrEdited} />;
      default:
        return <Login onLoggedIn={handleLoggedIn} />;
    }
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
            <img
              src="/SilhuetaArarinha.png"
              alt="Logo"
              style={{ height: 40, marginRight: 16 }}
            />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Meu Ecommerce
            </Typography>

          {loggedIn && (
            <>
              <Button color="inherit" onClick={() => setCurrentPage('listProducts')}>
                Produtos
              </Button>
              <Button color="inherit" onClick={() => setCurrentPage('shoppingCart')}>
                Meu Carrinho
              </Button>
              <Button color="inherit" onClick={() => {
                setSelectedProductForEdit(null);
                setCurrentPage('registerProduct');
              }}>
                Registrar Produto
              </Button>
              <Button color="inherit" onClick={() => {
                localStorage.removeItem('token');
                setLoggedIn(false);
                setCurrentPage('login');
              }}>
                Sair
              </Button>
            </>
          )}
          {!loggedIn && (
            <Button color="inherit" onClick={() => setCurrentPage('login')}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        {renderContent()}
      </Box>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;