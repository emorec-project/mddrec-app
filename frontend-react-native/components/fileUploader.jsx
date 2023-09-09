import axios from 'axios';


//import RNFS from 'react-native-fs';

export const uploadFile = async(filePath, sessionId, callback) => {
    const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
   
      
      

    // RNFS.stat(filePath)
    //     .then(statResult => {
    //         if (statResult.isFile()) {
    //             const fileSize = statResult.size;
    //             const chunksCount = Math.ceil(fileSize / CHUNK_SIZE);

    //             for (let i = 0; i < chunksCount; i++) {
    //                 let start = CHUNK_SIZE * i;
    //                 let end = Math.min(CHUNK_SIZE * (i + 1), fileSize);

    //                 RNFS.read(filePath, CHUNK_SIZE, start, 'base64')
    //                     .then(chunk => {
    //                         let formData = new FormData();
    //                         formData.append('file', {
    //                             uri: `data:application/octet-stream;base64,${chunk}`,
    //                             type: 'application/octet-stream',
    //                             name: filePath.split('/').pop(),
    //                         });
    //                         formData.append('filename', filePath.split('/').pop());
    //                         formData.append('chunkIndex', i.toString());
    //                         formData.append('chunksCount', chunksCount.toString());
    //                         formData.append('sessionId', sessionId);

    //                         axios.post('http://localhost:8000/blobs_manager/upload/', formData, {
    //                             headers: {
    //                                 'Content-Type': 'multipart/form-data'
    //                             }
    //                         }).then(response => {
    //                             console.log(response);
    //                             if(callback && response.data && response.data.file_url) {
    //                                 callback(response.data.file_url);
    //                             }
    //                         }).catch(error => {
    //                             console.error(error);
    //                         });
    //                     })
    //                     .catch(error => {
    //                         console.error("Failed to read file chunk: ", error);
    //                     });
    //             }
    //         }
    //     })
    //     .catch(error => {
    //         console.error("Failed to get file stat: ", error);
    //     });
}