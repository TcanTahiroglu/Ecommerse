export const fetchRoles = () => {
    return (dispatch, getState) => {
      const { roles } = getState().client;
  
      // Eğer roller zaten yüklendiyse tekrar API'yi çağırma
      if (roles.length > 0) return;
  
      dispatch({ type: 'SET_FETCH_STATE', payload: 'FETCHING' });
  
      fetch('/api/roles')
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: 'SET_ROLES',
            payload: data,
          });
          dispatch({ type: 'SET_FETCH_STATE', payload: 'FETCHED' });
        })
        .catch((error) => {
          console.error('Error fetching roles:', error);
          dispatch({ type: 'SET_FETCH_STATE', payload: 'FAILED' });
        });
    };
  };
  