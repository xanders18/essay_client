import React, { useEffect, useState } from 'react'
import { compose } from 'redux'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Sidebar from '../../../../Components/Sidebar/sidebar'
import { Body, Sub, Header } from '../../style.route'

import { getImg } from '../../../../Constants/get-img'

import { get_booking_user, update_booking_user } from '../../../../Redux/management/management.action'
import { chats_send_message } from '../../../../Redux/features/features.action'

import { pullToken, pullUserData } from '../../../../Redux/auth/auth.selector'
import { storage } from '../../../../Constants/request'

import { FaMoneyCheck, FaMapMarkerAlt } from 'react-icons/fa'
import { GiSandsOfTime } from 'react-icons/gi'
import { useAlert } from "react-alert";

import {
    Container,
    Table,
    Row,
    Content,
    ActionBox,
    StatusBox,
    Modal,
    ModalContent
} from './style'

const UserBookingDashboard = props => {
    const header = ['No.', 'Agency', 'Tours', 'Price', 'Start Date', 'Confirmation', 'Status']
    const [data, setData] = useState('')
    const [refetch, setRefetch] = useState(false)
    const alert = useAlert()

    useEffect(() => {
        const req = async () => {
            const get = await props.get_booking_user()            
            setData(get.data)
        }
        req()
    }, [])

    const updateHandler = async (id, tours_id) => {
        let booking_tours_name, index

        let new_data = data.map((booking, i) => {
            if (booking.id === id) {
                booking.is_payed = true
                booking_tours_name = booking.ads_title
                index = i
                return booking
            }
            return booking
        })

        const dataToSubmit = {
            booking_id: id,
            tours_id: tours_id,
            action: 'update'
        }

        // const post = await props.update_booking_user({ form: dataToSubmit })

        // if (!post.err) {
        //     alert.success(`Sucessfully update ${booking_tours_name}!`)
        // } else {
        //     alert.error(post.err)
        // }

        const msgData = {
            sender_id: props.user.id,
            receiver_id: data[index].receiver_id,
            content: `Cool! now you can go to payment process!`,
            notification: data[index].tours_id
        }
        console.log(msgData)

        // const send = await props.chats_send_message({
        //     form: msgData,
        //     token: storage.token
        // })

        // if (!post.err) {
        //     setRefetch(!refetch)
        // }
        setData(new_data)
    }

    const deleteHandler = async (id) => {
        let booking_tours_name, index

        let new_data = data.map((booking, i) => {
            if (booking.id === id) {
                booking_tours_name = booking.ads_title
                index = i
                return null
            }
            return booking
        }).filter(res => res !== null)

        const dataToSubmit = {
            booking_id: id,
            action: 'delete'
        }
        const post = await props.update_booking_user({ form: dataToSubmit })

        if (!post.err) {
            alert.success(`Sucessfully Reject ${booking_tours_name}!`)
        } else {
            alert.error(post.err)
        }

        const msgData = {
            sender_id: props.user.id,
            receiver_id: data[index].receiver_id,
            content: `${props.user.username} cancelled ${data[index].product_name}`,
            notification: null
        }

        // const send = await props.chats_send_message({
        //     form: msgData,
        //     token: storage.token
        // })

        // if (!post.err) {
        //     setRefetch(!refetch)
        // }
        setData(new_data)
    }

    const styles = {
        link: { textDecoration: 'none', width: '100%', display: 'flex', justifyContent: 'center' }
    }

    return (
        <Body>
            <Sidebar page="dashboard" />

            <Sub>
                <Header>
                    <img src={getImg("Account", "logo.png")} />
                    <h1>UNSEEN</h1>
                    <h1>CHANGE</h1>
                </Header>
                <Container>
                    <Table>
                        <Row isHeader={true}>
                            {
                                header.map((data, index) => (
                                    <Content key={index} isHeader={true}>
                                        <p>{data}</p>
                                    </Content>
                                ))
                            }
                        </Row>

                        {
                            data ?
                                data.map((data, index) => (
                                    <Row key={data.id}>
                                        <Content>
                                            <p>{index + 1}</p>
                                        </Content>
                                        <Content>
                                            <p>{data.agency_username}</p>
                                        </Content>
                                        <Content>
                                            <p>{data.ads_title}</p>
                                        </Content>
                                        <Content>
                                            <p>${data.ads_price}</p>
                                        </Content>
                                        <Content>
                                            <p>{data.ads_start_date.split('T')[0]}</p>
                                        </Content>
                                        <Content>
                                            <ActionBox>
                                                {
                                                    !data.is_payed &&
                                                    <React.Fragment>
                                                        <input
                                                            type="submit"
                                                            value="O"
                                                            onClick={e => updateHandler(data.id, data.tours_id)}
                                                        />
                                                        <input
                                                            type="submit"
                                                            value="X"
                                                            onClick={() => deleteHandler(data.id)}
                                                        />
                                                    </React.Fragment>

                                                }
                                            </ActionBox>
                                        </Content>
                                        <Content>
                                            {
                                                data.is_active ?
                                                    <Link to={`/tracks/users/${data.id}.agency`} style={styles.link}>
                                                        <StatusBox id={data.id} isActive={true}>
                                                            <FaMapMarkerAlt style={{ color: "white" }} />
                                                            <p>Track</p>
                                                        </StatusBox>
                                                    </Link>
                                                    :
                                                    data.is_payed ?
                                                        <StatusBox isPayed={true}>
                                                            <FaMoneyCheck style={{ color: "white" }} />
                                                            <p>In Process</p>
                                                        </StatusBox>
                                                        :
                                                        <StatusBox>
                                                            <GiSandsOfTime />
                                                            <p>Waiting</p>
                                                        </StatusBox>

                                            }
                                        </Content>
                                    </Row>
                                ))
                                :
                                null

                        }
                    </Table>
                </Container>
            </Sub>
        </Body>
    )
}

const mapStateToProps = createStructuredSelector({
    token: pullToken,
    user: pullUserData
})

const mapDispatchToProps = (dispatch) => ({
    get_booking_user: data => dispatch(get_booking_user(data)),
    update_booking_user: data => dispatch(update_booking_user(data)),
    chats_send_message: data => dispatch(chats_send_message(data))
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(UserBookingDashboard);