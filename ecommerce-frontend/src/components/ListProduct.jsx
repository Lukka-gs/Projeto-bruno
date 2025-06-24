import React, { useEffect, useState } from "react";
import { Container, Grid, Card, CardMedia, CardContent, CardActions, Typography, Button, CircularProgress, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ListProduct({ onAddToCart, onEditProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = () => {
    setLoading(true);
    fetch('http://localhost:3001/produtos')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao obter a lista de produtos:", error);
        setLoading(false);
      });
  };

  const deletarProduto = (product) => {
    const requestOptions = {
      method: 'DELETE'
    };
    fetch(`http://localhost:3001/produtos/${product.id}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Falha ao deletar produto');
        }
        getProducts();
      })
      .catch(error => console.error("Erro ao deletar produto:", error));
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Carregando produtos...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Catálogo de Produtos
      </Typography>
      <Grid container spacing={4}>
        {products.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h6" align="center" color="text.secondary">
              Nenhum produto cadastrado.
            </Typography>
          </Grid>
        ) : (
          products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={product.foto || 'https://via.placeholder.com/200?text=Sem+Imagem'}
                  alt={product.nome}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.nome}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    R$ {Number(product.preco || 0).toFixed(2)}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                  <Box>
                    <IconButton aria-label="editar" onClick={() => onEditProduct(product)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="deletar" onClick={() => deletarProduto(product)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => onAddToCart(product)}
                  >
                    Adicionar ao Carrinho
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}