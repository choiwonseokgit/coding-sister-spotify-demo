import { InputAdornment, styled, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import SearchIcon from "@mui/icons-material/Search";

const Container = styled("div")({
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

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

const SearchLayout = () => {
  const { keyword: paramKeyword } = useParams();
  const [keyword, setKeyword] = useState<string>(paramKeyword || "");
  const navigate = useNavigate();

  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = event.target.value;
    setKeyword(newKeyword);
    navigate(`/search/${encodeURIComponent(newKeyword)}`);
  };

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
      <Outlet />
    </Container>
  );
};

export default SearchLayout;
