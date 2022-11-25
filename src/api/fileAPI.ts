import instance from "@/plugins/axios";

const fileUpload = async (data:FormData) => {
    const response = await instance.post('/api/file/upload',data,
        {
            headers: {'Content-Type': 'multipart/form-data'}
        })
    return response.headers.location;
}

export {fileUpload}