import axios from './../api/axios';

const addOrderSuccess = (order) => ({
  type: 'ADD_ORDER_SUCCESS',
  order
});

export const addOrder = (payload, history) => {
  return (dispatch) => {
    axios.post('orders', payload).then(
      (response) => {
        dispatch(addOrderSuccess(response.data));
        history.push('/');
      }
    );
  };
};
