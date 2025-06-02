import React, { Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import SearchWithKeywordPage from "./pages/SearchWithKeywordPage/SearchWithKeywordPage";
import PlaylistDetailPage from "./pages/PlaylistDetailPage/PlaylistDetailPage";
import LoadingSpinner from "./common/components/LoadingSpinner";
// import AppLayout from "./layout/AppLayout";
// import HomePage from "./pages/HomePage/HomePage";
// import SearchPage from "./pages/SearchPage/SearchPage";

const AppLayout = React.lazy(() => import("./layout/AppLayout"));
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage/SearchPage"));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="search/:keyword" element={<SearchWithKeywordPage />} />
          <Route path="playlist/:id" element={<PlaylistDetailPage />} />
        </Route>
        {/* <Route path="/playlist" /> */}
      </Routes>
    </Suspense>
  );
}

export default App;
