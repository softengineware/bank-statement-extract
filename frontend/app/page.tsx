import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react'
import { FileUpload } from './components/FileUpload'

export default function Home() {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>
            Bank Statement Extractor
          </Heading>
          <Text fontSize="xl" color="gray.600">
            Upload your bank statements for automated data extraction and analysis
          </Text>
        </Box>
        
        <FileUpload />
      </VStack>
    </Container>
  )
}
