import React, { useContext } from "react";
import {
  BrowserRouter,
  Routes as RouterWrapper,
  Route,
} from "react-router-dom";
import ProtectiveRoutes from "./ProtectiveRoutes";
import { Login, Logout } from "../pages/Auth";
import DashboardLayout from "../Layouts/DashboardLayout";
import {
  Course,
  CourseDetails,
  CourseMaker,
  EditCourse,
} from "../pages/Course";
import { Profile, ResetPassword } from "../pages/Profile";
import { AuthContext } from "../context/AuthProvider";
import { AddFaculty, ManageFaculty } from "../pages/Faculty";
import { Marks } from "../pages/Student";
import { Report } from "../pages/Report";

const Routes = () => {
  const [user, setUser] = useContext(AuthContext);
  return (
    <BrowserRouter>
      <RouterWrapper>
        <Route path="/login" element={<Login />} />
        {user.isAdmin ? (
          <Route
            path="/"
            element={
              <ProtectiveRoutes>
                <DashboardLayout />
              </ProtectiveRoutes>
            }
          >
            <Route index element={<Profile />} />
            <Route path="/manageFaculty" element={<ManageFaculty />} />
            <Route path="/addFaculty" element={<AddFaculty />} />
            <Route path="logout" element={<Logout />} />
            <Route path="resetPassword" element={<ResetPassword />} />
          </Route>
        ) : (
          <Route
            path="/"
            element={
              <ProtectiveRoutes>
                <DashboardLayout />
              </ProtectiveRoutes>
            }
          >
            <Route index element={<Profile />} />
            <Route path="courses" element={<Course />} />
            <Route path="logout" element={<Logout />} />
            <Route path="report/:id" element={<Report />} />
            <Route path="resetPassword" element={<ResetPassword />} />
            <Route path="createCourse" element={<CourseMaker />} />
            <Route path="marksEntry/:id" element={<Marks />} />
            <Route path="courseDetails/:id" element={<CourseDetails />} />
            <Route path="editCourse/:id" element={<EditCourse />} />
          </Route>
        )}
      </RouterWrapper>
    </BrowserRouter>
  );
};

export default Routes;
