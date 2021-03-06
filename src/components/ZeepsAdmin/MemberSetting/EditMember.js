import React, { Component } from "react";

import {
  Layout,
  Form,
  Input,
  Button,
  Select,
  Menu,
  Divider,
  DatePicker,
  message,
} from "antd";

import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";

import BaseUrl from "../../services/axios-url";
import TopNav from "../WithAuthHeaderFooter/TopNav";
import WithAuthFooter from "../WithAuthHeaderFooter/WithAuthFooter";
import MemberSettingsAside from "./member-settings-aside";
import history from "../../RegisterProperty/history";

const axios = require("axios");

const { Content } = Layout;
const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const compLayout = {
  labelCol: { span: 4 },
  wrapperCol: { offset: 0, span: 20 },
};
const regLayout = {
  labelCol: { span: 8 },
  wrapperCol: { offset: 0, span: 23 },
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function GoBack() {
  window.history.back();
}

class EditMember extends Component {
  state = {
    loading: false,
    email_front: "",
    email_domain: "@",
    email_extension: "",
  };

  onFinish = (values) => {
    this.setState({ loading: true });
    console.log("Success:", values);
    const email = values.email_front + values.email_domain;
    axios
      .post(BaseUrl + "/adminapi/UpdateMember", {
        id: window.location.pathname.split("/").pop(),
        name: values.name,
        mobile: values.mobile,
        address: values.address,
        detailAddress: values.detailAddress,
        email: email,
        ismember: values.leave_status,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status == 1) {
          message.success("업데이트가 되었습니다.");
          this.setState({ loading: false });
          history.goBack();
        } else {
          message.error("다시 시도해주세요.");
          this.setState({ loading: false });
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
        message.error("다시 시도해주세요.");
      });
  };

  formRef = React.createRef();
  onEmailExtensionChange = (value) => {
    console.log("e.target", value);
    // this.setState({
    //   email_domain: this.state.email_domain + value,
    // });

    this.formRef.current.setFieldsValue({
      email_domain: "@" + value,
    });
  };
  componentDidMount() {
    var memberId = window.location.pathname.split("/").pop();

    axios
      .get(BaseUrl + "/adminapi/GetMemberDeatilById/" + memberId)
      .then((response) => {
        console.log("data->", response.data.data);

        if (response.data.status == 1 || response.data.status == "1") {
          // console.log("dddd: ", data.data.id);
          const email = response.data.data.email.split("@");
          this.formRef.current.setFieldsValue({
            name: response.data.data.name,
            password: "******",
            confirm: "******",
            mobile: response.data.data.mobile,
            leave_status: response.data.data.ismember ? "true" : "false",
            email_front: email[0],
            email_domain: "@" + email[1],
            email_extension: email[1],
            address: response.data.data.address,
            detailAddress: response.data.data.detailAddress,
          });
        } else {
          message.error("다시 시도해주세요.");
        }
      })
      .catch((error) => {
        console.log(error);
        message.error("다시 시도해주세요.");
      });
  }

  render() {
    const { loading } = this.state;

    return (
      <Layout>
        <TopNav />

        <Content>
          <Layout className="site-layout-background">
            <MemberSettingsAside />

            <Content className="cs-admin-basic-block">
              <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={onFinishFailed}
                ref={this.formRef}
              >
                <Row>
                  <Col
                    className="cs-admin-basic-info flex-center"
                    xs={{ span: 24 }}
                    sm={{ span: 12 }}
                    lg={{ span: 12 }}
                  >
                    <p className="m-0">회원 등록</p>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 12 }}>
                    <Button
                      loading={loading}
                      type="primary"
                      className="theme-btn float-right"
                      shape="round"
                      htmlType="submit"
                    >
                      회원 저장
                    </Button>

                    <Button
                      className="theme-btn-default float-right"
                      shape="round"
                      style={{ marginRight: "20px" }}
                    >
                      <Link to="/member-setting">회원 목록</Link>
                    </Button>
                  </Col>

                  <Divider className="cs-admin-basic-divider" />

                  <Col className="cs-admin-company" xs={{ span: 24 }}>
                    기본 정보
                  </Col>
                  <Col
                    className="cs-admin-form-input"
                    xs={{ span: 24 }}
                    sm={{ span: 4 }}
                    lg={{ span: 4 }}
                  ></Col>

                  <Col
                    className="cs-admin-form-input cs-admin-member-form-input"
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 24 }}
                  >
                    <Form.Item
                      {...compLayout}
                      label="이름"
                      name="name"
                      className="m-0"
                      rules={[
                        { required: true, message: "이름을 입력해 주세요!" },
                      ]}
                    >
                      <Input placeholder="이름을 입력해주세요." />
                    </Form.Item>
                  </Col>

                  <Col
                    className="cs-admin-form-input cs-admin-member-form-input"
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 12 }}
                  >
                    <Form.Item
                      {...regLayout}
                      label="비밀번호(필수)"
                      name="password"
                      className="m-0"
                      rules={[
                        {
                          required: true,
                          message: "비밀번호를 입력해 주세요!",
                        },
                      ]}
                    >
                      <Input.Password
                        readOnly
                        disabled
                        className="cs-admin-password"
                        placeholder="비밀번호를 입력해주세요."
                      />
                    </Form.Item>
                  </Col>

                  <Col
                    className="cs-admin-form-input cs-admin-member-form-input"
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 12 }}
                  >
                    <Form.Item
                      {...regLayout}
                      name="confirm"
                      label="비밀번호 확인"
                      className="m-0"
                      dependencies={["password"]}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "비밀번호를 확인해주세요",
                        },
                        ({ getFieldValue }) => ({
                          validator(rule, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              "비밀번호가 일치하지 않습니다!"
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        readOnly
                        disabled
                        className="cs-admin-password"
                        placeholder="비밀번호를 확인해주세요."
                      />
                    </Form.Item>
                  </Col>

                  <Col
                    className="cs-admin-form-input cs-admin-member-form-input"
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 12 }}
                  >
                    <Form.Item
                      {...regLayout}
                      label="휴대폰 번호"
                      name="mobile"
                      className="m-0"
                      rules={[
                        {
                          required: true,
                          message: "핸드폰 번호를 입력해 주세요!",
                        },
                      ]}
                    >
                      <Input placeholder="입력해주세요." />
                    </Form.Item>
                  </Col>

                  <Col
                    className="cs-admin-form-input cs-admin-registermember-email-input"
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 12 }}
                  >
                    <Form.Item
                      className="cs-admin-registermember-inner m-0"
                      {...regLayout}
                      label="탈퇴여부"
                      name="leave_status"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Leave Status!",
                        },
                      ]}
                    >
                      <Select
                        style={{ width: "100%" }}
                        placeholder="선택해주세요."
                      >
                        <Option value="true">아니</Option>
                        <Option value="false">예</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col
                    className="cs-admin-form-input cs-admin-registermember-email-input"
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 24 }}
                  >
                    <Form.Item label="이메일">
                      <Input.Group compact style={{ paddingLeft: "20px" }}>
                        <Form.Item
                          style={{ margin: "35px 0" }}
                          name="email_front"
                          rules={[
                            {
                              required: true,
                              message: "이메일 주소를 입력해주세요 ",
                            },
                          ]}
                        >
                          <Input placeholder="이메일" />
                        </Form.Item>
                        <Form.Item
                          name="email_domain"
                          style={{ paddingLeft: "5px", margin: "35px" }}
                          // onChange={this.onEmailDomainChange}
                          rules={[
                            {
                              required: true,
                              message: "이메일 주소를 입력해주세요 ",
                            },
                          ]}
                        >
                          <Input placeholder="선택해주세요." defaultValue="@" />
                        </Form.Item>
                        <Form.Item
                          style={{ paddingLeft: "5px", margin: "35px 0" }}
                          name="email_extension"
                          rules={[
                            {
                              required: true,
                              message: "선택해주세요",
                            },
                          ]}
                        >
                          <Select
                            placeholder="선택해주세요."
                            onChange={this.onEmailExtensionChange}
                          >
                            <Option value="naver.com">naver.com</Option>
                            <Option value="hanmail.com">hanmail.com</Option>
                            <Option value="gmail.com">gmail.com</Option>
                          </Select>
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>

                  <Col
                    className="cs-admin-form-input with-border"
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 24 }}
                  >
                    <Form.Item label="주소" className="m-0">
                      <Input.Group
                        style={{ display: "flex", paddingLeft: "20px" }}
                      >
                        <Form.Item
                          {...compLayout}
                          name="address"
                          className="m-0"
                          style={{ margin: "35px 0" }}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          className="m-0"
                          style={{ paddingLeft: "5px", margin: "35px" }}
                          {...compLayout}
                          name="detailAddress"
                          // onChange={this.onEmailDomainChange}
                        >
                          <Input />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Content>
          </Layout>
        </Content>

        <WithAuthFooter />
      </Layout>
    );
  }
}

export default EditMember;
