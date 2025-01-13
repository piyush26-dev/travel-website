import ScrollToTop from "./components/scroll-to-top/ScrollToTop";
import Contant from "./container/contant/Contant";
import SideBar from "./container/side-bar/SideBar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
  useNavigate,
} from "react-router-dom";
import TopNavbar from "./container/top-navbar/TopNavbar";
import PlacesList from "./container/places/PlacesList";
import { useState } from "react";
import AddPlaceModal from "./components/add-place-modal/AddPlaceModal";
import ToursList from "./container/tours/ToursList";
import AddTours from "./container/tours/AddTours";
import ViewTour from "./container/tours/ViewTour";
import AddActivity from "./container/activities/AddActivity";
import ActivityList from "./container/activities/ActivityList";
import ViewActivity from "./container/activities/ViewActivity";
import SummarizedList from "./container/tours/summarized/SummarizedList";
import AddSummarizedTour from "./container/tours/summarized/AddSummarizedTour";
import ViewSummarizedTour from "./container/tours/summarized/ViewSummarizedTour";
import AllTransfersTourList from "./container/tours/transfers/AllTransfersTourList";
import ViewTransfersTour from "./container/tours/transfers/ViewTransfersTour";
import AddTransfersTour from "./container/tours/transfers/AddTransfersTour";
import StayList from "./container/tours/stays/StayList";
import AddStay from "./container/tours/stays/AddStay";
import ViewStay from "./container/tours/stays/ViewStay";
import TourActivityList from "./container/tours/activities/TourActivityList";
import ViewTourActivity from "./container/tours/activities/ViewTourActivity";
import AddTourActivity from "./container/tours/activities/AddTourActivity";
import AllTourDayList from "./container/tours/tour-days/AllTourDayList";
import AddTourDays from "./container/tours/tour-days/AddTourDays";
import ViewTourDays from "./container/tours/tour-days/ViewTourDays";
import AllAttractionList from "./container/attractions/AllAttractionList";
import ViewAttraction from "./container/attractions/ViewAttraction";
import AddAttraction from "./container/attractions/AddAttraction";
import AllUserList from "./container/users/AllUserList";
import ViewUser from "./container/users/ViewUser";
import LoginForm from "./container/admin-settings/admin-credentials/LoginForm";
import PageNotFound from "./components/page-not-found/PageNotFound";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import AllEnquiryList from "./container/enquiries/AllEnquiryList";
import ViewEnquiry from "./container/enquiries/ViewEnquiry";
import Dashboard from "./container/dashboard/Dashboard";
import AdminProfile from "./container/admin-settings/admin-profile/AdminProfile";

function App() {

  const [isModalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = useState(true);
  const [logoutOpen, setLogoutOpen] = useState(false)

  const handleOpenModal = () => {
    setModalOpen(true);
  };
    const handleLogoutOpenModal = () => {
      setLogoutOpen(true);
    };
  const handleCloseModal = () => setModalOpen(false);
  const handleLogoutClose = () => setLogoutOpen(false);
  return (
    <>
      <Router>
        <ScrollToTop />

        <Routes>
          <Route element={<PublicRoute />}>
            {" "}
            <Route path="/*" element={<PageNotFound />} />
            <Route path="/login" element={<LoginForm />} />
          </Route>

          <Route
            element={
              <PrivateRoute
                open={open}
                setOpen={setOpen}
                onButtonClick={handleOpenModal}
                logoutOpen={logoutOpen}
                setLogoutOpen={setLogoutOpen}
                onCloseLogout={handleLogoutClose}
                onButtonLogOutClick={handleLogoutOpenModal}
              />
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/places"
              element={
                <>
                  <PlacesList onAddPlace={handleOpenModal} />
                  <AddPlaceModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                  />
                </>
              }
            />
            <Route path="/tours" element={<ToursList />} />
            <Route path="/add-tours" element={<AddTours />} />
            <Route path="/view-tours" element={<ViewTour />} />
            <Route path="/activities" element={<ActivityList />} />
            <Route path="/add-activity" element={<AddActivity />} />
            <Route path="/view-activity" element={<ViewActivity />} />
            <Route path="/summarized-view" element={<SummarizedList />} />
            <Route
              path="/add-summarized-tour"
              element={<AddSummarizedTour />}
            />
            <Route
              path="/view-summarized-tour"
              element={<ViewSummarizedTour />}
            />
            <Route path="/add-tour-activity" element={<AddTourActivity />} />
            <Route path="/tour-activities" element={<TourActivityList />} />
            <Route path="/view-tour-activity" element={<ViewTourActivity />} />
            <Route path="/tour-transfers-list" element={<AllTransfersTourList />} />
            <Route
              path="/view-transfers-tour"
              element={<ViewTransfersTour />}
            />
            <Route path="/add-transfers-tour" element={<AddTransfersTour />} />
            <Route path="/all-stay-list-tour" element={<StayList />} />
            <Route path="/add-stay-tour" element={<AddStay />} />
            <Route path="/view-stay-tour" element={<ViewStay />} />
            <Route path="/tour-days" element={<AllTourDayList />} />
            <Route path="/add-tour-days" element={<AddTourDays />} />
            <Route path="/view-tour-days" element={<ViewTourDays />} />
            <Route path="/attractions-list" element={<AllAttractionList />} />
            <Route path="/view-attraction" element={<ViewAttraction />} />
            <Route path="/add-attraction" element={<AddAttraction />} />
            <Route path="/users" element={<AllUserList />} />
            <Route path="/user-view" element={<ViewUser />} />
            <Route path="/all-enquiry-list" element={<AllEnquiryList />} />
            <Route path="/view-enquiry" element={<ViewEnquiry />} />
            <Route path="/settings" element={<AdminProfile />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
