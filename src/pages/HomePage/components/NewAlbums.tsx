import { Grid, Typography } from "@mui/material";
import ErrorMessage from "../../../common/components/ErrorMessage";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import Card from "../../../common/components/Card";

const NewAlbums = () => {
  const {
    data,
    error,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useSearchItemsByKeyword({
    q: "tag:new",
    type: [SEARCH_TYPE.Album],
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  return (
    <div>
      <Typography
        variant="h1"
        paddingTop="8px"
        sx={{
          fontSize: {
            xs: "1.2rem",
            sm: "1.3rem",
            md: "1.4rem",
            lg: "1.5rem",
          },
        }}
      >
        Albums
      </Typography>
      {data && data.pages[0].albums?.items.length > 0 ? (
        <Grid container spacing={2}>
          {data.pages[0].albums?.items.map((album) => (
            <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={album.id}>
              <Card
                name={album.name}
                artistName={album.artists
                  .map((artist) => artist.name)
                  .join(", ")}
                image={album.images[0].url}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h2">No data</Typography>
      )}
    </div>
  );
};

export default NewAlbums;
