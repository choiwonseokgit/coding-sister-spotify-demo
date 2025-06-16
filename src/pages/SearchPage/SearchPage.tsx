import { useEffect, useState } from "react";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";
import {
  Box,
  InputAdornment,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getCategories } from "../../apis/categoryApi";
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

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "30%",

  "& .MuiInputBase-root": {
    borderRadius: "100px", // 입력 필드의 둥근 모서리
    backgroundColor: theme.palette.action.active, // 입력 필드의 배경 색상
    color: "white", // 텍스트 색상
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent", // 테두리 색상 제거
    },
    "&:hover fieldset": {
      borderColor: "gray", // 마우스 호버 시 테두리 색상
    },
    "&.Mui-focused fieldset": {
      borderColor: "gray", // 포커스 시 테두리 색상
    },
  },
}));

const Container = styled("div")({
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const SearchPage = () => {
  const [keyword, setKeyword] = useState<string>("");

  // const {
  //   data,
  //   error,
  //   isLoading,
  //   hasNextPage,
  //   isFetchingNextPage,
  //   fetchNextPage,
  // } = useSearchItemsByKeyword({
  //   q: keyword,
  //   type: [SEARCH_TYPE.Track],
  // });

  const { data: categories, isPending } = useGetCategories();

  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  if (isPending) return <LoadingSpinner />;

  return (
    <Container>
      <StyledTextField
        value={keyword}
        autoComplete="off"
        variant="outlined"
        placeholder="Search for songs or episodes"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: "white" }} />
              </InputAdornment>
            ),
          },
        }}
        onChange={handleSearchKeyword}
      />
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
    </Container>
  );
};

export default SearchPage;
