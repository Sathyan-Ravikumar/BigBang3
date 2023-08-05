import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import axios from '../axios';

export default function TitlebarBelowMasonryImageList() {
  const [file, setFile] = useState();
  const [uploadedFileData, setUploadedFileData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const saveFile = (e) => {
    setFile(e.target.files[0]);
  };

  const getFileData = async () => {
    try {
      const res = await axios.get("/AdminImageUploads/GetAllDetailsFromAdminTable", {
        responseType: "json",
      });
      console.log(res);
      if (Array.isArray(res.data)) {
        console.log("Data received:", res.data);
        setUploadedFileData(res.data);
        setLoading(false);
      } else {
        console.log("Invalid data format received:", res.data);
        setLoading(false);
        setError("Invalid data format received");
      }
    } catch (ex) {
      console.log("Error fetching data:", ex);
      setLoading(false);
      setError("Error fetching data");
    }
  };

  useEffect(() => {
    getFileData();
  }, []);

  return (
    <Box>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        uploadedFileData.length > 0 && (
          <ImageList variant="masonry" cols={3} gap={8}>
            {uploadedFileData.map((item) => (
              <ImageListItem >
                <img
                  src={`data:image/jpeg;base64,${item.imagePath}`}
                  alt={item.title}
                  loading="lazy"
                />
                <ImageListItemBar position="below" title={item.imageDetail} />
              </ImageListItem>
            ))}
          </ImageList>
        )
      )}
    </Box>
  );
}
