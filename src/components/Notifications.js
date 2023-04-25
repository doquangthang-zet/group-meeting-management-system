import React from 'react';
import {Card, CardBody, Text, CardHeader, Heading, IconButton} from "@chakra-ui/react"
import {CheckIcon, CloseIcon} from "@chakra-ui/icons"
import {BsCheck2} from "react-icons/bs";
import {IoMdClose} from "react-icons/io";

const Notifications = () => {
    return (
        <div>
            <Card m="1.5em" borderRadius={20} size="sm">
                <CardHeader>
                    <Heading size="sm" ml="0.5em">Han Nguyen</Heading>
                </CardHeader>
                <CardBody mt="-1em">
                    <Text ml="0.5em">@hannguyen wanted to join your group!
                        <IconButton float="right" mr="1em" mt="-1.25em" variant="ghost" icon={<IoMdClose  size="2em" color="#E48181" />} />
                        <IconButton float={"right"} mt="-1.25em" variant="ghost" icon={<BsCheck2 float="right"  size="2em" color="#306643"/>} />
                    </Text>
                </CardBody>
            </Card>
            <Card m="1.5em" borderRadius={20} size="sm">
                <CardHeader>
                    <Heading size="sm" ml="0.5em">Hula Nguyen</Heading>
                </CardHeader>
                <CardBody mt="-1em">
                    <Text ml="0.5em">@hula wanted to join your group!
                        <IconButton float="right" mr="1em" mt="-1.25em" variant="ghost" icon={<IoMdClose size="2em" color="#E48181" />} />
                        <IconButton float={"right"} mt="-1.25em" variant="ghost" icon={<BsCheck2 float="right"  size="2em" color="#306643"/>} />
                    </Text>
                </CardBody>
            </Card>
            <Card m="1.5em" borderRadius={20} size="sm">
                <CardHeader>
                    <Heading size="sm" ml="0.5em">Thang</Heading>
                </CardHeader>
                <CardBody mt="-1em">
                    <Text ml="0.5em">@misan wanted to join your group!
                        <IconButton float="right" mr="1em" mt="-1.25em" variant="ghost" icon={<IoMdClose size="2em" color="#E48181" />} />
                        <IconButton float={"right"} mt="-1.25em" variant="ghost" icon={<BsCheck2 float="right"  size="2em" color="#306643"/>} />
                    </Text>
                </CardBody>
            </Card>
        </div>
    );
}

export default Notifications;
