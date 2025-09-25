"use client";

import { useState } from 'react';
import { useProducts } from '@/hooks/productHooks/useProducts';
import Image from "next/image";

export default function ProductListComponent() {
  const [searchTerm, setSearchTerm] = useState('강아지 간식'); // 기본 검색어
  const { data: products, isLoading, isError, error } = useProducts(searchTerm);

  if (isLoading) return <div>상품을 검색 중입니다...</div>;
  if (isError) return <div>에러 발생: {error?.message}</div>;

  return (
    <div className="p-20">
      <h1 className="text-2xl font-bold mb-4">{searchTerm} 검색 결과</h1>

      <div className="mb-6">
        <input
          type="text"
          defaultValue={searchTerm}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setSearchTerm(e.currentTarget.value);
            }
          }}
          className="border p-2 rounded"
          placeholder="검색어를 입력하세요"
        />
        <button
          onClick={() => setSearchTerm((document.querySelector('input') as HTMLInputElement).value)}
          className="bg-blue-500 text-white p-2 rounded ml-2"
        >
          검색
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product, index) => ( // 👈 map 함수에서 index를 받아옵니다.
          <div key={product.productId} className="rounded-lg overflow-hidden shadow-lg">
            <a href={product.link} target="_blank" rel="noopener noreferrer">
              <div className="relative w-full h-48">
                <Image
                  src={product.image}
                  alt={product.title.replace(/<[^>]*>?/gm, '')}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                  priority={index < 4}
                />
              </div>

              <div className="p-4">
                <h2
                  className="text-lg font-semibold truncate"
                  dangerouslySetInnerHTML={{__html: product.title}} // API가 HTML 태그를 포함하므로 사용
                />
                <p className="text-gray-600 mt-1">{product.mallName}</p>
                <p className="text-xl font-bold mt-2 text-red-500">{Number(product.lprice).toLocaleString()}원</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
