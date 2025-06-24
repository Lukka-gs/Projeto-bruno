import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Button, Divider, Box, CircularProgress, Snackbar, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ShoppingCart({ cart, onRemoveItem }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const getCartItems = () => {
    if (!cart || !cart.id) return;
    setLoading(true);
    fetch(`http://localhost:3001/carrinho-de-compras/${cart.id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Falha ao carregar carrinho');
        }
        return response.json();
      })
      .then(data => {
        setCartItems(data.produtos || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao obter a lista de produtos no carrinho:", error);
        setLoading(false);
        setSnackbarMessage('Erro ao carregar itens do carrinho.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const handleRemoveFromCart = (productId) => {
    if (onRemoveItem) {
      onRemoveItem(productId);
    }
  };

  const finishCart = () => {
    if (!cart || !cart.id) return;
    setLoading(true);

    fetch(`http://localhost:3001/carrinho-de-compras/${cart.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: 'finalizado' }),
    })
      .then((response) => {
        if (response.status === 200 || response.status === 204) {
          setSnackbarMessage('Compra finalizada com sucesso!');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
          setCartItems([]);
          setLoading(false);
        } else {
          throw new Error('Falha ao finalizar a compra');
        }
      })
      .catch((error) => {
        console.error('Erro ao finalizar a compra:', error);
        setSnackbarMessage('Erro ao finalizar a compra.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        setLoading(false);
      });
  };

  const calculateTotal = () => {
    if (!cartItems || cartItems.length === 0) return '0.00';
    return cartItems.reduce((accumulator, item) => accumulator + (item.produto.preco * item.quantidade_produto_adicionada), 0).toFixed(2);
  };

  useEffect(() => {
    getCartItems();
  }, [cart]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Carregando carrinho...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Meu Carrinho de Compras
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" color="text.secondary" align="center" sx={{ mt: 4 }}>
          Seu carrinho está vazio.
        </Typography>
      ) : (
        <List sx={{ bgcolor: 'background.paper', borderRadius: 1, p: 2 }}>
          {cartItems.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem>
                <ListItemText
                  primary={<Typography variant="h6">{item.produto.nome}</Typography>}
                  secondary={`R$ ${item.produto.preco.toFixed(2)} x ${item.quantidade_produto_adicionada}`}
                />
                <Typography variant="body1" sx={{ minWidth: '80px', textAlign: 'right' }}>
                  R$ {(item.produto.preco * item.quantidade_produto_adicionada).toFixed(2)}
                </Typography>
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFromCart(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, mr: 2 }}>
            <Typography variant="h5">
              Total: R$ {calculateTotal()}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={finishCart}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Finalizar Compra'}
            </Button>
          </Box>
        </List>
      )}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}