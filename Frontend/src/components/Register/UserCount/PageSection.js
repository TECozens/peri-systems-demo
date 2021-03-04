import {Flex, Heading, HStack, VStack} from "@chakra-ui/layout";
import {IconButton} from "@chakra-ui/react"
import React, {useMemo} from "react";
import {ChevronLeftIcon, ChevronRightIcon} from "@chakra-ui/icons";

const PageSection = props => {
    const nextPage = () => props.setPage(props.page + 1)
    const prevPage = () => props.setPage(props.page - 1)

    const isOnLastPage = () =>
        props.page >= props.maxPage;


    const atLastPage = useMemo(() => isOnLastPage(), [props.page])


    return (
        <VStack direction='column' w='100%' p={3} bg='#FFFFFC' alignItems='center' spacing={4} rounded={true}
                borderRadius={6}>
            <Flex alignItems='center' direction='column'>
                <Heading size={'md'}>Page</Heading>
                <Heading size={'3xl'}>{props.page}</Heading>
            </Flex>
            <HStack alignItems='center' spacing={4}>
                <IconButton colorScheme='yellow' disabled={props.page <= 1} icon={<ChevronLeftIcon/>} onClick={prevPage}/>
                <IconButton colorScheme='yellow' disabled={atLastPage} icon={<ChevronRightIcon/>} onClick={nextPage}/>
            </HStack>
        </VStack>
    )
}

export default PageSection;