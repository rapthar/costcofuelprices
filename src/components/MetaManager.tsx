import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { setMetaDescription, setMetaTitle, getDefaultDescription, getDefaultTitle } from '../utils/meta';

const MetaManager: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    setMetaDescription(getDefaultDescription(path));
    setMetaTitle(getDefaultTitle(path));
  }, [location]);

  return null;
};

export default MetaManager;