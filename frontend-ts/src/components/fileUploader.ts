import axios from 'axios';


export const uploadFile = (file: File, sessionId: string, callback: (url: string) => void) => {
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
        formData.append('sessionId', sessionId); 

        axios.post('http://localhost:8000/blobs_manager/upload/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
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
