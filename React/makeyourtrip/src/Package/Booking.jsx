import React, { useState, useEffect } from 'react';
import axios from '../axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { useLocation,useNavigate } from 'react-router-dom'; // Change to useParams
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';

const Trip = [
  {
    value: 'Friend Trip',
    label: 'Friend Trip',
  },
  {
    value: 'Family Trip',
    label: 'Family Trip',
  },
  {
    value: 'Corporate',
    label: 'Corporate',
  },
];

function Booking(userid,userrole) {
  const location = useLocation();
  const { packid, packagePrice, hotelid, hotelprice, duration } = location.state;
  //console.log(hotelprice, hotelid, packagePrice, packid, duration);
  const [inputValues, setInputValues] = useState({
    UserId: '',
    packageId: '',
    hotelId: '',
    name: '',
    numberOfPeople: 1,
    tripType:'',
    contactNumber:'',
    dateOfTheTrip: null,
    totalAmount: '',
  });

  const [hotelTotalPrice, setHotelTotalPrice] = useState(hotelprice);
  const [packageTotalPrice, setPackageTotalPrice] = useState(packagePrice);

  // useEffect to recalculate prices whenever groupSize changes
  useEffect(() => {
    setHotelTotalPrice(hotelprice * inputValues.numberOfPeople * duration);
    setPackageTotalPrice(packagePrice * inputValues.numberOfPeople);
  }, [inputValues.numberOfPeople, hotelprice, packagePrice, duration]);

  const handleGroupSizeChange = (event) => {
    setInputValues({ ...inputValues, numberOfPeople: event.target.value });
  };

  const handleDateChange = (date) => {
    setInputValues({ ...inputValues, dateOfTheTrip: date });
  };
  const navigate = useNavigate(); 
  const handleBooking = async () => {
    const bookingData = {
      UserId: userid.UserId,
      packageId:packid,
      hotelId: hotelid,
      name: inputValues.name,
      tripType:inputValues.tripType ,
      contactNumber:inputValues.contactNumber ,
      numberOfPeople: inputValues.numberOfPeople,
      dateOfTheTrip: inputValues.dateOfTheTrip.toISOString(),
      totalAmount: hotelTotalPrice + packageTotalPrice, // Keep it as a number, not a string
    };
   console.log(bookingData);
    try {
      const response = await axios.post('/TripBookings', bookingData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        console.log('Booking successful!');
        const bookid = response.data.bookingTripId;
        const total= response.data.totalAmount;
        navigate('/bill', { state: {packid, packagePrice, hotelid, hotelprice, duration ,bookid,total } });
      } else {
        console.log('Booking failed:', response.statusText);
      }
    } catch (ex) {
      console.log('Error while booking:', ex);
    }
  };
// const getselectedhotel= async () => {
//   const pack = await axios.get('/Packages/'+packid)
// }
  return (
    <>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', }}>
      <div style={{ backgroundColor: 'whiteSmoke', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', padding: '20px', borderRadius: '5px' }}>
      <Stack
      component="form"
      sx={{
        width: '25ch',
      }}
      spacing={2}
      noValidate
      autoComplete="off"
    >
        <TextField
          id="name"
          label="Name"
          variant="standard"
          required
          value={inputValues.name}
          onChange={(e) => setInputValues({ ...inputValues, name: e.target.value })}
        />
        <TextField
          id="groupSize"
          label="Group Size"
          variant="standard"
          required
          type="number"
          value={inputValues.numberOfPeople}
          onChange={handleGroupSizeChange}
        />
        <TextField
          select
          label="Trip Type"
          SelectProps={{
            native: true,
          }}
          
          variant="standard"
          value={inputValues.tripType}
          required
          onChange={(e) => setInputValues({ ...inputValues, tripType: e.target.value })}
        >
          {Trip.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          id="contactNumber"
          label="Contact Number"
          variant="standard"
          required
          value={inputValues.contactNumber}
          onChange={(e) => setInputValues({ ...inputValues, contactNumber: e.target.value })}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            required
            slotProps={{
              textField: {
                variant: 'standard',
              },
            }}
            value={inputValues.dateOfTheTrip}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
        </Stack>
        <div style={{marginTop:'40px'}}>
          <Typography>Total Price of Hotel: ₹{hotelTotalPrice}</Typography>
          <Typography>Total Price of Package: ₹{packageTotalPrice}</Typography>
          <Typography>Grand Total: ₹{hotelTotalPrice + packageTotalPrice}</Typography>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <Button variant="contained" color="primary" onClick={handleBooking}>
            BOOK
          </Button>
        </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Booking;
