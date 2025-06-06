import LoadingSpinner from "../../../common/components/LoadingSpinner";
import ErrorMessage from "../../../common/components/ErrorMessage";
import { Typography, Grid } from "@mui/material";
import Card from "../../../common/components/Card";
import useGetNewReleases from "../../../hooks/useGetNewRelease";

const NewReleases = () => {
  const { data, isLoading, error } = useGetNewReleases();

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
        New Released Albums
      </Typography>
      {data && data.albums.items.length > 0 ? (
        <Grid container spacing={2}>
          {data.albums.items.map((album) => (
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

export default NewReleases;
