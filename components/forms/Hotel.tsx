"use client";

import { addHotel, updateHotel } from "@/lib/actions/hotel.action";
import { uploadImageToFirebaseAndReturnUrls } from "@/lib/image-upload";
import { Button, Form, Input, Upload, message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const HotelForm = ({
  type = "add",
  initialData,
}: {
  type: string;
  initialData?: any;
}) => {
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState([]) as any[];
  const [loading, setLoading] = useState(false);
  const [existingMedia, setExistingMedia] = useState(initialData?.media || []);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const newUrls = await uploadImageToFirebaseAndReturnUrls(uploadedFiles);
      values.media = [...existingMedia, ...newUrls];
      let response = null;

      if (type === "add") {
        response = await addHotel(values);
      } else {
        response = await updateHotel({
          hotelId: initialData._id,
          payload: values,
        });
      }

      if (response?.success) {
        message.success(response.message);
        router.push("/admin/hotels");
      }

      if (!response?.success) {
        message.error(response?.error);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      className="mt-5 grid grid-cols-3 gap-5"
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialData}
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

      <div className="col-span-3 flex gap-5">
        <div className="flex gap-5">
          {existingMedia.map((media: any, index: number) => {
            return (
              <div
                key={media + index}
                className="p-3 flex flex-col items-center gap-5 border border-solid border-gray-200 rounded"
              >
                <Image
                  src={media}
                  alt="media"
                  className="h-16 w-16 object-cover"
                />
                <span
                  className="text-gray-500 underline text-sm cursor-pointer"
                  onClick={() => {
                    setExistingMedia(
                      existingMedia.filter((item: string, i: number) => {
                        return i !== index;
                      })
                    );
                  }}
                >
                  Remove
                </span>
              </div>
            );
          })}
        </div>

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
        <Button disabled={loading} onClick={() => router.push("/admin/hotels")}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default HotelForm;
