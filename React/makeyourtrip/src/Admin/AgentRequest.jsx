import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import axios from '../axios';
import CardMedia from '@mui/material/CardMedia';
import React, { useState, useEffect } from 'react';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Request() {
  const [myData, setMyData] = useState([]);
  const [isError, setIsError] = useState("");
  const [expandedCardId, setExpandedCardId] = useState(null);

  const getdata = async () => {
    try {
      const res = await axios.get("/Users/pending");
      setMyData(res.data);
    } catch (error) {
      setIsError(error.message);
    }
  }
  const activate = async (id) => {
    
    try {
      const res = await axios.post('/Users/approve/'+id);
      console.log(res+"  "+"Activated");
      window.location.reload();
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const handleExpandClick = (cardId) => {
    setExpandedCardId(cardId === expandedCardId ? null : cardId);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {myData.map((item) => (
        <Card key={item.id} sx={{ maxWidth: 345, margin: '10px' }}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe">
                {/* You can use item.avatar here, if available in the API response */}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={item.role}
            subheader={item.agencyName}
          />

          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.gender}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.address}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.contactNo}
            </Typography>
          </CardContent>

          <CardActions disableSpacing>
            <p>see the id proof</p>
            <ExpandMore
              expand={item.id === expandedCardId}
              onClick={() => handleExpandClick(item.id)}
              aria-expanded={item.id === expandedCardId}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>

          <Collapse in={item.id === expandedCardId} timeout="auto" unmountOnExit>
            <CardContent>
              <CardMedia
                component="img"
                height="194"
                image={`data:image/jpeg;base64,${item.idProof}`}
                alt="Paella dish"
              />
            </CardContent>
          </Collapse>
          <Button onClick={()=>activate(item.userId)}>Activate</Button>
        </Card>
      ))}
    </div>
  );
}
