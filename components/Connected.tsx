import { FC, /* MouseEventHandler, useCallback */ } from "react"
import {
  Button,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react"
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { FetchCandyMachine } from "./FetchCandyMachine"
// import { useRouter } from "next/router"
// import { useConnection, useWallet } from "@solana/wallet-adapter-react";
// import {Metaplex} from "@metaplex-foundation/js";
// import { PublicKey } from "@solana/web3.js";

const Connected: FC = () => {
  // const router = useRouter();
  // const {connection} = useConnection();
  // const {publicKey, sendTransaction} = useWallet();

  // const candyMachine_address = PublicKey.from("TODO");
  // const metaplex = Metaplex.make(connection);

  // let candyMachine = await metaplex
  //   .candyMachines().findByAddress({
  //     address: candyMachine_address
  //   });
  
  // const handleClick: MouseEventHandler<HTMLButtonElement> = 
  //   useCallback(
  //     async (event) => {
  //       if (event.defaultPrevented) {return;}
  //       if (!publicKey || !candyMachine) {return;}
  //     },
  //     []
  //   );

  return (
    <VStack spacing={20}>
      <Container>
        <VStack spacing={8}>
          <Heading
            color="white"
            as="h1"
            size="2xl"
            noOfLines={1}
            textAlign="center"
          >
            Welcome Buildoor.
          </Heading>

          <Text color="bodyText" fontSize="xl" textAlign="center">
            Each buildoor is randomly generated and can be staked to receive
            <Text as="b"> $BLD</Text> Use your <Text as="b"> $BLD</Text> to
            upgrade your buildoor and receive perks within the community!
          </Text>
        </VStack>
      </Container>

      <HStack spacing={10}>
        <Image src="avatar1.png" alt="" />
        <Image src="avatar2.png" alt="" />
        <Image src="avatar3.png" alt="" />
        <Image src="avatar4.png" alt="" />
        <Image src="avatar5.png" alt="" />
      </HStack>

      {/* <Button bgColor="accent" color="white" maxW="380px">
        <HStack>
          <Text>mint buildoor</Text>
          <ArrowForwardIcon />
        </HStack>
      </Button> */}
      <FetchCandyMachine />
    </VStack>
  )
}

export default Connected
