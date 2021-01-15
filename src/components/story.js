import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { navigate } from "gatsby"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import Date from "./date"

const useStyles = makeStyles({
  header: {
    fontSize: 12,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
})

const Story = ({ title, abstract, date, image, url, publisher }) => {
  const dateDisplay = <Date date={date} />
  const classes = useStyles()
  return (
    <Card>
      <CardActionArea onClick={() => navigate(url)}>
        <CardHeader title={publisher} subheader={dateDisplay} />
        <CardMedia className={classes.media} image={image} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {abstract}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default Story
