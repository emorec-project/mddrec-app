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
    const CHUNK_SIZE = 1024 * 1024; // 1MB
    const fileSize = file.size;
    const chunksCount = Math.ceil(fileSize / CHUNK_SIZE);
  
    for (let i = 0; i < chunksCount; i++) {
      let start = CHUNK_SIZE * i;
      let end = CHUNK_SIZE * (i + 1);
      let chunk = file.slice(start, end);
  
      let formData = new FormData();
      formData.append('file', chunk);
      formData.append('filename', file.name);
      formData.append('chunkIndex', i.toString());
      formData.append('chunksCount', chunksCount.toString());
  
      axios.post('http://localhost:8000/blobs_manager/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        console.log(response);
      }).catch(error => {
        console.error(error);
      });
    }
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
      <Button icon={<UploadOutlined />}>Upload an MP4/ MP3 file</Button>
    </Upload>
    </div>
  );
};
