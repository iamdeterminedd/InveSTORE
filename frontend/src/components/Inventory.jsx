import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthWrapper.jsx';
import axiosInstance from '../services/apiClient.js';
import DeleteItem from './DeleteItem.jsx';
import { useSnackbar } from 'notistack';

const columns = [
  {
    Header: 'Product Name',
    accessor: 'product_name',
  },
  {
    Header: 'Price',
    accessor: 'price',
  },
  {
    Header: 'Quantity',
    accessor: 'quantity',
  },
  {
    Header: 'Description',
    accessor: 'description',
  },
];

const Inventory = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { logoutUser } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('inventory/');
        setData(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request cancelled!');
        } else {
          enqueueSnackbar('Inventory: Something went wrong!', {
            variant: 'error',
          });
          console.error('Error occurred:', error);
          logoutUser();
        }
      }
    };

    const cancelToken = axios.CancelToken.source();

    fetchData();

    return () => {
      cancelToken.cancel();
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      await DeleteItem(id);
      enqueueSnackbar('Item Deleted!', {
        variant: 'success',
      });
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      enqueueSnackbar('Delete: Something went wrong!', {
        variant: 'error',
      });
      console.error('Deletion failed:', error);
    }
  };
  return (
    <Box p="20px">
      <NavLink to="/add/item">
        <Button
          leftIcon={<FaEdit />}
          color="white"
          size="md"
          bg="green.500"
          colorScheme="green"
          mb="10px"
        >
          NEW
        </Button>
      </NavLink>
      <Box bg="white">
        <Table variant="simple" color="gray">
          <Thead>
            <Tr bg="gray.100">
              {columns.map((column) => (
                <Th color="gray.700" key={column.accessor}>
                  {column.Header}
                </Th>
              ))}
              <Th color="gray.700"></Th>
            </Tr>
          </Thead>
          <Tbody color="gray.700">
            {data.map((row) => (
              <Tr key={row.id}>
                {columns.map((column) => (
                  <Td key={column.accessor}>
                    {column.accessor === 'price'
                      ? `₱${row[column.accessor]}`
                      : row[column.accessor]}
                  </Td>
                ))}
                <Td w="300px">
                  <Link to={`update/item/${row.id}`}>
                    <Button
                      size="sm"
                      p={4}
                      mr={3}
                      bg="green.500"
                      colorScheme="green"
                    >
                      Edit
                    </Button>
                  </Link>
                  <Button
                    p={2}
                    size="sm"
                    bg="red.500"
                    colorScheme="red"
                    onClick={() => handleDelete(row.id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Inventory;
