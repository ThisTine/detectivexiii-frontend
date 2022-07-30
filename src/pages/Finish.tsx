import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Avatar, Box, Flex, Text, useBreakpointValue } from "@chakra-ui/react"
import BoxContainer from "../components/BoxContainer"
import PrimaryButton from "../components/PrimaryButton"
import userContext from "../context/userContext"
import getImageUrl from "../functions/getImageUrl"
import AppLayout from "../layouts/AppLayout"

type User = { name: string; img: { type: "Buffer"; data: number[] } | null }

type CarouselCompProp = {
    users: User[]
}

const CarouselComp = (props: CarouselCompProp) => {
    const [render, setRender] = useState(true)

    useEffect(() => {
        setRender(false)
    }, [props])

    useEffect(() => {
        setRender(true)
    }, [!render])

    return render ? (
        <Carousel
            show={1}
            slide={1}
            dynamic={true}
            swiping={true}
            swipeOn={0.5}
            leftArrow={
                <Flex height="calc(100% - 90px)" alignItems="center" position="relative">
                    <Box rounded="full" bgColor="white" shadow="xl" position="absolute" left={-4} zIndex={100} cursor="pointer">
                        <ChevronLeftIcon fontSize="4xl" />
                    </Box>
                </Flex>
            }
            rightArrow={
                <Flex height="calc(100% - 90px)" alignItems="center" position="relative">
                    <Box rounded="full" bgColor="white" shadow="xl" position="absolute" right={-4} zIndex={100} cursor="pointer">
                        <ChevronRightIcon fontSize="4xl" />
                    </Box>
                </Flex>
            }
        >
            {props.users.map((user, index) => (
                <Flex key={index} padding={5} direction="column" alignItems="center" gap={4}>
                    <Avatar
                        width="210"
                        height="210"
                        name={user.name}
                        src={getImageUrl(user.img?.data)}
                        boxShadow="0px 4px 15px rgba(0, 0, 0, 0.25)"
                    />
                    <Box
                        backgroundColor="#FFFFFF"
                        border="0.5px solid rgba(0, 0, 0, 0.23)"
                        boxShadow="0px 4px 15px rgba(0, 0, 0, 0.25)"
                        borderRadius="full"
                        py="3"
                        px="6"
                    >
                        <Text textAlign="center" color="mainBtn.700" fontWeight={500} fontSize="17px" textTransform="uppercase">
                            {user.name}
                        </Text>
                    </Box>
                </Flex>
            ))}
        </Carousel>
    ) : (
        <></>
    )
}

const Finish = () => {
    const avatarSize = useBreakpointValue({ base: "190px", md: "220px" })
    const avatarInset = useBreakpointValue({ base: "90px", md: "120px" })

    const {
        partner: { partners },
        user: { partnerCount },
    } = useContext(userContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (!partners.length) {
            navigate("/", { replace: true })
        }
    }, [navigate, partners])

    return (
        <AppLayout>
            <BoxContainer
                Button={
                    partnerCount - 1 > partners.length && (
                        <Link to={"/"}>
                            <PrimaryButton>Find one more</PrimaryButton>
                        </Link>
                    )
                }
            >
                <Flex direction="column" alignItems="center" maxHeight="calc(100vh - 240px)" gap="6">
                    <Text fontSize="4xl" fontWeight="bold" color="mainBtn.900">
                        Congratulation!
                    </Text>
                    <Text fontSize="xl" color="mainBtn.700">
                        Your match is:
                    </Text>
                    {partners.user.length > 1 ? (
                        <Box position="relative" width="100%" maxWidth="390px" minWidth="350px" height={`calc(${avatarSize!} + ${avatarInset!})`}>
                            <Avatar
                                position="absolute"
                                top="0"
                                left="10px"
                                width={avatarSize}
                                height={avatarSize}
                                name={partners.user[0].name}
                                src={getImageUrl(partners.user[0].img.data)}
                                boxShadow="0px 4px 15px rgba(0, 0, 0, 0.25)"
                            />
                            <Avatar
                                position="absolute"
                                top={avatarInset}
                                right="10px"
                                width={avatarSize}
                                height={avatarSize}
                                name={partners.user[0].name}
                                src={getImageUrl(partners.user[1].img.data)}
                                boxShadow="0px 4px 15px rgba(0, 0, 0, 0.25)"
                            />
                        </Box>
                    ) : (
                        <Avatar
                            width="210"
                            height="210"
                            name={partners.user[0].name}
                            src={getImageUrl(partners.user[0].img.data)}
                            boxShadow="0px 4px 15px rgba(0, 0, 0, 0.25)"
                        />
                    )}
                    <Flex direction={["column", "row"]} gap={2}>
                        {partners.user.map((user, index) => (
                            <Box
                                backgroundColor="#FFFFFF"
                                border="0.5px solid rgba(0, 0, 0, 0.23)"
                                boxShadow="0px 4px 15px rgba(0, 0, 0, 0.25)"
                                borderRadius="full"
                                py="3"
                                px="6"
                            >
                                <Text textAlign="center" color="mainBtn.700" fontWeight={500} fontSize="17px" textTransform="uppercase">
                                    {user.name}
                                </Text>
                            </Box>
                        ))}
                    </Flex>
                </Flex>
            </BoxContainer>
        </AppLayout>
    )
}

export default Finish
