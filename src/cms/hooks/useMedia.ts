import useSWR from 'swr';
import { mediaApi } from '../services/api';
import { Media } from '../types/media';

// 获取所有媒体
export const useMedia = () => {
  const { data, error, isLoading, mutate } = useSWR<Media[]>(
    'media',
    mediaApi.getAll
  );

  return {
    media: data || [],
    isLoading,
    isError: error,
    mutate
  };
};