import { Form, FormInstance, message } from "antd";
import {
  AxiosResponseData,
  AxiosResponseError,
} from "../../../domain/models/AxiosModel";
import { userUpdateAvatar } from "../../../domain/services/userService";
import React from "react";
import ImageComp from "../ImageComp";

type Props = {
  title: string;
  formRef: FormInstance;
  handleSubmit: (
    sendData: (
      values: Record<string, any>
    ) => Promise<AxiosResponseData<any> | AxiosResponseError>,
    values: Record<string, any>,
    successMessage: string
  ) => Promise<AxiosResponseData<any> | AxiosResponseError>;
  loading: boolean;
};

function UserAvatarForm({ formRef, title, handleSubmit }: Props) {
  const inputFile = React.useRef<HTMLInputElement>(null);
  const [file, setFile] = React.useState<File | undefined>(undefined);
  const [fileUrl, setFileUrl] = React.useState<string | undefined>(undefined);

  return (
    <Form
      name={title}
      onFinish={(e) => {
        if (file) {
          handleSubmit(userUpdateAvatar, { ...e, file }, "User Avatar Updated");
        } else {
          message.error("No changes detected.");
        }
      }}
      layout="vertical"
      form={formRef}
    >
      <div className="flex flex-wrap [&>*]:px-2">
        <Form.Item name="userUuid" hidden></Form.Item>

        <div className="block max-w-[300px] w-full mx-auto">
          <div className="block border pb-[100%] rounded-full relative overflow-hidden group">
            {fileUrl ? (
              <img
                className="w-full h-full absolute object-cover"
                src={fileUrl}
                onError={(e) => {
                  e.currentTarget.src = "/images/image-placeholder.jpeg";
                }}
              />
            ) : (
              <ImageComp
                className="w-full h-full absolute object-cover"
                src={`/api/user/avatar/${formRef.getFieldsValue().userUuid}`}
                alt={"User Avatar"}
              />
            )}
            <button
              onClick={() => {
                inputFile.current?.click();
              }}
              type="button"
              className="bg-black bg-opacity-50 duration-500 opacity-0 py-auto absolute h-full w-full bottom-0 text-white group-hover:opacity-100"
            >
              Select
            </button>
          </div>
        </div>
      </div>

      <input
        ref={inputFile}
        type="file"
        className="opacity-0"
        onChange={(e) => {
          const file = e.currentTarget.files?.[0];
          if (!file) {
            setFileUrl(undefined);
            setFile(undefined);
            return;
          }

          const url = URL.createObjectURL(file);
          setFileUrl(url);
          setFile(file);
        }}
      />
    </Form>
  );
}

export default UserAvatarForm;
