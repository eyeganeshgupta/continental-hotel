"use client";

import { Form, Input } from "antd";

const HotelForm = () => {
  return (
    <Form className="mt-5 grid grid-cols-3 gap-5" layout="vertical">
      <Form.Item
        label="Hotel Name"
        name="name"
        className="col-span-3"
        rules={[{ required: true, message: "Please input hotel name!" }]}
      >
        <Input placeholder="Hotel Name" />
      </Form.Item>

      <Form.Item
        label="Owner Name"
        name="owner"
        className="col-span-3 lg:col-span-1"
        rules={[{ required: true, message: "Please input hotel owner name!" }]}
      >
        <Input placeholder="Owner Name" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        className="col-span-3 lg:col-span-1"
        rules={[{ required: true, message: "Please input email address!" }]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        label="Phone"
        name="phone"
        className="col-span-3 lg:col-span-1"
        rules={[{ required: true, message: "Please input phone number!" }]}
      >
        <Input placeholder="Phone" />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        className="col-span-3"
        rules={[{ required: true, message: "Please input hotel address!" }]}
      >
        <Input.TextArea placeholder="Address" />
      </Form.Item>
    </Form>
  );
};

export default HotelForm;
