import React from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import { Button } from "gatsby-theme-material-ui"
import TopicTree from "../components/topicTree"
import { getTopicLink } from "../links"

const TopicHierarchyCard = ({ ancestor, descendants, root }) => (
  <Card>
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        Topic hierarchy
      </Typography>
      {ancestor ? (
        <>
          Parent topic
          <Button
            to={getTopicLink({ key: ancestor.key })}
            startIcon={<ChevronLeftIcon />}
          >
            {ancestor.name}
          </Button>
        </>
      ) : (
        <Button to="/topics" startIcon={<ChevronLeftIcon />}>
          Back to all topics
        </Button>
      )}
      {descendants.length > 0 && (
        <>
          <Typography variant="h5">sub topics</Typography>
          <TopicTree topics={descendants} root={root} />
        </>
      )}
    </CardContent>
  </Card>
)

export default TopicHierarchyCard
