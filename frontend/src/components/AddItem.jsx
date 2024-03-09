import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/apiClient';
import { useSnackbar } from 'notistack';

const AddItem = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const initialPrice = '0.00';
  const initialQuantity = '0';
  const [values, setValues] = useState({
    product_name: '',
    price: initialPrice,
    quantity: initialQuantity,
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('inventory/', values);
      console.log(response);
      enqueueSnackbar('Item Added!', {
        variant: 'success',
      });
      setValues({
        ...values,
        product_name: '',
        price: initialPrice,
        quantity: initialQuantity,
        description: '',
      });
      navigate('/');
    } catch (error) {
      enqueueSnackbar('Add: Something went wrong!', { variant: 'error' });
      console.log(error);
    }

    console.log('Form submitted!');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <Box p="20px" mx="auto">
      <Box bg="whiteAlpha.700" maxW="100%" borderRadius={5}>
        <Box maxW="xl" bg="whiteAlpha.500" p="10px" borderRadius={5}>
          <form onSubmit={handleSubmit}>
            <Text fontSize="30px" as="b" padding={10}>
              New Item
            </Text>
            <VStack p={10} spacing={8}>
              <FormControl id="productName">
                <FormLabel fontSize="18px">Product Name</FormLabel>
                <Input
                  borderColor="gray.400"
                  type="text"
                  value={values.product_name}
                  name="productName"
                  size="lg"
                  onChange={(value) =>
                    setValues({ ...values, product_name: value.target.value })
                  }
                />
              </FormControl>
              <FormControl id="price">
                <FormLabel fontSize="18px">Price</FormLabel>
                <NumberInput
                  borderColor="gray.400"
                  value={values.price}
                  onChange={(value) => setValues({ ...values, price: value })}
                  min={0}
                  step={0.01}
                  defaultValue={0.0}
                  precision={2}
                  size="lg"
                  name="price"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl id="quantity">
                <FormLabel fontSize="18px">Quantity</FormLabel>
                <NumberInput
                  borderColor="gray.400"
                  value={values.quantity}
                  min={0}
                  name="quantity"
                  size="lg"
                  onChange={(value) =>
                    setValues({ ...values, quantity: value })
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl id="description">
                <FormLabel fontSize="18px">Description</FormLabel>
                <Textarea
                  borderColor="gray.400"
                  name="description"
                  value={values.description}
                  onChange={(value) =>
                    setValues({ ...values, description: value.target.value })
                  }
                />
              </FormControl>
              <HStack
                display="flex"
                justifyContent="flex-end"
                width="100%"
                spacing={5}
              >
                <Button size="md" type="submit" colorScheme="green">
                  Save
                </Button>
                <Button
                  size="md"
                  p={3}
                  colorScheme="red"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </HStack>
            </VStack>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default AddItem;
