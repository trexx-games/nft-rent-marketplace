import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import NextLink from 'next/link';
import { HiHome } from 'react-icons/hi';
import { GiLockedChest } from 'react-icons/gi';
import {
  Link,
  Icon,
  Text,
  Box,
  Flex,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import {  useState } from 'react';

export function Navbar() {
  const [activeTab, setActiveTab] = useState('');
  const address = useAddress();

  return (
    <Box maxW={'85%'} m={'auto'} py={'14px'} px={'35px'}>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Link as={NextLink} href={'/'}>
          <Image
            objectFit="contain"
            src="/logo_bbg.png"
            obj
            alt="Logo"
            boxSize="80px"
            mr="20px"
            width={'100%'}
            minWidth={'80px'}
          />
        </Link>
        <Flex direction={'row'}>
          <Link
            as={NextLink}
            href={'/'}
            mx={2.5}
            fontFamily={'Bayon'}
            fontSize={'22'}
            color={activeTab === '/' ? '#FBAA0B' : undefined}
            textDecoration={activeTab === '/' ? 'underline' : undefined}
            onClick={() => setActiveTab('/')}
            _hover={{
              color: '#FBAA0B',
              textDecoration: 'underline',
              transition: 'color 0.2s',
            }}
          >
            <Icon as={HiHome} boxSize={7} />
          </Link>
          <Link
            as={NextLink}
            color={activeTab === '/pools' ? '#FBAA0B' : undefined}
            textDecoration={activeTab === '/pools' ? 'underline' : undefined}
            onClick={() => setActiveTab('/pools')}
            href={'/pools'}
            mx={2.5}
            fontFamily={'Bayon'}
            fontSize={'22'}
            _hover={{
              color: '#FBAA0B',
              textDecoration: 'underline',
              transition: 'color 0.2s',
            }}
          >
            <Text>Pools</Text>
          </Link>
          <Link
            as={NextLink}
            color={activeTab === '/inventory' ? '#FBAA0B' : undefined}
            textDecoration={
              activeTab === '/inventory' ? 'underline' : undefined
            }
            onClick={() => setActiveTab('/inventory')}
            href={'/inventory'}
            mx={2.5}
            fontFamily={'Bayon'}
            fontSize={'22'}
            _hover={{
              color: '#FBAA0B',
              textDecoration: 'underline',
              transition: 'color 0.2s',
            }}
          >
            <Text>Inventory</Text>
          </Link>
        </Flex>
        <Flex direction={'row'} alignItems={'center'}>
          <ConnectWallet style={{ fontFamily: 'Bayon' }} />
        </Flex>
      </Flex>
    </Box>
  );
}
