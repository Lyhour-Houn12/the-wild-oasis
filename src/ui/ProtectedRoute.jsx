import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../features/authentication/useCurrentUser";
import styled from "styled-components";
import Spinner from "./Spinner";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-50);
`;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  // 1. Load the authenticated user
  const { isPending, isAuthenticated } = useCurrentUser();
  console.log("ProtectedRoute →", { isPending, isAuthenticated });
  // 2. If there is no authenticated user, redirect to the login
  useEffect(
    function () {
      if (!isAuthenticated && !isPending) return navigate("/login");
    },
    [isAuthenticated, isPending, navigate],
  );

  // 3. While loading, show a spinner
  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  // 4. If there is user, render the app
  if (isAuthenticated) return children;
};

export default ProtectedRoute;
