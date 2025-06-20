import { Navigate, useParams } from "react-router";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import {
  Box,
  Grid,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DefaultImage from "../../common/components/DefaultImage";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import DesktopPlaylistItem from "./components/DesktopPlaylistItem";
import { PAGE_LIMIT } from "../../configs/commonConfig";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import LoginButton from "../../common/components/LoginButton";
import ErrorMessage from "../../common/components/ErrorMessage";
import EmptyPlaylistWithSearch from "./components/EmptyPlaylistWithSearch";
import MobilePlaylistItem from "./components/MobilePlaylistItem";

const PlaylistHeader = styled(Grid)({
  display: "flex",
  alignItems: "center",
  background: " linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)",
  padding: "16px",
});
const ImageGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));
const AlbumImage = styled("img")(({ theme }) => ({
  borderRadius: "8px",
  // height: "auto",
  // width: "100%",
  minWidth: "128px",
  height: "20vh",
  width: "20vh",
  objectFit: "cover",

  [theme.breakpoints.down("md")]: {
    maxWidth: "200px",
  },
}));
const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  textAlign: "left",

  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
  },
}));
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  height: "calc(100% - 64px)",
  borderRadius: "8px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none", // IE and Edge
  scrollbarWidth: "none", // Firefox
}));

const PlaylistDetailPage = () => {
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  if (!id) return <Navigate to="/" />;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: playList, error: playlistError } = useGetPlaylist({
    playlist_id: id,
  });

  console.log(playlistError);

  const {
    data: playlistItems,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useGetPlaylistItems({
    playlist_id: id,
    limit: PAGE_LIMIT,
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [ref, inView] = useInView();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  console.log("err", error);

  if (error || playlistError) {
    console.log(error);

    if (error?.status === 401 || playlistError?.status === 401) {
      //로그인을 안해서 권한 없음 에러라면 로그인 버튼
      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
          flexDirection="column"
        >
          <Typography variant="h2" fontWeight={700} mb="20px">
            다시 로그인 하세요
          </Typography>
          <LoginButton />
        </Box>
      );
    }
    return <ErrorMessage errorMessage="Failed to load" />; // 정말 리스트 가져오기 실패라면 fail to load
  }

  return (
    <StyledTableContainer>
      <PlaylistHeader container spacing={7}>
        <ImageGrid size={{ sm: 12, md: 2 }}>
          {playList?.images ? (
            <AlbumImage
              src={playList?.images[0].url}
              alt="playList_cover.jpg"
            />
          ) : (
            <DefaultImage>
              <MusicNoteIcon fontSize="large" />
            </DefaultImage>
          )}
        </ImageGrid>
        <Grid size={{ sm: 12, md: 10 }}>
          <Box>
            <ResponsiveTypography variant="h1" color="white">
              {playList?.name}
            </ResponsiveTypography>

            <Box display="flex" alignItems="center">
              <img
                src="https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5"
                width="20px"
                alt="spotify-logo"
              />
              <Typography
                variant="subtitle1"
                color="white"
                ml={1}
                fontWeight={700}
              >
                {playList?.owner?.display_name
                  ? playList?.owner.display_name
                  : "unknown"}
              </Typography>
              <Typography variant="subtitle1" color="white">
                • {playList?.tracks?.total} songs
              </Typography>
            </Box>
          </Box>
        </Grid>
      </PlaylistHeader>
      {playList?.tracks?.total === 0 ? (
        <EmptyPlaylistWithSearch />
      ) : isMobile ? (
        // ✅ 모바일 카드형 리스트 렌더링
        <Box>
          {playlistItems?.pages.map((page, pageIdx) =>
            page.items.map((item, itemIdx) => (
              <MobilePlaylistItem
                item={item}
                key={pageIdx * PAGE_LIMIT + itemIdx + 1}
              />
            ))
          )}
          <Box ref={ref} height="5px" />
          {isFetchingNextPage && <LoadingSpinner />}
        </Box>
      ) : (
        // ✅ 데스크탑 테이블 그대로
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Album</TableCell>
              <TableCell>Date added</TableCell>
              <TableCell>Duration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playlistItems?.pages.map((page, pageIdx) =>
              page.items.map((item, itemIdx) => (
                <DesktopPlaylistItem
                  item={item}
                  key={pageIdx * PAGE_LIMIT + itemIdx + 1}
                  idx={pageIdx * PAGE_LIMIT + itemIdx + 1}
                />
              ))
            )}
            <TableRow sx={{ height: "5px" }} ref={ref} />
            {isFetchingNextPage && <LoadingSpinner />}
          </TableBody>
        </Table>
      )}
    </StyledTableContainer>
  );
};

export default PlaylistDetailPage;
