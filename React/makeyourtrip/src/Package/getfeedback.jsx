// import React, { useState, useEffect } from 'react';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardContent from '@mui/material/CardContent';
// import Avatar from '@mui/material/Avatar';
// import { red } from '@mui/material/colors';
// import Typography from '@mui/material/Typography';
// import axios from '../axios';
// import Rating from '@mui/material/Rating';

// function FeedBackGet() {
//   const [feedbackData, setFeedbackData] = useState([]);

//   const getfeed = async () => {
//     try {
//       const res = await axios.get('/Feedbacks', {
//         responseType: 'json',
//       });
//       if (Array.isArray(res.data)) {
//         setFeedbackData(res.data);
//       } else {
//         console.log('Invalid data format received:', res.data);
//       }
//     } catch (ex) {
//       console.log('Error fetching data:', ex);
//     }
//   };

//   useEffect(() => {
//     getfeed();
//   }, []);

//   return (
//     <div>
//       {feedbackData.map((feedback) => (
//         <Card key={feedback.id} sx={{ maxWidth: 345 }}>
//           <CardHeader
//             avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" />}
//              title={feedback.name}
//              subheader={feedback.entryDate}
//           />
//           <CardContent>
//             <Typography variant="body2" color="text.secondary">
//               {feedback.feedbackMessage}
//             </Typography>
//             <Rating name="read-only" precision={0.5} value={feedback.rating} readOnly />
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }

// export default FeedBackGet;
