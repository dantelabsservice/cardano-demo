import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Text,
  Alert,
  AlertIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Card,
  CardHeader,
  CardBody,
  Heading,
  useToast,
  Spinner
} from '@chakra-ui/react';

const SkiTrailManager = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [selectedTrail, setSelectedTrail] = useState('');
  const [checkIns, setCheckIns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const trails = [
    { id: '1', name: 'Bunny Slope', difficulty: 'Beginner' },
    { id: '2', name: 'Bluebird Run', difficulty: 'Intermediate' },
    { id: '3', name: 'Black Diamond', difficulty: 'Expert' },
    { id: '4', name: 'Extreme Couloir', difficulty: 'Extreme' },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'green';
      case 'Intermediate': return 'blue';
      case 'Expert': return 'orange';
      case 'Extreme': return 'red';
      default: return 'gray';
    }
  };

  const handleCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!walletAddress || !selectedTrail) {
      toast({
        title: 'Missing information',
        description: 'Please enter wallet address and select a trail',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const selectedTrailData = trails.find(t => t.id === selectedTrail);
      
      const response = await fetch('/api/trails/checkin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress,
          trailId: selectedTrail,
          trailName: selectedTrailData?.name,
          difficulty: selectedTrailData?.difficulty
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: 'Success!',
          description: `Checked in to ${selectedTrailData?.name} successfully`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        // Add to check-ins history
        setCheckIns(prev => [{
          trail: selectedTrailData?.name,
          difficulty: selectedTrailData?.difficulty,
          timestamp: new Date().toLocaleString(),
          transactionId: data.data?.transactionId
        }, ...prev]);
        
        // Reset form
        setSelectedTrail('');
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to check in',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Connection Error',
        description: 'Failed to connect to server',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewHistory = async () => {
    if (!walletAddress) {
      toast({
        title: 'Wallet address required',
        description: 'Please enter your wallet address first',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/trails/history?walletAddress=${walletAddress}`);
      const data = await response.json();
      
      if (response.ok) {
        setCheckIns(data.data?.checkIns || []);
        toast({
          title: 'History loaded',
          description: `Found ${data.data?.checkIns?.length || 0} check-ins`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to load history',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Connection Error',
        description: 'Failed to fetch history',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Card variant="outlined" marginBottom={6}>
        <CardHeader>
          <Heading size="md">🏔️ Ski Trail Check-in</Heading>
          <Text color="gray.600">Check in to ski trails using your Cardano wallet address</Text>
        </CardHeader>
        
        <CardBody>
          <VStack spacing={4} align="stretch">
            {/* Wallet Input */}
            <FormControl>
              <FormLabel>🔗 Cardano Wallet Address</FormLabel>
              <Input
                type="text"
                placeholder="Enter your Cardano wallet address (e.g., addr_test1...)"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
            </FormControl>

            <Button
              onClick={handleViewHistory}
              isDisabled={!walletAddress || isLoading}
              colorScheme="gray"
              width="fit-content"
            >
              {isLoading ? <Spinner size="sm" /> : 'View My Check-in History'}
            </Button>

            {/* Check-in Form */}
            <form onSubmit={handleCheckIn}>
              <VStack spacing={4} align="stretch">
                <FormControl isRequired>
                  <FormLabel>🎿 Select Trail</FormLabel>
                  <Select
                    placeholder="Choose a trail..."
                    value={selectedTrail}
                    onChange={(e) => setSelectedTrail(e.target.value)}
                  >
                    {trails.map(trail => (
                      <option key={trail.id} value={trail.id}>
                        {trail.name} ({trail.difficulty})
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  type="submit"
                  isDisabled={!walletAddress || !selectedTrail || isLoading}
                  colorScheme="blue"
                  size="lg"
                  width="100%"
                >
                  {isLoading ? <Spinner size="sm" /> : '🚡 Check In to Trail'}
                </Button>
              </VStack>
            </form>
          </VStack>
        </CardBody>
      </Card>

      {/* Check-in History */}
      {checkIns.length > 0 && (
        <Card variant="outlined">
          <CardHeader>
            <Heading size="md">📋 Check-in History</Heading>
            <Text color="gray.600" fontSize="sm">
              for {walletAddress.slice(0, 10)}...{walletAddress.slice(-8)}
            </Text>
          </CardHeader>
          
          <CardBody>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Trail</Th>
                  <Th>Difficulty</Th>
                  <Th>Time</Th>
                  <Th>Transaction</Th>
                </Tr>
              </Thead>
              <Tbody>
                {checkIns.map((checkIn, index) => (
                  <Tr key={index}>
                    <Td fontWeight="medium">{checkIn.trail}</Td>
                    <Td>
                      <Badge colorScheme={getDifficultyColor(checkIn.difficulty)}>
                        {checkIn.difficulty}
                      </Badge>
                    </Td>
                    <Td fontSize="sm" color="gray.600">{checkIn.timestamp}</Td>
                    <Td>
                      <Text fontFamily="monospace" fontSize="xs">
                        {checkIn.transactionId}
                      </Text>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      )}
    </Box>
  );
};

export default SkiTrailManager;