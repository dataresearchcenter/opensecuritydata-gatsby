import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { navigate } from "gatsby"
import Avatar from "@material-ui/core/Avatar"
import GroupIcon from "@material-ui/icons/Group"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import Date from "./date"

const TeamAvatar = ({ inline, className }) => (
  <Avatar
    className={className}
    style={{
      width: inline ? 30 : 40,
      height: inline ? 30 : 40,
      display: inline && "inline-flex",
    }}
  >
    <GroupIcon />
  </Avatar>
)

const useStyles = makeStyles(theme => ({
  header: {
    fontSize: 12,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
  },
}))

const Story = ({ title, abstract, date, image_url, url, publisher, team }) => {
  const dateDisplay = <Date date={date} format="long" />
  const classes = useStyles()
  return (
    <Card>
      <CardActionArea onClick={() => navigate(url)}>
        <CardHeader
          avatar={
            team && <TeamAvatar aria-label="team" className={classes.avatar} />
          }
          title={publisher}
          subheader={dateDisplay}
        />
        <CardMedia className={classes.media} image={image_url} title={title} />
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
export { TeamAvatar }
