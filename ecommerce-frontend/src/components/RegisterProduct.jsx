import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, CircularProgress } from '@mui/material';

export default function RegisterProduct({ selectedProduct, onProductSaved }) {
  const [productData, setProductData] = useState({
    id: null,
    nome: '',
    preco: '',
    quantidade: '',
    foto: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setProductData({
        id: selectedProduct.id,
        nome: selectedProduct.nome || '',
        preco: selectedProduct.preco || '',
        quantidade: selectedProduct.quantidade || '',
        foto: selectedProduct.foto || '',
      });
    } else {
      setProductData({
        id: null,
        nome: '',
        preco: '',
        quantidade: '',
        foto: '',
      });
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const isEditing = productData.id !== null;
    const urlPOST = 'http://localhost:3001/produtos';
    const urlPATCH = `http://localhost:3001/produtos/${productData.id}`;
    const url = isEditing ? urlPATCH : urlPOST;
    const method = isEditing ? 'PATCH' : 'POST';

    const payload = {
      nome: productData.nome,
      preco: parseFloat(productData.preco),
      quantidade: parseInt(productData.quantidade),
      foto: productData.foto,
    };

    fetch(url, {
      method: method,
      body: JSON.stringify(payload),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Falha ao salvar produto');
        }
        return response.json();
      })
      .then(data => {
        setLoading(false);
        onProductSaved();
      })
      .catch(error => {
        console.error("Erro ao salvar produto:", error);
        setLoading(false);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        {selectedProduct ? 'Editar Produto' : 'Registrar Novo Produto'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Nome do Produto"
          name="nome"
          value={productData.nome}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Preço"
          name="preco"
          value={productData.preco}
          onChange={handleChange}
          fullWidth
          required
          type="number"
          inputProps={{ step: "0.01" }}
        />
        <TextField
          label="Quantidade"
          name="quantidade"
          value={productData.quantidade}
          onChange={handleChange}
          fullWidth
          required
          type="number"
        />
        <TextField
          label="URL da Imagem do Produto"
          name="foto"
          value={productData.foto}
          onChange={handleChange}
          fullWidth
          type="url"
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="outlined" color="secondary" onClick={onProductSaved}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : (selectedProduct ? 'Salvar Alterações' : 'Confirmar Registro')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}