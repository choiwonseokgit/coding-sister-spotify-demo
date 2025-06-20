import {
  Box,
  InputAdornment,
  styled,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import SearchResultList from "./SearchResultList";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import SearchIcon from "@mui/icons-material/Search";

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",

  "& .MuiInputBase-root": {
    borderRadius: "4px",
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

const SearchContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  width: "100%",
  height: "100%",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "600px", // 최대 너비 제한
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));

const EmptyPlaylistWithSearch = () => {
  const [keyword, setKeyword] = useState<string>("");

  const {
    data,
    error,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track],
  });

  const tracks = data?.pages.flatMap((page) => page.tracks?.items) ?? [];
  const hasResults = tracks.length > 0;

  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <SearchContainer>
      <ContentWrapper>
        <Typography variant={isSmallScreen ? "h5" : "h4"} my={2}>
          Let&apos;s find something for your playlist
        </Typography>

        <StyledTextField
          value={keyword}
          autoComplete="off"
          variant="outlined"
          placeholder="Search for songs or episodes"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: "white" }} />
              </InputAdornment>
            ),
          }}
          onChange={handleSearchKeyword}
        />

        <Box mt={3}>
          {isLoading ? (
            <LoadingSpinner />
          ) : hasResults ? (
            <SearchResultList
              list={tracks}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />
          ) : keyword === "" ? (
            <></>
          ) : (
            <Typography variant="body1" color="textSecondary">
              No results for "{keyword}"
            </Typography>
          )}
        </Box>
      </ContentWrapper>
    </SearchContainer>
  );
};

export default EmptyPlaylistWithSearch;
