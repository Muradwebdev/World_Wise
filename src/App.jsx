import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import Homepage from "./pages/Home/HomePage";
import Product from "./pages/Product/Product";
import Pricing from "./pages/Pricing/Pricing";
import PageNotFound from "./pages/NotFound.jsx/PageNotFound";
import AppLayout from "./pages/AppLayout/AppLayout";
import Login from "./pages/Login/Login";
import CityList from "./components/CityList/CityList";
import Form from "./components/Form/Form";
import CountryList from "./components/CountryList/CountryList";
import City from "./components/City/City";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";

const App = () => {
  //SupaBase yadinda olsun deploy etmek ucun bunu edersen

  //   useEffect(() => {
  //   fetch("https://cibvyhzxafjzktykufrv.supabase.co/rest/v1/cities", {
  //     method: "GET",
  //     headers: {
  //       Authorization: "Bearer sb_publishable_ZmCsOj2U8DJF7Xrzxdygvw_5XSQX7RR",
  //       "Content-Type": "application/json",
  //       apikey: "sb_publishable_ZmCsOj2U8DJF7Xrzxdygvw_5XSQX7RR", // bəzən apikey də lazım olur
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log(data))
  //     .catch((error) => console.error("Error:", error));
  // }, []);

  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route path="app" element={<AppLayout />}>
              <Route index element={<Navigate replace to="cities" />} />
              <Route
                index
                element={
                  <div>
                    <CityList />
                  </div>
                }
              />

              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
};

export default App;
