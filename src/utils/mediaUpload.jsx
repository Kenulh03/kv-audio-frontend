import { createClient } from "@supabase/supabase-js"

const anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3ZWlwYWhwZGl2aWNncG9hcG51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5NTc5ODMsImV4cCI6MjA1NTUzMzk4M30.WZMSgrG-APxvRwQeXV2m0utIVFr3VACVu4bxpxl2q1E"
const supabase_url = "https://qweipahpdivicgpoapnu.supabase.co"

const supabase = createClient(supabase_url,anon_key)

export default function mediaUpload(file){
    return new Promise((resolve,reject)=>{
        if(file==null){
            reject("No file selected")
        }

        const timestamp = new Date().getTime();
        const fileName = timestamp+file.name

        supabase.storage.from("images").upload(fileName,file,{
            cacheControl: '3600',
            upsert: false,
        }).then(()=>{

        const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
        resolve(publicUrl)
        }).catch(()=>{
            reject("Error uploading file")
        })
    });
}