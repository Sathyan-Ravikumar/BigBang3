import './App.css';
import MiniDrawer from './Navbar/Navbar';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  // const [file, setFile] = useState();
  // const [uploadedFileData, setUploadedFileData] = useState([]);

  // const saveFile = (e) => {
  //   setFile(e.target.files[0]);
  // };

  // const getFileData = async () => {
  //   try {
  //     const res = await axios.get("https://localhost:7115/api/AdminImageUploads/GetAllDetailsFromAdminTable", {
  //       responseType: "json",
  //     });
  //     console.log(res);
  //     if (Array.isArray(res.data)) {
  //       console.log("Data received:", res.data);
  //       setUploadedFileData(res.data); 
  //     } else {
  //       console.log("Invalid data format received:", res.data);
  //     }
  //   } catch (ex) {
  //     console.log("Error fetching data:", ex);
  //   }
  // };
  
  

  return (
    <>
    <MiniDrawer/>
      {/* <div>
      <input type="file" onChange={saveFile} />

      <button onClick={getFileData}>Get File Data</button>
     
      
      {uploadedFileData.length > 0 && (
        <div>
          <h2>Uploaded File Data</h2>
          <table>
            <thead>
              <tr>
                <th>Package Name</th>
                <th>Destination</th>
                <th>Image</th>
                <th>Price for Adult</th>
              </tr>
            </thead>
            <tbody>
              {uploadedFileData.map((item, index) => (
                <tr key={index}>
                  <td>{item.imageId}</td>
                  <td>{item.userId}</td>
                  <td>
                  {item.imagePath && (
                      <img
                        src={`data:image/jpeg;base64,${item.imagePath}`}
                        alt={`Image ${index + 1}`}
                        style={{ maxWidth: '100%', maxHeight: '100px' }}
                      />
                    )}
                  </td>
                  <td>{item.imageDetail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div> */}
    </>
  );
}

export default App;
