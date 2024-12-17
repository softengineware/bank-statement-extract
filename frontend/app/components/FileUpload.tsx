'use client'

import { Box, Button, Text, useToast, VStack } from '@chakra-ui/react'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export function FileUpload() {
  const toast = useToast()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // TODO: Implement file upload logic
    console.log('Accepted files:', acceptedFiles)
    
    toast({
      title: 'Files received',
      description: `${acceptedFiles.length} files ready for processing`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }, [toast])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/csv': ['.csv'],
      'text/plain': ['.txt'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.tiff'],
    },
  })

  return (
    <VStack spacing={4} align="stretch">
      <Box
        {...getRootProps()}
        p={10}
        border="2px"
        borderStyle="dashed"
        borderColor={isDragActive ? 'blue.500' : 'gray.200'}
        borderRadius="lg"
        bg={isDragActive ? 'blue.50' : 'white'}
        cursor="pointer"
        transition="all 0.2s"
        _hover={{
          borderColor: 'blue.500',
          bg: 'blue.50',
        }}
      >
        <input {...getInputProps()} />
        <VStack spacing={2}>
          <Text textAlign="center">
            {isDragActive
              ? 'Drop the files here...'
              : 'Drag and drop files here, or click to select files'}
          </Text>
          <Text fontSize="sm" color="gray.500">
            Supports PDF, Excel, CSV, TXT, and image files
          </Text>
        </VStack>
      </Box>

      <Button size="lg" isFullWidth>
        Start Processing
      </Button>
    </VStack>
  )
}
