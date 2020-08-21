import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import { get_product, set_product_id } from '../../../Redux/product/product-action'
import { pullToken, pullUserData } from '../../../Redux/auth/auth-selector'

import { getImg } from '../../../Constants/get-img'
import Guides from './Guides/guide'
import Agency from './Agency/agency'
import Sidebar from '../../../Components/Sidebar/sidebar'

import {
    Body,
    Container,
    Header,
    Search
} from './style'

const Product = props => {
    const [data, setData] = useState(null)
    const [page, setPage] = useState('guides')

    useEffect(() => {
        const req = async () => {
            const post = await props.getProduct()
            setData(post.product)
        }

        req()
    }, [])

    const navHandler = async e => {
        await props.setProductId(e.currentTarget.id)
        props.history.push('/p-detail')
    }

    return (
        <Body>
            <Sidebar page="home" />
            <Container>
                <Header>
                    <img src={getImg("Account", "logo.png")} />
                    <h1 onClick={() => setPage(page === "guides" ? "agency" : "guides")}>UNSEEN</h1>
                </Header>
                <Search>
                    <input type="text" placeholder="Enter something here..." />
                    <input type="submit" value="Search" />
                </Search>
                {
                    page === "guides" ?
                        <Guides product={data} nav={navHandler} />
                        :
                        <Agency product={data} nav={navHandler} />
                }
            </Container>
        </Body>
    )
}

const mapStateToProps = createStructuredSelector({
    token: pullToken,
    user: pullUserData
})

const mapDispatchToProps = (dispatch) => ({
    getProduct: () => dispatch(get_product()),
    setProductId: (data) => dispatch(set_product_id(data))
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Product);