export interface Product {
  title: string;
  link: string;
  image: string;
  lprice: string; // 최저가, string으로 제공됨
  hprice: string; // 최고가
  mallName: string;
  productId: string;
}
