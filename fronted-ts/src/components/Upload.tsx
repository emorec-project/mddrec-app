import React from 'react';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface UploadProps {
  handleUpload: (file: any) => false | undefined;
}

export const UploadFiles: React.FC<UploadProps> = ({ handleUpload }) => {
  return (
    <div>
      <Upload
        accept="video/mp4"
        beforeUpload={handleUpload}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>Upload an MP4 file</Button>
      </Upload>

      <Upload
        accept="audio/mp3"
        beforeUpload={handleUpload}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>Upload an MP3 file</Button>
      </Upload>
    </div>
  );
};
