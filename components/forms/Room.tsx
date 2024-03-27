"use client";

/* eslint-disable @next/next/no-img-element */
import { addRoom, updateRoom } from "@/lib/actions/room.action";
import { HotelType } from "@/lib/actions/shared.types";
import { uploadImageToFirebaseAndReturnUrls } from "@/lib/image-upload";
import { Button, Form, Input, Select, Upload, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RoomForm = ({
  type = "add",
  initialData,
  hotels,
}: {
  type?: string;
  initialData?: any;
  hotels: HotelType[];
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
        response = await addRoom(values);
      } else {
        response = await updateRoom({
          roomId: initialData._id,
          payload: values,
        });
      }

      if (response?.success) {
        message.success(response.message);
        router.push("/admin/rooms");
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
        label="Hotel"
        name="hotel"
        rules={[{ required: true, message: "Hotel is required" }]}
      >
        <Select>
          {hotels.map((hotel) => {
            return (
              <Select.Option key={hotel._id} value={hotel._id}>
                {hotel.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Name is required" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Room Number"
        name="roomNumber"
        rules={[{ required: true, message: "Room Number is required" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Type"
        name="type"
        rules={[{ required: true, message: "Type is required" }]}
      >
        <Select>
          <Select.Option key="delux" value="delux">
            Delux
          </Select.Option>
          <Select.Option key="premium" value="premium">
            Premium
          </Select.Option>
          <Select.Option key="standard" value="standard">
            Standard
          </Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Bedrooms"
        name="bedrooms"
        rules={[{ required: true, message: "Bedrooms count is required" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Rent Per Day"
        name="rentPerDay"
        rules={[{ required: true, message: "Rent Per Day is required" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Amenities"
        name="amenities"
        rules={[{ required: true, message: "Amenities is required" }]}
        className="col-span-3"
      >
        <Input.TextArea />
      </Form.Item>

      <div className="col-span-3 flex gap-5">
        <div className="flex gap-5">
          {existingMedia.map((media: any, index: number) => (
            <div
              className="flex flex-col border border-solid rounded p-3 border-gray-200 gap-5 items-center"
              key={index}
            >
              <img src={media} alt="media" className="h-16 w-16 object-cover" />
              <span
                className="text-gray-500 underline text-sm cursor-pointer"
                onClick={() => {
                  setExistingMedia(
                    existingMedia.filter(
                      (item: string, i: number) => i !== index
                    )
                  );
                }}
              >
                Remove
              </span>
            </div>
          ))}
        </div>

        <Upload
          listType="picture-card"
          beforeUpload={(file) => {
            setUploadedFiles((prev: any) => [...prev, file]);
            return false;
          }}
          multiple
        >
          <span className="text-xs text-gray-500 p-3 ">Upload Media</span>
        </Upload>
      </div>

      <div className="col-span-3 flex justify-end gap-5">
        <Button disabled={loading} onClick={() => router.push("/admin/rooms")}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {type === "add" ? "Add" : "Update"}
        </Button>
      </div>
    </Form>
  );
};

export default RoomForm;
