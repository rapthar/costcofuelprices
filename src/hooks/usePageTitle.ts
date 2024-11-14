import { useEffect } from 'react';
import { setMetaTitle, setMetaDescription } from '../utils/meta';

export const usePageTitle = (title: string, description?: string) => {
  useEffect(() => {
    setMetaTitle(title);
    if (description) {
      setMetaDescription(description);
    }
  }, [title, description]);
};