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
  width: "100%", // 기본값 (모바일)

  [theme.breakpoints.up("sm")]: {
    width: "70%",
  },

  [theme.breakpoints.up("md")]: {
    width: "50%",
  },

  [theme.breakpoints.up("lg")]: {
    width: "40%",
  },

  [theme.breakpoints.up("xl")]: {
    width: "30%",
  },

  "& .MuiInputBase-root": {
    borderRadius: "100px",
    backgroundColor: theme.palette.action.active,
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "gray",
    },
    "&.Mui-focused fieldset": {
      borderColor: "gray",
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
