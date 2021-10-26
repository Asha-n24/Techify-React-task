import React, { Component } from 'react';
import { Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { Form } from "informed"
import { FaRupeeSign, FaShoppingCart, FaListAlt } from "react-icons/fa"
import "./Todos.css"
import { getTodoList } from "../../Services/TodosService"
import { TextInput } from "../Common/forms/inputFields"
import { validateProperty } from "../Common/Validation/JoiValidation";



class TodosList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TodosList: [],
            UserTodosList: [],
            modal: false

        }
    }
    componentDidMount = async () => {
        
        if (localStorage.getItem("email") == "ram@mail.com") {
            this.setState({
                UserTodosList: [{
                    "title": "Play",
                    "desc": "I need to go to play football",
                    "id": "1"
                },
                {
                    "title": "Cook",
                    "desc": "Need to buy vegetables",
                    "id": "2"
                },
                {
                    "title": "Health",
                    "desc": "Need to get health checkup tomorrow",
                    "id": "2"
                },
                ]
            })
        } else if (localStorage.getItem("email") == "shyam@mail.com") {
            this.setState({
                UserTodosList: [{
                    "title": "Play",
                    "desc": "I need to go to play badminton",
                    "id": "1"
                },

                {
                    "title": "Health",
                    "desc": "Renew my gym membership",
                    "id": "2"
                },

                ]
            })
        } else {
            await this.getTodoListAll()
        }
    }
    getTodoListAll = async () => {
        const res = await getTodoList()
        if (res.data.length > 0) {
            this.setState({ TodosList: res.data })
        }
    }
    setFormApi = (formApi) => {
        this.formApi = formApi
    }
    toggle = () => {
        this.setState({ modal: !this.state.modal })
    }
    onSubmit = () => {
        let data = this.formApi.getValues();
        let addData = [...this.state.UserTodosList]
        addData.push({ id: "4", title: data.title, desc: data.desc })
        this.setState({ UserTodosList: addData, modal: !this.state.modal })

    }
    render() {
        const { TodosList, UserTodosList } = this.state
        return (
            <div className="todoscroll">
                <div className="todosdiv">
                    <div className="griddiv">
                        {TodosList.length > 0 && TodosList.map((data, index) => {
                            return <div className="carddiv">
                                <div className="cardtitle">{data.title}</div>

                            </div>
                        })}
                        {UserTodosList.length > 0 && UserTodosList.map((data, index) => {
                            return <div className="carddiv">
                                <div className="cardtitle">{data.title}</div>
                                <div className="carddesc">{data.desc}</div>
                            </div>
                        })}
                        {UserTodosList.length > 0 && <div className="bottom_fixed">
                            <div className="d-flex justify-content-end">   <Button className="btn addtodos" onClick={this.toggle}> Add Todo</Button></div>
                        </div>}
                    </div>

                    <Modal isOpen={this.state.modal} toggle={this.toggle} className="">
                        <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                        <Form getApi={this.setFormApi} onSubmit={() => this.onSubmit()}>
                            {({ formApi, formState }) => (<>
                                <ModalBody>
                                    <Row>
                                        <Col md={6}>
                                            <TextInput
                                                className="gog2"
                                                placeholder="Title"
                                                required={true}
                                                icon={<FaListAlt style={{ color: "#FF9C23" }} />}
                                                className="form-control-md"
                                                field="title"
                                                validateOnBlur
                                                validate={(e) =>
                                                    validateProperty(true, "name", e, "Title")
                                                }
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <TextInput
                                                className="gog2"
                                                placeholder="Description"
                                                required={true}
                                                icon={<FaListAlt style={{ color: "#FF9C23" }} />}
                                                className="form-control-md"
                                                field="desc"
                                                validateOnBlur
                                                validate={(e) =>
                                                    validateProperty(true, "name", e, "Description")
                                                }
                                            />
                                        </Col>
                                    </Row>
                                </ModalBody>
                                <ModalFooter>
                                    <Button type="submit" color="primary" >Add</Button>{' '}
                                    <Button color="danger" onClick={this.toggle}>Cancel</Button>
                                </ModalFooter>
                            </>)}
                        </Form>
                    </Modal>

                </div>
            </div>
        );
    }
}

export default TodosList;