import React, { useState, useEffect } from 'react';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { uploadFile } from './fileUploader';
import { v4 as uuidv4 } from 'uuid';

interface UploadFilesProps {
  addSession: (url: string) => void;
}

export const UploadFiles: React.FC<UploadFilesProps> = ({ addSession }) => {
  const [uploadedAudio, setUploadedAudio] = useState<File | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleUpload = (file: any): false => {
    const fileType = file.type.split('/')[0];

    if (fileType === 'audio') {
      setUploadedAudio(file);
      uploadFile(file, uuidv4(), (url) => {
          addSession(url);
      });
    } else if (fileType === 'video') {
      setUploadedFile(file);
      uploadFile(file, uuidv4(), (url) => {
          addSession(url);
      });
    }

    return false;
  }

  useEffect(() => {
    if (uploadedFile) {
      const url = URL.createObjectURL(uploadedFile);
      addSession(url);
    }

    if (uploadedAudio) {
      const url = URL.createObjectURL(uploadedAudio);
      addSession(url);
    }
  }, [uploadedFile, uploadedAudio]);

  return (
    <div>
    <Upload beforeUpload={handleUpload} showUploadList={false}>
      <Button icon={<UploadOutlined />}>Upload an MP4/ MP3 file</Button>
    </Upload>
    </div>
  );
};
