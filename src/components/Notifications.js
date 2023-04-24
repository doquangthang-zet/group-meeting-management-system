import React from 'react';
import {Card, CardBody, Text, CardHeader, Heading, Spacer, Flex} from "@chakra-ui/react"
import {CheckIcon, CloseIcon} from "@chakra-ui/icons"

const Notifications = () => {
    return (
        <div>
            <Card m="2em" borderRadius={20}>
                <CardHeader>
                    <Heading size="md">Han Nguyen</Heading>
                </CardHeader>
                <CardBody mt="-2em">
                    <Text>@hannguyen wanted to join your group!
                        <CloseIcon float="right" boxSize={6} color="#E48181" mr="1em"/>
                        <CheckIcon  float="right" boxSize={6} ml='2em' mr="2em" color="#306643"/>
                    </Text>
                </CardBody>
            </Card>
            <Card m="2em" borderRadius={20}>
                <CardHeader>
                    <Heading size="md">Hula Nguyen</Heading>
                </CardHeader>
                <CardBody mt="-2em">
                    <Text>@hula wanted to join your group!
                        <CloseIcon float="right" boxSize={6} color="#E48181" mr="1em"/>
                        <CheckIcon  float="right" boxSize={6} ml='2em' mr="2em" color="#306643"/>
                    </Text>
                </CardBody>
            </Card>
            <Card m="2em" borderRadius={20}>
                <CardHeader>
                    <Heading size="md">Thang</Heading>
                </CardHeader>
                <CardBody mt="-2em">
                    <Text>@misan wanted to join your group!
                        <CloseIcon float="right" boxSize={6} color="#E48181" mr="1em"/>
                        <CheckIcon  float="right" boxSize={6} ml='2em' mr="2em" color="#306643"/>
                    </Text>
                </CardBody>
            </Card>
        </div>
    );
}

export default Notifications;
