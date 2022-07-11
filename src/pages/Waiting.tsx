import { Box, Flex, Input, Text } from '@chakra-ui/react'
import { useState } from 'react'
import BoxContainer from '../components/BoxContainer'
import PrimaryButton from '../components/PrimaryButton'
import AppLayout from '../layouts/AppLayout'
import { useToast } from '@chakra-ui/react'
import {
  FormControl,
} from '@chakra-ui/react'

type year = 1 | 2


// func submit
// oncilck use func submit


const Waiting = () => {
  const [year] = useState<year>(1)
  const [code, setCode] = useState('');
  const toast = useToast()

  function Submit(e: any) {
    alert(`Your Code: ${code}`)
    e.prepentDefault()

  }
  const Error = (text: string) => {
    toast({
      title: 'Error.',
      description: text,
      status: 'error',
      duration: 9000,
      position: 'top-right',
      isClosable: true,
    })
  }

  return (
    <div>
      <AppLayout>

        {year === 1 ? // Wating Page year 1
          <BoxContainer Button={<PrimaryButton onClick={Submit}>Pair</PrimaryButton>} >
            <Flex align="center" justify="center" flexDirection={["column"]} >
              <Box mb={10}>
                <Text
                  fontSize={40}
                  color={'#AD89FF'}
                  textAlign={['center']}>
                  ADD CODE
                </Text>
              </Box>
              <Box >
                <FormControl as='form' onSubmit={(e) => Submit(e)} borderColor={"#A37BFF"} >
                  <Input
                    id='CODE'
                    width='auto'
                    p={6}
                    bg='whiteAlpha.500'
                    boxShadow='lg'
                    borderRadius={60}
                    placeholder='PUT CODE HERE'
                    _placeholder={{ color: '#A37BFF' }}
                    textColor={'#A37BFF'}
                    onChange={(e) => setCode(e.target.value)}
                    textAlign={['center']} />
                </FormControl>
              </Box>
            </Flex>



          </BoxContainer> : // Wating Page year 2

          <BoxContainer>
            <Flex align="center" justify="center" flexDirection={["column"]} >
              <Box mb={10}>
                <Text
                  fontSize={40}
                  color={'#AD89FF'}
                  textAlign={['center']}>
                  STATUS
                </Text>
              </Box>
              <Box mb={20} bg='whiteAlpha.500' width='50%' boxShadow='lg' border={"1px solid #A37BFF"} borderRadius={50} p={4} color='white'>
                <Text
                  fontSize={24}
                  color={'#AD89FF'}
                  textAlign={['center']}>
                  Pairing...
                </Text>
              </Box>
            </Flex>
          </BoxContainer>}
      </AppLayout>

    </div>
  )
}

export default Waiting