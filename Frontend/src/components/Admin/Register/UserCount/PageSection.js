import {Box, Flex, Heading, HStack, VStack} from "@chakra-ui/layout";
import {IconButton} from "@chakra-ui/react"
import React, {useEffect, useMemo} from "react";
import {ChevronLeftIcon, ChevronRightIcon} from "@chakra-ui/icons";
import {useDisclosure} from "@chakra-ui/hooks";
import {SlideFade} from "@chakra-ui/transition";
import {motion} from "framer-motion"

const PageSection = props => {
    const nextPage = () => props.setPage(props.page + 1)
    const prevPage = () => props.setPage(props.page - 1)

    const {isOpen, onOpen} = useDisclosure()

    useEffect(() => {
        onOpen()
    })

    return (
        <VStack direction='column' w='100%' p={3} bg='#FFFFFC' alignItems='center' spacing={4} rounded={true}
                borderRadius={6}>
            {/*<motion.div animate={{ scale: [0, 1] }}*/}
            {/*            transition={{ duration: 0.5 }}>*/}
            {/*    <Box bg='red' p={10}>*/}
            {/*        Hello*/}
            {/*    </Box>*/}
            {/*</motion.div>*/}
            <Flex alignItems='center' direction='column'>
                <Heading size={'md'}>Page</Heading>
                <HStack alignItems='center'>
                    <Heading size={'3xl'}>{props.page}</Heading>
                    <Heading size={'xl'} color='grey'>/{props.maxPage}</Heading>
                </HStack>
            </Flex>
            <HStack alignItems='center' spacing={4}>
                <IconButton isLoading={props.isLoading} colorScheme='yellow' disabled={props.page <= 1 || props.isLoading} icon={<ChevronLeftIcon/>} onClick={prevPage}/>
                <IconButton isLoading={props.isLoading} colorScheme='yellow' disabled={props.page >= props.maxPage || props.isLoading} icon={<ChevronRightIcon/>} onClick={nextPage}/>
            </HStack>
        </VStack>
    )
}

export default PageSection;