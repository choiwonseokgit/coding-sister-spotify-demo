import React, { Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import SearchWithKeywordPage from "./pages/SearchWithKeywordPage/SearchWithKeywordPage";
import PlaylistDetailPage from "./pages/PlaylistDetailPage/PlaylistDetailPage";
import LoadingSpinner from "./common/components/LoadingSpinner";
import Auth from "./pages/Auth/Auth";

const AppLayout = React.lazy(() => import("./layout/AppLayout"));
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage/SearchPage"));
const SearchLayout = React.lazy(() => import("./layout/SearchLayout"));
const LibraryPage = React.lazy(() => import("./pages/LibraryPage/LibraryPage"));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchLayout />}>
            <Route index element={<SearchPage />} />
            <Route path=":keyword" element={<SearchWithKeywordPage />} />
          </Route>
          <Route path="playlist/:id" element={<PlaylistDetailPage />} />
          <Route path="callback" element={<Auth />} />
          <Route path="library" element={<LibraryPage />} />
        </Route>
        {/* <Route path="/playlist" /> */}
      </Routes>
    </Suspense>
  );
}

export default App;
