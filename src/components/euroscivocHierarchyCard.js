import React from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import { Button } from "gatsby-theme-material-ui"
import EuroSciVocTree from "../components/euroscivocTree"
import { getEuroSciVocLink } from "../links"

const EuroSciVocHierarchyCard = ({ ancestor, descendants, root }) => (
  <Card>
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        EuroSciVoc hierarchy
      </Typography>
      {ancestor ? (
        <>
          Parent
          <Button
            to={getEuroSciVocLink({ key: ancestor.key })}
            startIcon={<ChevronLeftIcon />}
          >
            {ancestor.name}
          </Button>
        </>
      ) : (
        <Button to="/euroscivoc" startIcon={<ChevronLeftIcon />}>
          Back to overview
        </Button>
      )}
      {descendants.length > 0 && (
        <>
          <Typography variant="h5">sub topics</Typography>
          <EuroSciVocTree euroscivoc={descendants} root={root} />
        </>
      )}
    </CardContent>
  </Card>
)

export default EuroSciVocHierarchyCard
