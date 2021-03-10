import React, { useEffect, useState } from "react";
import AuthService from "../../services/auth.service";
import DesignerBoard from "../Designer/DesignerBoard";
import TechnicalBoard from "../Technical/TechnicalBoard";
import AdminBoard from "../Admin/AdminBoard"

const Dashboard = () => {
    const [showTechnicalBoard, setShowTechnicalBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [showDesignerBoard, setShowDesignerBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        setCurrentUser(user)
        console.log(user)

        if (user) {
            if (user.roles.includes("ROLE_TECHNICAL")) {
                setShowTechnicalBoard(true)
            } else if (user.roles.includes('ROLE_ADMIN')) {
                setShowAdminBoard(true)
            } else if (user.roles.includes('ROLE_DESIGNER')) {
                setShowDesignerBoard(true)
            }
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
