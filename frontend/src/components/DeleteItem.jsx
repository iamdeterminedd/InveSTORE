import axiosInstance from '../services/apiClient';

const DeleteItem = async (id) => {
  try {
    await axiosInstance.delete(`inventory/product/${id}/`);
    return true;
  } catch (error) {
    console.log('Error occurred while deleting:', error);
    return false;
  }
};

export default DeleteItem;
