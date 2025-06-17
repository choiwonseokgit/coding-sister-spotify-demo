import { Box, Typography } from "@mui/material";
import useGetCategories from "../../hooks/useGetCategories";
import CategoryCard from "./components/CategoryCard";
import LoadingSpinner from "../../common/components/LoadingSpinner";

const BG_COLORS = [
  "#FF6B6B", // 빨강
  "#6BCB77", // 초록
  "#4D96FF", // 파랑
  "#FFD93D", // 노랑
  "#FF9F1C", // 주황
  "#9D4EDD", // 보라
  "#38B6FF", // 하늘
  "#FF6FF0", // 핑크
  "#00C49A", // 민트
  "#D1D1D1", // 회색
];

const SearchPage = () => {
  const { data: categories, isPending } = useGetCategories();

  if (isPending) return <LoadingSpinner />;

  return (
    <>
      <Typography variant="h1" fontWeight={700} sx={{ paddingBlock: "10px" }}>
        Browse All
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        gap={1}
        sx={{ width: "100%", maxWidth: "100%" }}
      >
        {categories?.categories.items.map((item, idx) => (
          <CategoryCard
            key={item.id}
            category={item}
            bgColor={BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)]}
          />
        ))}
      </Box>
    </>
  );
};

export default SearchPage;
