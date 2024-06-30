import React, { useState } from "react";
import {  storage } from "../appwrite/config";
import conf from "../Conf/conf";

function Storage() {
    const [file, setFile] = useState("");
    const [fileId, setFileId] = useState("");
    const fileInputRef = React.createRef();
    const [loading, setLoading] = useState(false);

    let handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            const uploadFile = await storage.createFile(conf.appwriteBucketId, 'unique()', file);
            // console.log(uploadFile);
            setFileId(uploadFile.$id);
            setFile("");
            fileInputRef.current.value = "";
        } catch (e) {
            console.log(e);
        }
        finally{
            setLoading(false)
        }
    };

    const deleteFile = async () => {
        setLoading(true)
        try {
            const file = await storage.deleteFile(conf.appwriteBucketId, fileId);
            // console.log(file);
            setFileId("");
            fileInputRef.current.value = "";
        } catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false)
        }
    };

    const getFile = async ()=>{
        setLoading(true)
        try {
            const file = await storage.getFile(conf.appwriteBucketId,fileId)
            // console.log(file)
            
        } catch (error) {
            console.log(error)
            
        }
        finally{
            setLoading(false)
        }
    };

    const downloadFile = async ()=>{
        setLoading(true)
        try {
            const file = await storage.getFileDownload(conf.appwriteBucketId,fileId)
            // console.log(file.href)
            
        } catch (error) {
            console.log(error)
            
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="file" 
                    name="file" 
                    required 
                    onChange={(e) => { setFile(e.target.files[0]) }} 
                    ref={fileInputRef} 
                />
                <button type="submit">Upload</button><br />
                {fileId ? 
                <>
                <button type="button" disabled={loading} onClick={deleteFile}>Delete File</button>
                <button type="button" disabled={loading} onClick={getFile}>get File</button>
                <button type="button" disabled={loading} onClick={downloadFile}>Download File</button>
                </>
                
                
                 : null}
            </form>
        </div>
    );
}

export default Storage;
