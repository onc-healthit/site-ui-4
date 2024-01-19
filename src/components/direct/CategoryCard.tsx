import * as React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import { Button, CardActions } from "@mui/material"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

export interface CriteriaCardProps {
  cardHeader: string;
  description: any;
}
const CategoryCard = ({ cardHeader, description }: CriteriaCardProps) => {
  return (
    <Card sx={{ maxWidth: 345, borderTop: "16px solid #122953" }} id="category">
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" component="h3" color="default">
          <strong>{cardHeader}</strong>
        </Typography>

        <Typography variant="body2" color="default" >
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="text" color="secondary" endIcon={<ArrowForwardIcon/>}>
          Go
        </Button>
      </CardActions>
    </Card>
  );
};

export default CategoryCard
