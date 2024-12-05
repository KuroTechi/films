import "./App.css";
import { MoviesCards } from "./components/cards/movies-cards";
import { Filters } from "./components/filters/filters";
import { MenuAppBar } from "./components/header/app-bar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserToken } from "./store/userInfoSlice";
import { ErrorPage } from "./components/error-page/error-page";
import { getAndValidateLocalStorageItem } from "./utils/utils";
function App() {
  const dispatch = useDispatch();
  const userTokenLocalStorage = getAndValidateLocalStorageItem("token");
  const userTokenStore = useSelector((state) => state.userInfo.userToken);
  const moviesByFiltersError = useSelector(
    (state) => state.moviesByFilters.error
  );
  const moviesBySearchError = useSelector(
    (state) => state.moviesBySearch.error
  );
  const favoriteMoviesError = useSelector(
    (state) => state.favoriteMovies.error
  );
  useEffect(() => {
    if (userTokenLocalStorage) {
      dispatch(addUserToken({ userToken: userTokenLocalStorage }));
    }
  }, [dispatch, userTokenLocalStorage]);

  if (moviesByFiltersError || moviesBySearchError || favoriteMoviesError) {
    return <ErrorPage />;
  }
  return (
    <div className="app-container">
      <MenuAppBar />
      {userTokenStore && (
        <main className="content-wrapper">
          <Filters />
          <MoviesCards />
        </main>
      )}
    </div>
  );
}

export default App;
