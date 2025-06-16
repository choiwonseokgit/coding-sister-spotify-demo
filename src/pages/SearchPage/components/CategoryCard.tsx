import { styled } from "@mui/material/styles";
import { Card, CardActionArea, Typography, Box } from "@mui/material";
import { Category } from "../../../models/category";

interface CategoryCardProps {
  category: Category;
  bgColor: string;
}

const StyledCard = styled(Card)<{ bgcolor: string }>(({ theme, bgcolor }) => ({
  width: "100%",
  //   height: 150,
  aspectRatio: 2 / 1,
  borderRadius: theme.spacing(2),
  backgroundColor: bgcolor,
  position: "relative",
  overflow: "hidden",
  boxShadow: theme.shadows[3],
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[6],
  },
}));

const TextWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  left: theme.spacing(2),
  color: "#fff",
  fontWeight: 600,
}));

const IconImage = styled("img")({
  position: "absolute",
  bottom: -10,
  right: -10,
  width: "40%",
  opacity: 0.9,
  transform: "rotate(30deg)",
});

const CategoryCard = ({ category, bgColor }: CategoryCardProps) => {
  return (
    <StyledCard bgcolor={bgColor}>
      <CardActionArea sx={{ width: "100%", height: "100%" }}>
        <TextWrapper>
          <Typography variant="h6">{category.name}</Typography>
        </TextWrapper>

        {category.icons[0] && (
          <IconImage src={category.icons[0].url} alt="icon" />
        )}
      </CardActionArea>
    </StyledCard>
  );
};

export default CategoryCard;
