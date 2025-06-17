import { useParams } from "react-router";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";
import { Box, styled } from "@mui/material";
import SongBox from "./components/SongBox";
import ArtistBox from "./components/ArtistBox";
import AlbumBox from "./components/AlbumBox";
import LoadingSpinner from "../../common/components/LoadingSpinner";

const SearchWithKeywordPage = () => {
  const { keyword } = useParams();

  if (!keyword) return null;

  const {
    data,
    error,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track, SEARCH_TYPE.Artist, SEARCH_TYPE.Album],
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <SongBox songs={data?.pages[0].tracks?.items} />
      <ArtistBox artists={data?.pages[0].artists?.items} />
      <AlbumBox albums={data?.pages[0]?.albums?.items} />
    </Box>
  );
};

export default SearchWithKeywordPage;
