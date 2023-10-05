import axios from 'axios';
import config from '../config/config';


export const uploadFile = (file: File, sessionId: string, callback: (url: string) => void) => {
    const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
    const fileSize = file.size;
    const chunksCount = Math.ceil(fileSize / CHUNK_SIZE);
    const token = localStorage.getItem("token");

    for (let i = 0; i < chunksCount; i++) {
        let start = CHUNK_SIZE * i;
        let end = CHUNK_SIZE * (i + 1);
        let chunk = file.slice(start, end);
    
        let formData = new FormData();
        formData.append('file', chunk);
        formData.append('filename', file.name);
        formData.append('chunkIndex', i.toString());
        formData.append('chunksCount', chunksCount.toString());
        formData.append('sessionId', sessionId); 

        axios.post(`${config.backendURL}${config.uploadEndpoint}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            console.log(response);
            if(callback && response.data && response.data.file_url) {
                callback(response.data.file_url);
            }
        }).catch(error => {
            console.error(error);
        });
    }
}
