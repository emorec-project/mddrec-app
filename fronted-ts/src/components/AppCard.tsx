import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    marginTop: 150,
    width: '100%',
    maxWidth: 300,
    height: '75%',
    margin: 'auto',
    direction: 'rtl',
    textAlign: 'center',
  },
  content: {
      height: '20%'
  }
});

interface CardProps  {cardProps:{
    title: string,
    paragraph: string,
    imageUrl: string,
    navigationLink: string
  }
};

export default function AppCard (props: CardProps) {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClick = (navigateTo: string) =>
  {
    navigate(`/${navigateTo}`);
  }

  return (
    <Card className={classes.root}>
      <ButtonBase onClick={()=>handleClick(props.cardProps.navigationLink)}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="view-img"
          height="250"
          image= {props.cardProps.imageUrl}
          title={props.cardProps.title}
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.cardProps.title}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            {props.cardProps.paragraph}
          </Typography>
        </CardContent>
      </CardActionArea>
      </ButtonBase>
    </Card>
  );
}