import React, { Component } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';

import { sign_up } from '../../../../Redux/agency/agency.action'
import { sign_in, send_email } from '../../../../Redux/auth/auth.action'
import { pullResponse, pullLoginStatus } from '../../../../Redux/auth/auth.selector'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'


import { getImg } from '../../../../Constants/get-img'

import {
    Container,
    Left,
    Right,
    Title,
    Forms,
    ErrorBox,
    Nav
} from './style'

class AgencyAuth extends Component {
    state = {
        username: "",
        password: "",
        email: "",
        err: "",
        page: "login"
    }

    componentWillMount() {
        if (this.props.isLogin) {                  
            this.props.history.push('/')
        }
    }

    inputHandler = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    changePage = (page) => {
        this.setState({
            username: "",
            password: "",
            email: "",
            err: "",
            page: page
        })
    }

    login = async () => {
        const { username, password } = this.state
        const dataToSubmit = {
            username: username,
            password: password,
            type: 'agency'
        }

        const req = await this.props.signIn({
            data: dataToSubmit
        });

        if (req ? req.err : false) {
            this.setState({ err: req.err })
        }
        if (!req.err) {
            window.location.href = "http://localhost:3000/home"
        }
    }

    register = async () => {
        const { username, email, password } = this.state
        const dataToSubmit = {
            username: username,
            email: email,
            password: password,
            account_types: 'user'
        }

        const req = await this.props.signUp(dataToSubmit)
        if (req.err) {
            this.setState({ err: req.err })
        } else {
            this.setState({
                page: 'login',
                err: "",
                password: ""
            })
        }
    }

    reset = async () => {
        if (this.state.email.length > 0) {
            const req = await this.props.sendEmail({ email: this.state.email })

            if (req.err) {
                this.setState({ err: req.err })
            } else {
                this.setState({ page: 'login', err: "" })
            }
        }
    }

    render() {
        return (
            <Container>
                <Left>
                    <img src={getImg("Product", "b1.jpg")} alt="" />
                </Left>
                <Right>
                    <Title>
                        <img src={getImg("Account", 'logo.png')} alt="" />
                        <h1>UNSEEN</h1>
                    </Title>
                    <Forms page={this.state.page}>
                        {
                            this.state.page === "reset" ?
                                <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.inputHandler} />
                                :
                                <React.Fragment>
                                    <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.inputHandler} />
                                    {
                                        this.state.page === "register" && <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.inputHandler} />
                                    }
                                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.inputHandler} />
                                </React.Fragment>
                        }

                        {
                            this.state.err ?
                                <ErrorBox>
                                    <p style={{ color: 'red' }}>{this.state.err}</p>
                                </ErrorBox>
                                :
                                null
                        }

                        <input
                            type="submit"
                            value={
                                this.state.page === "reset" ?
                                    "Send Email"
                                    :
                                    this.state.page === "register" ? "Register" : "Login"
                            }
                            onClick={
                                this.state.page === "reset" ?
                                    this.reset
                                    :
                                    this.state.page === "register" ? this.register : this.login
                            }
                        />
                        <p style={{ marginBottom: '4rem' }}>
                            {
                                this.state.page === "reset" ?
                                    null
                                    :
                                    this.state.page === "register" ?
                                        "Already have an account?"
                                        :
                                        "Forgot your password?"
                            }
                            {
                                this.state.page === "reset" ?
                                    null
                                    :
                                    <a onClick={() => this.changePage(this.state.page === "register" ? 'login' : 'reset')}>Click here</a>
                            }
                        </p>
                    </Forms>
                    <Nav>
                        <p
                            onClick={() => this.changePage(this.state.page === "register" || this.state.page === "reset" ? 'login' : "register")}
                        >
                            {
                                this.state.page === "register" || this.state.page === "reset" ?
                                    this.state.page === "reset" ? "Sign In >>" : ""
                                    :
                                    "Sign Up >> "
                            }

                        </p>
                    </Nav>
                </Right>
            </Container>

        )
    }
}

const mapStateToProps = createStructuredSelector({
    response: pullResponse,
    isLogin: pullLoginStatus
})

const mapDispatchToProps = (dispatch) => ({
    signIn: (data) => dispatch(sign_in(data)),
    signUp: data => dispatch(sign_up(data)),
    sendEmail: (data) => dispatch(send_email(data))
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(AgencyAuth);