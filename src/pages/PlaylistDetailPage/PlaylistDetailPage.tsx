import { Navigate, useParams } from "react-router";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import { Box, Grid, styled, Typography } from "@mui/material";
import DefaultImage from "../../common/components/DefaultImage";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

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

const PlaylistDetailPage = () => {
  const { id } = useParams();
  if (id === undefined) return <Navigate to="/" />;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: playList } = useGetPlaylist({ playlist_id: id });

  console.log(playList);

  return (
    <PlaylistHeader container spacing={7}>
      <ImageGrid item sm={12} md={2}>
        {playList?.images ? (
          <AlbumImage src={playList?.images[0].url} alt="playList_cover.jpg" />
        ) : (
          <DefaultImage>
            <MusicNoteIcon fontSize="large" />
          </DefaultImage>
        )}
      </ImageGrid>
      <Grid item sm={12} md={10}>
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
  );
};

export default PlaylistDetailPage;
