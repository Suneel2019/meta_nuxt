const productRoutes = [
  {
    name: 'ProductDetail',
    path: '/product/info/:slug',
    component: 'pages/shared/product-page/ProductDetail'
  },
  {
    name: 'SearchProduct',
    path: '/search/products',
    component: 'pages/shared/product-page/SearchProduct'
  }
];

export default productRoutes;
