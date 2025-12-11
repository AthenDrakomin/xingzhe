import useSWR from 'swr';
import { articleApi } from '../services/api';
import { Article } from '../types/article';

// 获取所有文章
export const useArticles = () => {
  const { data, error, isLoading, mutate } = useSWR<Article[]>(
    'articles',
    articleApi.getAll
  );

  return {
    articles: data || [],
    isLoading,
    isError: error,
    mutate
  };
};

// 根据slug获取单篇文章
export const useArticle = (slug: string) => {
  const { data, error, isLoading, mutate } = useSWR<Article | null>(
    slug ? `article-${slug}` : null,
    () => articleApi.getBySlug(slug)
  );

  return {
    article: data,
    isLoading,
    isError: error,
    mutate
  };
};