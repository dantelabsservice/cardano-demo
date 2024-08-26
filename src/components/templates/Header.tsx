import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'

function Header() {
  return (
    <Flex as="header" bgColor="primary" w="100%" px="lg" py="sm">
        <Heading as="h1" size="md" color="white">Ski Trip Manager</Heading>
    </Flex>
  )
}

export default Header