import React, { Component } from "react";
import "./Login.css";
import { TextInput } from "../Common/forms/inputFields"
import { validateProperty } from "../Common/Validation/JoiValidation";
import { FaStethoscope, FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import {
    Button, Row, Col
} from "reactstrap";
import { BsArrowLeft } from "react-icons/bs";
import { Form } from "informed";
import { loginData } from "../LoginData"
import login from "../../Images/login.png"
import { AddNotification } from "../Common/Notification/Notification"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginData: loginData,
            openNotification: false,

        };
    }

    setFormApi = (formApi) => {
        this.formApi = formApi;
    };
    
    onSubmitLogin = () => {
        let data = this.formApi.getValues();
        this.state.loginData.map((value, index) => {
            if ((value.email == data.email) && (value.password == data.password)) {
                localStorage.setItem("type", value.type);
                localStorage.setItem("password", value.password);
                localStorage.setItem("email", value.email);
                this.props.history.push({
                    pathname: "/todos",
                    state: undefined,
                });
            }else{
                this.setState({
                    loading: false,
                    isModalOpen: false,
                    openNotification: true,
                    message: "Enter Proper MailId and Password",
                    variant: "warning",
                  });
            }
        })

    }
    render() {
        const { logindata } = this.state;
        return (
            <div>
                <AddNotification
                    visible={this.state.openNotification}
                    variant={this.state.variant}
                    message={this.state.message}
                    onClose={() => this.setState({ openNotification: false })}
                />
                <div className="LoginBase">
                        <div className="LoginTop">
                            <Row>
                                <Col md={6}>
                                    <div className="imgbgblock">
                                        <div className="lottiecont">   
                                                <div>
                                                    <img
                                                        src={login}
                                                        className="loginimage"
                                                    />
                                                </div>                                        
                                        </div>
                                    </div>
                                </Col>

                                <Col md={6}>
                                    <div>
                                        <div className="loginblock">
                                             <div className="loginblockform">
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            flexDirection: "row",
                                                        }}>
                                                        <div className="d-flex justify-content-center">                                                       
                                                            <div
                                                                className="forgottxt currentdiv">
                                                                SignIn
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="headertitle">Hey there! Welcome.</div>
                                                    <Form getApi={this.setFormApi} onSubmit={this.onSubmit}>
                                                        {({ formApi, formState }) => (
                                                            <>
                                                                <div className="FormFields">
                                                                    <div>
                                                                        <TextInput
                                                                            className="gog"
                                                                            placeholder="Email"
                                                                            icon={<FaUserCircle color="#FF9C23" size="18px" />}
                                                                            required={true}
                                                                            className="form-control-lg"
                                                                            field="email"
                                                                            validateOnBlur
                                                                            validate={(e) =>
                                                                                validateProperty(true, "email", e, "Emsil")
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="mt-4" style={{ marginTop: "20px" }}>
                                                                        <TextInput

                                                                            type="password"
                                                                            className="gog"
                                                                            placeholder="Password"
                                                                            icon={<RiLockPasswordFill color="#FF9C23" size="18px" />}
                                                                            required={true}
                                                                            className="form-control-lg"
                                                                            field="password"
                                                                            validateOnBlur
                                                                            validate={(e) =>
                                                                                validateProperty(true, "password", e, "Password")
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <Button
                                                                            type="submit"
                                                                            className="loginbtn mt-4"
                                                                            onClick={this.onSubmitLogin}>
                                                                        
                                                                            Login
                                                                        </Button>
                                                                    </div>


                                                                </div>
                                                            </>
                                                        )}
                                                    </Form>
                                             
                                            </div>
                                         
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                 
                </div>

            </div>
        );
    }
}

export default Login;
