import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types/product';

const fetchProducts = async (query: string): Promise<Product[]> => {
  if (!query) {
    return [];
  }

  const response = await fetch(`/api/products?query=${query}`);

  if (!response.ok) {
    throw new Error('네트워크 응답이 올바르지 않습니다.');
  }

  return response.json();
};

export function useProducts(query: string) {
  return useQuery({
    queryKey: ['products', query],
    queryFn: () => fetchProducts(query),
    enabled: !!query,
  });
}
