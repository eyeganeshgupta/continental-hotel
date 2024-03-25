"use client";

import { uploadImageToFirebaseAndReturnUrls } from "@/lib/image-upload";
import { Button, Form, Input, Upload } from "antd";
import { useState } from "react";

const HotelForm = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]) as any[];
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      values.media = await uploadImageToFirebaseAndReturnUrls(uploadedFiles);
      console.log("Success:", values);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      className="mt-5 grid grid-cols-3 gap-5"
      layout="vertical"
      onFinish={onFinish}
    >
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

      <div className="col-span-3">
        <Upload
          listType="picture-card"
          beforeUpload={(file) => {
            setUploadedFiles([...uploadedFiles, file]);
            return false;
          }}
          multiple
        >
          <span className="text-xs text-gray-500 p-3">Upload Media</span>
        </Upload>
      </div>

      <div className="col-span-3 flex justify-end gap-5">
        <Button disabled={loading}>Cancel</Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default HotelForm;
