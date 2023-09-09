import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import AppCard from './AppCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    control: {
      padding: theme.spacing(2),
    },
  }),
);

const cardProps = [
    {
        title: 'הקלטת ריאיון',
        paragraph: `כאן ניתן להקליט ריאיון עם מטופל חדש`,
        imageUrl: require("../images/interview.webp"),
        navigationLink: "newInterview"
    },
    {
      title: 'מסך תוצאות',
      paragraph: `כאן ניתן לצפות בתוצאות האבחון`,
      imageUrl: require("../images/results.jpeg"),
      navigationLink: "resultsPage"
  }
];

export default function CardsGrid() {
  const [spacing, setSpacing] = React.useState<GridSpacing>(2);
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpacing(Number((event.target as HTMLInputElement).value) as GridSpacing);
  };

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          {cardProps.map((value) => ( //Mapping each card details to seperate card
            <Grid key={cardProps.indexOf(value)} item>
              <AppCard cardProps={value}/>
            </Grid>
          ))}
        </Grid>
      </Grid>
      </Grid>
  );
}