import { useParams } from "react-router";

const SearchWithKeywordPage = () => {
  const { keyword } = useParams();
  return <div>SearchWithKeywordPage: {keyword}</div>;
};

export default SearchWithKeywordPage;
