import useSWR from 'swr';
import { pageApi } from '../services/api';
import { Page } from '../types/page';

// 获取所有页面
export const usePages = () => {
  const { data, error, isLoading, mutate } = useSWR<Page[]>(
    'pages',
    pageApi.getAll
  );

  return {
    pages: data || [],
    isLoading,
    isError: error,
    mutate
  };
};

// 根据slug获取单个页面
export const usePage = (slug: string) => {
  const { data, error, isLoading, mutate } = useSWR<Page | null>(
    slug ? `page-${slug}` : null,
    () => pageApi.getBySlug(slug)
  );

  return {
    page: data,
    isLoading,
    isError: error,
    mutate
  };
};