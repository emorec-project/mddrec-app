import React, { useState, useEffect } from 'react';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

interface UploadFilesProps {
  addSession: (url: string) => void;
}

export const UploadFiles: React.FC<UploadFilesProps> = ({ addSession }) => {
  const [uploadedAudio, setUploadedAudio] = useState<File | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const uploadFile = (file: File) => {
    let formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:8000/blobs_manager/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      console.log(response);
    }).catch(error => {
      console.error(error);
    });
  }

  const handleUpload = (file: any): false => {
    const fileType = file.type.split('/')[0];

    if (fileType === 'audio') {
      setUploadedAudio(file);
      uploadFile(file);
    } else if (fileType === 'video') {
      setUploadedFile(file);
      uploadFile(file);
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
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
      {/* <Upload
        accept="audio/mp3"
        beforeUpload={handleUpload}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>Upload an MP3 file</Button>
      </Upload> */}
    </div>
  );
};
