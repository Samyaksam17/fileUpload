FILE STREAM , UPLOAD , DOWNLOAD

#Here, we've defined three endpoints: /upload for uploading the video, /stream/:filename for streaming the video, and /download/:filename for downloading the video.

##1. Handle the file upload: In the /upload endpoint, we're using Multer to handle the file upload. We've set the dest option to 'uploadedVideos/', which means that the uploaded file will be saved to the uploadedVideos/ directory.

##2. Stream the video: In the /stream/:filename endpoint, we're using the fs module to read the video file and stream it to the client. We're also using the range header to enable partial content requests (i.e. resumable downloads). If the client sends a range header, we'll send only the requested portion of the file. Otherwise, we'll send the entire file.

##3. Download the video: In the /download/:filename endpoint,

##4. When making a request to the server to stream a video, you can include a "Range" header to specify which part of the video you want to receive. The "Range" header has the following format:

Range: bytes=start-end

Where start is the starting byte offset and end is the ending byte offset of the requested video segment. For example, to request the first 10 bytes of a video, you would send the following "Range" header:

Range: bytes=0-9

If you don't want to specify the ending byte offset, you can use the "-" character to indicate that you want to receive the rest of the video starting from the starting byte offset. For example, to request all bytes after the 10th byte, you would send the following "Range" header:

Range: bytes=10-

The server should then respond with the appropriate video segment(s) according to the specified byte offsets.


POSTMAN ROUTES -


POST - http://localhost:3001/file/upload - in form-data make a field name "video" with type "file"

GET - http://localhost:3001/video/fc0446ab1e0c78031f0c4cd250725749?range=bytes=0-9 | | fileName range


