import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import AuthService from "../../services/auth.service";
import DesignerBoard from "../Designer/DesignerBoard";
import TechnicalBoard from "../Technical/TechnicalBoard";
import AdminBoard from "../../components/Admin/AdminBoard"

const Dashboard = () => {
    const [showTechnicalBoard, setShowTechnicalBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [showDesignerBoard, setShowDesignerBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowTechnicalBoard(user.roles.includes("ROLE_TECHNICAL"));
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
            setShowDesignerBoard(user.roles.includes("ROLE_DESIGNER"));
        }
    }, []);

    return (
        <div>
            {currentUser ? (
                <div>
                    {showDesignerBoard && <DesignerBoard />}
                    {showTechnicalBoard && <TechnicalBoard />}
                    {showAdminBoard && <AdminBoard />}
                </div>
            ) : (
                <div>Not Logged in</div>
            )}
        </div>
    );
};
export default Dashboard;
